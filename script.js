const nesto = document.querySelectorAll('.one-field');
let kontrolaZaPotez

nesto.forEach(function(element) {
    element.addEventListener('click', function (){
    if (!kontrolaZaPotez){
        let iks = document.createElement('a'); // NE MOZE VAN OVE NAPRAVITI ELEMENT FUNKCIJE INACE CE IH BRISATI SVAKIM KLIKOM
        iks.style.fontSize = "70px";
        iks.style.color = "black";
        iks.innerHTML = "<i class='fa'>&#xf00d;</i>";
        element.appendChild(iks);
        element.classList.add('x');
        kontrolaZaPotez = !kontrolaZaPotez;
        }
    else {
        let oks = document.createElement('a'); 
        oks.style.fontSize = "65px";
        oks.style.color = "black";
        oks.innerHTML = "<i class='fa'>&#xf1ce;</i>";
        element.appendChild(oks);
        element.classList.add('o');
        kontrolaZaPotez = !kontrolaZaPotez;
        }
    
    if(winner1()){
        console.log('x wins');
        alert('X wins');
    }
    else if (winner2()){
        console.log('o wins');
        alert('O wins');
    }
    else if (tigh()){
        console.log('TIGH')
        alert('It\'s a tigh');
    }
    }, { once: true} );
  });

const provera = document.getElementsByClassName('eks')
const winningCombination = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
];

function winner1() {
return winningCombination.some(combination => {
    return combination.every(index => {
    return nesto[index].classList.contains('x')
    })
})
}
function winner2() {
return winningCombination.some(combination1 => {
    return combination1.every(index1 => {
    return nesto[index1].classList.contains('o')
    })
})
}
function tigh() {
return [...nesto].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o')
    })
}
let anchorReset = document.getElementById('reset');
anchorReset.addEventListener('click', function(){
window.location.reload(false);
})

