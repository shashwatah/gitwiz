export const shuffleArray = (array: Array<object>): Array<object> => {
    var currentIndex: number = array.length, randomIndex: number;
    var temporaryValue: object;

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