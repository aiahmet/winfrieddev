import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import Link from "next/link"

interface HeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  progress?: number;
}

export function Header({ activeTab = "intro", onTabChange, progress = 0 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm focus-within:outline-2 focus-within:outline-ring focus-within:outline-offset-2">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <h1 className="text-2xl font-bold text-foreground">WinfriedDev</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-sm text-muted-foreground">HTML Tabellen lernen</div>
            <ThemeToggle />
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                aria-label="Zurück zur Hauptseite"
                className="touch-manipulation min-h-[44px]"
              >
                Zurück zur Hauptseite
              </Button>
            </Link>
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={onTabChange as (value: string) => void}>
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-1">
            <TabsTrigger value="intro" className="text-xs sm:text-sm py-2 px-3 touch-manipulation min-h-[44px]">Einführung</TabsTrigger>
            <TabsTrigger value="theory" className="text-xs sm:text-sm py-2 px-3 touch-manipulation min-h-[44px]">Theorie</TabsTrigger>
            <TabsTrigger value="examples" className="text-xs sm:text-sm py-2 px-3 touch-manipulation min-h-[44px]">Beispiele</TabsTrigger>
            <TabsTrigger value="exercises" className="text-xs sm:text-sm py-2 px-3 touch-manipulation min-h-[44px]">Übungen</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="mt-4">
          <Progress value={progress} className="h-2 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2" />
          <div className="text-xs text-muted-foreground mt-1">Sitzungsfortschritt: {progress}%</div>
        </div>
      </div>
    </header>
  );
}