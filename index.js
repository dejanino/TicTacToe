let main = function (){

    var columns = document.getElementsByTagName('td');//promenljiva koja sadrzi sva polja matrice
    console.log(columns);
    let playerTurn = document.querySelector('.player-turn');//promenljiva koja ukazuje na redosled igraca
    var button = document.querySelector('.reset-button');//dugme za reset
    
    let currentPlayer = 0; // promenljiva koja ukazuje na trenutnog igraca
    let playerId;//promenljiva koja ukazuje na Id igraca
    let winner = false ;//promenljiva koja ukazuje na pobednika
    let drawResult = false;
    let playerMoves = [];//promenljiva koja ukazuje na korake igraca
    let player1Points = 0;//poeni igraca 1
    let player2Points = 0;//poeni igraca 2
    let winnerCombination = [];//promenljiva koja ukazuje na pobednicku kombinaciju
    
    //pocetne vrednosti svih polja
    let beginningStatus = [
        "", "", "",
        "", "", "",
        "", "", ""
    ]
    //pobednicke kombinacije
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
   
       
    var beginningOfThePlay = function (event){ //koristim event koji se izbacuje nakon klika na odgovaracuje polje
                
        //prvi igrac
        if(currentPlayer === 0)
        {
            playerMoves = playersActions('X','X','X',1,"It is O's turn");            
        }
        //drugi igrac
        else
        {
            playerMoves = playersActions('O','O','O',0,"It is X's turn")
        }

         checkResult(beginningStatus);
         
        
    }

     //za svako polje iz tabele prikacujemo click event
     for(var i=0; i < columns.length; i++){
        columns[i].addEventListener('click',beginningOfThePlay);
        }
       

    
    let playersActions = function (elementText,text,id,number,string){

        let element = event.toElement;//promenljiva koja ukazuje na polje koje je igrac kliknuo
        element.textContent = elementText;//unismo X ili O u polje koje je igrac izabrao
        beginningStatus[element.id] = text;//stavljamo X ili O na odgovarajucu poziciju u indeksu
        console.log(beginningStatus);
        element.removeEventListener('click',beginningOfThePlay);//za izbrano polje skidamo click event
        playerId = id;//odredjujemo koji igrac je igrao
        currentPlayer = number;           //omogucavamo da na red dodje drugi igrac
        playerTurn.textContent = string; //oznacavamo koji igrac je na redu       
        
       
        return beginningStatus;// f-ja vraca niz sa odgovarajucim X ili O u nizu

    }

    
    
    let checkResult = function (beginningStatus){
        drawResult = !beginningStatus.includes('');
        
        //proveravamo da li u winning combination imamo podatke za X ili O
        for(var i=0; i < winningCombinations.length; i++){
             winnerCombination = winningCombinations[i];

            let firstField = beginningStatus[winnerCombination[0]];
            let secondField = beginningStatus[winnerCombination[1]];
            let thirdFiled = beginningStatus[winnerCombination[2]];
            //uslov za pobedu
            if (firstField !== '' && firstField === secondField  && secondField === thirdFiled ){
                winner = true;
                removeEventListener();
                break;
            }else {
                continue;
            }
        }

        if (winner){
            if (playerId === 'X'){
                winningDisplay("Player X has won",winnerCombination);
                player1Points +=2;
                document.querySelector('#player1').textContent = player1Points;
                
                return;
                
            }else {
                winningDisplay("Player O has won",winnerCombination);
                player2Points +=2;
                document.querySelector('#player2').textContent = player2Points;

                return;
                
            }

        } 

        if(drawResult){
            playerTurn.textContent = 'The match is a draw';
            player1Points +=1;
            document.querySelector('#player1').textContent = player1Points;
            player2Points +=1;
            document.querySelector('#player2').textContent = player2Points;
            return;
        }



        
    }

    //f-ja kojom resetujemo sve vrednosti polja na pocetne
   let reset = function (){
    
    for(var i=0; i < columns.length; i++){
        columns[i].textContent = '';
    }

    if (playerId === 'X'){

        for(let i=0; i<winnerCombination.length;i++){
            let index = winnerCombination[i];
            let winningColumn = document.getElementById(index);
            winningColumn.classList.remove('winning-class');
        }
        playerTurn.textContent = "It is O's turn";
        currentPlayer = 1;
    }else {

        for(let i=0; i<winnerCombination.length;i++){
            let index = winnerCombination[i];
            let winningColumn = document.getElementById(index);
            winningColumn.classList.remove('winning-class');
        }
        playerTurn.textContent = "It is X's turn";
        currentPlayer = 0;
    }

    beginningStatus = ['','','','','','','','',''];
    winnerCombination = [];
    playerMoves = [];
    winner = false;
    drawResult = false;

    //vracam event listener
    for(var i=0; i < columns.length; i++){
        columns[i].addEventListener('click',beginningOfThePlay);
        }
    

   };

   //f-ja za prikaz informacija o pobedniku
    let winningDisplay = function (string,playerIdMoves){
        playerTurn.textContent = string;
                for(let i=0; i<playerIdMoves.length;i++){
                    let index = playerIdMoves[i];
                    let winningColumn = document.getElementById(index);
                    winningColumn.classList.add('winning-class');
                }
    }

    //f-ja za brisanje event listenera sa polja
    let removeEventListener = function (){
        if(winner){
            for(var i=0; i < columns.length; i++){
                columns[i].removeEventListener('click', beginningOfThePlay);
            }
        }
    }
    
    button.addEventListener('click', reset);
}

main();