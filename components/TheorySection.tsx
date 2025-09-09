import { Card } from "@/components/ui/card";
import { Table, Settings, CheckCircle, Code, Info, Grid3X3, Columns, Rows, Copy, Check, ArrowRight, ChevronDown, ChevronUp, Eye } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from "@/lib/theme-context";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TheorySection() {
  const { theme } = useTheme();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    'basic-table': true,
    'border-table': false,
    'colspan-table': false,
    'rowspan-table': false,
  });
  const [previewSections, setPreviewSections] = useState<{ [key: string]: boolean }>({});

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePreview = (key: string) => {
    setPreviewSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const syntaxTheme = theme === 'dark' ? oneDark : oneLight;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">HTML-Tabellen Theorie</h2>
        <p className="text-xl text-muted-foreground">Die Grundbausteine von Tabellen</p>
      </div>

      <Card className="p-6">
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Table className="w-6 h-6" />
          Grundstruktur einer Tabelle
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
          <div>
            <h4 className="text-lg font-medium mb-2 flex items-center gap-2">
              <Code className="w-4 h-4" />
              HTML-Code:
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleSection('basic-table')}
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  {expandedSections['basic-table'] ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                  Code anzeigen
                </button>
                <button
                  onClick={() => togglePreview('basic-table')}
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                  title="Vorschau anzeigen"
                >
                  <Eye className="w-4 h-4" />
                  Vorschau
                </button>
              </div>

              <AnimatePresence>
                {expandedSections['basic-table'] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <SyntaxHighlighter
                      language="html"
                      style={syntaxTheme}
                      className="rounded text-sm"
                      customStyle={{ padding: '1rem', margin: 0 }}
                    >
                      {`<table>
  <tr>
    <th>Kopfzeile 1</th>
    <th>Kopfzeile 2</th>
  </tr>
  <tr>
    <td>Daten 1</td>
    <td>Daten 2</td>
  </tr>
</table>`}
                    </SyntaxHighlighter>
                    <button
                      onClick={() => copyToClipboard(`<table>
  <tr>
    <th>Kopfzeile 1</th>
    <th>Kopfzeile 2</th>
  </tr>
  <tr>
    <td>Daten 1</td>
    <td>Daten 2</td>
  </tr>
</table>`, 'basic-table')}
                      className="absolute top-2 right-2 p-2 bg-muted hover:bg-muted/80 rounded transition-colors"
                      title="Copy to clipboard"
                    >
                      {copiedStates['basic-table'] ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {previewSections['basic-table'] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded p-4 bg-muted/50"
                  >
                    <div dangerouslySetInnerHTML={{
                      __html: `<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 1px solid #ccc; padding: 8px; background-color: #f5f5f5;">Kopfzeile 1</th>
    <th style="border: 1px solid #ccc; padding: 8px; background-color: #f5f5f5;">Kopfzeile 2</th>
  </tr>
  <tr>
    <td style="border: 1px solid #ccc; padding: 8px;">Daten 1</td>
    <td style="border: 1px solid #ccc; padding: 8px;">Daten 2</td>
  </tr>
</table>`
                    }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center justify-center py-8 md:py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center gap-2"
            >
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-8 h-8 text-muted-foreground" />
              </motion.div>
              <div className="w-px h-16 bg-gradient-to-b from-muted-foreground/50 to-transparent"></div>
            </motion.div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Erklärung:
            </h4>
            <ul className="space-y-2">
              <li><code dangerouslySetInnerHTML={{ __html: '&lt;table&gt;&lt;/table&gt;' }} /> - Definiert die Tabelle</li>
              <li><code dangerouslySetInnerHTML={{ __html: '&lt;tr&gt;&lt;/tr&gt;' }} /> - Tabellenzeile</li>
              <li><code dangerouslySetInnerHTML={{ __html: '&lt;th&gt;&lt;/th&gt;' }} /> - Tabellenkopf</li>
              <li><code dangerouslySetInnerHTML={{ __html: '&lt;td&gt;&lt;/td&gt;' }} /> - Tabellenzelle</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-6 h-6" />
          Wichtige Attribute
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-medium flex items-center gap-2">
              <Grid3X3 className="w-4 h-4" />
              Border (Rahmen)
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleSection('border-table')}
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  {expandedSections['border-table'] ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                  Code anzeigen
                </button>
                <button
                  onClick={() => togglePreview('border-table')}
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                  title="Vorschau anzeigen"
                >
                  <Eye className="w-4 h-4" />
                  Vorschau
                </button>
              </div>

              <AnimatePresence>
                {expandedSections['border-table'] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <SyntaxHighlighter
                      language="html"
                      style={syntaxTheme}
                      className="rounded text-sm"
                      customStyle={{ padding: '1rem', margin: 0 }}
                    >
                      {`<table border="1">
  <tr>
    <td>Zelle 1</td>
    <td>Zelle 2</td>
  </tr>
</table>`}
                    </SyntaxHighlighter>
                    <button
                      onClick={() => copyToClipboard(`<table border="1">
  <tr>
    <td>Zelle 1</td>
    <td>Zelle 2</td>
  </tr>
</table>`, 'border-table')}
                      className="absolute top-2 right-2 p-2 bg-muted hover:bg-muted/80 rounded transition-colors"
                      title="Copy to clipboard"
                    >
                      {copiedStates['border-table'] ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {previewSections['border-table'] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded p-4 bg-muted/50"
                  >
                    <div dangerouslySetInnerHTML={{
                      __html: `<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td style="border: 1px solid #ccc; padding: 8px;">Zelle 1</td>
    <td style="border: 1px solid #ccc; padding: 8px;">Zelle 2</td>
  </tr>
</table>`
                    }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium flex items-center gap-2">
              <Columns className="w-4 h-4" />
              Colspan (Zellen zusammenfassen)
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleSection('colspan-table')}
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  {expandedSections['colspan-table'] ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                  Code anzeigen
                </button>
                <button
                  onClick={() => togglePreview('colspan-table')}
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                  title="Vorschau anzeigen"
                >
                  <Eye className="w-4 h-4" />
                  Vorschau
                </button>
              </div>

              <AnimatePresence>
                {expandedSections['colspan-table'] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <SyntaxHighlighter
                      language="html"
                      style={syntaxTheme}
                      className="rounded text-sm"
                      customStyle={{ padding: '1rem', margin: 0 }}
                    >
                      {`<table border="1">
  <tr>
    <td colspan="2">Zwei Spalten breit</td>
  </tr>
  <tr>
    <td>Zelle 1</td>
    <td>Zelle 2</td>
  </tr>
</table>`}
                    </SyntaxHighlighter>
                    <button
                      onClick={() => copyToClipboard(`<table border="1">
  <tr>
    <td colspan="2">Zwei Spalten breit</td>
  </tr>
  <tr>
    <td>Zelle 1</td>
    <td>Zelle 2</td>
  </tr>
</table>`, 'colspan-table')}
                      className="absolute top-2 right-2 p-2 bg-muted hover:bg-muted/80 rounded transition-colors"
                      title="Copy to clipboard"
                    >
                      {copiedStates['colspan-table'] ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {previewSections['colspan-table'] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded p-4 bg-muted/50"
                  >
                    <div dangerouslySetInnerHTML={{
                      __html: `<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td colspan="2" style="border: 1px solid #ccc; padding: 8px;">Zwei Spalten breit</td>
  </tr>
  <tr>
    <td style="border: 1px solid #ccc; padding: 8px;">Zelle 1</td>
    <td style="border: 1px solid #ccc; padding: 8px;">Zelle 2</td>
  </tr>
</table>`
                    }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium flex items-center gap-2">
              <Rows className="w-4 h-4" />
              Rowspan (Zeilen zusammenfassen)
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleSection('rowspan-table')}
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  {expandedSections['rowspan-table'] ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                  Code anzeigen
                </button>
                <button
                  onClick={() => togglePreview('rowspan-table')}
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                  title="Vorschau anzeigen"
                >
                  <Eye className="w-4 h-4" />
                  Vorschau
                </button>
              </div>

              <AnimatePresence>
                {expandedSections['rowspan-table'] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <SyntaxHighlighter
                      language="html"
                      style={syntaxTheme}
                      className="rounded text-sm"
                      customStyle={{ padding: '1rem', margin: 0 }}
                    >
                      {`<table border="1">
  <tr>
    <td rowspan="2">Zwei Zeilen hoch</td>
    <td>Zelle 1</td>
  </tr>
  <tr>
    <td>Zelle 2</td>
  </tr>
</table>`}
                    </SyntaxHighlighter>
                    <button
                      onClick={() => copyToClipboard(`<table border="1">
  <tr>
    <td rowspan="2">Zwei Zeilen hoch</td>
    <td>Zelle 1</td>
  </tr>
  <tr>
    <td>Zelle 2</td>
  </tr>
</table>`, 'rowspan-table')}
                      className="absolute top-2 right-2 p-2 bg-muted hover:bg-muted/80 rounded transition-colors"
                      title="Copy to clipboard"
                    >
                      {copiedStates['rowspan-table'] ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {previewSections['rowspan-table'] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded p-4 bg-muted/50"
                  >
                    <div dangerouslySetInnerHTML={{
                      __html: `<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td rowspan="2" style="border: 1px solid #ccc; padding: 8px;">Zwei Zeilen hoch</td>
    <td style="border: 1px solid #ccc; padding: 8px;">Zelle 1</td>
  </tr>
  <tr>
    <td style="border: 1px solid #ccc; padding: 8px;">Zelle 2</td>
  </tr>
</table>`
                    }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6" />
          Best Practices
        </h3>
        <ul className="space-y-3 text-lg">
          <li>• Verwende <code dangerouslySetInnerHTML={{ __html: '&lt;th&gt;' }} /> für Kopfzeilen zur besseren Zugänglichkeit</li>
          <li>• Füge <code>border</code> hinzu für bessere Sichtbarkeit</li>
          <li>• Nutze <code>colspan</code> und <code>rowspan</code> sparsam</li>
          <li>• Halte Tabellen einfach und übersichtlich</li>
          <li>• Verwende CSS für Styling statt HTML-Attribute</li>
        </ul>
      </Card>
    </div>
  );
}