var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    Graphics = PIXI.Graphics,
    Text = PIXI.Text;

var interactive = true;
var stage = new Container(),
    renderer = autoDetectRenderer(512, 512, {transparent: true, resolution: 1});
document.body.appendChild(renderer.view);

var label = new Text(
    'label',
    {font: "16px sans-serif", fill: "#858585"}
);
label.position.set(30, 10);
stage.addChild(label);

var items = ['item1', 'item2', 'item3', 'item4'];

var dropdown = new Graphics();
dropdown.lineStyle(1, 0x000000, 1);
dropdown.beginFill(0xffffff);
dropdown.drawRect(27, 29, 134, 35 + items.length * 30);
dropdown.endFill();
dropdown.interactive = true;
dropdown.buttonMode = true;
dropdown.visible = false;
stage.addChild(dropdown);

var select = new Graphics();
// select.lineStyle(1, 0x000000, 1);
select.beginFill(0xffffff);
select.drawRect(30, 30, 128, 32);
select.endFill();
select.interactive = true;
select.buttonMode = true;
select.click = function () {
    dropdown.visible = !dropdown.visible;
    if (label.style.fill == "#858585")
        label.style.fill = 'pink';
    else
        label.style.fill = "#858585";
    renderer.render(stage);
};
stage.addChild(select);

var triangle = new Text(
    '▼',
    {font: "16px sans-serif", fill: "Black"}
);
triangle.position.set(135, 38);
select.addChild(triangle);

items.forEach(function (item, i) {
    var option = new Graphics();
    option.beginFill(0xffffff);
    option.drawRect(27, 63 + i * 30, 133, 30);
    option.endFill();
    option.interactive = true;
    option.buttonMode = true;
    dropdown.addChild(option);

    var optionText = new Text(
        item,
        {font: "32px sans-serif", fill: "Black"}
    );
    optionText.interactive = true;
    select.buttonMode = true;
    option.click = function () {
        selectText.text = optionText.text;
        dropdown.visible = false;
        label.style = {font: "16px sans-serif", fill: "#858585"};
        renderer.render(stage);
    };

    option.mouseover = function () {
        option.beginFill(0x858585);
        option.drawRect(27, 63 + i * 30, 133, 30);
        option.endFill();
        renderer.render(stage);
    };

    option.mouseout = function () {
        option.beginFill(0xffffff);
        option.drawRect(27, 63 + i * 30, 133, 30);
        option.endFill();
        renderer.render(stage);
    };

    optionText.position.set(30, 60 + i * 30);
    option.addChild(optionText);
});

var line = new Graphics();
line.lineStyle(1, 0x000000, 1);
line.moveTo(31, 61);
line.lineTo(156, 61);
stage.addChild(line);

var selectText = new Text(
    'item1',
    {font: "32px sans-serif", fill: "Black"}
);
selectText.position.set(30, 30);
selectText.interactive = true;
select.buttonMode = true;
select.addChild(selectText);

renderer.render(stage);
