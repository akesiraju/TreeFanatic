class Point implements IPoint
{
    X: number;
    Y: number;

    constructor(x: number, y: number)
    {
        this.X = x;
        this.Y = y;
    }
}

class Circle implements IGeometry
{
    Canvas: HTMLCanvasElement;
    Centre: IPoint;
    Radius: number;
    Color: INodeColor;
    Value: string;

    constructor(canvas: HTMLCanvasElement, centre: IPoint, radius: number, color: INodeColor, value: string)
    {
        this.Canvas = canvas;
        this.Centre = centre;
        this.Radius = radius;
        this.Color = color;
        this.Value = value;
    }

    Draw()
    {
        Logger.Debug("Circle.Draw() : Enter");

        var ctx = this.Canvas.getContext("2d");
        ctx.beginPath()
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
    }

    Clear()
    {
        Logger.Debug("Circle.Clear() : Enter");

        var ctx = this.Canvas.getContext("2d");
        ctx.beginPath()
        ctx.arc(this.Centre.X, this.Centre.Y, this.Radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgb(255,255,255)';
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        Logger.Debug("Circle.Clear() : Exit");
    }
}

class Line implements IGeometry
{
    Canvas: HTMLCanvasElement;
    Start: IPoint;
    End: IPoint;
    Color: string

    constructor(canvas: HTMLCanvasElement, start: IPoint, end: IPoint, color: string)
    {
        this.Canvas = canvas;
        this.Start = start;
        this.End = end;
        this.Color = color;
    }

    Draw()
    {
        Logger.Debug("Line.Draw() : Enter");

        var ctx = this.Canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(this.Start.X, this.Start.Y);
        ctx.lineTo(this.End.X, this.End.Y);
        ctx.strokeStyle = this.Color;
        ctx.stroke();
        ctx.closePath();

        Logger.Debug("Line.Draw() : Exit");
    }

    Clear()
    {
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
    }
}

class MyText implements IGeometry
{
    Canvas: HTMLCanvasElement;
    Start: IPoint;
    DisplayText: string;
    Color: string

    constructor(canvas: HTMLCanvasElement, start: IPoint, displayText: string, color: string)
    {
        this.Canvas = canvas;
        this.Start = start;
        this.DisplayText = displayText;
        this.Color = color;
    }

    Draw()
    {
        Logger.Debug("MyText.Draw() : Enter");

        var ctx = this.Canvas.getContext("2d");
        ctx.beginPath();
        ctx.font = "12px Arial";
        ctx.strokeStyle = this.Color;
        ctx.fillText(this.DisplayText, this.Start.X, this.Start.Y);
        ctx.closePath();

        Logger.Debug("MyText.Draw() : Exit");
    }

    Clear()
    { }
}

class Pen
{
    circle: IGeometry;
    line: IGeometry;
    text: IGeometry;

    Canvas: HTMLCanvasElement;

    private nodeSize: number;

    constructor(canvas: HTMLCanvasElement, _nodeSize: number)
    {
        this.Canvas = canvas;
        this.nodeSize = _nodeSize;
    }

    DrawNode(node: VisualTreeNode)
    {
        Logger.Debug("Pen.DrawNode() : Enter");

        this.circle = new Circle(this.Canvas, new Point(node.X, node.Y), this.nodeSize, node.Color, node.Value.toString());
        this.circle.Draw();

        Logger.Debug("Pen.DrawNode() : Exit");
    }

    DrawConnector(parentNode: VisualTreeNode, node: VisualTreeNode)
    {
        Logger.Debug("Pen.DrawConnector() : Enter");

        this.line = new Line(this.Canvas, new Point(parentNode.X, parentNode.Y + this.nodeSize), new Point(node.X, node.Y - this.nodeSize), parentNode.Color.BottomColor);
        this.line.Draw();

        Logger.Debug("Pen.DrawConnector() : Exit");
    }

