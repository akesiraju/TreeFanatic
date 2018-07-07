class SmallTreeGenerator implements ITree
{
    nodeCount: number = 50;
    rVal: number;
    treeCaller: ITree;

    constructor(dataGen: IDataInput, treeType: IBinarySearchTree, onlyRoot: boolean)
    {
        this.treeCaller = new TreeCaller(dataGen, treeType);

        if (onlyRoot == true)
        {
            this.nodeCount = 1;
        }
    }

    Insert()
    {
        Logger.Clear();
        Logger.Debug("TreeGenerator.Insert(): Enter");

        for (var i = 0; i < this.nodeCount; i++)
        {
            this.treeCaller.Insert();
        }        

        // Reset this to 1, so that all future calls will be insert one element
        this.nodeCount = 1;
        this.RefreshStats();

        Logger.Debug("TreeGenerator.Insert(): Exit");
    }

    PreOrder()
    {
        Logger.Debug("TreeGenerator.PreOrder(): Enter");

        this.treeCaller.PreOrder();

        Logger.Debug("TreeGenerator.PreOrder(): Exit");
    }

    Search(value: number): boolean
    {
        Logger.Debug("TreeGenerator.Search(" + value + "): Enter");

        var result = this.treeCaller.Search(value);
        this.RefreshStats();

        Logger.Debug("TreeGenerator.Search(" + result + "): Exit");

        return result;
    }

    Delete(value: number)
    {
        Logger.Debug("TreeGenerator.Delete(" + value + "): Enter");

        this.treeCaller.Delete(value);        
        this.RefreshStats();

        Logger.Debug("TreeGenerator.Delete(): Exit");
    }

    RefreshStats()
    {
        Logger.Debug("TreeGenerator.RefreshStats(): Enter");

        this.treeCaller.RefreshStats();

        Logger.Debug("TreeGenerator.RefreshStats(): Exit");
    }
}