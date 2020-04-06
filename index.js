// import { LocalStorageObject } from 'LocalStorageModule.js';
// import { LocalStorageObjectSecond } from 'LocalStorageModule.js';
 
window.addEventListener('load', app);

let gameBoard = ['', '', '', '', '', '', '', '', '']; 
let turn = 0; // Keeps track if X or O player's turn
let winner = false;
 
// CREATE PLAYER
const player = (name) => {
  name = name;
  return {name};
 };

 let playerX = player("");
 let playerY = player("");

 // INITIALIZE APP
function app() {
  let inputField = document.querySelector('.input-field').focus();

  const addPlayerForm = document.getElementById('player-form');
  addPlayerForm.addEventListener('submit', addPlayers);

  let replayButton = document.querySelector('.replay-btn');
  replayButton.addEventListener('click', resetBoard);
}

// Add PLAYERS
function addPlayers(event) {
  event.preventDefault();

  let list = LocalStorageObject.loadResult();

  if (this.player1.value === '' || this.player2.value === '') {
    alert('You Must Enter a Name for Each Field');
    return;
  }

  const playerFormContainer = document.querySelector('.enter-players');
  const boardMain = document.querySelector('.board__main');
  playerFormContainer.classList.add('hide-container');
  boardMain.classList.remove('hide-container');

  playerX.name = this.player1.value;
  playerY.name = this.player2.value;

  //pozovi funkciju za snimanje igraca 
  LocalStorageObject.savePlayers(playerX.name, playerY.name);

  buildBoard();

}


// RETURN CURRENT PLAYER
function currentPlayer() {
  return turn % 2 === 0 ? 'X' : 'O';
}

// Resize squares in event browser is resized
window.addEventListener("resize", onResize);
function onResize() {
  let allCells = document.querySelectorAll('.board__cell');
  let cellHeight = allCells[0].offsetWidth;
  
  allCells.forEach( cell => {
    cell.style.height = `${cellHeight}px`;
  });
}

// Build Board
function buildBoard() {
  let resetContainer = document.querySelector('.reset');
  resetContainer.classList.remove('reset--hidden');

  onResize();
  addCellClickListener();
  changeBoardHeaderNames();

  //pozovi funkciju koja ce da popuni tablu sa rezultatom
  LocalStorageObject.populateResultBoard();
}

// CELL CLICK EVENT FOR PLAYER TO ATTEMPT TO MAKE MOVE
function makeMove(event) {
  console.log(turn);
  
  let currentCell = parseInt(event.currentTarget.firstElementChild.dataset.id);
  let cellToAddToken = document.querySelector(`[data-id='${currentCell}']`);
  
  if (cellToAddToken.innerHTML !== '') {
    console.log('This cell is already taken.');
    return;
  } else {
    if (currentPlayer() === 'X') {
      cellToAddToken.textContent = currentPlayer();
      gameBoard[currentCell] = 'X';
    } else {
      cellToAddToken.textContent = currentPlayer();
      gameBoard[currentCell] = 'O';
    }
  }




  // CHECK IF WE HAVE A WINNER
  isWinner();
    
  // Update turn count so next player can choose
  turn ++;

  // CHANGE BOARD HEADER INFO
  changeBoardHeaderNames();
}

function checkIfTie() {
  if (turn > 7) {
    alert('game over a tie')
  }
}

