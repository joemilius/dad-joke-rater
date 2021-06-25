let body = document.querySelector('body')
let dadShoes = document.querySelectorAll('.dad-shoe')
const dadJokes = document.getElementById('rendered-joke')
const favoriteJokes = document.getElementById('favorite-jokes')
const filterButtons = document.querySelectorAll('.joke-filter')
const ratedJokeSection = document.getElementById('rated-jokes')
const newJokeForm = document.getElementById('new-joke-form')
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
    jokeSetup.textContent = data.setup

    let jokePunchline = document.createElement('h1')
    jokePunchline.textContent = data.punchline
   
    favButton
    favButton.textContent = "Favorite"
    favButton.setAttribute('class', 'button-class')
    
    nextJokeButton
    nextJokeButton.textContent = "Next"
    nextJokeButton.setAttribute('class', 'button-class')

    dadJokes.append(jokeCard)
    jokeCard.append(jokeSetup)
    jokeCard.append(jokePunchline)
    jokeCard.append(favButton)
    jokeCard.append(nextJokeButton)
}

nextJokeButton.addEventListener('click', (e) => {
    getDadJoke()
    e.target.parentNode.remove()
})

let favJokeCard = document.createElement('div')
let favJokeSetup = document.createElement('p')
let favJokePunchline = document.createElement('p')

favButton.addEventListener('click', (e) => {
    favJokeCard.setAttribute('class', 'joke-card')
    favJokeSetup.textContent = e.target.parentNode.firstChild.textContent
    favJokePunchline.textContent = e.target.previousSibling.textContent
    favJokePunchline.style.fontWeight = 'bold'
    favoriteJokes.append(favJokeCard)
    favJokeCard.append(favJokeSetup)
    favJokeCard.append(favJokePunchline)
})

dadShoes.forEach(shoe => shoe.addEventListener('click', giveRating))

function giveRating(e) {
    fetch('http://localhost:3000/ratedJokes/', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            setup: dadJokes.querySelector('.joke-card').querySelector('h1').textContent,
            punchline: dadJokes.querySelector('.joke-card').querySelectorAll('h1')[1].textContent,
            rating: parseInt(e.target.nextElementSibling.textContent),
            type: 'general'
        }),
    })
    .then(resp => resp.json())
    .then(data => renderRatedJokes(data))
    switch(e.target.nextElementSibling.textContent) {
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
                "Damn Dad! Mom even laughed at that one!"`);
        break;     
    }
    dadJokes.querySelector('.joke-card').remove()
    getDadJoke()
}

function getRatedJokes() {
    fetch('http://localhost:3000/ratedJokes')
    .then(resp => resp.json())
    .then(data => data.forEach(joke => renderRatedJokes(joke)))
}

getRatedJokes()

let ratedJokeHeading = document.createElement('h1')
ratedJokeSection.append(ratedJokeHeading)

function renderRatedJokes(joke) {
    let ratedJokeCard = document.createElement('div')
    ratedJokeCard.setAttribute('class', 'joke-card')
    ratedJokeCard.setAttribute('id', joke.id)
    ratedJokeCard.style.display = 'none'
    
    let ratedJokeSetup = document.createElement('h3')
    ratedJokeSetup.textContent = joke.setup
    
    let ratedJokePunchline = document.createElement('h3')
    ratedJokePunchline.textContent = joke.punchline
    ratedJokePunchline.style.fontWeight = 'bold'

    let dadShoeContainer = document.createElement('div')
    dadShoeContainer.setAttribute('class', 'row')
    dadShoeContainer.setAttribute('id', 'rerate-container')

    let eachDadShoe = document.createElement('div')
    eachDadShoe.setAttribute('class', 'column, rerate-dad-shoe')
    eachDadShoe.innerHTML = `
    <p>Here you can rerate a joke!</p>
    <div class='row'>
        <div class='column'>
            <img class='dad-shoe wobble-vertical-on-hover rerate-button' src='images/new-balance-shoe.png'>
            <h2>1</h2>
        </div>
        <div class='column'>
            <img class='dad-shoe wobble-vertical-on-hover rerate-button' src='images/new-balance-shoe.png'>
            <h2>2</h2>
        </div>
        <div class='column'>
            <img class='dad-shoe wobble-vertical-on-hover rerate-button' src='images/new-balance-shoe.png'>
            <h2>3</h2>  
        </div>
        <div class='column'>
            <img class='dad-shoe wobble-vertical-on-hover rerate-button' src='images/new-balance-shoe.png'>
            <h2>4</h2>
        </div>
        <div class='column'>
            <img class='dad-shoe wobble-vertical-on-hover rerate-button' src='images/new-balance-shoe.png'>
            <h2>5</h2>
        </div>
    </div>`

    ratedJokeSection.append(ratedJokeCard)
    ratedJokeCard.append(ratedJokeSetup)
    ratedJokeCard.append(ratedJokePunchline)
    ratedJokeCard.append(dadShoeContainer)
    dadShoeContainer.append(eachDadShoe)

    filterButtons.forEach(button => button.addEventListener('change', showFilteredJokes))

    function showFilteredJokes(e) {
        if (joke.rating === parseInt(e.target.value)) {
            ratedJokeHeading.textContent = `Jokes awarded with ${e.target.nextSibling.nodeValue}`
            ratedJokeCard.style.display = 'block'
        } else {
            ratedJokeHeading.textContent = `Jokes awarded with ${e.target.nextSibling.nodeValue}`
            ratedJokeCard.style.display = 'none'
        }
    }
}

function renderRerate() {
    let rerateButtons = document.querySelectorAll('.rerate-button')

    rerateButtons.forEach(button => button.addEventListener('click', (event) => {
        fetch(`http://localhost:3000/ratedJokes/${event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rating: parseInt(event.target.nextElementSibling.textContent)
            })
        })
        .then(resp => resp.json())
        .then(data => {
            event.target.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
            renderRatedJokes(data)
            renderRerate()
        })
    }))
}

setTimeout(renderRerate, 1000)

newJokeForm.addEventListener('submit', addNewJoke)

function addNewJoke(e) {
    e.preventDefault()
    if (inRange(e.target[2].value, 1, 5)) {
        fetch('http://localhost:3000/ratedJokes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                setup: e.target[0].value,
                punchline: e.target[1].value,
                rating: parseInt(e.target[2].value)
            })
        })
        .then(resp => resp.json())
        .then(data => {
            renderRatedJokes(data)
            renderRerate()
        })
        .then(() => {
            e.target[0].value = ''
            e.target[1].value = ''
            e.target[2].value = ''
            alert(`You're submission was successful!`)
        })
        
    } else {
        alert('Please enter a single number between 1 & 5 for your rating')
    }
}

function inRange(x, min, max) {
    return ((x-min)*(x-max) <= 0)
}

document.querySelectorAll('.wordart')[0].addEventListener('click', () => {
    body.innerHTML = `<img width=100% height=100% src='images/dad-joke-bkgrnd.jpeg'><h1>Ope! Looks like you broke the website.</h1><p>That'll teach you to NOT TOUCH THE THERMOSTAT</p>`
})




// Will this work to refactor my render functions???
// function renderJokes(prefix) {
//     let `${prefix}JokeCard` = document.createElement('div')
//     `${prefix}JokeCard.setAttribute('class', 'joke-card')``
// }