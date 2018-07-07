class FixedInput implements IDataInput
{
    index: number;
    input: number[];

    constructor()
    {
        this.index = 0;
        this.input = [5,6,4,7,3,8,2,9,1,0];
    }

    //Generate(min: number, max: number)
    //{
    //    return Math.floor((Math.random() * max) + min);
    //}

    Next() : number
    {
        Logger.Debug("RandomNumber.Generate(): Enter");

        var x = -1;

        if (this.index < this.input.length)
        {
            x = this.input[this.index];
            this.index++;            
        }

        Logger.Debug("RandomNumber.Generate(" + x + "): Exit");
        return x;
    }
}