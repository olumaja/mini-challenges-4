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
  let nextLetter = 0;
  let temp = [];

  for(let i = 0; i < words.length; i++){
    maxWords = words[i].length;
    for(let j = 0; j < maxWords; j++){

      if(words[i][j] === word[0]){
        letterLocation.push([i, j]);
      }

    }
  }

  for(let k = 0; k < letterLocation.length; k++){

    spellWord.push(returnLetter(words, letterLocation[k]));
    queueArray.push(letterLocation[k]);
    visitedArray.push(letterLocation[k]);
    nextLetter++;
    adjacentLetters = adjacent(words.length - 1, maxWords - 1, queueArray[0]);
    correctLettersArray = searchLetter(adjacentLetters, word[nextLetter]);
    letterCorrect = notVisited(correctLettersArray, visitedArray);
    queueArray.push(...letterCorrect);
    queueArray.shift();
    nextLetter++;

    do{

      if(queueArray.length > 0){
        temp = queueArray[0];
        adjacentLetters = adjacent(words.length - 1, maxWords - 1, queueArray[0]);
        correctLettersArray = searchLetter(adjacentLetters, word[nextLetter]);
        letterCorrect = notVisited(correctLettersArray, visitedArray);
        queueArray.shift();
        queueArray.push(...letterCorrect);
      }

      if(letterCorrect.length > 0){
        spellWord.push(returnLetter(words, temp));
        nextLetter++;
      }

      if(queueArray.length === 0 && temp.length !== 0){
        spellWord.push(returnLetter(words, temp));
      }

    }while(queueArray.length > 0)

    if(spellWord.join('') === word){
      wordFound = true;
      console.log(spellWord);
      return wordFound;
    }
    else if(spellWord.join !== word){
      nextLetter = 0;
      spellWord = [];
      visitedArray = [];
      visitedArray.push(letterLocation[k+1]);
    }

  }

  console.log(wordFound);
  return wordFound;

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

module.exports = wordSearch;
