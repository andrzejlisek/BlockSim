function GuiGet()
{
    document.getElementById("ScaleX").value = ScaleX;
    document.getElementById("ScaleY").value = ScaleY;
    document.getElementById("ScaleZ").value = ScaleZ;

    document.getElementById("CameraPosX").value = CameraPosX;
    document.getElementById("CameraPosY").value = CameraPosY;
    document.getElementById("CameraPosZ").value = CameraPosZ;
    document.getElementById("CameraRotX").value = CameraRotX;
    document.getElementById("CameraRotY").value = CameraRotY;
    document.getElementById("CameraRotZ").value = CameraRotZ;
    document.getElementById("CursorX").value = CursorX;
    document.getElementById("CursorY").value = CursorY;
    document.getElementById("CursorZ").value = CursorZ;
    document.getElementById("CameraAngle").value = CameraAngle;

    document.getElementById("Color3R").value = ColorBackR;
    document.getElementById("Color3G").value = ColorBackG;
    document.getElementById("Color3B").value = ColorBackB;
    document.getElementById("Color4R").value = CursorColorR;
    document.getElementById("Color4G").value = CursorColorG;
    document.getElementById("Color4B").value = CursorColorB;

    ColorCtrlDisp(3);
    ColorCtrlDisp(4);
}

function GuiSet()
{
    var ScaleX_ = NumF(document.getElementById("ScaleX").value);
    var ScaleY_ = NumF(document.getElementById("ScaleY").value);
    var ScaleZ_ = NumF(document.getElementById("ScaleZ").value);
    ScaleSet(ScaleX_, ScaleY_, ScaleZ_);

    CameraPosX = NumF(document.getElementById("CameraPosX").value);
    CameraPosY = NumF(document.getElementById("CameraPosY").value);
    CameraPosZ = NumF(document.getElementById("CameraPosZ").value);
    CameraRotX = NumF(document.getElementById("CameraRotX").value);
    CameraRotY = NumF(document.getElementById("CameraRotY").value);
    CameraRotZ = NumF(document.getElementById("CameraRotZ").value);
    CursorX = NumF(document.getElementById("CursorX").value);
    CursorY = NumF(document.getElementById("CursorY").value);
    CursorZ = NumF(document.getElementById("CursorZ").value);
    CameraAngle = NumF(document.getElementById("CameraAngle").value);

    ColorBackR = NumF(document.getElementById("Color3R").value);
    ColorBackG = NumF(document.getElementById("Color3G").value);
    ColorBackB = NumF(document.getElementById("Color3B").value);
    CursorColorR = NumF(document.getElementById("Color4R").value);
    CursorColorG = NumF(document.getElementById("Color4G").value);
    CursorColorB = NumF(document.getElementById("Color4B").value);

    ViewRenderer.setClearColor(ColorNum[ColorBackR] * 65536 + ColorNum[ColorBackG] * 256 + ColorNum[ColorBackB], 1);
    CameraPosAng();
    RetentionCamCur();
    Cursor.Repaint();
}

function ColorGet()
{
    var Obj = SceneGet(CursorX, CursorY, CursorZ);
    if (Obj)
    {
        document.getElementById("Color1R").value = Obj.Color1R;
        document.getElementById("Color1G").value = Obj.Color1G;
        document.getElementById("Color1B").value = Obj.Color1B;
        document.getElementById("Color2R").value = Obj.Color2R;
        document.getElementById("Color2G").value = Obj.Color2G;
        document.getElementById("Color2B").value = Obj.Color2B;
    }
    else
    {
        document.getElementById("Color1R").value = ColorDef1R;
        document.getElementById("Color1G").value = ColorDef1G;
        document.getElementById("Color1B").value = ColorDef1B;
        document.getElementById("Color2R").value = ColorDef2R;
        document.getElementById("Color2G").value = ColorDef2G;
        document.getElementById("Color2B").value = ColorDef2B;
    }
    
    ColorCtrlDisp(1);
    ColorCtrlDisp(2);
}

