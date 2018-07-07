var mainTree;
function PreOrder() {
    Logger.Debug("InsertRandomNumber(): Enter");
    if (mainTree == null) {
        Logger.Debug("Insert some numbers and try again");
    }
    Logger.Debug("InsertRandomNumber(): Exit");
    return mainTree.Display();
}
function InsertRandomNumber() {
    Logger.Debug("InsertRandomNumber(): Enter");
    if (mainTree == null) {
        Logger.Debug("Creating first tree");
        mainTree = new TreeMain(new RandomNumber());
    }
    Logger.Debug("InsertRandomNumber(): Exit");
    return mainTree.Insert();
}
//# sourceMappingURL=app.js.map