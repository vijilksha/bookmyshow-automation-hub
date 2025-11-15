import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface GeneratedFile {
  fileName: string;
  code: string;
}

interface CodeDisplayProps {
  title: string;
  files: GeneratedFile[];
}

export const CodeDisplay = ({ title, files }: CodeDisplayProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const copyToClipboard = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
  };

  const downloadFile = (file: GeneratedFile) => {
    const blob = new Blob([file.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6 bg-gradient-card border-border/50">
      <h3 className="text-xl font-semibold mb-4 text-primary">{title}</h3>
      <div className="space-y-4">
        {files.map((file, index) => (
          <div key={index} className="border border-border/50 rounded-lg overflow-hidden bg-background/30">
            <div className="flex items-center justify-between bg-secondary/50 px-4 py-2 border-b border-border/50">
              <span className="font-mono text-sm text-foreground">{file.fileName}</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(file.code, index)}
                  className="h-8 text-muted-foreground hover:text-foreground"
                >
                  {copiedIndex === index ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => downloadFile(file)}
                  className="h-8 text-muted-foreground hover:text-foreground"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <pre className="p-4 overflow-x-auto text-sm bg-background/50">
              <code className="text-foreground/90 font-mono">{file.code}</code>
            </pre>
          </div>
        ))}
      </div>
    </Card>
  );
};
