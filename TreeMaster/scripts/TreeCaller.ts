class TreeCaller implements ITree
{
    mainTree: IBinarySearchTree;
    dataGenerator: IDataInput;

    constructor(dataGen: IDataInput, treeType: IBinarySearchTree)
    {
        this.mainTree = treeType;
        this.dataGenerator = dataGen;
    }

    Insert()
    {
        Logger.Debug("TreeCaller.Insert(): Enter");

        var val = this.dataGenerator.Next();

        // we don't insert negative numbers into tree
        if (val >= 0)
        {
            this.mainTree.Insert(val);
        }

        Logger.Debug("TreeCaller.Insert(" + val + "): Exit");
    }

    PreOrder()
    {
        Logger.Debug("TreeCaller.PreOrder(): Enter");

        this.mainTree.PreOrder(this.mainTree.Root);

        Logger.Debug("TreeCaller.PreOrder(): Exit");
    }

    Search(value: number): boolean
    {
        Logger.Debug("TreeCaller.Search(" + value + "): Enter");

        var result = this.mainTree.Search(value);

        Logger.Debug("TreeCaller.Search(" + result + "): Exit");

        return result;
    }

    Delete(value: number)
    {
        Logger.Debug("TreeCaller.Delete(" + value + "): Enter");

        this.mainTree.Delete(value);

        Logger.Debug("TreeCaller.Delete(): Exit");        
    }

    RefreshStats()
    {
        Logger.Debug("TreeCaller.RefreshStats(): Enter");        

        this.mainTree.RefreshStats();

        Logger.Debug("TreeCaller.RefreshStats(): Exit");        
    }
}