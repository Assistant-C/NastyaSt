let grid = document.querySelector("#grid");
let averagemoves = [];
let usermoves = 0;
let wins = 0;

//timershit
let averageTimeArray = []; 
let startTime; 
let totalTime = 0;
let timerInterval;
let gamestart = 0;
//timershit

for (const child of grid.children) {
  child.addEventListener("click", function() {
    let blank = document.querySelector(".blank");
    let siblings = [...child.parentElement.children];
    let currentIndex = siblings.indexOf(child);
    let blankIndex = siblings.indexOf(blank);
    let currentRow = Math.floor(currentIndex / 3); 
    let currentCol = currentIndex % 3;
    let blankRow = Math.floor(blankIndex / 3);
    let blankCol = blankIndex % 3;
   
    if (
      (Math.abs(currentRow - blankRow) === 1 && currentCol === blankCol) ||
      (Math.abs(currentCol - blankCol) === 1 && currentRow === blankRow)
    ) {
      [blank.innerHTML, child.innerHTML] = [child.innerHTML, blank.innerHTML];
      child.classList.add("blank");
      blank.classList.remove("blank");
      blank.classList.add(child.classList[1]);
      child.classList.remove(child.classList[1]);
      usermoves++;
      document.querySelector("span > m").innerHTML = usermoves;
      if (gamestart === 0) {
        gamestart = 1;
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000); 
      }
      if (document.querySelector(".b0 + .b1 + .b2 + .b3 + .b4+ .b5 + .b6 + .b7 + .blank")) {
        wins++;
        document.querySelector("span > w").innerHTML = wins;
        averagemoves.push(usermoves);
        averageTimeArray.push(totalTime); // Save time for this game in milliseconds
        let average = 0;
        for (let i = 0; i < averagemoves.length; i++) {
          average += averagemoves[i];
        }
        
        moveaverage = average / averagemoves.length;
        document.querySelector("span > am").innerHTML = moveaverage.toFixed(1);
        clearInterval(timerInterval); 
        calculateAverageTime();
        randomize();
        totalTime = 0; 
         gamestart = 0;
      }
    }
  });
}

function getRandomValidMove() {
  let blank = document.querySelector(".blank");
  let siblings = [...blank.parentElement.children];
  let blankIndex = siblings.indexOf(blank);
  
  let validIndices = [];
  const numRows = 3; 
  const numCols = 3;

  // Check if the left neighbor is valid
  if (blankIndex % numCols !== 0) {
    validIndices.push(blankIndex - 1);
  }

  // Check if the right neighbor is valid
  if (blankIndex % numCols !== numCols - 1) {
    validIndices.push(blankIndex + 1);
  }

  // Check if the top neighbor is valid
  if (blankIndex >= numCols) {
    validIndices.push(blankIndex - numCols);
  }

  // Check if the bottom neighbor is valid
  if (blankIndex < (numRows - 1) * numCols) {
    validIndices.push(blankIndex + numCols);
  }

  let randomIndex = validIndices[Math.floor(Math.random() * validIndices.length)];

  return siblings[randomIndex];
}

let moves = 100;

function randomize() {
  usermoves = 0;
  document.querySelector("span > m").innerHTML = usermoves;
  document.querySelector("span > t").innerHTML = "0:00"; 
  clearInterval(timerInterval); 
  startTime = null; 
  
  for (let i = 0; i < moves; i++) {
    let randomMove = getRandomValidMove();

    if (randomMove === null) {
      console.log("No valid moves left.");
      break; 
    }

    let blank = document.querySelector(".blank");
    if (randomMove) {
      [blank.innerHTML, randomMove.innerHTML] = [randomMove.innerHTML, blank.innerHTML];
      randomMove.classList.add("blank");
      blank.classList.remove("blank");

      if (randomMove.classList[1]) {
        blank.classList.add(randomMove.classList[1]);
      }

      randomMove.classList.remove(randomMove.classList[1]);
    } else {
      console.log('Invalid randomMove');
    }
  }
}

randomize();

function updateTimer() {
  if (startTime) {
 
    const currentTime = Date.now();
    totalTime = currentTime - startTime; 
    const elapsedMilliseconds = totalTime;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;

    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    document.querySelector("span > t").innerHTML = formattedTime;
  }
}

function calculateAverageTime() {
    const sumTime = averageTimeArray.reduce((acc, time) => acc + time, 0);
    const averageMilliseconds = sumTime / averageTimeArray.length;
    const averageSeconds = Math.floor(averageMilliseconds / 1000);

    const averageMinutes = Math.floor(averageSeconds / 60);
    const averageSecondsDisplay = Math.floor(averageSeconds % 60);

    const formattedAverageTime = `${averageMinutes}:${averageSecondsDisplay < 10 ? '0' : ''}${averageSecondsDisplay}`;

    document.querySelector("span > at").innerHTML = formattedAverageTime;

}
