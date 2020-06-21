"use strict";

function countIslands(grid) {

  //Breadth First search algorithm method was used to solve this challenge (Graph theory).

  let islandCount = 0;
  let islandStatus = false;
  let queueArray = [];
  let visitedArray = [];
  let outputArray = [];

  for(let i = 0; i < grid.length; i++){
    if(grid[i].some(x => x !== 0)){
      islandStatus = true;
      break;
    }
    else{
      return islandCount;
    }
  }

  if(islandStatus){

    for(let a = 0; a < grid.length; a++){

      for(let b = 0; b < grid[a].length; b++){

        if(visitedArray.length === 0){
          let adjacentArray;
          let nonzeroAdjacentArray;
          adjacentArray = adjacent(grid.length - 1, grid[a].length - 1, [0, 0]);
          visitedArray.push([0, 0]);
          outputArray.push([0, 0]);

          nonzeroAdjacentArray = nonzeroAdjacent(adjacentArray);

          visitedArray.push(...nonzeroAdjacentArray);
          outputArray.push(...nonzeroAdjacentArray);
          queueArray.push(...nonzeroAdjacentArray);

          removeFirstQueueItem(grid.length - 1, grid[a].length - 1);
          islandCount++;

        }
        else{

          let newRowColumn = false;

              let [currentRow, currentColumn] = [a, b];

              for(let c = 0; c < visitedArray.length; c++){

                let [rowVisit, columnVisit] = visitedArray[c];
                if(currentRow === rowVisit && currentColumn === columnVisit){
                  newRowColumn = false;
                  break;
                }
                else if(currentRow !== rowVisit || currentColumn !== columnVisit){
                  newRowColumn = true;
                }

              }

              if(newRowColumn && grid[currentRow][currentColumn] !== 0 ){

                visitedArray.push([currentRow, currentColumn]);
                outputArray.push([currentRow, currentColumn]);
                queueArray.push([currentRow, currentColumn]);

                removeFirstQueueItem(grid.length - 1, grid[a].length - 1);
                islandCount++;

              }

        }

      }

    }
    return islandCount;

  }


  function adjacent(sizeRow, sizeCol, coordinate){

    const [row, column] = coordinate;
    const topAdjacent = row === 0 ? false : [row - 1, column];
    const rightAdjacent = column === sizeCol ? false : [row, column + 1];
    const bottomAdjacent = row === sizeRow ? false : [row + 1, column];
    const leftAdjacent = column === 0 ? false :  [row, column - 1];

    return [topAdjacent, rightAdjacent, bottomAdjacent, leftAdjacent].filter(Boolean)

  }

  function nonzeroAdjacent(adjacentArray){

    return adjacentArray.filter(x =>{
      const [row, col] = x;
      return grid[row][col] !== 0;
    });

  }

  function notVisited(nonzero, visitedArray){

    let status = false;
    for(let i = 0; i < nonzero.length; i++){

      let [adjacentRow, adjacentColumn] = nonzero[i];
      for(let j = 0; j < visitedArray.length; j++){
        let [visitedRow, visitedColumn] = visitedArray[j];
        if(visitedRow === adjacentRow && visitedColumn === adjacentColumn){
          status = false;
          break;
        }
        else if(visitedRow !== adjacentRow || visitedColumn !== adjacentColumn){status = true;}

      }

      if(status){
        visitedArray.push([adjacentRow, adjacentColumn]);
        outputArray.push([adjacentRow, adjacentColumn]);
        queueArray.push([adjacentRow, adjacentColumn]);
      }

    }

  }

  function removeFirstQueueItem(rowLength, columnLength){

    do{
      let arrayAdjacent = adjacent(rowLength, columnLength, queueArray[0]);
      let arrayNonzeroAdjacent = nonzeroAdjacent(arrayAdjacent);
      queueArray.shift();

      notVisited(arrayNonzeroAdjacent, visitedArray);

   }while(queueArray.length !== 0);

  }

}

module.exports = countIslands;
