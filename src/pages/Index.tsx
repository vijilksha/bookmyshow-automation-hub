import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Loader2, Download, Code2, FileCode, TestTube2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CodeDisplay } from "@/components/CodeDisplay";
import JSZip from "jszip";

interface GeneratedFile {
  fileName: string;
  code: string;
}

interface Framework {
  pageObjects: GeneratedFile[];
  testCases: GeneratedFile[];
  config: GeneratedFile;
  jenkinsfile: GeneratedFile;
  baseClasses: GeneratedFile[];
  utils: GeneratedFile[];
}

const Index = () => {
  const [url, setUrl] = useState("");
  const [technology, setTechnology] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [framework, setFramework] = useState<Framework | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!url || !technology) {
      toast({
        title: "Missing Information",
        description: "Please provide both URL and technology",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setFramework(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-framework", {
        body: { url, technology },
      });

      if (error) throw error;

      if (data?.error) {
        throw new Error(data.error);
      }

      setFramework(data.framework);
      toast({
        title: "Framework Generated!",
        description: "Your test automation framework is ready",
      });
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate framework",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAll = async () => {
    if (!framework) return;

    const zip = new JSZip();
    
    // Determine folder structure based on technology
    const isJava = technology === "java";
    const isPython = technology === "python";
    const isJavaScript = technology === "javascript";
    const isCSharp = technology === "csharp";

    if (isJava) {
      // Maven project structure for Java
      framework.pageObjects.forEach((file) => {
        zip.file(`src/main/java/pages/${file.fileName}`, file.code);
      });
      framework.testCases.forEach((file) => {
        zip.file(`src/test/java/tests/${file.fileName}`, file.code);
      });
      framework.baseClasses.forEach((file) => {
        zip.file(`src/main/java/base/${file.fileName}`, file.code);
      });
      framework.utils.forEach((file) => {
        zip.file(`src/main/java/utils/${file.fileName}`, file.code);
      });
      zip.file(framework.config.fileName, framework.config.code);
      zip.file(framework.jenkinsfile.fileName, framework.jenkinsfile.code);
    } else if (isPython) {
      // Python project structure
      framework.pageObjects.forEach((file) => {
        zip.file(`pages/${file.fileName}`, file.code);
      });
      framework.testCases.forEach((file) => {
        zip.file(`tests/${file.fileName}`, file.code);
      });
      framework.baseClasses.forEach((file) => {
        zip.file(`base/${file.fileName}`, file.code);
      });
      framework.utils.forEach((file) => {
        zip.file(`utils/${file.fileName}`, file.code);
      });
      zip.file(framework.config.fileName, framework.config.code);
      zip.file(framework.jenkinsfile.fileName, framework.jenkinsfile.code);
    } else if (isJavaScript) {
      // JavaScript/Node project structure
      framework.pageObjects.forEach((file) => {
        zip.file(`src/pages/${file.fileName}`, file.code);
      });
      framework.testCases.forEach((file) => {
        zip.file(`test/${file.fileName}`, file.code);
      });
      framework.baseClasses.forEach((file) => {
        zip.file(`src/base/${file.fileName}`, file.code);
      });
      framework.utils.forEach((file) => {
        zip.file(`src/utils/${file.fileName}`, file.code);
      });
      zip.file(framework.config.fileName, framework.config.code);
      zip.file(framework.jenkinsfile.fileName, framework.jenkinsfile.code);
    } else if (isCSharp) {
      // C# project structure
      framework.pageObjects.forEach((file) => {
        zip.file(`Pages/${file.fileName}`, file.code);
      });
      framework.testCases.forEach((file) => {
        zip.file(`Tests/${file.fileName}`, file.code);
      });
      framework.baseClasses.forEach((file) => {
        zip.file(`Base/${file.fileName}`, file.code);
      });
      framework.utils.forEach((file) => {
        zip.file(`Utils/${file.fileName}`, file.code);
      });
      zip.file(framework.config.fileName, framework.config.code);
      zip.file(framework.jenkinsfile.fileName, framework.jenkinsfile.code);
    }

    // Generate and download zip
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = `selenium-framework-${technology}.zip`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Framework Downloaded",
      description: `Complete ${technology} framework with proper folder structure`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b border-border/50 bg-gradient-to-r from-card to-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <TestTube2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Test Framework Generator
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            AI-powered Selenium framework with Page Object Model & Jenkins pipeline
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Input Form */}
        <Card className="p-6 mb-8 bg-gradient-card border-border/50 shadow-tech">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-foreground flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Target Website URL
              </Label>
              <Input
                id="url"
                placeholder="https://www.example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-background/50 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="technology" className="text-foreground flex items-center gap-2">
                <FileCode className="w-4 h-4" />
                Technology Stack
              </Label>
              <Select value={technology} onValueChange={setTechnology}>
                <SelectTrigger id="technology" className="bg-background/50 border-border">
                  <SelectValue placeholder="Select technology" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="java">Java (Maven + TestNG)</SelectItem>
                  <SelectItem value="python">Python (Pytest)</SelectItem>
                  <SelectItem value="javascript">JavaScript (WebdriverIO)</SelectItem>
                  <SelectItem value="csharp">C# (NUnit)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Framework...
              </>
            ) : (
              <>
                <TestTube2 className="mr-2 h-5 w-5" />
                Generate Framework
              </>
            )}
          </Button>
        </Card>

        {/* Results */}
        {framework && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Generated Framework</h2>
              <Button onClick={downloadAll} variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Download className="mr-2 h-4 w-4" />
                Download All Files
              </Button>
            </div>

            <div className="space-y-6">
              <CodeDisplay title="Page Objects" files={framework.pageObjects} />
              <CodeDisplay title="Test Cases (25 Business Scenarios)" files={framework.testCases} />
              <CodeDisplay title="Base Classes" files={framework.baseClasses} />
              <CodeDisplay title="Utilities" files={framework.utils} />
              <CodeDisplay title="Configuration" files={[framework.config]} />
              <CodeDisplay title="Jenkins Pipeline" files={[framework.jenkinsfile]} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
