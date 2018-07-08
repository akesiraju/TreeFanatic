var TreeCaller = /** @class */ (function () {
    function TreeCaller(dataGen, treeType) {
        this.mainTree = treeType;
        this.dataGenerator = dataGen;
    }
    TreeCaller.prototype.Insert = function () {
        Logger.Debug("TreeCaller.Insert(): Enter");
        var val = this.dataGenerator.Next();
        // we don't insert negative numbers into tree
        if (val >= 0) {
            this.mainTree.Insert(val);
        }
        Logger.Debug("TreeCaller.Insert(" + val + "): Exit");
    };
    TreeCaller.prototype.PreOrder = function () {
        Logger.Debug("TreeCaller.PreOrder(): Enter");
        this.mainTree.PreOrder(this.mainTree.Root);
        Logger.Debug("TreeCaller.PreOrder(): Exit");
    };
    TreeCaller.prototype.Search = function (value) {
        Logger.Debug("TreeCaller.Search(" + value + "): Enter");
        var result = this.mainTree.Search(value);
        Logger.Debug("TreeCaller.Search(" + result + "): Exit");
        return result;
    };
    TreeCaller.prototype.Delete = function (value) {
        Logger.Debug("TreeCaller.Delete(" + value + "): Enter");
        this.mainTree.Delete(value);
        Logger.Debug("TreeCaller.Delete(): Exit");
    };
    TreeCaller.prototype.RefreshStats = function () {
        Logger.Debug("TreeCaller.RefreshStats(): Enter");
        this.mainTree.RefreshStats();
        Logger.Debug("TreeCaller.RefreshStats(): Exit");
    };
    return TreeCaller;
}());
//# sourceMappingURL=TreeCaller.js.map