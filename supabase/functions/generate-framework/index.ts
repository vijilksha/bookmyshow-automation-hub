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

    const systemPrompt = `You are an expert test automation architect. Generate a complete Selenium test automation framework with:
1. Page Object Model (POM) structure
2. 25 comprehensive test cases covering critical business processes
3. Jenkins pipeline configuration
4. Proper project structure with Maven/Gradle or equivalent
5. BaseTest class with setup/teardown
6. Config management
7. Reporting setup (TestNG/JUnit)

Return the response in JSON format with this exact structure:
{
  "framework": {
    "pageObjects": [
      {
        "fileName": "HomePage.${technology === 'java' ? 'java' : 'py'}",
        "code": "complete code here"
      }
    ],
    "testCases": [
      {
        "fileName": "TestExample.${technology === 'java' ? 'java' : 'py'}",
        "code": "complete code here"
      }
    ],
    "config": {
      "fileName": "pom.xml or requirements.txt",
      "code": "complete code here"
    },
    "jenkinsfile": {
      "fileName": "Jenkinsfile",
      "code": "complete pipeline code here"
    },
    "baseClasses": [
      {
        "fileName": "BaseTest.${technology === 'java' ? 'java' : 'py'}",
        "code": "complete code here"
      }
    ],
    "utils": [
      {
        "fileName": "ConfigReader.${technology === 'java' ? 'java' : 'py'}",
        "code": "complete code here"
      }
    ]
  }
}

Make the code production-ready with proper error handling, waits, and best practices.`;

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
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content received from AI");
    }

    // Extract JSON from markdown code blocks if present
    let jsonContent = content;
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      jsonContent = jsonMatch[1];
    }

    const parsedFramework = JSON.parse(jsonContent);

    return new Response(
      JSON.stringify({ framework: parsedFramework.framework }),
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
