var inquirer = require('inquirer'),
    file = require('file-system'),
    fs = require('fs'),
    path = require('path'),
    rl = require('readline-specific'),
    BasicCard = require("./basicCard.js"),
    ClozeFlashCard = require("./clozeFlashCard.js"),
    ui = new inquirer.ui.BottomBar(),
    firstPresident = new BasicCard('Who are you?', 'Michael'),
    content;

var createSpecificCard = {
    type: 'list',
    name: 'cardCreation',
    message: 'Would you like to create a basic or cloze card?',
    choices: ['Basic', 'Cloze']
}
var startFlashCards = {
    type: 'list',
    name: 'startGame',
    message: 'Did you want to create a card or start studying?',
    choices: ['Study', 'Create', 'Use FlashCards']
}

function createBasicCard() {
    inquirer.prompt([{
            type: 'input',
            name: 'basicFrontCard',
            message: 'What would you like the front of your basic card to be?'
        },
        {
            type: 'input',
            name: 'basicBackCard',
            message: 'What would you like on the back of your card?'
        }
    ]).then(function(answers) {
        if (fs.existsSync('.basic.txt')) {
            fs.appendFile('./basic.txt', answers.basicFrontCard + " ? " + answers.basicBackCard + '\n', function(err) {
                if (err) {
                    console.log(err);
                }
            })
        } else {
            fs.writeFile('./basic.txt', answers.basicFrontCard + "+" + answers.basicBackCard + '\n', function(err) {
                if (err) {
                    console.log(err);
                }
                ui.log.write('A new basic card has been created');
            })
        }
    })
}

function handleFlashCards(answers) {
    console.log('\033[2J');
    ui.log.write('');
    inquirer.prompt([{
        type: 'list',
        name: ''
    }])
}

function handleStudyResponse(answers) {
    console.log('\033[2J');
    ui.log.write('Did you want to review a cloze or basic card?');
    inquirer.prompt([{
        type: 'list',
        name: 'studyChoice',
        message: 'Please select one of the two you would like to review',
        choices: ['Cloze', 'Basic']
    }]).then(function(answers) {
        var studyCard = answers.studyChoice;
        if (studyCard == 'Cloze') {
            handleClozeResponse();
        } else {
            handleBasicResponse();
        }
    })
}

function handleBasicResponse(answers) {
    rl.oneline('./basic.txt', 1, function(err, res) {
        if (err) { console.error(err) } //handling error
        else if (res === '') { createBasicCard(); } //print content
        else {}
    })
}

function handleClozeResponse(answers) {
    rl.oneline('./cloze.txt', 1, function(err, res) {
        if (err) { console.error(err) } //handling error
        else if (res === '') { createClozeCard(); } //print content
    })
}

function createClozeCard() {
    ui.log.write('You are about to create a cloze card. A cloze card  will allow you to delete a portion of the card so that you can remember that portion of that card.');
    inquirer.prompt([{
        type: 'input',
        name: 'frontClozeCard',
        message: 'What do you want on the front of the card?'
    }, {
        type: 'input',
        name: 'partial',
        message: 'What do you want to put on the back of the card?'
    }]).then(function(answers) {
        if (fs.existsSync('./cloze.txt')) {
            fs.appendFile('./cloze.txt', answers.frontClozeCard + '+' + answers.backClozeCard + "\n", function(err) {
                if (err) {
                    console.log(err);
                } else {}
            })
            console.log('adding new content to cloze txt');
        } else {
            fs.writeFile('./cloze.txt', answers.frontClozeCard + "+" + answers.backClozeCard + "\n", function(err) {
                if (err) {
                    console.log(err);
                }
                ui.log.write('Cloze Card is created');
            })
        }
    })
}

function createCard() {
    inquirer.prompt(createSpecificCard).then(function(answers) {
        var choice = answers.cardCreation;
        if (choice === 'Basic') {
            createBasicCard();
        } else if (choice === 'Cloze') {
            createClozeCard();
        }
    })
}

(function initStudy() {
    // check if flashcard txt file exists
    if (fs.existsSync('./cloze.txt')) {
        inquirer.prompt(startFlashCards).then(function(answers) {
            var nChoice = answers.startGame;
            if (nChoice === 'Study') {
                handleStudyResponse();
            } else if (nChoice === 'Create') { createCard() } else {}
        });
    }
}())