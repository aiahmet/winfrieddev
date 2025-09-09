import { ExampleCard } from "./ExampleCard";
import { Table, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { examples } from "@/app/examples-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ExamplesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(examples.map(ex => ex.category)));
    return ["All", ...cats];
  }, []);

  const difficulties = useMemo(() => {
    const diffs = Array.from(new Set(examples.map(ex => ex.difficulty)));
    return ["All", ...diffs];
  }, []);

  const filteredExamples = useMemo(() => {
    return examples.filter(example => {
      const categoryMatch = selectedCategory === "All" || example.category === selectedCategory;
      const difficultyMatch = selectedDifficulty === "All" || example.difficulty === selectedDifficulty;
      return categoryMatch && difficultyMatch;
    });
  }, [selectedCategory, selectedDifficulty]);

  const visibleExamples = filteredExamples.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, filteredExamples.length));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-12"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center relative"
      >
        <div className="flex items-center justify-center mb-4">
          <Table className="w-12 h-12 text-blue-600 dark:text-blue-400 mr-4" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            HTML-Tabellen Beispiele
          </h2>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300">Praktische Anwendungen und Live-Vorschau</p>
        <div className="absolute -top-2 -left-2 w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full opacity-20"></div>
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full opacity-20"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap gap-4 justify-center mb-8"
        role="region"
        aria-label="Filteroptionen für Beispiele"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" aria-hidden="true" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Kategorie:</span>
          <div className="flex gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                className="text-xs"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Schwierigkeit:</span>
          <div className="flex gap-2">
            {difficulties.map(difficulty => (
              <Badge
                key={difficulty}
                variant={selectedDifficulty === difficulty ? "default" : "outline"}
                className="cursor-pointer text-xs"
                onClick={() => setSelectedDifficulty(difficulty)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedDifficulty(difficulty);
                  }
                }}
                aria-pressed={selectedDifficulty === difficulty}
              >
                {difficulty}
              </Badge>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        role="region"
        aria-label={`${filteredExamples.length} gefilterte Beispiele`}
      >
        {visibleExamples.map((example, index) => (
          <motion.div
            key={example.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <ExampleCard
              title={example.title}
              code={example.code}
              description={example.description}
              difficulty={example.difficulty}
              category={example.category}
            />
          </motion.div>
        ))}
      </motion.div>

      {visibleCount < filteredExamples.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-8"
        >
          <Button
            onClick={loadMore}
            variant="outline"
            size="lg"
            aria-label={`Lade ${Math.min(6, filteredExamples.length - visibleCount)} weitere Beispiele`}
          >
            Mehr laden ({filteredExamples.length - visibleCount} verbleibend)
          </Button>
        </motion.div>
      )}

      {filteredExamples.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Keine Beispiele gefunden für die ausgewählten Filter.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}