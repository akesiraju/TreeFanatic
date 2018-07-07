var SmallTreeGenerator = (function () {
    function SmallTreeGenerator(dataGen) {
        this.dataGenerator = dataGen;
        this.treeCaller = new TreeCaller(this.dataGenerator);
    }
    SmallTreeGenerator.prototype.Insert = function () {
        Logger.Debug("TreeGenerator.Insert(): Enter");
        for (var i = 0; i < 10; i++) {
            this.treeCaller.Insert();
        }
        Logger.Debug("TreeGenerator.Insert(): Exit");
    };
    SmallTreeGenerator.prototype.Display = function () {
        Logger.Debug("TreeGenerator.Display(): Enter");
        this.treeCaller.Display();
        Logger.Debug("TreeGenerator.Display(): Exit");
    };
    return SmallTreeGenerator;
}());
//# sourceMappingURL=TreeGenerator.js.map