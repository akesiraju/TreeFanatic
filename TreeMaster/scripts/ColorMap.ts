class ColorMap
{
    static GetNewColor(): string
    {
        var r = Math.floor((Math.random() * 100) + 150);
        var g = Math.floor((Math.random() * 100) + 150);
        var b = Math.floor((Math.random() * 100) + 150);

        return "rgb(" + r + "," + g + "," + b + ")";

        //return 'rgb(0,0,0)';
    }

    static GetTextColor(): string
    {
        return 'rgb(0,0,0)';
    }

    static GetWhiteColor(): INodeColor
    {
        return new NodeColor('rgb(255,255,255)', 'rgb(255,255,255)');
    }

    static GetHighlightColor(): INodeColor
    {
        return new NodeColor('rgb(0,0,255)', 'rgb(0,0,255)');
    }

    static GetDeletionColor(): INodeColor
    {
        return new NodeColor('rgb(255,0,0)', 'rgb(255,0,0)');
    }

    static GetCreationColor(): INodeColor
    {
        return new NodeColor('rgb(0,255,0)', 'rgb(0,255,0)');
    }
}

class NodeColor implements INodeColor
{
    UpperColor: string;
    BottomColor: string;

    constructor(upperColor: string, bottomColor: string)
    {
        this.UpperColor = upperColor;
        this.BottomColor = bottomColor;
    }
}