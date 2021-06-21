let dadShoes = document.querySelectorAll('.dad-shoe')
const dadJokes = document.getElementById('dad-joke-container')

document.addEventListener('DOMContentLoaded', getDadJoke)

function getDadJoke() {
    fetch('https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes')
    .then(resp => resp.json())
    .then(data => renderJoke(data))
}

function renderJoke(data) {
    let jokeCard = document.createElement('div')
    jokeCard.setAttribute('class', 'joke-card')
    let jokeSetup = document.createElement('h3')
    jokeSetup.textContent = data.setup
    let jokePunchline = document.createElement('h2')
    jokePunchline.textContent = data.punchline

    dadJokes.append(jokeCard)
    jokeCard.append(jokeSetup)
    jokeCard.append(jokePunchline)
}

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