"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { runWCAG21AATest, logAccessibilityViolations, type AccessibilityResult } from '@/lib/accessibility-test';
import { Accessibility, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export function AccessibilityTester() {
  const [results, setResults] = useState<AccessibilityResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Only show in development
  const isDevelopment = process.env.NODE_ENV === 'development';

  const runTests = async () => {
    setIsRunning(true);
    setError(null);

    try {
      const testResults = await runWCAG21AATest();
      setResults(testResults);
      logAccessibilityViolations(testResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (isDevelopment) {
      // Auto-run tests on component mount in development
      runTests();
    }
  }, [isDevelopment]);

  if (!isDevelopment) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 max-h-96 overflow-y-auto z-50 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <Accessibility className="mr-2 h-4 w-4" />
          Accessibility Tester
          <Badge variant="outline" className="ml-2">
            WCAG 2.1 AA
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={runTests}
          disabled={isRunning}
          size="sm"
          className="w-full"
          aria-label="Run accessibility tests"
        >
          {isRunning ? 'Testing...' : 'Run Tests'}
        </Button>

        {error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {results && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <XCircle className="h-4 w-4 text-red-500 mr-1" />
                <span>Violations: {results.violations.length}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span>Passes: {results.passes.length}</span>
              </div>
            </div>

            {results.violations.length > 0 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  {results.violations.length} accessibility issues found.
                  Check console for details.
                </AlertDescription>
              </Alert>
            )}

            {results.violations.length === 0 && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  All tests passed! 🎉
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}