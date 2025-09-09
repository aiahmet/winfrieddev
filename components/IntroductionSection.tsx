import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, Code, Layout, Smartphone, BookOpen, Clock, Eye, Play, Info } from "lucide-react";
import { motion } from "framer-motion";

export function IntroductionSection() {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-6 text-primary">Willkommen bei WinfriedDev!</h2>
        <p className="text-xl text-muted-foreground">Deine interaktive Lernplattform für HTML-Tabellen</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-6 text-primary flex items-center gap-3">
              <Table className="w-6 h-6 text-secondary" />
              Was du lernen wirst
            </h3>
            <ul className="space-y-3 text-lg">
              <li className="flex items-center gap-3">
                <Table className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                Grundstruktur von HTML-Tabellen
              </li>
              <li className="flex items-center gap-3">
                <Code className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                Wichtige Tabellen-Tags und Attribute
              </li>
              <li className="flex items-center gap-3">
                <Layout className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                Erstellung komplexer Tabellenlayouts
              </li>
              <li className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                Best Practices für responsive Tabellen
              </li>
            </ul>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-6 text-primary flex items-center gap-3">
              <Clock className="w-6 h-6 text-secondary" />
              Session Überblick
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-muted-foreground" />
                  Einführung
                </span>
                <Badge variant="secondary">15 Min</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-muted-foreground" />
                  Theorie
                </span>
                <Badge variant="secondary">30 Min</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-3">
                  <Play className="w-5 h-5 text-muted-foreground" />
                  Beispiele
                </span>
                <Badge variant="secondary">30 Min</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-3">
                  <Code className="w-5 h-5 text-muted-foreground" />
                  Übungen
                </span>
                <Badge variant="secondary">45 Min</Badge>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-2xl font-semibold mb-6 text-primary flex items-center gap-3">
            <Info className="w-6 h-6 text-secondary" />
            Warum Tabellen wichtig sind
          </h3>
          <p className="text-lg leading-relaxed text-muted-foreground">
            HTML-Tabellen sind ein grundlegendes Element des Webdesigns. Sie ermöglichen es,
            Daten strukturiert und übersichtlich darzustellen. Von einfachen Preislisten bis hin
            zu komplexen Datenanalysen - Tabellen sind überall im Web zu finden.
          </p>
        </Card>
      </motion.div>
    </motion.div>
  );
}