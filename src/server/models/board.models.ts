import knex from "../configs/knex.config";
import { Board } from "../types/board";
import { Pin } from "../types/pin";
import { User } from "../types/user";

const getPins = async (boardId: string) => {
  try {
    const pins = await knex<Pin>("pin").where({ board_id: boardId });
    return pins;
  } catch (error) {
    throw error;
  }
};

const getOneBoard = async (boardId: string) => {
  try {
    const boardDetails = await knex<Board>("board")
      .where({ id: boardId })
      .first();
    return boardDetails;
  } catch (error) {
    throw error;
  }
};

const getPublicBoards = async () => {
  try {
    const publicBoards = await knex<Board>("board")
      .join<User>("user", "user.id", "board.user_id")
      .select(
        "user.username",
        "board.title",
        "board.thumbnail",
        "board.id",
        "board.created_at",
        "board.description",
        "board.category",
        "board.user_id"
      )
      .where({ is_public: true });
    return publicBoards;
  } catch (error) {
    throw error;
  }
};

const boardModel = {
  getPins,
  getOneBoard,
  getPublicBoards,
};

export default boardModel;
