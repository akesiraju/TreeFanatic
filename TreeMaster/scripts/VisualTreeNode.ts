class VisualTreeNode implements INode, IPoint
{
    Left: VisualTreeNode;
    Right: VisualTreeNode;
    Value: number;
    X: number;
    Y: number;
    Color: INodeColor;

    constructor(value: number, x:number, y:number, color: INodeColor)
    {
        this.Value = value;
        this.X = x;
        this.Y = y;
        this.Color = color;   
    }
}