function ColorSet()
{
    SceneBlockList();
    var Color1R = NumF(document.getElementById("Color1R").value);
    var Color1G = NumF(document.getElementById("Color1G").value);
    var Color1B = NumF(document.getElementById("Color1B").value);
    var Color2R = NumF(document.getElementById("Color2R").value);
    var Color2G = NumF(document.getElementById("Color2G").value);
    var Color2B = NumF(document.getElementById("Color2B").value);
    if (SceneBlockListX.length > 0)
    {
        for (var I = 0; I < SceneBlockListX.length; I++)
        {
            var Obj = SceneGet(SceneBlockListX[I], SceneBlockListY[I], SceneBlockListZ[I]);
            if (Obj)
            {
                UndoRedoUnitBlock1Obj(Obj);
                Obj.SetColor(Color1R, Color1G, Color1B, Color2R, Color2G, Color2B);
                Obj.Repaint();
                RetentionAddObj(Obj);
                UndoRedoUnitBlock2Obj(Obj);
            }
        }
    }
    ColorDef1R = Color1R;
    ColorDef1G = Color1G;
    ColorDef1B = Color1B;
    ColorDef2R = Color2R;
    ColorDef2G = Color2G;
    ColorDef2B = Color2B;
    RetentionCamCur();
}

function ColorSetDef()
{
    ColorDef1R = NumF(document.getElementById("Color1R").value);
    ColorDef1G = NumF(document.getElementById("Color1G").value);
    ColorDef1B = NumF(document.getElementById("Color1B").value);
    ColorDef2R = NumF(document.getElementById("Color2R").value);
    ColorDef2G = NumF(document.getElementById("Color2G").value);
    ColorDef2B = NumF(document.getElementById("Color2B").value);
    RetentionCamCur();
}

function ColorCtrlDisp(Num)
{
    let Val = 0;

    let Cha = "";
    
    for (let I = 0; I < 3; I++)
    {
        let Cha = ColorCha(I);
        Val = NumI(document.getElementById("Color" + Num + Cha).value);
        document.getElementById("Color" + Num + Cha + "_0").value = "0";
        document.getElementById("Color" + Num + Cha + "_1").value = "1";
        document.getElementById("Color" + Num + Cha + "_2").value = "2";
        document.getElementById("Color" + Num + Cha + "_3").value = "3";
        document.getElementById("Color" + Num + Cha + "_4").value = "4";
        switch (Val)
        {
            case 0:
                document.getElementById("Color" + Num + Cha + "_0").value = "[0]";
                break;
            case 1:
                document.getElementById("Color" + Num + Cha + "_1").value = "[1]";
                break;
            case 2:
                document.getElementById("Color" + Num + Cha + "_2").value = "[2]";
                break;
            case 3:
                document.getElementById("Color" + Num + Cha + "_3").value = "[3]";
                break;
            case 4:
                document.getElementById("Color" + Num + Cha + "_4").value = "[4]";
                break;
        }
        document.getElementById("Color" + Num + Cha + "_5").value = "- " + Val;
        document.getElementById("Color" + Num + Cha + "_6").value = Val + " +";
    }
}

function ColorCha(Num)
{
    if (Num == 0) return "R";
    if (Num == 1) return "G";
    if (Num == 2) return "B";
    return "X";
}

function ColorCtrl(NumId)
{
    let Num = Digit(NumId, 3);
    let Val = Digit(NumId, 0);

    switch (Digit(NumId, 0))
    {
        case 5:
            Val = NumI(document.getElementById("Color" + Num + ColorCha(Digit(NumId, 2) - 1)).value);
            if (Val > 0)
            {
                Val--;
            }
            break;
        case 6:
            Val = NumI(document.getElementById("Color" + Num + ColorCha(Digit(NumId, 2) - 1)).value);
            if (Val < 4)
            {
                Val++;
            }
            break;
    }
    
    document.getElementById("Color" + Num + ColorCha(Digit(NumId, 2) - 1)).value = Val;

    switch (Num)
    {
        case 1:
        case 2:
            UndoRedoUnitBegin();
            ColorSet();
            UndoRedoUnitEnd();
            break;
        case 3:
        case 4:
            GuiSet();
            break;
    }
    
    ColorCtrlDisp(Num);
}
