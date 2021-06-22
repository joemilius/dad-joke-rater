let dadShoes = document.querySelectorAll('.dad-shoe')
const dadJokes = document.getElementById('rendered-joke')
const favoriteJokes = document.getElementById('favorite-jokes')
let favButton = document.createElement('button')
let nextJokeButton = document.createElement('button')

document.addEventListener('DOMContentLoaded', getDadJoke)

function getDadJoke() {
    fetch('https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes')
    .then(resp => resp.json())
    .then(data => renderJoke(data))
}

function renderJoke(data) {
    let jokeCard = document.createElement('div')
    jokeCard.setAttribute('class', 'joke-card')
    let jokeSetup = document.createElement('h1')
    let jokePunchline = document.createElement('h1')
    jokeSetup.textContent = data.setup
    jokePunchline.textContent = data.punchline
    dadJokes.append(jokeCard)
    jokeCard.append(jokeSetup)
    jokeCard.append(jokePunchline)
    favButton
    favButton.textContent = "Favorite this Joke"
    nextJokeButton
    nextJokeButton.textContent = "Next Dad Joke"
    jokeCard.append(favButton)
    jokeCard.append(nextJokeButton)
}

nextJokeButton.addEventListener('click', (e) => {
    e.path[1].remove()
    getDadJoke()
})

favButton.addEventListener('click', (e) => {
    let favJokeCard = document.createElement('div')
    favJokeCard.setAttribute('class', 'joke-card')
    let favJokeSetup = document.createElement('h1')
    favJokeSetup.textContent = e.target.parentNode.firstChild.textContent
    let favJokePunchline = document.createElement('h1')
    favJokePunchline.textContent = e.target.previousSibling.textContent
    favoriteJokes.append(favJokeCard)
    favJokeCard.append(favJokeSetup)
    favJokeCard.append(favJokePunchline)
    e.target.parentNode.remove()
    getDadJoke()
})

dadShoes.forEach(shoe => shoe.addEventListener('click', giveRating))
function giveRating(e) {
    switch(e.target.id) {
        case '1':
        alert(`You gave this Dad Joke a rating of 1 dad shoe. 
                "Dad...just...no....please stop"`); 
        break;
        case '2':
        alert(`You gave this Dad Joke a rating of 2 dad shoes.
                "Keep trying Dad"`);
        break;
        case '3':
        alert(`You gave this Dad Joke a rating of 3 dad shoes. 
                "lol, ugh you're so stupid."`);
        break; 
        case '4':
        alert(`You gave this Dad Joke a rating of 4 dad shoes. 
                "Alright Dad, that one was pretty good"`);
        break; 
        case '5':
        alert(`You gave this Dad Joke a rating of 5 dad shoes. 
                "Damn Dad, even Mom laughed at that one!"`);
        break;     
    }
}