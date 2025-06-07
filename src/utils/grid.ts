export const GRID_SIZE = 40;

export const snapToGrid = (pos: number): number => {
  return Math.round(pos / GRID_SIZE) * GRID_SIZE;
};

export const snapPositionToGrid = (x: number, y: number): { x: number; y: number } => {
  return {
    x: snapToGrid(x),
    y: snapToGrid(y)
  };
};