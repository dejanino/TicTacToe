const nesto = document.querySelectorAll('.one-field'); //sa svim elementima radim
let turnCheck;

const counterForX = document.querySelector('.left-score');
const counterForO = document.querySelector('.right-score');
const LocalStorageObject = {
    saveItem: function(number) {
        const objectToString = JSON.stringify(number);
        localStorage.setItem('left-score', objectToString);
    },
    saveItem2: function(number) {
        const objectToString2 = JSON.stringify(number);
        localStorage.setItem('right-score', objectToString2);
    },
    loadItem: function() {
        const listAsString = localStorage.getItem('left-score');
        const converted = JSON.parse(listAsString);
        return converted;
    },
    loadItem2: function() {
        const listAsString2 = localStorage.getItem('right-score');
        const converted = JSON.parse(listAsString2);
        return converted;
    }
};

currentScore = LocalStorageObject.loadItem();
currentScore2 = LocalStorageObject.loadItem2();

if(!currentScore){
    counterForO.textContent = 0;
    counterForX.textContent = 0;
}
else if (currentScore && !currentScore2){
counterForX.textContent = currentScore;
counterForO.textContent = 0;
}
else if (!currentScore && currentScore2){
    counterForX.textContent = 0;
    counterForO.textContent = currentScore2;
}
else {
    counterForX.textContent = currentScore;
    counterForO.textContent = currentScore2;
}

nesto.forEach(function(element) { // automatski ga pretvara u nodelist object
    element.addEventListener('click', function (){basicGameLogic(element)}, { once: true} );
  });

function basicGameLogic(e) {
    if (!turnCheck){
        let iks = document.createElement('a'); // NE MOZE VAN OVE NAPRAVITI ELEMENT FUNKCIJE INACE CE IH BRISATI SVAKIM KLIKOM
        iks.style.fontSize = "70px";
        iks.style.color = "black";
        iks.innerHTML = "<i class='fa'>&#xf00d;</i>";
        e.appendChild(iks);
        e.classList.add('x');
        turnCheck = !turnCheck;
        }
    else {
        let oks = document.createElement('a'); 
        oks.style.fontSize = "65px";
        oks.style.color = "black";
        oks.innerHTML = "<i class='fa'>&#xf1ce;</i>";
        e.appendChild(oks);
        e.classList.add('o');
        turnCheck = !turnCheck;
        }
    functionForWinnerCheck();
   
}
const winningCombination = [ // sve moguce kombinacije
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
];

function winner1() { //provera za x
return winningCombination.some(combination => {
    return combination.every(index => {
    return nesto[index].classList.contains('x')
    })
})
}
function winner2() { // provera za o
return winningCombination.some(combination1 => {
    return combination1.every(index1 => {
    return nesto[index1].classList.contains('o')
    })
})
}
function tigh() { // ako su sva polja ispunjena da bude nereseno
return [...nesto].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o')
    })
}

function functionForWinnerCheck(){
    if(winner1()){ //Provera ko je pobednik, ovde cu dodati kasnije brojace za elemente dole koji ce da upisuju score, kao i local storage
        //console.log('x wins');
        setTimeout(function() {
            alert("X wins");
        },0)
        currentScore = currentScore + 2;
        counterForX.textContent = currentScore;
        LocalStorageObject.saveItem(currentScore);
        reloadGame();
    }
    else if (winner2()){
        //console.log('o wins');
        setTimeout(function() {
            alert("O wins");
        },0)
        currentScore2 = currentScore2 + 2;
        counterForO.textContent = currentScore2;
        LocalStorageObject.saveItem2(currentScore2);
        reloadGame();
    }
    else if (tigh()){
        //console.log('TIGH')
        setTimeout(function() {
            alert('It\'s a tigh');
        },0)
        currentScore2 = currentScore2 + 1;
        currentScore = currentScore + 1;
        counterForX.textContent = currentScore;
        counterForO.textContent = currentScore2;
        LocalStorageObject.saveItem(currentScore);
        LocalStorageObject.saveItem2(currentScore2);
        reloadGame();
    }
}
function reloadGame (){
    location.reload(false);
}

let anchorReset = document.getElementById('reset'); // resetovanje table...jel moze ovako?
anchorReset.addEventListener('click', reloadGame)

let clearLocalStorage = document.querySelector('.clear-storage')
clearLocalStorage.addEventListener('click', function(){
    localStorage.clear();
    reloadGame();
})