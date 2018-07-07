var BinarySerachTree = (function () {
    function BinarySerachTree() {
        this.Root = null;
    }
    BinarySerachTree.prototype.Insert = function (value) {
        Logger.Debug("BinarySearchTree.Insert(" + value + ") : Enter");
        if (this.Root == null) {
            this.Root = new Data(value);
            Logger.Debug("Inserting into Root" + value);
        }
        else {
            var temp = this.Root;
            while (temp != null) {
                if (value > temp.Value) {
                    if (temp.Right == null) {
                        Logger.Debug("Inserting Right" + value);
                        temp.Right = new Data(value);
                        break;
                    }
                    else {
                        temp = temp.Right;
                    }
                }
                else {
                    if (temp.Left == null) {
                        Logger.Debug("Inserting Left" + value);
                        temp.Left = new Data(value);
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
        Logger.Debug("PreOrder() : Enter");
        if (root != null) {
            this.PreOrder(root.Left);
            Logger.Debug(root.Value);
            this.PreOrder(root.Right);
        }
        Logger.Debug("PreOrder() : Exit");
    };
    return BinarySerachTree;
}());
//# sourceMappingURL=BinarySearchTree.js.map