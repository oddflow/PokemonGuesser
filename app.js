

// Guess Counter
let guess_count = 1;

// Random Number Generator
function randomNum(max){
    let ran = Math.floor(Math.random() * max);
    return ran;
}
let ran_num = randomNum(151);




// Get Elements
const guessCounterID = document.getElementById("guess-counter"); // Get guess counter element
const submitButton = document.getElementById("submit"); //Get Submit button element
const result = document.getElementById("result");
const resultText = document.getElementById("result-text"); // Get Result Element
const guess = document.getElementById("guess"); // Get guess input box
const resultSprite = document.getElementById("result-sprite"); // Store spite div

const matches = document.getElementById("matches"); // Store Matches div
const guessedSpriteDiv = document.getElementById("guessed-sprite");
const guessedNameSpan = document.getElementById("guessedName");
const matchType = document.getElementById("match-type");// Store Match Type Divs
const matchDex = document.getElementById("match-dex");// Store Match Dex Divs
const playAgain = document.getElementById("play-again");

// Function to get user guess pokemon

let guessedPokemonName = "";
let guessedType = "";
let guessedDex = "";
let guessedSprite  = "";

async function userGuess(){

    // Get Value of user input
    let guessVal = document.getElementById("guess").value; 
    guessedPokemonName = guessVal;

    
    try{
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${guessVal.toLowerCase()}`);
        if(!response.ok){
            throw new Error('Network response was not ok ' + response.statusText);
        }

        console.log(`pokeguess is working and my guess is ${guessVal}`);
        const guessData = await response.json();

        console.log(guessedPokemonName);

        // Save Type
        guessedType = guessData.types[0].type.name;
        console.log(guessedType);

        // Save Dex Number
        guessedDex = guessData.id;
        console.log(guessedDex);

        // Save Sprite
        guessedSprite = guessData.sprites.front_default;
        console.log(guessedSprite)

    }
    catch(error){
        console.error("Pokeguess not working", error);
    }
}


let rand_pokemon = "";
let sprite = "";
let typeOne = "";
let dex = "";


// Function to fetch pokemon data
async function fetchPokeData() {
    const url = `https://pokeapi.co/api/v2/pokemon/${ran_num}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();

        console.log(data);

        // Store Random Pokemon Name
        rand_pokemon = data.name;
        console.log(rand_pokemon);


        // Get Pokemon Image
        sprite = data.sprites.front_default;


        // Store Type
        typeOne = data.types[0].type.name; // type 1
        //let typeTwo = data.types[1].type.name; // type 2
        console.log(typeOne);
        //console.log(typeTwo);

        // Store Dex Number of Rand Pokemon
        dex = data.id;
        console.log(dex);


    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);

    }


}

//Game Logic
function game(){
    // Print Guess Counter
    guessCounterID.innerHTML = "Guess " + guess_count + " " + "of 10"

    const green = "#358856";
    const yellow = "#ece75f";
    const grey = "#71797E";
    const black = "black";
    const white = "white";

    function dexCheck(){
        if(dex === guessedDex){
            matchDex.style.backgroundColor = green;
            matchDex.style.color = white;
            matchDex.innerHTML = "Dex # " + guessedDex;
        }
        else if(dex < 51 && guessedDex < 51){
            matchDex.style.backgroundColor = yellow;
            matchDex.style.color = black;
            matchDex.innerHTML = "Dex # " + guessedDex;
        }
        else if(dex >=51 && dex < 101 && guessedDex >=51 && guessedDex < 101){
            matchDex.style.backgroundColor = yellow;
            matchDex.style.color = black;
            matchDex.innerHTML = "Dex # " + guessedDex;
        }
        else if(dex >= 101 && guessedDex >= 101){
            matchDex.style.backgroundColor = yellow;
            matchDex.style.color = black;
            matchDex.innerHTML = "Dex # " + guessedDex;
        }
        else{
            matchDex.style.backgroundColor = grey;
            matchDex.style.color = white;
            matchDex.innerHTML = "Dex #" + guessedDex;
        }
    }

    function typeCheck(){
        if(guessedType === typeOne){
            console.log("the type matches")
            matchType.style.backgroundColor = green;
            matchType.innerHTML = typeOne;
        }
        else{
            matchType.style.backgroundColor = grey;
            matchType.innerHTML = guessedType;
        }
    }


    function resetValue(){
        document.getElementById("form1").reset();
    }

    // Check if guess is correct
    if(guessedPokemonName.toLowerCase() === rand_pokemon.toLowerCase()){
        resultText.innerHTML = "Correct!";
        resultText.style.fontSize = "50px";
        resultSprite.innerHTML = `<img src=${sprite}></img>`
        submitButton.style.display = "none";
        guess.style.display = "none";
        result.style.display = "flex";
        matches.style.visibility = "visible";
        guessedSpriteDiv.innerHTML = `<img src=${guessedSprite}></img>`
        guessedNameSpan.innerText = guessedPokemonName;
        playAgain.style.display = "flex";
        dexCheck();
        typeCheck();
    }
    else {
        resultText.innerHTML = "Guess Again!";
        guess_count = guess_count + 1;
        matches.style.visibility = "visible";
        guessedSpriteDiv.innerHTML = `<img src=${guessedSprite}></img>`
        guessedNameSpan.innerText = guessedPokemonName;
        resetValue();
        typeCheck();
        dexCheck();
    }



    // If guess is 10 game over and stop
    if(guess_count === 11){
        guess.style.display = "none";
        resultText.innerHTML = `Game Over!<br>It was ${rand_pokemon}, IDIOT!`;
        resultText.style.fontSize = "50px";
        result.style.display = "flex";
        resultSprite.innerHTML = `<img src=${sprite}></img>`
        submitButton.style.display = "none";
        playAgain.style.display = "flex";
    }
}




document.getElementById("form1").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way
    //const guess = document.getElementById("guess").value;
    await userGuess();
    await fetchPokeData();
    game();
});


fetchPokeData();