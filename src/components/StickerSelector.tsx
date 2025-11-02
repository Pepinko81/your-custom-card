import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import heartSticker from "@/assets/stickers/heart.png";
import starSticker from "@/assets/stickers/star.png";
import happySticker from "@/assets/stickers/happy.png";
import cakeSticker from "@/assets/stickers/cake.png";
import balloonSticker from "@/assets/stickers/balloon.png";
import confettiSticker from "@/assets/stickers/confetti.png";

interface StickerSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelectSticker: (stickerUrl: string) => void;
}

const stickers = [
  { id: 'heart', src: heartSticker, name: 'Сърце' },
  { id: 'star', src: starSticker, name: 'Звезда' },
  { id: 'happy', src: happySticker, name: 'Усмивка' },
  { id: 'cake', src: cakeSticker, name: 'Торта' },
  { id: 'balloon', src: balloonSticker, name: 'Балони' },
  { id: 'confetti', src: confettiSticker, name: 'Конфети' },
];

export const StickerSelector = ({ open, onClose, onSelectSticker }: StickerSelectorProps) => {
  const handleSelect = (stickerSrc: string) => {
    onSelectSticker(stickerSrc);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Избери фигурка</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 p-4">
          {stickers.map((sticker) => (
            <button
              key={sticker.id}
              onClick={() => handleSelect(sticker.src)}
              className="relative group aspect-square rounded-xl overflow-hidden border-2 border-border hover:border-primary transition-all hover:scale-105 bg-card shadow-card hover:shadow-hover"
            >
              <img
                src={sticker.src}
                alt={sticker.name}
                className="w-full h-full object-contain p-4"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                <span className="text-sm font-medium text-foreground bg-background/80 px-3 py-1 rounded-full">
                  {sticker.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
