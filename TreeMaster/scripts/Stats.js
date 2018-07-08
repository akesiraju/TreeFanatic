var CurrentStats = /** @class */ (function () {
    function CurrentStats() {
    }
    CurrentStats.Refresh = function () {
        var div = document.getElementById('currentContent');
        div.innerHTML =
            'Height: ' +
                this.Height +
                '</br>' +
                'Diameter: ' +
                this.Diameter +
                '</br>' +
                'Search Height: ' +
                this.SearchHeight;
    };
    CurrentStats.Height = 0;
    CurrentStats.Diameter = 0;
    CurrentStats.SearchHeight = 0;
    return CurrentStats;
}());
//# sourceMappingURL=Stats.js.map