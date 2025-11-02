import { Upload, Sticker, Music, Eye, Download, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToolbarProps {
  onUploadBackground: () => void;
  onAddSticker: () => void;
  onAddMusic: () => void;
  onPreview: () => void;
  onExport: () => void;
  onExportViber: () => void;
}

export const Toolbar = ({
  onUploadBackground,
  onAddSticker,
  onAddMusic,
  onPreview,
  onExport,
  onExportViber,
}: ToolbarProps) => {
  return (
    <div className="flex flex-col gap-3 p-6 bg-card rounded-2xl shadow-card border border-border">
      <h2 className="text-lg font-bold text-foreground mb-2">Инструменти</h2>
      
      <Button
        onClick={onUploadBackground}
        variant="outline"
        className="w-full justify-start gap-3 h-12 hover:bg-primary/10 hover:border-primary transition-all"
      >
        <Upload className="w-5 h-5" />
        Качи фон
      </Button>

      <Button
        onClick={onAddSticker}
        variant="outline"
        className="w-full justify-start gap-3 h-12 hover:bg-primary/10 hover:border-primary transition-all"
      >
        <Sticker className="w-5 h-5" />
        Добави фигурка
      </Button>

      <Button
        onClick={onAddMusic}
        variant="outline"
        className="w-full justify-start gap-3 h-12 hover:bg-primary/10 hover:border-primary transition-all"
      >
        <Music className="w-5 h-5" />
        Добави музика
      </Button>

      <div className="border-t border-border my-2" />

      <Button
        onClick={onPreview}
        className="w-full justify-start gap-3 h-12 bg-gradient-primary text-primary-foreground hover:opacity-90 transition-all"
      >
        <Eye className="w-5 h-5" />
        Прегледай
      </Button>

      <Button
        onClick={onExport}
        className="w-full justify-start gap-3 h-12 bg-gradient-secondary text-secondary-foreground hover:opacity-90 transition-all"
      >
        <Download className="w-5 h-5" />
        Експортирай HTML
      </Button>

      <Button
        onClick={onExportViber}
        variant="outline"
        className="w-full justify-start gap-3 h-12 hover:bg-accent/10 hover:border-accent transition-all"
      >
        <Send className="w-5 h-5" />
        Изпрати в Viber
      </Button>
    </div>
  );
};
