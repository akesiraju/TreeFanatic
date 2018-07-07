interface IBinarySearchTree
{
    Root: INode;
    Insert(value: number);
    PreOrder(root: INode);
    Search(value: number): boolean;
    Delete(value: number);
    RefreshStats();
}

interface IDataInput
{
    Next(): number;
}

interface INode
{
    Left: INode;
    Right: INode;
    Value: number;
}

interface IPoint
{
    X: number;
    Y: number;
}

interface ITree
{
    Insert();
    PreOrder();
    Search(value: number): boolean;
    Delete(value: number);
    RefreshStats();
}

interface IGeometry
{
    Draw();
    Clear();
}

interface INodeColor
{
    UpperColor: string;
    BottomColor: string;
}