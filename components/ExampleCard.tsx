import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HtmlPreview } from "./HtmlPreview";
import { Code, Eye, Star, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface ExampleCardProps {
  title: string;
  code: string;
  description: string;
  difficulty: string;
  category: string;
}

export function ExampleCard({ title, code, description, difficulty, category }: ExampleCardProps) {
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Anfänger": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Fortgeschritten": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Experte": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const toggleCodeExpansion = () => {
    setIsCodeExpanded(!isCodeExpanded);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="p-6 h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white" id={`example-title-${title.replace(/\s+/g, '-').toLowerCase()}`}>{title}</h3>
            <Badge variant="outline" className="mt-2 text-xs">
              {category}
            </Badge>
          </div>
          <Badge className={getDifficultyColor(difficulty)} aria-label={`Schwierigkeitsgrad: ${difficulty}`}>
            <Star className="w-3 h-3 mr-1" aria-hidden="true" />
            {difficulty}
          </Badge>
        </div>
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">{description}</p>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Code className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">HTML-Code:</h4>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyCode}
                  aria-label="Code kopieren"
                  className="text-xs"
                >
                  <Copy className="w-3 h-3 mr-1" aria-hidden="true" />
                  {copySuccess ? 'Kopiert!' : 'Kopieren'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleCodeExpansion}
                  aria-label={isCodeExpanded ? 'Code zuklappen' : 'Code ausklappen'}
                  aria-expanded={isCodeExpanded}
                  className="text-xs"
                >
                  {isCodeExpanded ? <ChevronUp className="w-3 h-3" aria-hidden="true" /> : <ChevronDown className="w-3 h-3" aria-hidden="true" />}
                  {isCodeExpanded ? 'Zuklappen' : 'Ausklappen'}
                </Button>
              </div>
            </div>
            {isCodeExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <pre
                  className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto border border-gray-200 dark:border-gray-600"
                  role="region"
                  aria-labelledby={`example-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
                  tabIndex={0}
                >
                  <code className="text-gray-800 dark:text-gray-200">{code}</code>
                </pre>
              </motion.div>
            )}
          </div>

          <div>
            <div className="flex items-center mb-2">
              <Eye className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" aria-hidden="true" />
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">Live-Vorschau:</h4>
            </div>
            <div role="region" aria-labelledby={`example-title-${title.replace(/\s+/g, '-').toLowerCase()}`} aria-label="Live-Vorschau der HTML-Tabelle">
              <HtmlPreview code={code} />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}