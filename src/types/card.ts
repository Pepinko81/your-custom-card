export interface CardElement {
  id: string;
  type: 'sticker';
  imageUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

export interface CardData {
  backgroundImage: string | null;
  elements: CardElement[];
  music: {
    type: 'file' | 'youtube' | null;
    url: string | null;
  };
}
