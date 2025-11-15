import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, technology } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert test automation architect. Generate a complete Selenium test automation framework with Page Object Model structure, 25 comprehensive test cases, Jenkins pipeline, proper project structure, BaseTest class, config management, and reporting setup. Make the code production-ready with proper error handling, waits, and best practices.`;

    const userPrompt = `Generate a complete ${technology} Selenium test automation framework for the website: ${url}

Requirements:
- Technology: ${technology}
- Target URL: ${url}
- 25 test cases covering: Login, Search, Booking/Purchase flow, Navigation, Form validation, Error handling, API integration
- Follow SOLID principles
- Include proper documentation
- Setup instructions in comments`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_framework",
              description: "Generate a complete test automation framework structure",
              parameters: {
                type: "object",
                properties: {
                  framework: {
                    type: "object",
                    properties: {
                      pageObjects: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            fileName: { type: "string" },
                            code: { type: "string" }
                          },
                          required: ["fileName", "code"]
                        }
                      },
                      testCases: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            fileName: { type: "string" },
                            code: { type: "string" }
                          },
                          required: ["fileName", "code"]
                        }
                      },
                      config: {
                        type: "object",
                        properties: {
                          fileName: { type: "string" },
                          code: { type: "string" }
                        },
                        required: ["fileName", "code"]
                      },
                      jenkinsfile: {
                        type: "object",
                        properties: {
                          fileName: { type: "string" },
                          code: { type: "string" }
                        },
                        required: ["fileName", "code"]
                      },
                      baseClasses: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            fileName: { type: "string" },
                            code: { type: "string" }
                          },
                          required: ["fileName", "code"]
                        }
                      },
                      utils: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            fileName: { type: "string" },
                            code: { type: "string" }
                          },
                          required: ["fileName", "code"]
                        }
                      }
                    },
                    required: ["pageObjects", "testCases", "config", "jenkinsfile", "baseClasses", "utils"]
                  }
                },
                required: ["framework"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "generate_framework" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall || toolCall.function.name !== "generate_framework") {
      throw new Error("No valid tool call received from AI");
    }

    const frameworkData = JSON.parse(toolCall.function.arguments);

    return new Response(
      JSON.stringify(frameworkData),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-framework:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
