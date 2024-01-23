require("dotenv").config();
const axios = require("axios");
const dictUrl = process.env.DICT_URL;

const getDef = async (req, res) => {
  try {
    const { word } = req.params;
    const { data } = await axios.get(dictUrl + word);
    const meaningsArray = data[0].meanings;
    const defArray = meaningsArray.map((obj) => {
      const { partOfSpeech, definitions } = obj;
      const filteredDef = definitions.map((obj) => obj.definition);
      return { partOfSpeech, definitions: filteredDef.slice(0, 3) };
    });
    res.json(defArray);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getSynonym = async (req, res) => {
  try {
    const { word } = req.params;
    const { data } = await axios.get(dictUrl + word);
    const meaningsArray = data[0].meanings;
    const synonymArray = meaningsArray
      .map((obj) => obj.synonyms)
      .flat()
      .slice(0, 11);
    res.json(synonymArray);
  } catch (err) {
    res.status(400).send(err);
  }
};
const getAntonym = async (req, res) => {
  try {
    const { word } = req.params;
    const { data } = await axios.get(dictUrl + word);
    const meaningsArray = data[0].meanings;
    const antonymArray = meaningsArray
      .map((obj) => obj.antonyms)
      .flat()
      .slice(0, 11);
    res.json(antonymArray);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  getDef,
  getSynonym,
  getAntonym,
};
