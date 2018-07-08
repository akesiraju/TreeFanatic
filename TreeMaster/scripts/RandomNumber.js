var RandomNumber = /** @class */ (function () {
    function RandomNumber() {
        this.numbers = new Array();
        this.index = 0;
        for (var i = 0; i < 100; i++) {
            this.numbers.push(i);
        }
        this.Shuffle();
    }
    RandomNumber.prototype.Shuffle = function () {
        for (var i = 0; i < this.numbers.length; i++) {
            var x = Math.floor((Math.random() * this.numbers.length) + 1);
            if (x > -1 && x < this.numbers.length) {
                var temp = this.numbers[i];
                this.numbers[i] = this.numbers[x];
                this.numbers[x] = temp;
            }
        }
    };
    RandomNumber.prototype.Next = function () {
        Logger.Debug("RandomNumber.Generate(): Enter");
        var x = -1;
        if (this.index < this.numbers.length) {
            x = this.numbers[this.index];
            this.index++;
            Logger.Debug("Node count : " + this.index);
        }
        Logger.Debug("RandomNumber.Generate(" + x + "): Exit");
        return x;
    };
    return RandomNumber;
}());
//# sourceMappingURL=RandomNumber.js.map