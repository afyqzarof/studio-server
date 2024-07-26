import knex from "../configs/knex.config";
import { nanoid } from "nanoid";
import jwt, { JwtPayload } from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import getImageIds from "../utils/get-image-pin";
import { Board } from "../types/board";
import boardModel from "../models/board.models";

const getPins = async (req: Request<{ boardId: string }>, res: Response) => {
  const { boardId } = req.params;
  try {
    const pins = await boardModel.getPins(boardId);
    res.json(pins);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getBoardDetails = async (
  req: Request<{ boardId: string }>,
  res: Response
) => {
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];
  try {
    const decoded: JwtPayload = jwt.verify(
      authToken,
      process.env.JWT_SECRET
    ) as JwtPayload;

    const { boardId } = req.params;
    const boardDetails = await boardModel.getOneBoard(boardId);

    if (!boardDetails) {
      return res.status(404).send("No board found");
    }

    if (boardDetails.user_id !== decoded.id) {
      return res.status(401).send("you are not allowed to edit this board");
    }
    res.json(boardDetails);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getPublicBoards = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];

  try {
    const decoded: JwtPayload = jwt.verify(
      authToken,
      process.env.JWT_SECRET
    ) as JwtPayload;
    const publicBoards = await boardModel.getPublicBoards();

    if (authToken === "demo") {
      return res.json(publicBoards);
    }

    const filteredBoards = publicBoards.filter(
      (board) => board.user_id !== decoded.id
    );
    res.json(filteredBoards);
  } catch (error) {
    res.status(500).send(error);
  }
};

const newBoard = async (req: Request, res: Response) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];

  try {
    const decoded: JwtPayload = jwt.verify(
      authToken,
      process.env.JWT_SECRET
    ) as JwtPayload;
    const userId = decoded.id as string;

    const newBoard: Board = {
      id: nanoid(15),
      user_id: userId,
      thumbnail: "default.png",
      created_at: String(Date.now()),
      updated_at: String(Date.now()),
      is_public: false,
    };

    await knex("board").insert(newBoard);
    res.json(newBoard);
  } catch (error) {
    res.status(500).send(error);
  }
};
const saveBoard = async (req: Request, res: Response) => {
  const { title, boardId, filename } = req.body;

  if (!title || !boardId || !filename) {
    return res.status(400).send("Please have all fields");
  }
  const { thumbnail } = await boardModel.getOneBoard(boardId);
  if (thumbnail !== "default.png") {
    try {
      fs.unlinkSync(
        path.resolve(__dirname, `../../../public/thumbnails/${thumbnail}`)
      );
    } catch (error) {
      console.log(error);
    }
  }

  try {
    const boardsUpdated = await knex<Board>("board")
      .where({ id: boardId })
      .update("title", title)
      .update("thumbnail", filename)
      .update("updated_at", String(Date.now()));

    if (!boardsUpdated) {
      return res.status(404).send("Could not find board to update");
    }

    const updatedBoard = await boardModel.getOneBoard(boardId);
    res.json(updatedBoard);
  } catch (error) {
    res.status(500).send(error);
  }
};

const savePins = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const { newPins } = req.body;
  if (newPins.length === 0) {
    return res.send("no pins to update");
  }

  try {
    const oldPins = await knex("pin").where({ board_id: boardId });
    const oldImgPinIds = getImageIds(oldPins, true);
    const newImgPinsId = getImageIds(newPins, false).map((imgObj) => imgObj.id);

    oldImgPinIds.forEach((imgObj) => {
      if (!newImgPinsId.includes(imgObj.id)) {
        try {
          fs.unlinkSync(
            path.resolve(
              __dirname,
              `../../../public/uploads/${imgObj.filename}`
            )
          );
        } catch (error) {
          console.log(error);
        }
      }
    });

    await knex("pin").where({ board_id: boardId }).del();

    const insertedPins = await knex("pin").insert(newPins);

    res.json(insertedPins);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteBoard = async (
  req: Request<{ boardId: string }>,
  res: Response
) => {
  const { boardId } = req.params;
  try {
    const board = await knex("board").where({ id: boardId }).first();
    if (!board) {
      return res.status(404).send("cant find board");
    }
    const thumbnail = board.thumbnail;
    if (thumbnail !== "default.png") {
      try {
        fs.unlinkSync(
          path.resolve(__dirname, `../../../public/thumbnails/${thumbnail}`)
        );
      } catch (error) {
        console.log(error);
      }
    }

    const oldPins = await knex("pin").where({ board_id: boardId });
    const oldImgPinIds = getImageIds(oldPins, true);
    oldImgPinIds.forEach((imgObj) => {
      try {
        fs.unlinkSync(
          path.resolve(__dirname, `../../../public/uploads/${imgObj.filename}`)
        );
      } catch (error) {
        console.log(error);
      }
    });

    await knex("board").where({ id: boardId }).first().del();

    res.status(204).send("delete successful");
  } catch (error) {
    res.status(500).send(error);
  }
};

const publishBoard = async (
  req: Request<{ boardId: string }>,
  res: Response
) => {
  const { boardId } = req.params;
  try {
    const boardUpdated = await knex<Board>("board")
      .where({ id: boardId })
      .first()
      .update({
        is_public: knex.raw("NOT ??", ["is_public"]),
      })
      .returning("is_public");

    if (!boardUpdated) {
      return res.status(404).send("cant find board");
    }

    res.send(boardUpdated);
  } catch (error) {
    res.status(500).send(error);
  }
};
const boardController = {
  getPins,
  getBoardDetails,
  getPublicBoards,
  newBoard,
  saveBoard,
  savePins,
  deleteBoard,
  publishBoard,
};

export default boardController;
