import dotenv from "dotenv";
import axios from "axios";
import { Request, Response } from "express";
import { Definition, Rhyme } from "../types/words";
dotenv.config();
const dictUrl = process.env.DICT_URL;
const rhymeUrl = process.env.RHYME_URL;

const getDef = async (req: Request, res: Response) => {
  try {
    const { word } = req.params;
    const { data } = await axios.get<Definition[]>(dictUrl + word);
    const meaningsArray = data[0].meanings;
    const defArray = meaningsArray.map((obj) => {
      const { partOfSpeech, definitions } = obj;
      const filteredDef = definitions.map((obj) => obj.definition);
      return { partOfSpeech, definitions: filteredDef.slice(0, 3) };
    });
    res.json(defArray);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getSynonym = async (req: Request, res: Response) => {
  try {
    const { word } = req.params;
    const { data } = await axios.get<Definition[]>(dictUrl + word);
    const meaningsArray = data[0].meanings;
    const synonymArray = meaningsArray
      .map((obj) => obj.synonyms)
      .flat()
      .slice(0, 11);
    res.json(synonymArray);
  } catch (err) {
    res.status(500).send(err);
  }
};
const getAntonym = async (req: Request, res: Response) => {
  try {
    const { word } = req.params;
    const { data } = await axios.get<Definition[]>(dictUrl + word);
    const meaningsArray = data[0].meanings;
    const antonymArray = meaningsArray
      .map((obj) => obj.antonyms)
      .flat()
      .slice(0, 11);
    res.json(antonymArray);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getRhyme = async (req: Request, res: Response) => {
  try {
    const { word } = req.params;
    const { data } = await axios.get<Rhyme[]>(rhymeUrl + word);
    const commonRhymes = data
      .sort((a, b) => b.freq - a.freq)
      .map((wordObj) => wordObj.word)
      .slice(0, 16);
    res.json(commonRhymes);
  } catch (err) {
    res.status(500).send(err);
  }
};
const wordController = {
  getDef,
  getSynonym,
  getAntonym,
  getRhyme,
};

export default wordController;
