const LSPrefix = "BlockSim_";

let PixelRatio = window.devicePixelRatio;

var SET_Layout_Split = 0;
var SET_Layout_L = "";
var SET_Layout_R = "012345678";
var SET_LayoutCtrl = 0;
var SET_LayoutCtrlPos = 0;
var SET_LayoutBtn = 0;
var SET_LayoutColor = 0;
var SET_CanvasW = 320;
var SET_CanvasH = 240;
var SET_TextBufSize = 20;
var SET_TextFontSize = 10;
var SET_Control1Size = 50;
var SET_Control2Size = 15;
var SET_Control3Size = 70;
var SET_KeyTimer = 100;

var SET_Keyboard = false;
var SET_KeyRepeat1 = true;
var SET_KeyRepeat2 = true;
var SET_KeyRepeat3 = true;
var SET_KeyRepeat4 = true;

var SET_KeybStateCursor = false;

if (DataExists(LSPrefix + "SET_Layout_L")) { SET_Layout_L = DataGet(LSPrefix + "SET_Layout_L"); }
if (DataExists(LSPrefix + "SET_Layout_R")) { SET_Layout_R = DataGet(LSPrefix + "SET_Layout_R"); }
if (DataExists(LSPrefix + "SET_Layout_Split")) { SET_Layout_Split = DataGetI(LSPrefix + "SET_Layout_Split"); }
if (DataExists(LSPrefix + "SET_LayoutCtrl")) { SET_LayoutCtrl = DataGetI(LSPrefix + "SET_LayoutCtrl"); }
if (DataExists(LSPrefix + "SET_LayoutCtrlPos")) { SET_LayoutCtrlPos = DataGetI(LSPrefix + "SET_LayoutCtrlPos"); }
if (DataExists(LSPrefix + "SET_LayoutBtn")) { SET_LayoutBtn = DataGetI(LSPrefix + "SET_LayoutBtn"); }
if (DataExists(LSPrefix + "SET_LayoutColor")) { SET_LayoutColor = DataGetI(LSPrefix + "SET_LayoutColor"); }
if (DataExists(LSPrefix + "SET_CanvasW")) { SET_CanvasW = DataGetI(LSPrefix + "SET_CanvasW"); }
if (DataExists(LSPrefix + "SET_CanvasH")) { SET_CanvasH = DataGetI(LSPrefix + "SET_CanvasH"); }
if (DataExists(LSPrefix + "SET_TextBufSize")) { SET_TextBufSize = DataGetI(LSPrefix + "SET_TextBufSize"); }
if (DataExists(LSPrefix + "SET_TextFontSize")) { SET_TextFontSize = DataGetI(LSPrefix + "SET_TextFontSize"); }
if (DataExists(LSPrefix + "SET_Control1Size")) { SET_Control1Size = DataGetI(LSPrefix + "SET_Control1Size"); }
if (DataExists(LSPrefix + "SET_Control2Size")) { SET_Control2Size = DataGetI(LSPrefix + "SET_Control2Size"); }
if (DataExists(LSPrefix + "SET_Control3Size")) { SET_Control3Size = DataGetI(LSPrefix + "SET_Control3Size"); }
if (DataExists(LSPrefix + "SET_KeyTimer")) { SET_KeyTimer = DataGetI(LSPrefix + "SET_KeyTimer"); }

if (DataExists(LSPrefix + "SET_Keyboard")) { SET_Keyboard = ((DataGetI(LSPrefix + "SET_Keyboard") > 0) ? true : false); }
if (DataExists(LSPrefix + "SET_KeyRepeat1")) { SET_KeyRepeat1 = ((DataGetI(LSPrefix + "SET_KeyRepeat1") > 0) ? true : false); }
if (DataExists(LSPrefix + "SET_KeyRepeat2")) { SET_KeyRepeat2 = ((DataGetI(LSPrefix + "SET_KeyRepeat2") > 0) ? true : false); }
if (DataExists(LSPrefix + "SET_KeyRepeat3")) { SET_KeyRepeat3 = ((DataGetI(LSPrefix + "SET_KeyRepeat3") > 0) ? true : false); }
if (DataExists(LSPrefix + "SET_KeyRepeat4")) { SET_KeyRepeat4 = ((DataGetI(LSPrefix + "SET_KeyRepeat4") > 0) ? true : false); }

if (DataExists(LSPrefix + "SET_KeybStateCursor")) { SET_KeybStateCursor = ((DataGetI(LSPrefix + "SET_KeybStateCursor") > 0) ? true : false); }


var RenderUpd = true;
var CameraAngle_ = 0;


let IsBusy = false;
let SET_BusyWork = 200;
let SET_BusyTime = 100;
let SET_BusyWait = 500;

var EditState = 0;


var CameraPosX = 0;
var CameraPosY = 0;
var CameraPosZ = 0;
var CameraRotX = 0;
var CameraRotY = 0;
var CameraRotZ = 0;
var CameraAngle = 60;

var ColorDef1R = 4;
var ColorDef1G = 4;
var ColorDef1B = 4;
var ColorDef2R = 2;
var ColorDef2G = 2;
var ColorDef2B = 2;

var CursorX = 0;
var CursorY = 0;
var CursorZ = 0;

var CursorSizeX = 0;
var CursorSizeY = 0;
var CursorSizeZ = 0;

let CursorSizeX_1 = 0;
let CursorSizeX_2 = 0;
    
let CursorSizeY_1 = 0;
let CursorSizeY_2 = 0;

let CursorSizeZ_1 = 0;
let CursorSizeZ_2 = 0;

var ColorBackR = 0;
var ColorBackG = 0;
var ColorBackB = 0;


const CameraPosStep = 10;
const CameraRotStep = 5;
const CameraPosRound = 1;

const ViewTextureS = 128;
const ViewTextureB = 12;// //4;
const ViewTextureC = 24;// 12;
const ViewTextureX = 18;


// Pi / 4
const ViewAngle45 = 0.78539816339744830961566084581988;

// Pi / 2
const ViewAngle90 = 1.5707963267948966192313216916398;

const ViewSize = 5;
const ViewSize2 = 10;

var ScaleX = 1;
var ScaleY = 1;
var ScaleZ = 1;

var ViewSizeX = ViewSize * ScaleX;
var ViewSizeY = ViewSize * ScaleY;
var ViewSizeZ = ViewSize * ScaleZ;
var ViewSize2X = ViewSize2 * ScaleX;
var ViewSize2Y = ViewSize2 * ScaleY;
var ViewSize2Z = ViewSize2 * ScaleZ;

var CameraMargin = 3;



var ViewScene = new THREE.Scene();
var ViewCamera = new THREE.PerspectiveCamera(CameraAngle, 1, 0.1, 1000);
var ViewCanvas = document.getElementById("ViewCanvas");
var ViewRenderer = new THREE.WebGLRenderer( { canvas: ViewCanvas, antialias: true } );

var KeyState = 0;


var CursorColorR = 2;
var CursorColorG = 2;
var CursorColorB = 2;

var SceneStruct = {};

var SceneBlockListX = [];
var SceneBlockListY = [];
var SceneBlockListZ = [];
var SceneBlockListI = [];

var SceneRotateCoordX = 0;
var SceneRotateCoordY = 0;
var SceneRotateCoordZ = 0;
