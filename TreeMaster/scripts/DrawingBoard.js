var Point = (function () {
    function Point(x, y) {
        this.X = x;
        this.Y = y;
    }
    return Point;
}());
var Circle = (function () {
    function Circle(canvas, centre, radius) {
        this.Canvas = canvas;
        this.Centre = centre;
        this.Radius = radius;
    }
    Circle.prototype.Draw = function () {
        Logger.Debug("Circle.Draw() : Enter");
        var ctx = this.Canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.Centre.X, this.Centre.Y, this.Radius, 0, 2 * Math.PI);
        ctx.stroke();
        Logger.Debug("Circle.Draw() : Exit");
    };
    return Circle;
}());
var Line = (function () {
    function Line(canvas, start, end) {
        this.Canvas = canvas;
        this.Start = start;
        this.End = end;
    }
    Line.prototype.Draw = function () {
        Logger.Debug("Line.Draw() : Enter");
        var ctx = this.Canvas.getContext("2d");
        ctx.moveTo(this.Start.X, this.Start.Y);
        ctx.lineTo(this.End.X, this.End.Y);
        ctx.stroke();
        Logger.Debug("Line.Draw() : Exit");
    };
    return Line;
}());
var MyText = (function () {
    function MyText(canvas, start, displayText) {
        this.Canvas = canvas;
        this.Start = start;
        this.DisplayText = displayText;
    }
    MyText.prototype.Draw = function () {
        Logger.Debug("MyText.Draw() : Enter");
        var ctx = this.Canvas.getContext("2d");
        ctx.font = "10px Arial";
        ctx.fillText(this.DisplayText, this.Start.X, this.Start.Y);
        Logger.Debug("MyText.Draw() : Exit");
    };
    return MyText;
}());
//# sourceMappingURL=DrawingBoard.js.map