var ColorMap = /** @class */ (function () {
    function ColorMap() {
    }
    ColorMap.GetNewColor = function () {
        var r = Math.floor((Math.random() * 100) + 150);
        var g = Math.floor((Math.random() * 100) + 150);
        var b = Math.floor((Math.random() * 100) + 150);
        return "rgb(" + r + "," + g + "," + b + ")";
        //return 'rgb(0,0,0)';
    };
    ColorMap.GetTextColor = function () {
        return 'rgb(0,0,0)';
    };
    ColorMap.GetWhiteColor = function () {
        return new NodeColor('rgb(255,255,255)', 'rgb(255,255,255)');
    };
    ColorMap.GetHighlightColor = function () {
        return new NodeColor('rgb(0,0,255)', 'rgb(0,0,255)');
    };
    ColorMap.GetDeletionColor = function () {
        return new NodeColor('rgb(255,0,0)', 'rgb(255,0,0)');
    };
    ColorMap.GetCreationColor = function () {
        return new NodeColor('rgb(0,255,0)', 'rgb(0,255,0)');
    };
    return ColorMap;
}());
var NodeColor = /** @class */ (function () {
    function NodeColor(upperColor, bottomColor) {
        this.UpperColor = upperColor;
        this.BottomColor = bottomColor;
    }
    return NodeColor;
}());
//# sourceMappingURL=ColorMap.js.map