// Pamtim i citam rezultat igraca player1
const LocalStorageObject = {
    saveList: function(list) {
        const objectToString = JSON.stringify(list);
        localStorage.setItem('player1', objectToString);
    },
    loadList: function() {
        const listAsString = localStorage.getItem('player1');
        const converted = JSON.parse(listAsString);
        return converted;
    }
};
//Eksportujemo rezultat za player1 iz LocalStorage
export { LocalStorageObject };

// Pamtim i citam rezultat igraca player2
const LocalStorageObjectSecond = {
    saveList: function(list) {
        const objectToString = JSON.stringify(list);
        localStorage.setItem('player2', objectToString);
    },
    loadList: function() {
        const listAsString = localStorage.getItem('player2');
        const converted = JSON.parse(listAsString);
        return converted;
    }
};
//Eksportujemo rezultat za player2 iz LocalStorageSecond
export { LocalStorageObjectSecond };