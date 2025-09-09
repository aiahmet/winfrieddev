"use client";

import React, { useMemo } from "react";
import parse, { domToReact, Element, DOMNode, Text } from "html-react-parser";

interface HtmlPreviewProps {
  code: string;
}

// Simple HTML sanitization function to prevent invalid tags
function sanitizeHtml(html: string): string {
  // Remove any existing placeholder elements
  let sanitized = html.replace(/<t__html_dom_parser_[^>]*>/gi, '');

  // Remove script and style tags for security
  sanitized = sanitized.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  sanitized = sanitized.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  // Remove event handlers
  sanitized = sanitized.replace(/on\w+="[^"]*"/gi, '');
  sanitized = sanitized.replace(/on\w+='[^']*'/gi, '');

  // Clean up malformed tags
  sanitized = sanitized.replace(/<\/?[^>]*$/gm, ''); // Remove unclosed tags at end of lines

  return sanitized;
}

export function HtmlPreview({ code }: HtmlPreviewProps) {
  // Memoize the parsed content to avoid unnecessary re-parsing
  const parsedContent = useMemo(() => {
    if (!code || code.trim() === "") {
      return <p className="text-gray-500 italic">Keine Vorschau verfügbar</p>;
    }

    try {
      // Sanitize HTML before parsing to prevent invalid tags
      const sanitizedCode = sanitizeHtml(code);

      // Parse the HTML code with enhanced processing
      const parsed = parse(sanitizedCode, {
        replace: (domNode: DOMNode) => {
          // Filter out placeholder elements created by the parser
          if (domNode.type === "tag") {
            const element = domNode as Element;
            if (element.name && element.name.startsWith('t__html_dom_parser_')) {
              return null; // Remove placeholder elements
            }
            // Filter out invalid tags like <t>
            if (element.name === 't') {
              return null; // Remove unrecognized <t> tag
            }
          }

          // Handle elements
          if (domNode.type === "tag") {
            const element = domNode as Element;

            // Process tables with enhanced styling
            if (element.name === "table") {
              const attribs: Record<string, string | undefined> = element.attribs || {};
              
              // Ensure we have proper table styling
              if (!attribs.className) {
                attribs.className = "html-preview-table";
              } else if (!attribs.className.includes("html-preview-table")) {
                attribs.className += " html-preview-table";
              }
              
              // Remove inline styles to prevent conflicts with our CSS
              delete attribs.style;
              
              // Process table children (thead, tbody, tr, etc.)
              return React.createElement(
                "table",
                attribs,
                domToReact(element.children, {
                  replace: (childNode: DOMNode) => {
                    if (childNode.type === "tag") {
                      const childElement = childNode as Element;
                      
                      // Process table cells
                      if (["td", "th"].includes(childElement.name)) {
                        const childAttribs: Record<string, string | undefined> = { ...childElement.attribs };
                        
                        // Ensure cell styling
                        if (!childAttribs.className) {
                          childAttribs.className = "html-preview-cell";
                        } else if (!childAttribs.className.includes("html-preview-cell")) {
                          childAttribs.className += " html-preview-cell";
                        }
                        
                        // Remove inline styles
                        delete childAttribs.style;
                        
                        return React.createElement(
                          childElement.name,
                          childAttribs,
                          domToReact(childElement.children)
                        );
                      }
                      
                      // Process other table elements (thead, tbody, tr, etc.)
                      if (["thead", "tbody", "tfoot", "tr"].includes(childElement.name)) {
                        const childAttribs: Record<string, string | undefined> = { ...childElement.attribs };
                        
                        // Add default styling for table rows
                        if (childElement.name === "tr" && !childAttribs.className) {
                          childAttribs.className = "html-preview-row";
                        }
                        
                        // Remove inline styles
                        delete childAttribs.style;
                        
                        return React.createElement(
                          childElement.name,
                          childAttribs,
                          domToReact(childElement.children)
                        );
                      }
                    }
                    return childNode;
                  }
                })
              );
            }
            
            // Process other common elements with basic styling
            if (["div", "p", "span", "h1", "h2", "h3", "h4", "h5", "h6"].includes(element.name)) {
              const attribs: Record<string, string | undefined> = element.attribs || {};
              
              // Remove inline styles to prevent conflicts
              delete attribs.style;
              
              return React.createElement(
                element.name,
                attribs,
                domToReact(element.children)
              );
            }
          }
          
          // Handle text nodes
          if (domNode.type === "text") {
            const textNode = domNode as Text;
            // Trim whitespace but preserve content
            if (textNode.data.trim() === "") {
              return null; // Remove empty text nodes
            }
          }
          
          return domNode;
        }
      });
      
      return parsed;
    } catch (error) {
      console.error('HTML parsing error:', error);
      // More user-friendly error handling with fallback
      return (
        <div className="p-4 bg-red-50 dark:bg-red-950 rounded-md border border-red-200 dark:border-red-900">
          <h4 className="font-medium text-red-800 dark:text-red-200">Vorschau-Fehler</h4>
          <p className="text-red-700 dark:text-red-300 mt-1">
            Der HTML-Code konnte nicht korrekt verarbeitet werden.
          </p>
          <p className="text-red-600 dark:text-red-400 text-sm mt-2">
            Bitte überprüfen Sie den Code auf fehlende schließende Tags oder ungültige Attribute.
          </p>
          <details className="mt-2">
            <summary className="text-sm text-red-600 dark:text-red-400 cursor-pointer">
              Technische Details
            </summary>
            <pre className="text-xs mt-1 p-2 bg-red-100 dark:bg-red-900 rounded overflow-x-auto">
              {error instanceof Error ? error.message : 'Unbekannter Fehler'}
            </pre>
          </details>
        </div>
      );
    }
  }, [code]);

  return (
    <div
      className="border border-[var(--border)] rounded-[var(--radius-md)] p-[var(--space-4)] bg-[var(--surface)] shadow-[var(--shadow-sm)] focus-within:ring-[var(--focus-ring-width)] focus-within:ring-[var(--focus-ring)] focus-within:ring-offset-[var(--focus-ring-offset)] transition-colors"
      role="region"
      aria-labelledby="preview-section"
    >
      <h3 className="text-lg font-medium mb-[var(--space-2)] text-[var(--text)]" id="preview-section">Vorschau:</h3>
      <div
        className="border-t border-[var(--border)] pt-[var(--space-2)] overflow-x-auto min-h-[100px]"
        role="document"
        aria-labelledby="preview-section"
        aria-live="off"
      >
        {parsedContent}
      </div>
    </div>
  );
}