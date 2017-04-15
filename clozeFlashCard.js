//third input field accept text and cloze arguments

var ClozeFlashcard = function(text, cloze) {
    this.text = text;
    this.cloze = cloze;

    this.showtext = function() {
        console.log(this.text);
    }
    this.showcloze = function() {
        console.log(this.cloze);
    }
};

module.exports = ClozeFlashcard;