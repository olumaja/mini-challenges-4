"use strict";

function countIslands(grid) {

  let islandCount = 0;

  if(!grid.some(val => Array.isArray(val))){
    if(grid.includes(1)){
      islandCount = 1;
      for(let i = 0; i < grid.length; i++){
        if(grid[i] === 0 && grid.indexOf(grid[i]) > 0 && grid.indexOf(grid[i]) < grid.length - 1){
          islandCount += 1
        }
      }

    }
    console.log(islandCount);
 }
 else{

  // if(grid.some(x => x.includes(1))){

  //   for(let i = 0; i < grid.length; i++){
  //     for(let j = 0; j < grid[i].length; j++){

  //       if(i === 0 && j < grid[i].length - 1 && grid[i][j] === 1 && grid[i][j + 1] === 0 && grid[i + 1][j] === 0){islandCount++;}
  //       else if(i === 0 && grid[i][j] === 1 && grid[i][j - 1] === 0 && grid[i + 1][j] === 0){islandCount++;}
  //       else if(i > 0 && i < grid.length - 1 && j < grid[i].length - 1 && grid[i][j] === 1 && grid[i - 1][j] === 0 && grid[i][j + 1] === 0 && grid[i + 1][j] === 0){islandCount++;}
  //       else if(i > 0 && i < grid.length - 1 && grid[i][j] === 1 && grid[i - 1][j] === 0 && grid[i][j - 1] === 0 && grid[i + 1][j] === 0){islandCount++;}
  //       else if(i > 0 && j < grid[i].length - 1 && grid[i][j] === 1 && grid[i - 1][j] === 0 && grid[i][j + 1] === 0){islandCount++;}
  //       else if(i > 0 && grid[i][j] === 1 && grid[i - 1][j] === 0 && grid[i][j - 1] === 0){islandCount++}

  //     }
  //   }

  // }

  console.log(islandCount)

 }

}
const grid = [
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1],
];
countIslands(grid);
module.exports = countIslands;
