class BinarySerachTree implements IBinarySearchTree
{
    Root: INode;

    constructor()
    {
        this.Root = null;
    }

    Insert(value: number)
    {
        Logger.Debug("BinarySearchTree.Insert(" + value + ") : Enter");

        if (this.Root == null)
        {
            this.Root = new TreeNode(value);
            Logger.Debug("Inserting into Root" + value);
        }
        else
        {
            var temp = this.Root;

            while (temp != null)
            {
                if (value > temp.Value)
                {
                    if (temp.Right == null)
                    {
                        Logger.Debug("Inserting Right" + value);
                        temp.Right = new TreeNode(value);
                        break;
                    }
                    else
                    {
                        temp = temp.Right;
                    }
                }
                else
                {
                    if (temp.Left == null)
                    {
                        Logger.Debug("Inserting Left" + value);
                        temp.Left = new TreeNode(value);
                        break;
                    }
                    else
                    {
                        temp = temp.Left;
                    }
                }
            }
        }

        Logger.Debug("BinarySearchTree.Insert() : Exit");
    }

    PreOrder(root: INode)
    {
        Logger.Debug("BinarySearchTree.PreOrder() : Enter");

        if (root != null)
        {
            this.PreOrder(root.Left);
            Logger.Debug(root.Value);
            Logger.Output(root.Value);
            this.PreOrder(root.Right);
        }

        Logger.Debug("BinarySearchTree.PreOrder() : Exit");
    }

    Search(value: number): boolean
    {
        Logger.Debug("BinarySearchTree.Search(" + value + ") : Exit");

        var temp = this.Root;
        var found = false;

        while (temp != null)
        {
            if (value < temp.Value)
            {
                temp = temp.Left;
            }
            else if (value > temp.Value)
            {
                temp = temp.Right;
            }
            else
            {
                found = true;
                break;
            }
        }

        Logger.Debug("BinarySearchTree.Search(" + found + ") : Exit");

        return found;
    }

    Delete(value: number)
    {
    }

    RefreshStats() { }
}