var VisualBinarySearchTree = (function () {
    function VisualBinarySearchTree(_treeDesigner) {
        this.Root = null;
        this.treeDesigner = _treeDesigner;
        this.nodes = new Array();
        this.waitTime = 1000;
        this.inserted = false;
        this.deleted = false;
        this.searched = false;
        this.searchHeight = 0;
        this.height = 0;
        this.diameter = 0;
    }
    VisualBinarySearchTree.prototype.Insert = function (value) {
        this.inserted = true;
        Logger.Debug("VisualBinarySearchTree.Insert(" + value + ") : Enter");
        this.nodes.push(value);
        if (this.Root == null) {
            Logger.Debug("Inserting into Root" + value);
            this.Root = this.treeDesigner.GenerateRootNode(value);
        }
        else {
            var temp = this.Root;
            while (temp != null) {
                if (value > temp.Value) {
                    if (temp.Right == null) {
                        Logger.Debug("Inserting Right" + value);
                        temp.Right = this.treeDesigner.GenerateRightNode(temp, value);
                        break;
                    }
                    else {
                        temp = temp.Right;
                    }
                }
                else {
                    if (temp.Left == null) {
                        Logger.Debug("Inserting Left" + value);
                        temp.Left = this.treeDesigner.GenerateLeftNode(temp, value);
                        break;
                    }
                    else {
                        temp = temp.Left;
                    }
                }
            }
        }
        Logger.Debug("VisualBinarySearchTree.Insert() : Exit");
    };
    VisualBinarySearchTree.prototype.PreOrder = function (root) {
        Logger.Debug("VisualBinarySearchTree.PreOrder() : Enter");
        if (root != null) {
            this.PreOrder(root.Left);
            Logger.Debug(root.Value);
            Logger.Output(root.Value);
            this.treeDesigner.HighlightNode(null, root);
            this.PreOrder(root.Right);
        }
        Logger.Debug("VisualBinarySearchTree.PreOrder() : Exit");
    };
    VisualBinarySearchTree.prototype.Search = function (value) {
        this.searched = true;
        this.searchHeight = 0;
        Logger.Debug("VisualBinarySearchTree.Search(" + value + ") : Exit");
        var temp = this.Root;
        var found = false;
        this.treeDesigner.HighlightNode(null, temp);
        while (temp != null) {
            this.searchHeight += 1;
            if (value < temp.Value) {
                this.treeDesigner.HighlightNode(temp, temp.Left);
                temp = temp.Left;
            }
            else if (value > temp.Value) {
                this.treeDesigner.HighlightNode(temp, temp.Right);
                temp = temp.Right;
            }
            else {
                found = true;
                this.treeDesigner.HighlightNode(null, temp);
                break;
            }
        }
        Logger.Debug("VisualBinarySearchTree.Search(" + found + ") : Exit");
        return found;
    };
    VisualBinarySearchTree.prototype.Delete = function (value) {
        this.deleted = true;
        Logger.Debug("VisualBinarySearchTree.Delete(" + value + ") : Enter");
        var temp = this.Root;
        var previous = null;
        var found = false;
        while (temp != null) {
            if (value < temp.Value) {
                previous = temp;
                temp = temp.Left;
            }
            else if (value > temp.Value) {
                previous = temp;
                temp = temp.Right;
            }
            else {
                found = true;
                break;
            }
        }
        // we don't delete root yet
        if (previous != null) {
            // deleting left node
            if (previous.Left != null && previous.Left.Value == temp.Value) {
                this.treeDesigner.HighlightOldConnection(previous, previous.Left);
                if (temp.Right != null) {
                    this.treeDesigner.HighlightNewConnection(previous, temp.Right);
                    // hold the deleted nodes left value
                    var left = temp.Left;
                    // assign the right node of the deleted node to the parent's left of deleted node.
                    previous.Left = temp.Right;
                    // temp storage for the new connection
                    var run = previous.Left;
                    // interate all the way to left until null 
                    while (run.Left != null) {
                        run = run.Left;
                    }
                    // assign the hanging node as the left node at empty spot
                    run.Left = left;
                    this.treeDesigner.HighlightNewConnection(left, run);
                }
                else {
                    previous.Left = temp.Left;
                    this.treeDesigner.HighlightNewConnection(previous, temp.Left);
                }
            }
            else if (previous.Right != null && previous.Right.Value == temp.Value) {
                this.treeDesigner.HighlightOldConnection(previous, previous.Right);
                if (temp.Right != null) {
                    this.treeDesigner.HighlightNewConnection(previous, temp.Right);
                    // hold the deleted nodes left value
                    var left = temp.Left;
                    // assign the right node of the deleted node to the parent's right of deleted node.
                    previous.Right = temp.Right;
                    // temp storage for the new connection
                    var run = previous.Right;
                    // interate all the way to left until null 
                    while (run.Left != null) {
                        run = run.Left;
                    }
                    // assign the hanging node as the left node at empty spot
                    run.Left = left;
                    this.treeDesigner.HighlightNewConnection(left, run);
                }
                else {
                    previous.Right = temp.Left;
                    this.treeDesigner.HighlightNewConnection(previous, temp.Left);
                }
            }
        }
        else {
            this.treeDesigner.HighlightOldConnection(null, temp);
            if (temp.Right == null) {
                this.Root = this.Root.Left;
            }
            else if (temp.Left == null) {
                this.Root = this.Root.Right;
            }
            else {
                // hold the deleted nodes left value
                var left = this.Root.Left;
                this.Root = this.Root.Right;
                temp = temp.Right;
                // interate all the way to left until null 
                while (temp.Left != null) {
                    temp = temp.Left;
                }
                // assign the hanging node as the left node at empty spot
                temp.Left = left;
                this.treeDesigner.HighlightNewConnection(temp, left);
            }
        }
        Logger.Debug("VisualBinarySearchTree.Delete() : Exit");
    };
    VisualBinarySearchTree.prototype.RefreshStats = function () {
        Logger.Debug("VisualBinarySearchTree.RefreshStats() : Enter");
        if (this.inserted || this.deleted) {
            this.searchHeight = -1;
            this.inserted = false;
            this.deleted = false;
        }
        this.height = this.GetHeight(this.Root);
        this.diameter = this.GetDiameter(this.Root);
        CurrentStats.Height = this.height;
        CurrentStats.Diameter = this.diameter;
        CurrentStats.SearchHeight = this.searchHeight;
        CurrentStats.Refresh();
        Logger.Debug("VisualBinarySearchTree.RefreshStats() : Exit");
    };
    VisualBinarySearchTree.prototype.GetHeight = function (root) {
        if (root == null) {
            return 0;
        }
        else {
            return Math.max(this.GetHeight(root.Left), this.GetHeight(root.Right)) + 1;
        }
    };
    VisualBinarySearchTree.prototype.GetDiameter = function (root) {
        if (root == null) {
            return 0;
        }
        else {
            var leftHeight = this.GetHeight(root.Left);
            var rightHeight = this.GetHeight(root.Right);
            var leftDiameter = this.GetDiameter(root.Left);
            var rightDiameter = this.GetDiameter(root.Right);
            return Math.max(leftHeight + rightHeight + 1, leftDiameter, rightDiameter);
        }
    };
    return VisualBinarySearchTree;
}());
//# sourceMappingURL=VisualBinarySearchTree.js.map