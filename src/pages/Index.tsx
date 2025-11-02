import { useState, useCallback } from "react";
import { Toolbar } from "@/components/Toolbar";
import { CardCanvas } from "@/components/CardCanvas";
import { StickerSelector } from "@/components/StickerSelector";
import { MusicUploader } from "@/components/MusicUploader";
import { PreviewModal } from "@/components/PreviewModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CardData, CardElement } from "@/types/card";
import { exportToHtml, downloadHtml } from "@/utils/exportToHtml";
import { toast } from "sonner";

const Index = () => {
  const [cardData, setCardData] = useState<CardData>({
    backgroundImage: null,
    elements: [],
    music: { type: null, url: null },
  });

  const [showStickerSelector, setShowStickerSelector] = useState(false);
  const [showMusicUploader, setShowMusicUploader] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleUploadBackground = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setCardData(prev => ({
            ...prev,
            backgroundImage: event.target?.result as string,
          }));
          toast.success("Фонът е добавен!");
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleAddSticker = (stickerUrl: string) => {
    const newElement: CardElement = {
      id: `sticker-${Date.now()}`,
      type: 'sticker',
      imageUrl: stickerUrl,
      x: 300,
      y: 200,
      width: 150,
      height: 150,
      rotation: 0,
    };

    setCardData(prev => ({
      ...prev,
      elements: [...prev.elements, newElement],
    }));
    toast.success("Фигурката е добавена!");
  };

  const handleAddMusic = (type: 'file' | 'youtube', url: string) => {
    setCardData(prev => ({
      ...prev,
      music: { type, url },
    }));
  };

  const handleElementsChange = useCallback((elements: CardElement[]) => {
    setCardData(prev => ({
      ...prev,
      elements,
    }));
  }, []);

  const handlePreview = () => {
    if (!cardData.backgroundImage && cardData.elements.length === 0) {
      toast.error("Добавете фон или фигурки преди преглед");
      return;
    }
    setShowPreview(true);
  };

  const handleExport = async () => {
    if (!cardData.backgroundImage && cardData.elements.length === 0) {
      toast.error("Добавете фон или фигурки преди експорт");
      return;
    }

    try {
      const html = await exportToHtml(cardData);
      downloadHtml(html);
      toast.success("HTML файлът е изтеглен успешно!");
    } catch (error) {
      toast.error("Грешка при експортиране");
      console.error(error);
    }
  };

  const handleExportViber = async () => {
    if (!cardData.backgroundImage && cardData.elements.length === 0) {
      toast.error("Добавете фон или фигурки преди експорт");
      return;
    }

    try {
      const html = await exportToHtml(cardData);
      const blob = new Blob([html], { type: 'text/html' });
      const file = new File([blob], 'моята-картичка.html', { type: 'text/html' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Моята Картичка',
          text: 'Създадена с Cardify',
          files: [file],
        });
        toast.success("Картичката е споделена!");
      } else {
        // Fallback: download the file
        downloadHtml(html);
        toast.info("Изтеглете файла и го изпратете чрез Viber");
      }
    } catch (error) {
      toast.error("Грешка при споделяне");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-card">
                C
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Cardify
                </h1>
                <p className="text-muted-foreground text-sm">
                  Създай красиви интерактивни картички с музика
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="flex gap-6 items-start">
          {/* Toolbar */}
          <div className="w-72 flex-shrink-0">
            <Toolbar
              onUploadBackground={handleUploadBackground}
              onAddSticker={() => setShowStickerSelector(true)}
              onAddMusic={() => setShowMusicUploader(true)}
              onPreview={handlePreview}
              onExport={handleExport}
              onExportViber={handleExportViber}
            />
          </div>

          {/* Canvas */}
          <CardCanvas
            backgroundImage={cardData.backgroundImage}
            elements={cardData.elements}
            onElementsChange={handleElementsChange}
          />
        </div>
      </main>

      {/* Modals */}
      <StickerSelector
        open={showStickerSelector}
        onClose={() => setShowStickerSelector(false)}
        onSelectSticker={handleAddSticker}
      />

      <MusicUploader
        open={showMusicUploader}
        onClose={() => setShowMusicUploader(false)}
        onAddMusic={handleAddMusic}
      />

      <PreviewModal
        open={showPreview}
        onClose={() => setShowPreview(false)}
        cardData={cardData}
      />
    </div>
  );
};

export default Index;
