function wordSearch(words, word) {

  let visitedArray = [];
  let queueArray = [];
  let adjacentLetters;
  let correctLetters;

  for(let i = 0; i < word.length - 1; i++){

    for(let j = 0; j < words.length; j++){
      for(let k = 0; k < words[j].length; k++){
        if(words[j][k] === word[i] && visitedArray.length === 0){
          visitedArray.push([j, k]);
          adjacentLetters = adjacent(words.length - 1, words[i].length - 1, [j, k]);
          //console.log(adjacentLetters);
          correctLetters = searchLetter(adjacentLetters, word[i + 1]);
          visitedArray.push(...correctLetters);
          queueArray.push(...correctLetters);
        }

      }
    }

  }

  console.log(visitedArray);

  function adjacent(rowSize, columnSize, cordinate){

    const [row, column] = cordinate;
    const topAdjacent = row === 0 ? false : [row - 1, column];
    const leftAdjacent = column === 0 ? false : [row, column - 1];
    const rightAdjacent = column === columnSize ? false : [row, column + 1];
    const bottomAdjacent = row === rowSize ? false : [row + 1, column];
    return [topAdjacent, leftAdjacent, rightAdjacent, bottomAdjacent].filter(Boolean);

  }

  function searchLetter(lettersAdjacent, letter){
    return lettersAdjacent.filter(item => {
      const [row, col] = item;
      return words[row][col] === letter;
    })
  }

}

const words = [
  ["C", "D", "Y", "C", "X"],
  ["A", "N", "Y", "Z", "X"],
  ["T", "F", "Z", "A", "T"],
  ["M", "D", "B", "U", "T"],
];

wordSearch(words, "CAT");

module.exports = wordSearch;
