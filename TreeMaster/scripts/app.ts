var mainTree;
var treeType;

function PreOrder()
{
    Logger.Debug("PreOrder(): Enter");

    if (mainTree == null)
    {
        Logger.Debug("Creating first tree");
        var canvas = <HTMLCanvasElement>document.getElementById('drawingBoard');
        mainTree = new SmallTreeGenerator(new RandomNumber(), new VisualBinarySearchTree(new TreeDesigner(canvas)), false);
        mainTree.Insert();
    }

    Logger.Debug("PreOrder(): Exit");    
    return mainTree.PreOrder();
}

function InsertRandomNumber()
{
    Logger.Debug("InsertRandomNumber(): Enter");

    if (mainTree == null)
    {
        Logger.Debug("Creating first tree");
        var canvas = <HTMLCanvasElement>document.getElementById('drawingBoard');
        mainTree = new SmallTreeGenerator(new RandomNumber(), new VisualBinarySearchTree(new TreeDesigner(canvas)), true);
    }

    Logger.Debug("InsertRandomNumber(): Exit");
    return mainTree.Insert();
}

function GenerateTree()
{
    ClearTree();
    Logger.Debug("GenerateTree(): Enter");

    Logger.Debug("Creating new tree");
    var canvas = <HTMLCanvasElement>document.getElementById('drawingBoard');
    mainTree = new SmallTreeGenerator(new RandomNumber(), new VisualBinarySearchTree(new TreeDesigner(canvas)), false);

    Logger.Debug("GenerateTree(): Exit");
    return mainTree.Insert();
}

function ClearTree()
{
    Logger.Clear();
    Logger.Debug("ClearTree(): Enter");

    var canvas = <HTMLCanvasElement>document.getElementById('drawingBoard');
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var deleteBox = <HTMLInputElement>document.getElementById('deleteBox');
    deleteBox.value = '';

    var searchBox = <HTMLInputElement>document.getElementById('searchBox');
    searchBox.value = '';

    var currentContent = <HTMLInputElement>document.getElementById('currentContent');
    currentContent.innerHTML = '';

    mainTree = null;

    Logger.Debug("ClearTree(): Exit");
}

function Search()
{
    Logger.Debug("Search(): Enter");

    var searchBox = <HTMLInputElement>document.getElementById('searchBox');
    var searchResult = <HTMLLabelElement>document.getElementById('searchResult');

    Logger.Debug("Searching for : " + searchBox.value);

    var searchString = parseInt(searchBox.value);

    Logger.Debug("Searching for : " + searchString);

    if (!isNaN(searchString))
    {
        var result = mainTree.Search(searchString);
        Logger.Debug("Result : " + result);

        searchResult.textContent = result == true ? "Found!" : "Not Found!";
        searchResult.style.color = result == true ? 'green' : 'red';
    }
    else
    {
        searchResult.textContent = SearchProcessor.GetResult(searchBox.value);
        searchResult.style.color = 'blue';
    }

    Logger.Debug("Search(): Exit");
}

function Delete()
{
    Logger.Debug("Delete(): Enter");

    var deleteBox = <HTMLInputElement>document.getElementById('deleteBox');

    Logger.Debug("Deleting : " + deleteBox.value);

    var deleteString = parseInt(deleteBox.value);

    Logger.Debug("Deleting : " + deleteString);

    if (!isNaN(deleteString))
    {
        mainTree.Delete(deleteString);
    }
    else
    {
        Logger.Debug("Cannot delete : " + deleteString);
    }

    Logger.Debug("Delete(): Exit");
}

function Init()
{
    Logger.Clear();
    Logger.Debug("Init(): Enter");

    ClearTree();

    var canvas = <HTMLCanvasElement>document.getElementById('drawingBoard');
    var ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth - 200;
    ctx.canvas.height = window.innerHeight - 50;

    Logger.Debug("Init(): Exit");
}