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
    ratedJokeCard.style.display = 'none'
    
    let ratedJokeSetup = document.createElement('p')
    ratedJokeSetup.textContent = joke.setup
    
    let ratedJokePunchline = document.createElement('p')
    ratedJokePunchline.textContent = joke.punchline
    ratedJokePunchline.style.fontWeight = 'bold'

    //Dad Shoe Rerating
    let dadShoeContainer = document.createElement('div')
    let eachDadShoe1 = document.createElement('div')
    let eachDadShoe2 = document.createElement('div')
    let eachDadShoe3 = document.createElement('div')
    let eachDadShoe4 = document.createElement('div')
    let eachDadShoe5 = document.createElement('div')
    let dadShoeButton1 = document.createElement('img')
    let dadShoeButton2 = document.createElement('img')
    let dadShoeButton3 = document.createElement('img')
    let dadShoeButton4 = document.createElement('img')
    let dadShoeButton5 = document.createElement('img')
    let ratingValue1 = document.createElement('h2')
    let ratingValue2 = document.createElement('h2')
    let ratingValue3 = document.createElement('h2')
    let ratingValue4 = document.createElement('h2')
    let ratingValue5 = document.createElement('h2')
   
    dadShoeContainer.setAttribute('class', 'row')
    dadShoeContainer.setAttribute('id', 'rerate-container')
    eachDadShoe1.setAttribute('class', 'column')
    eachDadShoe2.setAttribute('class', 'column')
    eachDadShoe3.setAttribute('class', 'column')
    eachDadShoe4.setAttribute('class', 'column')
    eachDadShoe5.setAttribute('class', 'column')
    eachDadShoe1.setAttribute('class', 'rerate-dad-shoe')
    eachDadShoe2.setAttribute('class', 'rerate-dad-shoe')
    eachDadShoe3.setAttribute('class', 'rerate-dad-shoe')
    eachDadShoe4.setAttribute('class', 'rerate-dad-shoe')
    eachDadShoe5.setAttribute('class', 'rerate-dad-shoe')
    dadShoeButton1.setAttribute('class', 'dad-shoe wobble-vertical-on-hover rerate-button')
    dadShoeButton2.setAttribute('class', 'dad-shoe wobble-vertical-on-hover rerate-button')
    dadShoeButton3.setAttribute('class', 'dad-shoe wobble-vertical-on-hover rerate-button')
    dadShoeButton4.setAttribute('class', 'dad-shoe wobble-vertical-on-hover rerate-button')
    dadShoeButton5.setAttribute('class', 'dad-shoe wobble-vertical-on-hover rerate-button')
    
    dadShoeButton1.src = 'images/new-balance-shoe.png'
    dadShoeButton2.src = 'images/new-balance-shoe.png'
    dadShoeButton3.src = 'images/new-balance-shoe.png'
    dadShoeButton4.src = 'images/new-balance-shoe.png'
    dadShoeButton5.src = 'images/new-balance-shoe.png'

    ratingValue1.textContent = 1
    ratingValue2.textContent = 2
    ratingValue3.textContent = 3
    ratingValue4.textContent = 4
    ratingValue5.textContent = 5

    dadShoeContainer.appendChild(eachDadShoe1)
    eachDadShoe1.appendChild(dadShoeButton1)
    eachDadShoe1.appendChild(ratingValue1)
    dadShoeContainer.appendChild(eachDadShoe2)
    eachDadShoe2.appendChild(dadShoeButton2)
    eachDadShoe2.appendChild(ratingValue2)
    dadShoeContainer.appendChild(eachDadShoe3)
    eachDadShoe3.appendChild(dadShoeButton3)
    eachDadShoe3.appendChild(ratingValue3)
    dadShoeContainer.appendChild(eachDadShoe4)
    eachDadShoe4.appendChild(dadShoeButton4)
    eachDadShoe4.appendChild(ratingValue4)
    dadShoeContainer.appendChild(eachDadShoe5)
    eachDadShoe5.appendChild(dadShoeButton5)
    eachDadShoe5.appendChild(ratingValue5)

    let rerateButton = document.querySelectorAll('.rerate-button')
    console.log(rerateButton)
    rerateButton.forEach(button => button.addEventListener('click', event => {
        console.log(event.target)
        // fetch(`http://localhost:3000/ratedJokes/${}`)
    }))


    ratedJokeSection.append(ratedJokeCard)
    ratedJokeCard.append(ratedJokeSetup)
    ratedJokeCard.append(ratedJokePunchline)
    ratedJokeCard.append(dadShoeContainer)
    
    

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