    HighlightNode(parentNode: VisualTreeNode, node: VisualTreeNode)
    {
        Logger.Debug("Pen.HighlightNode(" + node.Value + ") : Enter");

        this.circle = new Circle(this.Canvas, new Point(node.X, node.Y), this.nodeSize, ColorMap.GetHighlightColor(), '');
        this.circle.Draw();

        if (parentNode != null)
        {
            this.line = new Line(this.Canvas, new Point(parentNode.X, parentNode.Y + this.nodeSize), new Point(node.X, node.Y - this.nodeSize), ColorMap.GetHighlightColor().BottomColor);
            this.line.Draw();
        }

        Logger.Debug("Pen.HighlightNode() : Exit");
    }

    HighlightOldConnection(parentNode: VisualTreeNode, node: VisualTreeNode)
    {
        Logger.Debug("Pen.HighlightOldConnection(" + node.Value + ") : Enter");

        this.circle = new Circle(this.Canvas, new Point(node.X, node.Y), this.nodeSize, ColorMap.GetDeletionColor(), '');
        this.circle.Draw();

        if (parentNode != null)
        {
            this.line = new Line(this.Canvas, new Point(parentNode.X, parentNode.Y + this.nodeSize), new Point(node.X, node.Y - this.nodeSize), ColorMap.GetDeletionColor().BottomColor);
            this.line.Draw();
        }

        if (node.Right != null)
        {
            this.line = new Line(this.Canvas, new Point(node.X, node.Y + this.nodeSize), new Point(node.Right.X, node.Right.Y - this.nodeSize), ColorMap.GetDeletionColor().BottomColor);
            this.line.Clear();
        }

        if (node.Left != null)
        {
            this.line = new Line(this.Canvas, new Point(node.X, node.Y + this.nodeSize), new Point(node.Left.X, node.Left.Y - this.nodeSize), ColorMap.GetDeletionColor().BottomColor);
            this.line.Clear();
        }

        Logger.Debug("Pen.HighlightOldConnection() : Exit");
    }

    HighlightNewConnection(parentNode: VisualTreeNode, node: VisualTreeNode)
    {
        Logger.Debug("Pen.HighlightNewConnection(" + node.Value + ") : Enter");

        this.circle = new Circle(this.Canvas, new Point(node.X, node.Y), this.nodeSize, ColorMap.GetCreationColor(), '');
        this.circle.Draw();

        // For Root
        if (parentNode != null)
        {
            this.line = new Line(this.Canvas, new Point(parentNode.X, parentNode.Y + this.nodeSize), new Point(node.X, node.Y - this.nodeSize), ColorMap.GetCreationColor().BottomColor);
            this.line.Draw();
        }

        Logger.Debug("Pen.HighlightNewConnection() : Exit");
    }

    DeleteNode(node: VisualTreeNode, parentNode: VisualTreeNode)
    {
        Logger.Debug("Pen.DeleteNode(" + node.Value + ") : Enter");

        this.circle = new Circle(this.Canvas, new Point(node.X, node.Y), this.nodeSize, ColorMap.GetWhiteColor(), '');
        this.circle.Clear();

        if (parentNode != null)
        {
            this.line = new Line(this.Canvas, new Point(parentNode.X, parentNode.Y + this.nodeSize), new Point(node.X, node.Y - this.nodeSize), ColorMap.GetWhiteColor().BottomColor);
            this.line.Clear();
        }

        if (node.Right != null)
        {
            this.line = new Line(this.Canvas, new Point(node.X, node.Y + this.nodeSize), new Point(node.Right.X, node.Right.Y - this.nodeSize), ColorMap.GetWhiteColor().BottomColor);
            this.line.Clear();
        }

        if (node.Left != null)
        {
            this.line = new Line(this.Canvas, new Point(node.X, node.Y + this.nodeSize), new Point(node.Left.X, node.Left.Y - this.nodeSize), ColorMap.GetWhiteColor().BottomColor);
            this.line.Clear();
        }

        Logger.Debug("Pen.DeleteNode() : Exit");
    }

}