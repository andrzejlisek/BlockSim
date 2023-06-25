let CharArrowUp = String.fromCharCode(0x2191);
let CharArrowDown = String.fromCharCode(0x2193);
let CharArrowRight = String.fromCharCode(0x2192);
let CharArrowLeft = String.fromCharCode(0x2190);
let CharArrowUpDown = String.fromCharCode(0x2195);

let CharArrowUpLeft = String.fromCharCode(0x2196);
let CharArrowUpRight = String.fromCharCode(0x2197);
let CharArrowDownLeft = String.fromCharCode(0x2199);
let CharArrowDownRight = String.fromCharCode(0x2198);

let CharArrowCircleRight = String.fromCharCode(0x21BB);
let CharArrowCircleLeft = String.fromCharCode(0x21BA);

document.getElementById("ModuleSplitL").value = CharArrowLeft + "|";
document.getElementById("ModuleSwapXL").value = CharArrowRight;
document.getElementById("ModuleSwap0L").value = CharArrowUpDown;
document.getElementById("ModuleSwap1L").value = CharArrowUpDown;
document.getElementById("ModuleSwap2L").value = CharArrowUpDown;
document.getElementById("ModuleSwap3L").value = CharArrowUpDown;
document.getElementById("ModuleSwap4L").value = CharArrowUpDown;
document.getElementById("ModuleSwap5L").value = CharArrowUpDown;
document.getElementById("ModuleSwap6L").value = CharArrowUpDown;
document.getElementById("ModuleSwap7L").value = CharArrowUpDown;
document.getElementById("ModuleSwap8L").value = CharArrowUpDown;
document.getElementById("ModuleSwap9L").value = CharArrowUpDown;
document.getElementById("ModuleSplitR").value = "|" + CharArrowRight;
document.getElementById("ModuleSwapXR").value = CharArrowLeft;
document.getElementById("ModuleSwap0R").value = CharArrowUpDown;
document.getElementById("ModuleSwap1R").value = CharArrowUpDown;
document.getElementById("ModuleSwap2R").value = CharArrowUpDown;
document.getElementById("ModuleSwap3R").value = CharArrowUpDown;
document.getElementById("ModuleSwap4R").value = CharArrowUpDown;
document.getElementById("ModuleSwap5R").value = CharArrowUpDown;
document.getElementById("ModuleSwap6R").value = CharArrowUpDown;
document.getElementById("ModuleSwap7R").value = CharArrowUpDown;
document.getElementById("ModuleSwap8R").value = CharArrowUpDown;
document.getElementById("ModuleSwap9R").value = CharArrowUpDown;

document.getElementById("CtrlBtn15").value = CharArrowUp;
document.getElementById("CtrlBtn11").value = CharArrowUpRight + CharArrowUpLeft;
document.getElementById("CtrlBtn16").value = CharArrowDown;
document.getElementById("CtrlBtn25").value = CharArrowCircleLeft;
document.getElementById("CtrlBtn21").value = CharArrowUp;
document.getElementById("CtrlBtn26").value = CharArrowCircleRight;
document.getElementById("CtrlBtn35").value = CharArrowUp;
document.getElementById("CtrlBtn31").value = CharArrowUpRight + CharArrowUpLeft;
document.getElementById("CtrlBtn36").value = CharArrowDown;
document.getElementById("CtrlBtn45").value = CharArrowUp;
document.getElementById("CtrlBtn41").value = CharArrowUpRight + CharArrowUpLeft;
document.getElementById("CtrlBtn46").value = CharArrowDown;
document.getElementById("CtrlBtn13").value = CharArrowLeft;
document.getElementById("CtrlBtn12").value = CharArrowDownLeft + CharArrowDownRight;
document.getElementById("CtrlBtn14").value = CharArrowRight;
document.getElementById("CtrlBtn23").value = CharArrowLeft;
document.getElementById("CtrlBtn22").value = CharArrowDown;
document.getElementById("CtrlBtn24").value = CharArrowRight;
document.getElementById("CtrlBtn33").value = CharArrowLeft;
document.getElementById("CtrlBtn32").value = CharArrowDownLeft + CharArrowDownRight;
document.getElementById("CtrlBtn34").value = CharArrowRight;
document.getElementById("CtrlBtn43").value = CharArrowLeft;
document.getElementById("CtrlBtn42").value = CharArrowDownLeft + CharArrowDownRight;
document.getElementById("CtrlBtn44").value = CharArrowRight;


if (navigator.maxTouchPoints)
{
    ClickPrepare(document.body, 0);
}


GuiArrange();

SettingsGet();

let Cursor = new CursorObject();
let CursorVisible = true;

GuiSetCanvas()

GuiSetControls();
CursorEditStateBtn();

ColorGet();
GuiGet();
StorageList();
UndoRedoClear();

document.addEventListener("keydown", KeyPress, false);

