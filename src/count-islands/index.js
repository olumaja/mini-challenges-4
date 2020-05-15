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

 }

}
const grid = [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1];
countIslands(grid);
module.exports = countIslands;
