function wordSearch(words, word) {

  let visitedArray = [];
  let queueArray = [];
  let adjacentLetters;
  let correctLettersArray;
  let letterCorrect;
  let spellWord = [];
  let wordFound = false;
  let letterLocation = [];
  let maxWords = 0;

  for(let i = 0; i < words.length; i++){
    maxWords = words[i].length;
    for(let j = 0; j < maxWords; j++){

      if(words[i][j] === word[0]){

        letterLocation.push([i, j]);
        visitedArray.push([i, j]);

      }

    }
  }

  for(let k = 0; k < letterLocation.length; k++){

    spellWord.push(returnLetter(words, letterLocation[k])) ;

    adjacentLetters = adjacent(words.length - 1, maxWords - 1, letterLocation[k]);
    correctLettersArray = searchLetter(adjacentLetters, word[spellWord.length]);
    letterCorrect = notVisited(correctLettersArray, visitedArray);
    queueArray.push(...letterCorrect);

    spellWord.push(returnLetter(words, ...letterCorrect));

    while(spellWord.length < word.length){

      adjacentLetters = adjacent(words.length - 1, maxWords - 1, queueArray[0]);
      queueArray.shift();
      correctLettersArray = searchLetter(adjacentLetters, word[spellWord.length]);
      letterCorrect = notVisited(correctLettersArray, visitedArray);

       if(letterCorrect.length > 0){
         queueArray.push(...letterCorrect);
         spellWord.push(returnLetter(words, ...letterCorrect));
       }
       else{break}

    }

    console.log(spellWord);
    console.log(k);

      if(spellWord.join('') === word){
        wordFound = true
        console.log(wordFound);
        return
      }

  }

  console.log(wordFound);



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

  function returnLetter(words, correctLettersArray){
    let correctRow;
    let correctColumn;

        [correctRow, correctColumn] = correctLettersArray;
        return words[correctRow][correctColumn];


  }

  function notVisited(correctLetters, visitedArray){
    let found = false;
    let result = [];

    for(let i = 0; i < correctLetters.length; i++){

      let [letterRow, letterColumn] = correctLetters[i];

      for(let j = 0; j < visitedArray.length; j++){
        let [vistedRow, visitedColumn] = visitedArray[j]
        if(letterRow === vistedRow && letterColumn === visitedColumn){
          found = false;
          break;
        }
        else if(letterRow !== vistedRow || letterColumn !== visitedColumn){
          found = true;
        }
      }

       if(found){
        result.push([letterRow, letterColumn]);
        visitedArray.push([letterRow, letterColumn]);
       }
    }

    return result;

  }

}

const words = [
  ["P", "R", "A", "B", "C"],
  ["R", "N", "O", "O", "T"],
  ["E", "A", "I", "O", "O"],
  ["C", "I", "S", "E", "L"],
];

wordSearch(words, "PRECISELY");

module.exports = wordSearch;
