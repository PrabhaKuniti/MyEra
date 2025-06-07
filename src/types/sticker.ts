export interface Sticker {
  id: string;
  x: number;
  y: number;
  emoji: string;
  fontSize: number;
}

export interface StickerTemplate {
  emoji: string;
  label: string;
  fontSize: number;
}