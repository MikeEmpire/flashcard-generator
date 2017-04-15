var inquirer = require('inquirer');
var fs = require('file-system');
var BasicCard = require("./basicCard.js");
var ClozeFlashCard = require("./clozeFlashCard.js");


var firstPresident = new BasicCard('Who are you?', 'Michael');

console.log(firstPresident.back);