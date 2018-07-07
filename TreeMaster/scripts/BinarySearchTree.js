var BinarySerachTree = (function () {
    function BinarySerachTree() {
        this.Root = null;
    }
    BinarySerachTree.prototype.Insert = function (value) {
        Logger.Debug("BinarySearchTree.Insert(" + value + ") : Enter");
        if (this.Root == null) {
            this.Root = new TreeNode(value);
            Logger.Debug("Inserting into Root" + value);
        }
        else {
            var temp = this.Root;
            while (temp != null) {
                if (value > temp.Value) {
                    if (temp.Right == null) {
                        Logger.Debug("Inserting Right" + value);
                        temp.Right = new TreeNode(value);
                        break;
                    }
                    else {
                        temp = temp.Right;
                    }
                }
                else {
                    if (temp.Left == null) {
                        Logger.Debug("Inserting Left" + value);
                        temp.Left = new TreeNode(value);
                        break;
                    }
                    else {
                        temp = temp.Left;
                    }
                }
            }
        }
        Logger.Debug("BinarySearchTree.Insert() : Exit");
    };
    BinarySerachTree.prototype.PreOrder = function (root) {
        Logger.Debug("BinarySearchTree.PreOrder() : Enter");
        if (root != null) {
            this.PreOrder(root.Left);
            Logger.Debug(root.Value);
            Logger.Output(root.Value);
            this.PreOrder(root.Right);
        }
        Logger.Debug("BinarySearchTree.PreOrder() : Exit");
    };
    BinarySerachTree.prototype.Search = function (value) {
        Logger.Debug("BinarySearchTree.Search(" + value + ") : Exit");
        var temp = this.Root;
        var found = false;
        while (temp != null) {
            if (value < temp.Value) {
                temp = temp.Left;
            }
            else if (value > temp.Value) {
                temp = temp.Right;
            }
            else {
                found = true;
                break;
            }
        }
        Logger.Debug("BinarySearchTree.Search(" + found + ") : Exit");
        return found;
    };
    BinarySerachTree.prototype.Delete = function (value) {
    };
    BinarySerachTree.prototype.RefreshStats = function () { };
    return BinarySerachTree;
}());
//# sourceMappingURL=BinarySearchTree.js.map