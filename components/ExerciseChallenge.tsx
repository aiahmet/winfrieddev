"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { HtmlEditor } from "@/components/HtmlEditor";
import { HtmlPreview } from "@/components/HtmlPreview";
import { HintSystem } from "@/components/HintSystem";
import { Exercise } from "@/app/exercises-data";
import { Check, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { EXERCISE_PREFIX, COMPLETED_STATUS, IN_PROGRESS_STATUS, EDITOR_LABEL, SUCCESS_MESSAGE, PREVIOUS_EXERCISE, RESET_BUTTON, SHOW_SOLUTION, NEXT_EXERCISE, FINISH_BUTTON } from "@/lib/constants";

interface ExerciseChallengeProps {
  exercise: Exercise;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  onComplete: () => void;
  isCompleted: boolean;
  onHintUsed?: () => void;
}

export function ExerciseChallenge({
  exercise,
  onNext,
  onPrev,
  isFirst,
  isLast,
  onComplete,
  isCompleted,
  onHintUsed
}: ExerciseChallengeProps) {
  const [code, setCode] = useState(exercise.initialCode);
  const [isValid, setIsValid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editorError, setEditorError] = useState<string | null>(null);

  // Memoize the validation result to avoid unnecessary re-computations
  const valid = useMemo(() => exercise.validation(code), [code, exercise]);

  // Handle editor validation errors
  const handleEditorValidationError = (error: string | null) => {
    setEditorError(error);
  };

  // Check if the code is valid whenever the validation result changes
  useEffect(() => {
    // If there's an editor error, the code is not valid
    if (editorError) {
      setIsValid(false);
      return;
    }
    
    setIsValid(valid);

    if (valid && !showSuccess) {
      setShowSuccess(true);
      // Auto-complete after 1 second of valid code
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    } else if (!valid) {
      setShowSuccess(false);
    }
  }, [valid, showSuccess, onComplete, editorError]);

  const resetExercise = () => {
    setCode(exercise.initialCode);
    setShowSuccess(false);
  };

  const showSolution = () => {
    setCode(exercise.solution);
  };

  return (
    <section aria-labelledby="challenge-heading" className="space-y-[var(--space-4)]">
      {/* Header */}
      <div className="space-y-[var(--space-2)]">
        <div className="flex items-center justify-between">
          <h3 id="challenge-heading" className="text-xl font-semibold text-[var(--text)]">
            {EXERCISE_PREFIX} {exercise.id}: {exercise.title}
          </h3>
          <span className={`px-2 py-1 rounded-full text-sm font-medium ${
            isCompleted
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-muted text-muted-foreground'
          }`}>
            {isCompleted ? COMPLETED_STATUS : IN_PROGRESS_STATUS}
          </span>
        </div>
        <p id="challenge-desc" className="text-[var(--text-muted)] leading-[var(--line-height-relaxed)]">{exercise.description}</p>
      </div>

      {/* Editor and Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-4)]">
        <div className="space-y-[var(--space-2)]">
          <h4 id="editor-section" className="text-base font-medium text-[var(--text)]">{EDITOR_LABEL}</h4>
          <HtmlEditor
            value={code}
            onChange={setCode}
            height="400px"
            onValidationError={handleEditorValidationError}
          />
        </div>
        <div className="space-y-[var(--space-2)]">
          <h4 className="text-base font-medium text-[var(--text)]">Vorschau</h4>
          <HtmlPreview code={code} />
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div
          role="status"
          aria-live="polite"
          className="bg-[color-mix(in oklch, var(--success) 12%, white)] text-[color-mix(in oklch, var(--success-contrast) 90%, black)] border border-[color-mix(in oklch, var(--success) 30%, black)] rounded-[var(--radius-md)] p-[var(--space-3)]"
        >
          <p className="font-medium">
            <Check className="inline h-4 w-4 mr-2" />
            {SUCCESS_MESSAGE}
          </p>
        </div>
      )}

      {/* Hints */}
      <HintSystem hints={exercise.hints} onHintUsed={onHintUsed} />

      {/* Navigation */}
      <div className="flex flex-wrap justify-between gap-4 pt-4 border-t">
        <div role="group" aria-label="Übungssteuerung" className="flex gap-2">
          {!isFirst && (
            <Button
              variant="outline"
              onClick={onPrev}
              aria-label={PREVIOUS_EXERCISE}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              {PREVIOUS_EXERCISE}
            </Button>
          )}
          <Button
            variant="outline"
            onClick={resetExercise}
            aria-label={RESET_BUTTON}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            {RESET_BUTTON}
          </Button>
          <Button
            variant="outline"
            onClick={showSolution}
            aria-label={SHOW_SOLUTION}
          >
            {SHOW_SOLUTION}
          </Button>
        </div>

        <div role="group" aria-label="Navigation" className="flex gap-2">
          {!isLast && (
            <Button
              onClick={onNext}
              disabled={!isCompleted}
              aria-label={`${NEXT_EXERCISE}${!isCompleted ? ' (complete current exercise first)' : ''}`}
            >
              {NEXT_EXERCISE}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          {isLast && isValid && (
            <Button
              onClick={onNext}
              aria-label={FINISH_BUTTON}
            >
              {FINISH_BUTTON}
              <Check className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}