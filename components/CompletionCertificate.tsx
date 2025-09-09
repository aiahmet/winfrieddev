"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Download, Share } from "lucide-react";

interface CompletionCertificateProps {
  isCompleted: boolean;
  completionDate?: Date;
  onDownload?: () => void;
  onShare?: () => void;
}

export function CompletionCertificate({
  isCompleted,
  completionDate,
  onDownload,
  onShare
}: CompletionCertificateProps) {
  if (!isCompleted) {
    return null;
  }

  const handleDownload = () => {
    // Create a simple certificate as text
    const certificateText = `
HTML-Tabellen-Lernzertifikat

Dieses Zertifikat bestätigt, dass Sie erfolgreich alle
HTML-Tabellen-Übungen auf der WinfriedDev-Lernplattform abgeschlossen haben.

Abgeschlossen am: ${completionDate?.toLocaleDateString() || new Date().toLocaleDateString()}

Herzlichen Glückwunsch zur Beherrschung der HTML-Tabellenerstellung!
    `.trim();

    const blob = new Blob([certificateText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'html-tables-certificate.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    onDownload?.();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'HTML-Tabellen-Zertifikat',
        text: 'Ich habe gerade alle HTML-Tabellen-Übungen auf WinfriedDev abgeschlossen!',
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `Ich habe gerade alle HTML-Tabellen-Übungen auf WinfriedDev abgeschlossen! ${window.location.href}`
      );
      alert('Zertifikatslink in die Zwischenablage kopiert!');
    }
    onShare?.();
  };

  return (
    <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Award className="h-16 w-16 text-yellow-500" />
        </div>
        <CardTitle className="text-2xl text-yellow-800">Abschlusszertifikat</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="text-lg text-gray-700">
          Herzlichen Glückwunsch! Sie haben erfolgreich alle HTML-Tabellen-Übungen abgeschlossen.
        </div>
        {completionDate && (
          <div className="text-sm text-gray-600">
            Abgeschlossen am: {completionDate.toLocaleDateString()}
          </div>
        )}
        <div className="flex gap-2 justify-center">
          <Button onClick={handleDownload} variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Zertifikat herunterladen
          </Button>
          <Button onClick={handleShare} variant="outline" size="sm">
            <Share className="mr-2 h-4 w-4" />
            Erfolg teilen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}