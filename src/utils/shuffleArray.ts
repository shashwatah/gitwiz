import { ProcessedData } from './../types/general.interfaces';

export const shuffleArray = (array: Array<ProcessedData>): Array<ProcessedData> => {
    let currentIndex: number = array.length, randomIndex: number;
    let temporaryValue: ProcessedData;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}