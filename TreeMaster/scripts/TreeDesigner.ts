class TreeDesigner
{
    private pen: Pen;
    private nodes: Array<IPoint>;

    private startX: number;
    private startY: number;
    private xLeftSize: number;
    private xRightSize: number;
    private yLeftSize: number;
    private yRightSize: number;
    private nodeSize: number;

    constructor(canvas: HTMLCanvasElement)
    {
        this.nodeSize = 10;
        this.pen = new Pen(canvas, this.nodeSize);
        this.nodes = new Array<IPoint>();

        this.startX = canvas.width / 2;
        this.startY = this.nodeSize;
        this.xLeftSize = 60;
        this.yLeftSize = 50;
        this.xRightSize = 60;
        this.yRightSize = 50;
    }

    GenerateRightNode(parentNode: VisualTreeNode, value: number): VisualTreeNode 
    {
        Logger.Debug("TreeDesigner.GenerateRightNode(" + value + ") : Enter");

        var suggestedPoint = this.GetRightSuggestedPoint(new Point(parentNode.X + this.xRightSize, parentNode.Y + this.yRightSize));
        var rightNode = new VisualTreeNode(value, suggestedPoint.X, suggestedPoint.Y, new NodeColor(parentNode.Color.BottomColor, ColorMap.GetNewColor()));
        this.pen.DrawConnector(parentNode, rightNode);
        this.pen.DrawNode(rightNode);

        Logger.Debug("TreeDesigner.GenerateRightNode(" + rightNode + ") : Exit");

        return rightNode;
    }

    GenerateLeftNode(parentNode: VisualTreeNode, value: number): VisualTreeNode
    {
        Logger.Debug("TreeDesigner.GenerateLeftNode(" + value + ") : Enter");

        var suggestedPoint = this.GetLeftSuggestedPoint(new Point(parentNode.X - this.xLeftSize, parentNode.Y + this.yLeftSize));
        var leftNode = new VisualTreeNode(value, suggestedPoint.X, suggestedPoint.Y, new NodeColor(parentNode.Color.BottomColor, ColorMap.GetNewColor()));
        this.pen.DrawConnector(parentNode, leftNode);
        this.pen.DrawNode(leftNode);

        Logger.Debug("TreeDesigner.GenerateLeftNode(" + leftNode + ") : Exit");
        return leftNode;
    }

    GenerateRootNode(value: number): VisualTreeNode
    {
        Logger.Debug("TreeDesigner.GenerateRootNode(" + value + ") : Enter");

        var rootNode = new VisualTreeNode(value, this.startX, this.startY, new NodeColor(ColorMap.GetNewColor(), ColorMap.GetNewColor()));
        this.pen.DrawNode(rootNode);

        Logger.Debug("TreeDesigner.GenerateRootNode(" + rootNode + ") : Exit");

        return rootNode;
    }

    DeleteNode(parentNode: VisualTreeNode, node: VisualTreeNode)
    {
        Logger.Debug("TreeDesigner.DeleteNode(" + node.Value + ") : Enter");

        this.pen.DeleteNode(node, parentNode);

        Logger.Debug("TreeDesigner.DeleteNode() : Exit");
    }

    HighlightNode(parentNode: VisualTreeNode, node: VisualTreeNode)
    {
        if (node != null)
        {
            Logger.Debug("TreeDesigner.HighlightNode(" + node.Value + ") : Enter");

            this.pen.HighlightNode(parentNode, node);

            Logger.Debug("TreeDesigner.HighlightNode() : Exit");
        }
        else
        {
            Logger.Debug("TreeDesigner.HighlightNode() : Enter");
            Logger.Debug("Node is null");
            Logger.Debug("TreeDesigner.HighlightNode() : Exit");
        }
    }

    HighlightOldConnection(parentNode: VisualTreeNode, node: VisualTreeNode)
    {
        Logger.Debug("TreeDesigner.DeleteConnection(" + node.Value + ") : Enter");

        this.pen.HighlightOldConnection(parentNode, node);

        Logger.Debug("TreeDesigner.DeleteConnection() : Exit");
    }

    HighlightNewConnection(parentNode: VisualTreeNode, node: VisualTreeNode)
    {
        Logger.Debug("TreeDesigner.CreateConnection(" + node.Value + ") : Enter");

        this.pen.HighlightNewConnection(parentNode, node);

        Logger.Debug("TreeDesigner.CreateConnection() : Exit");
    }

    private IsNodePoint(inputPoint: IPoint): boolean
    {
        Logger.Debug("TreeDesigner.IsNodePoint(" + inputPoint.X + "," + inputPoint.Y + ") : Enter");

        var result = false;

        for (var i = 0; i < this.nodes.length; i++)
        {
            if (this.nodes[i].X == inputPoint.X && this.nodes[i].Y == inputPoint.Y)
            {
                result = true;
                break;
            }
        }

        Logger.Debug("TreeDesigner.IsNodePoint(" + result + ") : Exit");

        return result;
    }

    private GetLeftSuggestedPoint(inputPoint: IPoint): IPoint
    {
        Logger.Debug("TreeDesigner.GetLeftSuggestedPoint(" + inputPoint.X + "," + inputPoint.Y + ") : Enter");

        var suggestedPoint = new Point(inputPoint.X, inputPoint.Y);

        while (this.IsNodePoint(suggestedPoint) == true)
        {
            suggestedPoint = new Point(suggestedPoint.X - (this.nodeSize * 2), suggestedPoint.Y);
        }

        this.nodes.push(suggestedPoint);

        Logger.Debug("TreeDesigner.GetLeftSuggestedPoint(" + suggestedPoint.X + "," + suggestedPoint.Y + ") : Exit");

        return suggestedPoint;
    }

    private GetRightSuggestedPoint(inputPoint: IPoint): IPoint
    {
        Logger.Debug("TreeDesigner.GetRightSuggestedPoint(" + inputPoint.X + "," + inputPoint.Y + ") : Enter");

        var suggestedPoint = new Point(inputPoint.X, inputPoint.Y);

        while (this.IsNodePoint(suggestedPoint) == true)
        {
            suggestedPoint = new Point(suggestedPoint.X + (this.nodeSize * 2), suggestedPoint.Y);
        }

        this.nodes.push(suggestedPoint);

        Logger.Debug("TreeDesigner.GetRightSuggestedPoint(" + suggestedPoint.X + "," + suggestedPoint.Y + ") : Exit");

        return suggestedPoint;
    }
}