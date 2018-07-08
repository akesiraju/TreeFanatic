var TreeDesigner = /** @class */ (function () {
    function TreeDesigner(canvas) {
        this.nodeSize = 10;
        this.pen = new Pen(canvas, this.nodeSize);
        this.nodes = new Array();
        this.startX = canvas.width / 2;
        this.startY = this.nodeSize;
        this.xLeftSize = 60;
        this.yLeftSize = 50;
        this.xRightSize = 60;
        this.yRightSize = 50;
    }
    TreeDesigner.prototype.GenerateRightNode = function (parentNode, value) {
        Logger.Debug("TreeDesigner.GenerateRightNode(" + value + ") : Enter");
        var suggestedPoint = this.GetRightSuggestedPoint(new Point(parentNode.X + this.xRightSize, parentNode.Y + this.yRightSize));
        var rightNode = new VisualTreeNode(value, suggestedPoint.X, suggestedPoint.Y, new NodeColor(parentNode.Color.BottomColor, ColorMap.GetNewColor()));
        this.pen.DrawConnector(parentNode, rightNode);
        this.pen.DrawNode(rightNode);
        Logger.Debug("TreeDesigner.GenerateRightNode(" + rightNode + ") : Exit");
        return rightNode;
    };
    TreeDesigner.prototype.GenerateLeftNode = function (parentNode, value) {
        Logger.Debug("TreeDesigner.GenerateLeftNode(" + value + ") : Enter");
        var suggestedPoint = this.GetLeftSuggestedPoint(new Point(parentNode.X - this.xLeftSize, parentNode.Y + this.yLeftSize));
        var leftNode = new VisualTreeNode(value, suggestedPoint.X, suggestedPoint.Y, new NodeColor(parentNode.Color.BottomColor, ColorMap.GetNewColor()));
        this.pen.DrawConnector(parentNode, leftNode);
        this.pen.DrawNode(leftNode);
        Logger.Debug("TreeDesigner.GenerateLeftNode(" + leftNode + ") : Exit");
        return leftNode;
    };
    TreeDesigner.prototype.GenerateRootNode = function (value) {
        Logger.Debug("TreeDesigner.GenerateRootNode(" + value + ") : Enter");
        var rootNode = new VisualTreeNode(value, this.startX, this.startY, new NodeColor(ColorMap.GetNewColor(), ColorMap.GetNewColor()));
        this.pen.DrawNode(rootNode);
        Logger.Debug("TreeDesigner.GenerateRootNode(" + rootNode + ") : Exit");
        return rootNode;
    };
    TreeDesigner.prototype.DeleteNode = function (parentNode, node) {
        Logger.Debug("TreeDesigner.DeleteNode(" + node.Value + ") : Enter");
        this.pen.DeleteNode(node, parentNode);
        Logger.Debug("TreeDesigner.DeleteNode() : Exit");
    };
    TreeDesigner.prototype.HighlightNode = function (parentNode, node) {
        if (node != null) {
            Logger.Debug("TreeDesigner.HighlightNode(" + node.Value + ") : Enter");
            this.pen.HighlightNode(parentNode, node);
            Logger.Debug("TreeDesigner.HighlightNode() : Exit");
        }
        else {
            Logger.Debug("TreeDesigner.HighlightNode() : Enter");
            Logger.Debug("Node is null");
            Logger.Debug("TreeDesigner.HighlightNode() : Exit");
        }
    };
    TreeDesigner.prototype.HighlightOldConnection = function (parentNode, node) {
        Logger.Debug("TreeDesigner.DeleteConnection(" + node.Value + ") : Enter");
        this.pen.HighlightOldConnection(parentNode, node);
        Logger.Debug("TreeDesigner.DeleteConnection() : Exit");
    };
    TreeDesigner.prototype.HighlightNewConnection = function (parentNode, node) {
        Logger.Debug("TreeDesigner.CreateConnection(" + node.Value + ") : Enter");
        this.pen.HighlightNewConnection(parentNode, node);
        Logger.Debug("TreeDesigner.CreateConnection() : Exit");
    };
    TreeDesigner.prototype.IsNodePoint = function (inputPoint) {
        Logger.Debug("TreeDesigner.IsNodePoint(" + inputPoint.X + "," + inputPoint.Y + ") : Enter");
        var result = false;
        for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].X == inputPoint.X && this.nodes[i].Y == inputPoint.Y) {
                result = true;
                break;
            }
        }
        Logger.Debug("TreeDesigner.IsNodePoint(" + result + ") : Exit");
        return result;
    };
    TreeDesigner.prototype.GetLeftSuggestedPoint = function (inputPoint) {
        Logger.Debug("TreeDesigner.GetLeftSuggestedPoint(" + inputPoint.X + "," + inputPoint.Y + ") : Enter");
        var suggestedPoint = new Point(inputPoint.X, inputPoint.Y);
        while (this.IsNodePoint(suggestedPoint) == true) {
            suggestedPoint = new Point(suggestedPoint.X - (this.nodeSize * 2), suggestedPoint.Y);
        }
        this.nodes.push(suggestedPoint);
        Logger.Debug("TreeDesigner.GetLeftSuggestedPoint(" + suggestedPoint.X + "," + suggestedPoint.Y + ") : Exit");
        return suggestedPoint;
    };
    TreeDesigner.prototype.GetRightSuggestedPoint = function (inputPoint) {
        Logger.Debug("TreeDesigner.GetRightSuggestedPoint(" + inputPoint.X + "," + inputPoint.Y + ") : Enter");
        var suggestedPoint = new Point(inputPoint.X, inputPoint.Y);
        while (this.IsNodePoint(suggestedPoint) == true) {
            suggestedPoint = new Point(suggestedPoint.X + (this.nodeSize * 2), suggestedPoint.Y);
        }
        this.nodes.push(suggestedPoint);
        Logger.Debug("TreeDesigner.GetRightSuggestedPoint(" + suggestedPoint.X + "," + suggestedPoint.Y + ") : Exit");
        return suggestedPoint;
    };
    return TreeDesigner;
}());
//# sourceMappingURL=TreeDesigner.js.map