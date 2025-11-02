import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import heartSticker from "@/assets/stickers/heart.png";
import starSticker from "@/assets/stickers/star.png";
import happySticker from "@/assets/stickers/happy.png";
import cakeSticker from "@/assets/stickers/cake.png";
import balloonSticker from "@/assets/stickers/balloon.png";
import confettiSticker from "@/assets/stickers/confetti.png";
import candySticker from "@/assets/stickers/candy.png";
import giftSticker from "@/assets/stickers/gift.png";
import partyHatSticker from "@/assets/stickers/party-hat.png";
import cupcakeSticker from "@/assets/stickers/cupcake.png";
import sparklesSticker from "@/assets/stickers/sparkles.png";
import sunSticker from "@/assets/stickers/sun.png";
import rainbowSticker from "@/assets/stickers/rainbow.png";
import musicNoteSticker from "@/assets/stickers/music-note.png";

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
  { id: 'candy', src: candySticker, name: 'Бонбон' },
  { id: 'gift', src: giftSticker, name: 'Подарък' },
  { id: 'party-hat', src: partyHatSticker, name: 'Парти шапка' },
  { id: 'cupcake', src: cupcakeSticker, name: 'Кексче' },
  { id: 'sparkles', src: sparklesSticker, name: 'Искри' },
  { id: 'sun', src: sunSticker, name: 'Слънце' },
  { id: 'rainbow', src: rainbowSticker, name: 'Дъга' },
  { id: 'music-note', src: musicNoteSticker, name: 'Нота' },
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
        <div className="grid grid-cols-4 gap-4 p-4 max-h-[60vh] overflow-y-auto">
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
