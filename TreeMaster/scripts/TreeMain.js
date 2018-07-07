var TreeMain = (function () {
    function TreeMain(dataGen) {
        this.mainTree = new BinarySerachTree();
        this.dataGenerator = dataGen;
    }
    TreeMain.prototype.Insert = function () {
        Logger.Debug("TreeMain.Insert(): Enter");
        this.rVal = this.dataGenerator.Next();
        this.mainTree.Insert(this.rVal);
        Logger.Debug("TreeMain.Insert(): Exit");
    };
    TreeMain.prototype.Display = function () {
        Logger.Debug("TreeMain.Display(): Enter");
        this.mainTree.PreOrder(this.mainTree.Root);
        Logger.Debug("TreeMain.Display(): Exit");
    };
    return TreeMain;
}());
//# sourceMappingURL=TreeMain.js.map