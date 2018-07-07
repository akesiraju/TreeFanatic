class CurrentStats
{
    static Height: number = 0;
    static Diameter: number = 0;
    static SearchHeight: number = 0;

    static Refresh()
    {
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
    }
}

