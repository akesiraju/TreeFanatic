class TreeNode implements INode
{
    Left: INode;
    Right: INode;
    Value: number;

    constructor(value: number)
    {
        this.Value = value;
    }
}