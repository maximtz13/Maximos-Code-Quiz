var tableEl = document.querySelector("#rowScores");
var nameSection = document.querySelector("#nameTable");
var scoreSection = document.querySelector("#scoreTable");
// var clearStorageButton = document.querySelector("#clear-storage");

// Fetches data from localStorage
function getLocalStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    while ( i-- ) {
        values.push( 
            {
              "name": JSON.parse(localStorage.getItem(keys[i])).initials,
              "score": JSON.parse(localStorage.getItem(keys[i])).timeLeft
            }
         );
    }
    return values;
}

// Adds data from localStorage into a row on the Highscores page. 
const listScores = function(myObject) {
    for (i = 0; i < myObject.length; i++) {
        var addScore = document.createElement("tr");
    addScore.className = "rowScores";
    nameSection.innerHTML += `${myObject[i].name} <br>`;
    scoreSection.innerHTML += `${myObject[i].score} <br>`;
    tableEl.appendChild(addScore);
    }
};

// clear data button clears the scores and initials from localstorage
var clearStorage = function() {
    localStorage.clear();
    location.reload();
    return false;
}

document.getElementById("clearStorage").addEventListener("click", clearStorage);

listScores(getLocalStorage());