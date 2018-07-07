var RandomNumber = (function () {
    function RandomNumber() {
    }
    //Generate(min: number, max: number)
    //{
    //    return Math.floor((Math.random() * max) + min);
    //}
    RandomNumber.prototype.Generate = function () {
        Logger.Debug("RandomNumber.Generate(): Enter");
        var x = Math.floor((Math.random() * 100) + 1);
        Logger.Debug("RandomNumber.Generate(" + x + "): Exit");
        return x;
    };
    return RandomNumber;
}());
//# sourceMappingURL=RandomNumber.js.map