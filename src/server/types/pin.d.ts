export type Pin<T = PinData> = {
  board_id: string;
  width: number;
  height: number;
  id: string;
  type: string;
  data: T;
  x_coord: number;
  y_coord: number;
};

export type PinData = {
  youtube_id?: string;
  text?: string;
  color?: string;
  file?: string;
  track_id?: string;
};

