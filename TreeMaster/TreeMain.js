var TreeMain = (function () {
    function TreeMain(randNumber) {
        this.mainTree = new BinarySerachTree();
        this.randomNumber = randNumber;
    }
    TreeMain.prototype.Insert = function () {
        Logger.Debug("TreeMain.Insert(): Enter");
        this.rVal = this.randomNumber.Generate();
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