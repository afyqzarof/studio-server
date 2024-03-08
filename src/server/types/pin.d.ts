export type Pin<T> = {
  board_id: string;
  width: number;
  height: number;
  id: string;
  type: string;
  data: T;
  x_coord: number;
  y_coord: number;
};
