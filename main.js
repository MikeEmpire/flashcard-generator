var inquirer = require('inquirer'),
    file = require('file-system'),
    fs = require('fs'),
    rl = require('readline-specific'),
    BasicCard = require("./basicCard.js"),
    ClozeFlashCard = require("./clozeFlashCard.js"),
    ui = new inquirer.ui.BottomBar(),
    sloc = require('sloc'),
    basicContents = fs.readFileSync('basic.txt', 'utf8'),
    content;

var studySpecificCard = {
    type: 'list',
    name: 'cardPicker',
    message: 'Did you want to study a cloze or basic card?',
    choices: ['Basic', 'Cloze']
}

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
        if (fs.existsSync('./basic.txt')) {
            fs.appendFile('./basic.txt', answers.basicFrontCard + "+" + answers.basicBackCard + '\n', function(err) {
                if (err) {
                    console.log(err);
                }
                ui.log.write('a new basic card has been created');
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

function printBasicCards() {
    rl.alllines('./basic.txt', function(err, res) {
        if (err) { console.log(err) } else {
            console.log(res.row);
            ui.log.write('Console will clear and exit in 30 seconds');
            setTimeout(function() {
                console.log('\033[2J');
                process.exit();
            }, 30000)
        }
    })
}

function printClozeCards() {
    rl.alllines('./cloze.txt', function(err, res) {
        if (err) { console.log(err) } else {
            console.log(res.row);
            ui.log.write('Console will clear and exit in 30 seconds');
            setTimeout(function() {
                console.log('\033[2J');
                process.exit();
            }, 30000)
        }
    })
}

function handleBasicResponse(answers) {
    rl.oneline('./basic.txt', 1, function(err, res) {
        if (err) { console.error(err) } else if (res === '') {
            createBasicCard();
        } else {
            printBasicCards();
        }
    })
}

function handleClozeResponse(answers) {
    rl.oneline('./cloze.txt', 1, function(err, res) {
        if (err) { console.error(err) } else if (res === '') {
            createClozeCard();
        } else {
            printClozeCards();
        } //print content
    })
}

function printMoreCards() {
    inquirer.prompt([{
        type: 'confirm',
        name: 'MoreCards',
        message: 'Do you want to create more study cards? (Press Enter to create another card.)',
        default: true
    }]).then(function(answers) {
        if (answers.MoreCards) {
            createCard();
        } else {
            process.exit();
        }
    })
}

function getBasicCard() {
    rl.alllines('./basic.txt', function(err, res) {
        var array = Object.keys(res.row).map(function(key) {
            return res.row[key];
        });
        var backOfCards = array.map(function(arr) {
            return arr.split('+')[1];
        })
        array = array.map(function(arr) {
            return arr.split('+')[0] + '?';
        });
        if (err) {
            console.error(err)
        } else {
            inquirer.prompt([{
                type: 'list',
                name: 'BasicCard',
                message: 'Choose a Basic Card to study',
                choices: array
            }, {
                type: 'input',
                name: 'BasicCardAns',
                message: 'What is back of the card?'
            }]).then(function(answers) {
                var basicChoice = answers.BasicCard;
                var chosenIndex = array.indexOf(basicChoice);
                var chosenBackOfCards = backOfCards[chosenIndex];
                if (chosenBackOfCards !== answers.BasicCardAns) {
                    console.log('You are incorrect!');
                    console.log('The correct answer is: ' + chosenBackOfCards);
                    initStudy();
                } else {
                    console.log('You are correct!');
                    initStudy();
                }
            })
        }
    })
}

function getClozeCard() {
    rl.alllines('./cloze.txt', function(err, res) {
        var numOfLines = res.all.split(/\r\n|\r|\n/).length - 1;
        var array = Object.keys(res.row).map(function(key) {
            return res.row[key];
        });
        var backOfCards = array.map(function(arr) {
            return arr.split('+')[1];
        })
        array = array.map(function(arr) {
            return arr.split('+')[0] + '?';
        });
        if (err) {
            console.error(err)
        } else {
            inquirer.prompt([{
                type: 'list',
                name: 'ClozeCard',
                message: 'Choose a Cloze Card to study',
                choices: array
            }, {
                type: 'input',
                name: 'ClozeCardAns',
                message: 'What is deleted portion of the card?'
            }]).then(function(answers) {
                var clozeChoice = answers.ClozeCard;
                var chosenIndex = array.indexOf(clozeChoice);
                var chosenBackOfCards = backOfCards[chosenIndex];
                if (chosenBackOfCards !== answers.ClozeCardAns) {
                    console.log('You are incorrect!');
                    console.log('The correct answer is: ' + chosenBackOfCards);
                } else {
                    console.log('You are correct!');
                }
            })
        }
    })
}

function createClozeCard() {
    ui.log.write('You are about to create a cloze card. A cloze card  will allow you to delete a portion of the card so that you can remember that portion of that card.');
    inquirer.prompt([{
        type: 'input',
        name: 'whole',
        message: 'What do you want on the front of the card?'
    }, {
        type: 'input',
        name: 'partial',
        message: 'What part of the card do you want to delete?'
    }]).then(function(answers) {
        if (fs.existsSync('./cloze.txt')) {
            var partialCard = answers.whole.replace(answers.partial, '...');
            fs.appendFile('./cloze.txt', partialCard + '+' + answers.partial + "\n", function(err) {
                if (err) {
                    console.log(err);
                } else {
                    printMoreCards();
                }
            })
            console.log('adding new content to cloze txt');
        } else {
            fs.writeFile('./cloze.txt', answers.whole + "+" + answers.partial + "\n", function(err) {
                if (err) {
                    console.log(err);
                } else {
                    printMoreCards();
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
            } else if (nChoice === 'Create') {
                createCard()
            } else {
                inquirer.prompt(studySpecificCard).then(function(answers) {
                    nChoice = answers.cardPicker;
                    if (nChoice === 'Basic') {
                        getBasicCard();
                    } else {
                        getClozeCard();
                    }
                })
            }
        });
    }
}())