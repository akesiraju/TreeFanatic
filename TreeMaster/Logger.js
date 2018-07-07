var Logger = (function () {
    function Logger() {
    }
    Logger.Debug = function (msg) {
        //alert(msg);
        var element = document.getElementById('logViewer');
        element.textContent += msg;
        element.textContent += "\r\n";
    };
    return Logger;
}());
//# sourceMappingURL=Logger.js.map