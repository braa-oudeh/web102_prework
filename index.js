/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length;  i++)
    {
        // create a new div element, which will become the game card
        let new_div = document.createElement("div")
        // add the class game-card to the list
        new_div.classList.add("game-card")
        const display = ` 
            <img class = "game-img" src = ${games[i].img} />
            <p> Name :  ${games[i].name} </p>
            <p> Description: ${games[i].description} </p>
            <p> Raised : ${games[i].pledged}</p>
            <p> Goal : ${games[i].goal}</p>
            <p> Backers: ${games[i].backers} </p>
        `;
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        new_div.innerHTML = display
        // append the game to the games-container
        gamesContainer.append(new_div)
    }
}

// call the function we just defined using the correct variable
const gamesToPlay = addGamesToPage(GAMES_JSON)
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const total = GAMES_JSON.reduce((acc, games) => {
  return acc + games.backers;
}, 0);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
let formatted_total = total.toLocaleString('en-US');
contributionsCard.innerHTML = formatted_total

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const raisedTotal = GAMES_JSON.reduce((acc, games) => {
  return acc + games.pledged;
}, 0);

// set inner HTML using template literal
let raisedTotalFormated = raisedTotal.toLocaleString('en-US');
raisedCard.innerHTML = `$${raisedTotalFormated}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const cardSum = GAMES_JSON.reduce((acc, games) => {
  return acc + 1;
}, 0);

let cardSumFormatted = cardSum.toLocaleString('en-US');
gamesCard.innerHTML = cardSumFormatted
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unFundedGames = GAMES_JSON.filter( (games) => {
            return games.pledged <= games.goal
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unFundedGames);
}

// filterUnfundedOnly()

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal

        let fundedGames = GAMES_JSON.filter( (games) => {
            return games.pledged > games.goal
    });
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// filterFundedOnly()

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)
}
showAllGames()
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click',filterUnfundedOnly)
fundedBtn.addEventListener('click',filterFundedOnly)
allBtn.addEventListener('click',showAllGames)


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const totalNumOfUnfundedGames = GAMES_JSON.filter( (game) => {
            return game.pledged <= game.goal
    }).length;

// create a string that explains the number of unfunded games using the ternary operator

const display = `A total of ${raisedTotalFormated} has been raised for ${cardSumFormatted} 
                games. Currently, ${totalNumOfUnfundedGames} ${totalNumOfUnfundedGames == 1 ? "game" : "games"} 
                ${totalNumOfUnfundedGames == 1 ? "remains" : "remain"} unfunded. We need your help to fund
                these amazing games!`;
// create a new DOM element containing the template string and append it to the description container
let displayText = document.createElement("p")
displayText.innerHTML = display;
descriptionContainer.append(displayText);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [firstGame,secondGame] = sortedGames;
console.log(`First game is: ${firstGame.name}, Second game is: ${secondGame.name}`);

// create a new element to hold the name of the top pledge game, then append it to the correct element
let displayTopGame = document.createElement("h4")
displayTopGame.innerHTML = firstGame.name
firstGameContainer.append(displayTopGame)
// do the same for the runner up item
let displayRunnerGame = document.createElement("h4")
displayRunnerGame.innerHTML = secondGame.name
secondGameContainer.append(displayRunnerGame)


// Customaization


// Adding a search bar to lookup games via their name
const searchBarId = document.getElementById("search");

searchBarId.addEventListener("input", (e) => {
    const searchVal = e.target.value.toLowerCase();
    deleteChildElements(gamesContainer);
    // if lookup is not empty, show all searched games
    if (searchVal.length != 0) {
        const searchedGames = GAMES_JSON.filter(game =>
        game.name.toLowerCase().includes(searchVal)
    );
    addGamesToPage(searchedGames);
    return;
    }
    // else, show all games
    showAllGames();
});

//Adding a link that scrolls to the games section

function showGamesOnClick() {
    deleteChildElements(gamesContainer);
    showAllGames()
    gamesContainer.scrollIntoView({behavior: "smooth"});
}
const showGamesSection = document.getElementById("show-games-navbar");
showGamesSection.addEventListener('click',showGamesOnClick);
