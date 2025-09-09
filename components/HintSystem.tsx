"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";

interface HintSystemProps {
  hints: string[];
  onHintUsed?: () => void;
}

export function HintSystem({ hints, onHintUsed }: HintSystemProps) {
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [hintsUsed, setHintsUsed] = useState<Set<number>>(new Set());

  const toggleHints = () => {
    setShowHints(!showHints);
    if (!showHints) {
      setCurrentHintIndex(0);
      // Track that hints were opened
      if (onHintUsed && hints.length > 0) {
        onHintUsed();
      }
    }
  };

  const nextHint = () => {
    if (currentHintIndex < hints.length - 1) {
      const nextIndex = currentHintIndex + 1;
      setCurrentHintIndex(nextIndex);
      // Track individual hint usage
      if (!hintsUsed.has(nextIndex)) {
        setHintsUsed(prev => new Set([...prev, nextIndex]));
        if (onHintUsed) {
          onHintUsed();
        }
      }
    }
  };

  const prevHint = () => {
    if (currentHintIndex > 0) {
      setCurrentHintIndex(currentHintIndex - 1);
    }
  };

  return (
    <div className="mt-4">
      <Button
        variant="outline"
        onClick={toggleHints}
        className="w-full flex items-center justify-between focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
        aria-expanded={showHints}
        aria-controls="hints-content"
        aria-label={showHints ? "Hinweise ausblenden" : "Hinweise anzeigen"}
      >
        <div className="flex items-center">
          <Lightbulb className="mr-2 h-4 w-4" aria-hidden="true" />
          {showHints ? "Hinweise ausblenden" : "Hinweise anzeigen"}
        </div>
        {showHints ? (
          <ChevronUp className="h-4 w-4" aria-hidden="true" />
        ) : (
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        )}
      </Button>

      {showHints && (
        <Card className="mt-4" id="hints-content">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" aria-hidden="true" />
              Hinweise
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hints.length > 0 ? (
              <div className="space-y-4">
                <Alert role="region" aria-live="polite">
                  <AlertDescription>
                    {hints[currentHintIndex]}
                  </AlertDescription>
                </Alert>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={prevHint}
                    disabled={currentHintIndex === 0}
                    className="focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                    aria-label="Vorheriger Hinweis"
                  >
                    Vorheriger Hinweis
                  </Button>
                  <Button
                    variant="outline"
                    onClick={nextHint}
                    disabled={currentHintIndex === hints.length - 1}
                    className="focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                    aria-label="Nächster Hinweis"
                  >
                    Nächster Hinweis
                  </Button>
                </div>
                <div className="text-center text-sm text-gray-500" aria-live="polite">
                  Hinweis {currentHintIndex + 1} von {hints.length}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Keine Hinweise verfügbar</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}