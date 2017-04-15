var BasicCard = function(front, back) {
    this.front = front;
    this.back = back;

    this.showBack = function() {
        console.log(this.back);
    }
    this.showFront = function() {
        console.log(this.front);
    }
};

module.exports = BasicCard;