function isWinner() {
  const winningSequences = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  winningSequences.forEach( winningCombos => {
    let cell1 = winningCombos[0];
    let cell2 = winningCombos[1];
    let cell3 = winningCombos[2];
    if (
      gameBoard[cell1] === currentPlayer() &&
      gameBoard[cell2] === currentPlayer() &&
      gameBoard[cell3] === currentPlayer()
    ) {

      
      const cells = document.querySelectorAll('.board__cell');
      let letterId1 = document.querySelector(`[data-id='${cell1}']`);
      let letterId2 = document.querySelector(`[data-id='${cell2}']`);
      let letterId3 = document.querySelector(`[data-id='${cell3}']`);
      
      cells.forEach( cell => {
        let cellId = cell.firstElementChild.dataset.id;	

        if (cellId == cell1 || cellId == cell2 || cellId == cell3 ) {
          cell.classList.add('board__cell--winner');
        }
      });

      let currentPlayerText = document.querySelector('.board___player-turn');
      if (currentPlayer() === 'X') {
        currentPlayerText.innerHTML = `
          <div class="congratulations">Congratulations ${playerX.name}</div>
          <div class="u-r-winner">You are our winner!</div>
        `;
        winner = true;

        //ove zovemo funkciju koja ce da sacuva rezultat u local storage
        // saljemo joj parametar/index za playerX, a to je 0
        LocalStorageObject.saveResult(0)
        
        removeCellClickListener();
      } else {
        currentPlayerText.innerHTML = `
          <div class="congratulations">Congratulations ${playerY.name}</div>
          <div class="u-r-winner">You are our winner!</div>
        `;
        winner = true;

        //ove zovemo funkciju koja ce da sacuva rezultat u local storage
        // saljemo joj parametar/index za playerY, a to je 1
        LocalStorageObject.saveResult(1)
        
        removeCellClickListener();
      }
      // ucitavamo trenutni rezultat
      LocalStorageObject.populateResultBoard();
    }
  });

  if (!winner) {
    checkIfTie();
  }
  
  return false;
}

function changeBoardHeaderNames() {
  if (!winner) {
    let currentPlayerText = document.querySelector('.board___player-turn');
    if (currentPlayer() === 'X') {
      currentPlayerText.innerHTML = `
        <span class="name--style">${playerX.name}</span>, you are up!
        <div class="u-r-winner"></div>
      `
    }  else {
      currentPlayerText.innerHTML = `
        <span class="name--style">${playerY.name}</span>, you are up.
        <div class="u-r-winner"></div>
      `
    }
  }
}

function resetBoard() {
  console.log('resetting');
  
  gameBoard = ['', '', '', '', '', '', '', '', '']; 
  
  let cellToAddToken = document.querySelectorAll('.letter');
  cellToAddToken.forEach( square => {
    square.textContent = '';
    square.parentElement.classList.remove('board__cell--winner');
  });

  turn = 0;
  winner = false;

  let currentPlayerText = document.querySelector('.board___player-turn');
  currentPlayerText.innerHTML = `
    <span class="name--style">${playerX.name}</span>, you are up!
    <div class="u-r-winner"></div>
  `

  addCellClickListener();
}

function addCellClickListener() {
  const cells = document.querySelectorAll('.board__cell');
  cells.forEach( cell => {
    cell.addEventListener('click', makeMove);
  });
}

function removeCellClickListener() {
  let allCells = document.querySelectorAll('.board__cell');
  allCells.forEach( cell => {
    cell.removeEventListener('click', makeMove);
  });
}

const LocalStorageObject = {
  // ovde cuvamo imena igraca i stavljamo im po 0 poena za pocetak
  savePlayers: function(playerX, playerY) {
    const list = [
      {
        name: playerX,
        points: 0
      },
      {
        name: playerY,
        points: 0
      }
    ]
    const objectToString = JSON.stringify(list);
    localStorage.setItem('list', objectToString);
  },
  saveResult: function(index) {
    // prvo ucitamo postojecu listu
    let list = this.loadResult();

    //nadjemo odgovarajuceg takmicara koji je pobedio preko indeksa
    // i povecamo mu broj pobeda za 1
    list[index].points += 1

    //pa onda to novo stanje snimimo
    const objectToString = JSON.stringify(list);
    localStorage.setItem('list', objectToString);
  },
  loadResult: function() {
      const listAsString = localStorage.getItem('list');
      const converted = JSON.parse(listAsString);
      return converted;
  },
  populateResultBoard: function() {
    let list = this.loadResult();
    
    let playerXname = document.getElementById("playerXname");
    let playerXpoints = document.getElementById("playerXpoints");
    let playerYname = document.getElementById("playerYname");
    let playerYpoints = document.getElementById("playerYpoints");

    playerXname.innerText = list[0].name;
    playerXpoints.innerText = list[0].points;
    playerYname.innerText = list[1].name;
    playerYpoints.innerText = list[1].points;
  }
}