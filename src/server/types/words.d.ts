export interface Definition {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  license: License;
  sourceUrls: string[];
}

export interface License {
  name: string;
  url: string;
}

export interface Meaning {
  partOfSpeech: string;
  definitions: DefinitionElement[];
  synonyms: any[];
  antonyms: any[];
}

export interface DefinitionElement {
  definition: string;
  synonyms: any[];
  antonyms: any[];
  example?: string;
}

export interface Phonetic {
  text: string;
  audio: string;
  sourceUrl: string;
  license: License;
}

export interface Rhyme {
  word: string;
  freq: number;
  score: number;
  flags: Flags;
  syllables: string;
}

export enum Flags {
  B = "b",
  Bc = "bc",
  C = "c",
  Empty = "",
}
