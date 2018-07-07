var Logger = (function () {
    function Logger() {
    }
    Logger.Debug = function (msg) {
        console.log(msg);
    };
    Logger.Output = function (msg) {
        //   console.log("---------------" + msg + "-----------------");
    };
    Logger.Clear = function () {
        console.clear();
    };
    return Logger;
}());
//# sourceMappingURL=Logger.js.map