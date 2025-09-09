"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { IntroductionSection } from "@/components/IntroductionSection";
import { TheorySection } from "@/components/TheorySection";
import { ExamplesSection } from "@/components/ExamplesSection";
import { ExercisesSection } from "@/components/ExercisesSection";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"intro" | "theory" | "examples" | "exercises">("intro");

  const progressLookup = {
    intro: 25,
    theory: 50,
    examples: 75,
    exercises: 100,
  } as const;

  const getProgress = (tab: keyof typeof progressLookup) => progressLookup[tab] || 0;

  return (
    <div className="min-h-screen bg-background">
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as "intro" | "theory" | "examples" | "exercises")}
        progress={getProgress(activeTab)}
      />
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "intro" | "theory" | "examples" | "exercises")}>
          <AnimatePresence mode="sync">
            <TabsContent value="intro" key="intro">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <IntroductionSection />
              </motion.div>
            </TabsContent>
            <TabsContent value="theory" key="theory">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TheorySection />
              </motion.div>
            </TabsContent>
            <TabsContent value="examples" key="examples">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ExamplesSection />
              </motion.div>
            </TabsContent>
            <TabsContent value="exercises" key="exercises">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ExercisesSection />
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}