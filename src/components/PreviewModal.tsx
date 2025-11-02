import { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CardData } from "@/types/card";

interface PreviewModalProps {
  open: boolean;
  onClose: () => void;
  cardData: CardData;
}

export const PreviewModal = ({ open, onClose, cardData }: PreviewModalProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (open && audioRef.current && cardData.music.url) {
      audioRef.current.play().catch(err => {
        console.log("Auto-play prevented:", err);
      });
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [open, cardData.music.url]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Преглед на картичката</DialogTitle>
        </DialogHeader>
        
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-hover border border-border bg-background">
          {cardData.backgroundImage ? (
            <img
              src={cardData.backgroundImage}
              alt="Card background"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <p className="text-muted-foreground">Няма фон</p>
            </div>
          )}

          {cardData.elements.map((element) => (
            <img
              key={element.id}
              src={element.imageUrl}
              alt="Sticker"
              style={{
                position: 'absolute',
                left: `${element.x}px`,
                top: `${element.y}px`,
                width: `${element.width}px`,
                height: `${element.height}px`,
                transform: `rotate(${element.rotation}deg)`,
              }}
              className="pointer-events-none"
            />
          ))}
        </div>

        {cardData.music.url && (
          <div className="mt-4">
            {cardData.music.type === 'file' ? (
              <audio ref={audioRef} controls className="w-full">
                <source src={cardData.music.url} type="audio/mpeg" />
              </audio>
            ) : (
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${cardData.music.url}?autoplay=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
