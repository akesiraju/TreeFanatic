var Point = (function () {
    function Point(x, y) {
        this.X = x;
        this.Y = y;
    }
    return Point;
}());
var Circle = (function () {
    function Circle(canvas, centre, radius, color, value) {
        this.Canvas = canvas;
        this.Centre = centre;
        this.Radius = radius;
        this.Color = color;
        this.Value = value;
    }
    Circle.prototype.Draw = function () {
        Logger.Debug("Circle.Draw() : Enter");
        var ctx = this.Canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.Centre.X, this.Centre.Y, this.Radius, 0, Math.PI);
        ctx.strokeStyle = this.Color.BottomColor;
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.Centre.X, this.Centre.Y, this.Radius, Math.PI, 2 * Math.PI);
        ctx.strokeStyle = this.Color.UpperColor;
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.Centre.X, this.Centre.Y, this.Radius, 0, 2 * Math.PI);
        ctx.fillStyle = ColorMap.GetTextColor();
        ctx.fillText(this.Value.toString(), this.Centre.X - 6, this.Centre.Y + 4, 2 * this.Radius + 5);
        ctx.closePath();
        Logger.Debug("Circle.Draw() : Exit");
    };
    Circle.prototype.Clear = function () {
        Logger.Debug("Circle.Clear() : Enter");
        var ctx = this.Canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.Centre.X, this.Centre.Y, this.Radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgb(255,255,255)';
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        Logger.Debug("Circle.Clear() : Exit");
    };
    return Circle;
}());
var Line = (function () {
    function Line(canvas, start, end, color) {
        this.Canvas = canvas;
        this.Start = start;
        this.End = end;
        this.Color = color;
    }
    Line.prototype.Draw = function () {
        Logger.Debug("Line.Draw() : Enter");
        var ctx = this.Canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(this.Start.X, this.Start.Y);
        ctx.lineTo(this.End.X, this.End.Y);
        ctx.strokeStyle = this.Color;
        ctx.stroke();
        ctx.closePath();
        Logger.Debug("Line.Draw() : Exit");
    };
    Line.prototype.Clear = function () {
        Logger.Debug("Line.Clear() : Enter");
        var ctx = this.Canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(this.Start.X, this.Start.Y);
        ctx.lineTo(this.End.X, this.End.Y);
        ctx.strokeStyle = 'rgb(255,255,255)';
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        Logger.Debug("Line.Clear() : Exit");
    };
    return Line;
}());
var MyText = (function () {
    function MyText(canvas, start, displayText, color) {
        this.Canvas = canvas;
        this.Start = start;
        this.DisplayText = displayText;
        this.Color = color;
    }
    MyText.prototype.Draw = function () {
        Logger.Debug("MyText.Draw() : Enter");
        var ctx = this.Canvas.getContext("2d");
        ctx.beginPath();
        ctx.font = "12px Arial";
        ctx.strokeStyle = this.Color;
        ctx.fillText(this.DisplayText, this.Start.X, this.Start.Y);
        ctx.closePath();
        Logger.Debug("MyText.Draw() : Exit");
    };
    MyText.prototype.Clear = function () { };
    return MyText;
}());
var Pen = (function () {
    function Pen(canvas, _nodeSize) {
        this.Canvas = canvas;
        this.nodeSize = _nodeSize;
    }
    Pen.prototype.DrawNode = function (node) {
        Logger.Debug("Pen.DrawNode() : Enter");
        this.circle = new Circle(this.Canvas, new Point(node.X, node.Y), this.nodeSize, node.Color, node.Value.toString());
        this.circle.Draw();
        Logger.Debug("Pen.DrawNode() : Exit");
    };
    Pen.prototype.DrawConnector = function (parentNode, node) {
        Logger.Debug("Pen.DrawConnector() : Enter");
        this.line = new Line(this.Canvas, new Point(parentNode.X, parentNode.Y + this.nodeSize), new Point(node.X, node.Y - this.nodeSize), parentNode.Color.BottomColor);
        this.line.Draw();
        Logger.Debug("Pen.DrawConnector() : Exit");
    };
    Pen.prototype.HighlightNode = function (parentNode, node) {
        Logger.Debug("Pen.HighlightNode(" + node.Value + ") : Enter");
        this.circle = new Circle(this.Canvas, new Point(node.X, node.Y), this.nodeSize, ColorMap.GetHighlightColor(), '');
        this.circle.Draw();
        if (parentNode != null) {
            this.line = new Line(this.Canvas, new Point(parentNode.X, parentNode.Y + this.nodeSize), new Point(node.X, node.Y - this.nodeSize), ColorMap.GetHighlightColor().BottomColor);
            this.line.Draw();
        }
        Logger.Debug("Pen.HighlightNode() : Exit");
    };
    Pen.prototype.HighlightOldConnection = function (parentNode, node) {
        Logger.Debug("Pen.HighlightOldConnection(" + node.Value + ") : Enter");
        this.circle = new Circle(this.Canvas, new Point(node.X, node.Y), this.nodeSize, ColorMap.GetDeletionColor(), '');
        this.circle.Draw();
        if (parentNode != null) {
            this.line = new Line(this.Canvas, new Point(parentNode.X, parentNode.Y + this.nodeSize), new Point(node.X, node.Y - this.nodeSize), ColorMap.GetDeletionColor().BottomColor);
            this.line.Draw();
        }
        if (node.Right != null) {
            this.line = new Line(this.Canvas, new Point(node.X, node.Y + this.nodeSize), new Point(node.Right.X, node.Right.Y - this.nodeSize), ColorMap.GetDeletionColor().BottomColor);
            this.line.Clear();
        }
        if (node.Left != null) {
            this.line = new Line(this.Canvas, new Point(node.X, node.Y + this.nodeSize), new Point(node.Left.X, node.Left.Y - this.nodeSize), ColorMap.GetDeletionColor().BottomColor);
            this.line.Clear();
        }
        Logger.Debug("Pen.HighlightOldConnection() : Exit");
    };
    Pen.prototype.HighlightNewConnection = function (parentNode, node) {
        Logger.Debug("Pen.HighlightNewConnection(" + node.Value + ") : Enter");
        this.circle = new Circle(this.Canvas, new Point(node.X, node.Y), this.nodeSize, ColorMap.GetCreationColor(), '');
        this.circle.Draw();
        // For Root
        if (parentNode != null) {
            this.line = new Line(this.Canvas, new Point(parentNode.X, parentNode.Y + this.nodeSize), new Point(node.X, node.Y - this.nodeSize), ColorMap.GetCreationColor().BottomColor);
            this.line.Draw();
        }
        Logger.Debug("Pen.HighlightNewConnection() : Exit");
    };
    Pen.prototype.DeleteNode = function (node, parentNode) {
        Logger.Debug("Pen.DeleteNode(" + node.Value + ") : Enter");
        this.circle = new Circle(this.Canvas, new Point(node.X, node.Y), this.nodeSize, ColorMap.GetWhiteColor(), '');
        this.circle.Clear();
        if (parentNode != null) {
            this.line = new Line(this.Canvas, new Point(parentNode.X, parentNode.Y + this.nodeSize), new Point(node.X, node.Y - this.nodeSize), ColorMap.GetWhiteColor().BottomColor);
            this.line.Clear();
        }
        if (node.Right != null) {
            this.line = new Line(this.Canvas, new Point(node.X, node.Y + this.nodeSize), new Point(node.Right.X, node.Right.Y - this.nodeSize), ColorMap.GetWhiteColor().BottomColor);
            this.line.Clear();
        }
        if (node.Left != null) {
            this.line = new Line(this.Canvas, new Point(node.X, node.Y + this.nodeSize), new Point(node.Left.X, node.Left.Y - this.nodeSize), ColorMap.GetWhiteColor().BottomColor);
            this.line.Clear();
        }
        Logger.Debug("Pen.DeleteNode() : Exit");
    };
    return Pen;
}());
//# sourceMappingURL=DrawingTools.js.map