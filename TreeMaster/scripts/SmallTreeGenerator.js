var SmallTreeGenerator = /** @class */ (function () {
    function SmallTreeGenerator(dataGen, treeType, onlyRoot) {
        this.nodeCount = 50;
        this.treeCaller = new TreeCaller(dataGen, treeType);
        if (onlyRoot == true) {
            this.nodeCount = 1;
        }
    }
    SmallTreeGenerator.prototype.Insert = function () {
        Logger.Clear();
        Logger.Debug("TreeGenerator.Insert(): Enter");
        for (var i = 0; i < this.nodeCount; i++) {
            this.treeCaller.Insert();
        }
        // Reset this to 1, so that all future calls will be insert one element
        this.nodeCount = 1;
        this.RefreshStats();
        Logger.Debug("TreeGenerator.Insert(): Exit");
    };
    SmallTreeGenerator.prototype.PreOrder = function () {
        Logger.Debug("TreeGenerator.PreOrder(): Enter");
        this.treeCaller.PreOrder();
        Logger.Debug("TreeGenerator.PreOrder(): Exit");
    };
    SmallTreeGenerator.prototype.Search = function (value) {
        Logger.Debug("TreeGenerator.Search(" + value + "): Enter");
        var result = this.treeCaller.Search(value);
        this.RefreshStats();
        Logger.Debug("TreeGenerator.Search(" + result + "): Exit");
        return result;
    };
    SmallTreeGenerator.prototype.Delete = function (value) {
        Logger.Debug("TreeGenerator.Delete(" + value + "): Enter");
        this.treeCaller.Delete(value);
        this.RefreshStats();
        Logger.Debug("TreeGenerator.Delete(): Exit");
    };
    SmallTreeGenerator.prototype.RefreshStats = function () {
        Logger.Debug("TreeGenerator.RefreshStats(): Enter");
        this.treeCaller.RefreshStats();
        Logger.Debug("TreeGenerator.RefreshStats(): Exit");
    };
    return SmallTreeGenerator;
}());
//# sourceMappingURL=SmallTreeGenerator.js.map