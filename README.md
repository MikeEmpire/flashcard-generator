# HW-11 - Cloze-Constructors

## Description on how to use the app

* Firstly, the user needs to choose whether they want to use the "basic" flashcards setting or the "cloze" flashcards setting.
  * In order to use the basic flashcards, the user needs to type basic into the command line.
  * In order to use the cloze flashcards, the user needs to type cloze into the command line. 
  * This applies for the cloze cards too.
* Next, the user will need to add flashcards to the system in order to use it. To do this, have the second command in the CLI should be "first-add", with the third command being the number of flashcards they wish to add.
  * For example: node CLI.js basic first-add 2
  * This would add 2 basic flashcards.
  * This applies for the cloze cards too.
* If you want to add more cards after this first command, instead of using the first-add command, use the command add, and the number of cards you wish to add.
  * For example: node CLI.js basic add 2
  * This would add 2 additonal cards.
  * Be sure to use the first-add command BEFORE you use the add command to prevent errors.
  * This applies for the cloze cards too.
* Once you have cards made, in order to quiz yourself, use the command random.
  * For example: node CLI.js basic random
  * This will randomly select a card, give you the front of the card, followed by five seconds to think of the answer to the card, and then the back of the card. 
  * This applies for the cloze cards too.
* In order to view the front or back of the card, use the following commands:
  * For example: node CLI.js basic read front 1
  * The above command would show the front of the first flashcard made.
  * For example: node CLI.js basic read back 2
  * The above command would show the back of the second flashcard made. 
  * For the cloze cards, instead of using the keywords "front" and "back", use the keywords "cloze", "partial", and "full". 
  * For example: node CLI.js cloze read partial 2
  * The above command would show the partial sentence for the second flashcard. 
  
* List of all commands:
1. basic
2. cloze
3. random
4. read
5. front
6. back
7. first-add
8. add
9. cloze
10. partial
11. full

## Requirements

### Overview

In this week's assignment, you will create the backend for a basic flashcard application.

The backend will essentially constitute an API that allows users to create two types of flashcards.

1. **Basic** flashcards, which have a front (_"Who was the first president of the United States?"_), and a back (_"George Washington"_).

2. **Cloze-Deleted** flashcards, which present _partial_ text (_"... was the first president of the United States."_), and the full text when the user requests it (_"George Washington was the first president of the United States."_)

#### Cloze Deletions

A **cloze deletion** is simply a sentence that has had some of its text removed. For example, given the sentence:

_"George Washington was the first president of the United States."_

...We can create a "cloze deletion" by removing the words _"George Washington"_:

_"... was the first president of the United States."_

This is useful for building flash card applications that forces users to remember the important part of a sentence, and is [a common device in educational applications](https://en.wikipedia.org/wiki/Cloze_test).

A flash card built this way has three parts:

1. The **full text**. This is the entire sentence users need to remember:  _"George Washington was the first president of the United States."_

2. The **cloze deletion**. This is the text we've chosen to remove: _"George Washington"_.

3. The **partial text**. This is what we get if we remove the **cloze deletion** from the **full text**: _"... was the first president of the United States._

See below for examples as to how your constructor should behave.

## Instructions

* Create a new GitHub repository, named `Flashcard-Generator` or something similar. Clone this to your local drive.

* Create a `BasicCard` constructor. It should accept `front` and `back` arguments.

* Create a `ClozeCard` constructor. It should accept `text` and `cloze` arguments.

  * `ClozeCard` should have a property or method that contains or returns _only_ the cloze-deleted portion of the text.

  * `ClozeCard` should have a property or method that contains or returns _only_ the partial text.

  * `ClozeCard` should have a property or method that contains or returns _only_ the full text.


### Examples

Your constructors should work as follows.

```
var firstPresident = new BasicCard(
    "Who was the first president of the United States?", "George Washington");

// "Who was the first president of the United States?"
console.log(firstPresident.front); 

// "George Washington"
console.log(firstPresident.back); 

var firstPresidentCloze = new ClozeCard(
    "George Washington was the first president of the United States.", "George Washington");

// "George Washington"
console.log(firstPresidentCloze.cloze); 

// " ... was the first president of the United States.
console.log(firstPresidentCloze.partial); "

// "George Washington was the first president of the United States.
console.log(firstPresidentCloze.fullText): "

// Should throw or log an error because "oops" doesn't appear in "This doesn't work"
var brokenCloze("This doesn't work", "oops"); 
```

Your property and/or method names can be different, but these examples describe how you would use your flashcard objects. 


## Technologies Used

- NPM packages
- Javascript
- Node.js
- CLI commands
