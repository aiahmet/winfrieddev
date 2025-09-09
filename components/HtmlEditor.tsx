"use client";

import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface HtmlEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: string;
  onValidationError?: (error: string | null) => void;
}

export function HtmlEditor({
  value,
  onChange,
  height = "300px",
  onValidationError
}: HtmlEditorProps) {
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  // Validate HTML table structure
  useEffect(() => {
    if (!value) {
      setValidationError(null);
      onValidationError?.(null);
      return;
    }

    try {
      // Basic HTML validation
      const parser = new DOMParser();
      const doc = parser.parseFromString(value, 'text/html');
      
      // Check for parser errors
      const parserError = doc.querySelector('parsererror');
      if (parserError) {
        const errorMessage = parserError.textContent || 'Ungültige HTML-Struktur';
        setValidationError(errorMessage);
        onValidationError?.(errorMessage);
        return;
      }

      // Check if it contains at least one table element
      const hasTable = doc.querySelector('table');
      if (!hasTable) {
        setValidationError('Kein Tabellenelement gefunden. Bitte fügen Sie ein <table>-Element hinzu.');
        onValidationError?.('Kein Tabellenelement gefunden. Bitte fügen Sie ein <table>-Element hinzu.');
        return;
      }

      // Check for basic table structure
      const tables = doc.querySelectorAll('table');
      let structureError = null;
      
      for (const table of tables) {
        const hasHeader = table.querySelector('th') || table.querySelector('thead');
        const hasBody = table.querySelector('tbody') || table.querySelector('td');
        
        if (!hasHeader && !hasBody) {
          structureError = 'Die Tabelle muss Kopfzeilen (th) oder Hauptteil (td) Elemente haben.';
          break;
        }
      }
      
      setValidationError(structureError);
      onValidationError?.(structureError);
    } catch (error) {
      const errorMessage = (error as Error).message || 'Ungültiges HTML';
      setValidationError(errorMessage);
      onValidationError?.(errorMessage);
    }
  }, [value, onValidationError]);

  // Monaco editor configuration for HTML table editing
  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    wordWrap: "on",
    wrappingStrategy: "advanced",
    lineNumbers: "on" as const,
    renderLineHighlight: "all",
    smoothScrolling: true,
    tabSize: 2,
    insertSpaces: true,
    accessibilitySupport: "on",
    ariaLabel: "HTML Code Editor",
    screenReaderAnnounceInlineSuggestion: true,
    // HTML-specific settings
    autoClosingBrackets: "always",
    autoClosingQuotes: "always",
    autoIndent: "full",
    formatOnPaste: true,
    formatOnType: true,
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnCommitCharacter: true,
    acceptSuggestionOnEnter: "on",
    quickSuggestions: {
      other: true,
      comments: false,
      strings: true
    },
    parameterHints: {
      enabled: true
    }
  };

  // Handle editor mount
  const handleEditorDidMount = () => {
    setIsEditorReady(true);
  };

  // Calculate dynamic height when "auto" is specified
  const editorHeight = height === "auto" ? "400px" : height;

  return (
    <div
      id="html-editor"
      className="space-y-2"
      role="region"
      aria-label="HTML Code Editor"
      aria-describedby={validationError ? "editor-validation editor-tips" : "editor-tips"}
    >
      <div
        className="border border-[var(--border)] rounded-[var(--radius-md)] overflow-hidden focus-within:ring-[var(--focus-ring-width)] focus-within:ring-[var(--focus-ring)] focus-within:ring-offset-[var(--focus-ring-offset)] shadow-[var(--shadow-sm)] bg-[var(--surface)]"
        role="region"
        aria-label="HTML Code Editor"
      >
        <Editor
          height={editorHeight}
          defaultLanguage="html"
          value={value}
          onChange={(newValue) => onChange(newValue || "")}
          theme="vs-light"
          options={editorOptions}
          onMount={handleEditorDidMount}
          aria-label="HTML Code Editor"
        />
      </div>
      
      {/* Validation error display */}
      {validationError && (
        <Alert
          id="editor-validation"
          variant="destructive"
          className="mt-2 border border-[color-mix(in oklch, var(--warning) 50%, black)] bg-[color-mix(in oklch, var(--warning) 15%, white)] text-[color-mix(in oklch, var(--warning-contrast) 85%, black)] rounded-[var(--radius-md)] p-[var(--space-3)]"
        >
          <Info className="h-4 w-4" />
          <AlertDescription>
            {validationError}
          </AlertDescription>
        </Alert>
      )}
      
      {/* Helpful tips for HTML tables */}
      {isEditorReady && (
        <div
          id="editor-tips"
          className="text-sm text-[var(--text-muted)] bg-[color-mix(in oklch, var(--bg) 90%, var(--text))] p-[var(--space-3)] rounded-[var(--radius-md)]"
        >
          <h4 className="font-medium mb-1">HTML-Tabellen-Tipps:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Verwenden Sie {'<table>'}, um eine Tabelle zu definieren</li>
            <li>Verwenden Sie {'<th>'} für Kopfzellen und {'<td>'} für Datenzellen</li>
            <li>Verwenden Sie {'<tr>'}, um Tabellenzeilen zu definieren</li>
            <li>Verwenden Sie {'<thead>'}, {'<tbody>'} und {'<tfoot>'} für Tabellenabschnitte</li>
            <li>Verwenden Sie {'<caption>'} für Tabellenbeschriftungen</li>
          </ul>
        </div>
      )}
    </div>
  );
}