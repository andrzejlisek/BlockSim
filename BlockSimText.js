function TextExport(Mode)
{
    document.getElementById("TextBuffer").value = BufExport(Mode);
    RetentionText();
}

function TextImport(Mode)
{
    BufImport(document.getElementById("TextBuffer").value, Mode);
}

function TextCopy()
{
    if (navigator.clipboard.writeText)
    {
        navigator.clipboard.writeText(document.getElementById("TextBuffer").value);
    }
    else
    {
        alert("Copy to clipboard is not possible in this browser.");
    }
}

function TextPaste_(X)
{
    document.getElementById("TextBuffer").value = X;
    RetentionText();
}


function TextPaste()
{
    if (navigator.clipboard.readText)
    {
        navigator.clipboard.readText().then(clipText => TextPaste_(clipText)).catch(error => alert("Paste error: " + error));
    }
    else
    {
        alert("Paste from clipboard is not possible in this browser.");
    }
}

function BufExport(Mode)
{
    let Buf = Mode + "\n";
    if (Mode < 0)
    {
        if (Mode > (0 - 10))
        {
            Buf = Mode + "\n";
        }
        else
        {
            Mode = Mode + 10;
            Buf = (0 - Mode) + "\n";
        }
    }
    Buf = Buf + ScaleX + "|" + ScaleY + "|" + ScaleZ + "\n";
    Buf = Buf + CameraPosX + "|" + CameraPosY + "|" + CameraPosZ + "\n";
    Buf = Buf + CameraRotX + "|" + CameraRotY + "|" + CameraRotZ + "\n";
    Buf = Buf + CameraAngle + "\n";
    Buf = Buf + CursorX + "|" + CursorY + "|" + CursorZ + "\n";
    Buf = Buf + CursorSizeX + "|" + CursorSizeY + "|" + CursorSizeZ + "\n";
    Buf = Buf + BufExportColor(ColorBackR, ColorBackG, ColorBackB) + "|"
    Buf = Buf + BufExportColor(CursorColorR, CursorColorG, CursorColorB) + "|";
    Buf = Buf + BufExportColor(ColorDef1R, ColorDef1G, ColorDef1B) + "|";
    Buf = Buf + BufExportColor(ColorDef2R, ColorDef2G, ColorDef2B) + "\n";
    var Obj;
    var MinMaxInit = false;
    var MinX = 0;
    var MaxX = 0;
    var MinY = 0;
    var MaxY = 0;
    var MinZ = 0;
    var MaxZ = 0;

    let TempObjList = [];

    var MinMaxInit = false;
    if (Mode > 0)
    {
        for (var I in SceneStruct)
        {
            Obj = SceneStruct[I];
            if (Obj)
            {
                TempObjList.push(Obj);
                let Obj_PosX = Obj.PosX;
                let Obj_PosY = Obj.PosY;
                let Obj_PosZ = Obj.PosZ;
                if (MinMaxInit)
                {
                    if (MinX > Obj_PosX) { MinX = Obj_PosX; }
                    if (MaxX < Obj_PosX) { MaxX = Obj_PosX; }
                    if (MinY > Obj_PosY) { MinY = Obj_PosY; }
                    if (MaxY < Obj_PosY) { MaxY = Obj_PosY; }
                    if (MinZ > Obj_PosZ) { MinZ = Obj_PosZ; }
                    if (MaxZ < Obj_PosZ) { MaxZ = Obj_PosZ; }
                }
                else
                {
                    MinX = Obj_PosX;
                    MaxX = Obj_PosX;
                    MinY = Obj_PosY;
                    MaxY = Obj_PosY;
                    MinZ = Obj_PosZ;
                    MaxZ = Obj_PosZ;
                    MinMaxInit = 1;
                }
            }
        }
    }
    if (Mode < 0)
    {
        SceneBlockListCursor();
        for (var I = 0; I < SceneBlockListX.length; I++)
        {
            let Obj_PosX = SceneBlockListX[I];
            let Obj_PosY = SceneBlockListY[I];
            let Obj_PosZ = SceneBlockListZ[I];
            Obj = SceneGet(Obj_PosX, Obj_PosY, Obj_PosZ);
            if (Obj)
            {
                TempObjList.push(Obj);
                if (MinMaxInit)
                {
                    if (MinX > Obj_PosX) { MinX = Obj_PosX; }
                    if (MaxX < Obj_PosX) { MaxX = Obj_PosX; }
                    if (MinY > Obj_PosY) { MinY = Obj_PosY; }
                    if (MaxY < Obj_PosY) { MaxY = Obj_PosY; }
                    if (MinZ > Obj_PosZ) { MinZ = Obj_PosZ; }
                    if (MaxZ < Obj_PosZ) { MaxZ = Obj_PosZ; }
                }
                else
                {
                    MinX = Obj_PosX;
                    MaxX = Obj_PosX;
                    MinY = Obj_PosY;
                    MaxY = Obj_PosY;
                    MinZ = Obj_PosZ;
                    MaxZ = Obj_PosZ;
                    MinMaxInit = 1;
                }
            }
        }
    }
    Buf = Buf + MinX + "|" + MaxX + "|" + MinY + "|" + MaxY + "|" + MinZ + "|" + MaxZ + "\n";

    if ((Mode == -1) || (Mode == 1))
    {
        for (var I = 0; I < TempObjList.length; I++)
        {
            var Obj = TempObjList[I];
            if (Obj)
            {
                Buf = Buf + Obj.PosX + "|" + Obj.PosY + "|" + Obj.PosZ;
                Buf = Buf + "|" + BufExportColor(Obj.Color1R, Obj.Color1G, Obj.Color1B);
                Buf = Buf + "|" + BufExportColor(Obj.Color2R, Obj.Color2G, Obj.Color2B);
                Buf = Buf + "|" + BufExportFace(Obj.Face2, Obj.Face3) + BufExportFace(Obj.Face0, Obj.Face1) + BufExportFace(Obj.Face4, Obj.Face5);
                Buf = Buf + "|000";
                Buf = Buf + "\n";
            }
        }
    }

    if ((Mode == -2) || (Mode == 2))
    {
        let Buf1;
        let Buf2;
        for (var ZZZ = MinZ; ZZZ <= MaxZ; ZZZ++)
        {
            for (var YYY = MinY; YYY <= MaxY; YYY++)
            {
                Buf1 = "";
                Buf2 = "";
                for (var XXX = MinX; XXX <= MaxX; XXX++)
                {
                    if (Mode > 0)
                    {
                        Obj = SceneGet(XXX, YYY, ZZZ);
                    }
                    else
                    {
                        Obj = 0;
                        for (var I = 0; I < TempObjList.length; I++)
                        {
                            if ((TempObjList[I].PosX == XXX) && (TempObjList[I].PosY == YYY) && (TempObjList[I].PosZ == ZZZ))
                            {
                                Obj = TempObjList[I];
                                TempObjList.splice(I, 1);
                                break;
                            }
                        }
                    }
                    if (Obj)
                    {
                        Buf1 += BufExportColor(Obj.Color1R, Obj.Color1G, Obj.Color1B);
                        Buf1 += BufExportColor(Obj.Color2R, Obj.Color2G, Obj.Color2B);
                        Buf2 += (BufExportFace(Obj.Face2, Obj.Face3) + BufExportFace(Obj.Face0, Obj.Face1) + BufExportFace(Obj.Face4, Obj.Face5));
                        Buf2 += "000";
                    }
                    else
                    {
                        Buf1 += "___";
                        Buf1 += "___";
                        Buf2 += "___";
                        Buf2 += "___";
                    }
                }
                Buf = Buf + Buf1 + "\n" + Buf2 + "\n";
            }
        }
    }
    return Buf;
}

function BufExportColor(R_, G_, B_)
{
    return R_ + "" + G_ + "" + B_;
}

function BufExportFace(F1_, F2_)
{
    if ((!F1_) && (!F2_))
    {
        return "0";
    }
    if ((F1_) && (!F2_))
    {
        return "1";
    }
    if ((!F1_) && (F2_))
    {
        return "2";
    }
    if ((F1_) && (F2_))
    {
        return "3";
    }
}

let BufImport_XMode;
let BufImport_Buf;
let BufImport_I;
let BufImport_II;
let BufImport_L;
let BufImport_X;
let BufImport_Y;
let BufImport_Z;
let BufImport_X1;
let BufImport_Y1;
let BufImport_Z1;
let BufImport_X2;
let BufImport_Y2;
let BufImport_Z2;

function BufImport(Buf_, XMode)
{
    BusyStart();
    BufImport_I = 0;
    BufImport_L = 0;


    BufImport_XMode = XMode;

    console.log("Start " + performance.now());

    let ImportSuccess = true;

    let Buf = Buf_.split("\n");
    BufImport_Buf = Buf;

    let BufDataIdx = 9;
    
    if (Buf.length < BufDataIdx)
    {
        ImportSuccess = false;
    }
    let Mode = 0;

    SceneBlockListClear();

    if (ImportSuccess)
    {
        let BufX = Buf[0].split("|");
        Mode = NumI(BufX[0]);
        
        if (XMode == 0)
        {
            if (Mode == 0)
            {
                XMode = 1;
            }
            if (Mode < 0)
            {
                XMode = 2;
            }
            if (Mode > 0)
            {
                XMode = 3;
            }
        }

        if (Mode < 0)
        {
            Mode = 0 - Mode;
        }

        let CursorX__ = 0;
        let CursorY__ = 0;
        let CursorZ__ = 0;

        if ((XMode == 2) || (XMode == 3))
        {
            EditState = 0;
        }
        CursorEditStateBtn();

        if ((XMode == 1) || (XMode == 3))
        {
            if (XMode == 3)
            {
                SceneClear();

                BufX = Buf[1].split("|");
                let ScaleX_ = NumF(BufX[0]);
                let ScaleY_ = NumF(BufX[1]);
                let ScaleZ_ = NumF(BufX[2]);
                ScaleSet(ScaleX_, ScaleY_, ScaleZ_);
            }

            BufX = Buf[2].split("|");
            CameraPosX = NumF(BufX[0]);
            CameraPosY = NumF(BufX[1]);
            CameraPosZ = NumF(BufX[2]);

            BufX = Buf[3].split("|");
            CameraRotX = NumI(BufX[0]);
            CameraRotY = NumI(BufX[1]);
            CameraRotZ = NumI(BufX[2]);

            BufX = Buf[4].split("|");
            CameraAngle = NumI(BufX[0]);
        }

        BufX = Buf[5].split("|");
        CursorX__ = NumI(BufX[0]);
        CursorY__ = NumI(BufX[1]);
        CursorZ__ = NumI(BufX[2]);
        
        if (XMode == 3)
        {
            CursorX = CursorX__;
            CursorY = CursorY__;
            CursorZ = CursorZ__;
            CursorX__ = 0;
            CursorY__ = 0;
            CursorZ__ = 0;
        }
        else
        {
            CursorX__ = CursorX - CursorX__;
            CursorY__ = CursorY - CursorY__;
            CursorZ__ = CursorZ - CursorZ__;
        }


        if (XMode == 3)
        {
            UndoRedoClear();
        }
        else
        {
            UndoRedoUnitBegin();
        }


        if ((XMode == 2) || (XMode == 3))
        {
            BufX = Buf[6].split("|");
            CursorSizeX = NumI(BufX[0]);
            CursorSizeY = NumI(BufX[1]);
            CursorSizeZ = NumI(BufX[2]);
        }
        
        if (XMode == 3)
        {
            BufX = Buf[7].split("|");
            BufImportColor(BufX[0]);
            ColorBackR = BufImportColorR;
            ColorBackG = BufImportColorG;
            ColorBackB = BufImportColorB;
            BufImportColor(BufX[1]);
            CursorColorR = BufImportColorR;
            CursorColorG = BufImportColorG;
            CursorColorB = BufImportColorB;
            BufImportColor(BufX[2]);
            ColorDef1R = BufImportColorR;
            ColorDef1G = BufImportColorG;
            ColorDef1B = BufImportColorB;
            BufImportColor(BufX[3]);
            ColorDef2R = BufImportColorR;
            ColorDef2G = BufImportColorG;
            ColorDef2B = BufImportColorB;
        }
        CursorCalcBounds();
        
        BufX = Buf[8].split("|");
        BufImport_X1 = NumI(BufX[0]);
        BufImport_X2 = NumI(BufX[1]);
        BufImport_Y1 = NumI(BufX[2]);
        BufImport_Y2 = NumI(BufX[3]);
        BufImport_Z1 = NumI(BufX[4]);
        BufImport_Z2 = NumI(BufX[5]);
        
        if ((XMode == 2) || (XMode == 3))
        {
            console.log("Malowanie Start " + performance.now());
            if (Mode == 1)
            {
                for (var I = BufDataIdx; I < Buf.length; I++)
                {
                    BufX = Buf[I].split("|");
                    if (BufX.length > 6)
                    {
                        if (SceneExists(NumI(BufX[0]) + CursorX__, NumI(BufX[1]) + CursorY__, NumI(BufX[2]) + CursorZ__))
                        {
                            ImportSuccess = false;
                        }
                    }
                }
            console.log("Malowanie Zbadano " + performance.now());
                if (ImportSuccess)
                {
                    BufImport_X = CursorX__;
                    BufImport_Y = CursorY__;
                    BufImport_Z = CursorZ__;
                    BufImport_I = BufDataIdx;
                    BufImport_L = Buf.length;
                    BufImportPaint1();
                }
            }
            if (Mode == 2)
            {
                let Buf1 = "";
                let Buf2 = "";
                let Buf3 = "";
                let Buf4 = "";
                var I = BufDataIdx;
                var II;
                for (var ZZZ = BufImport_Z1; ZZZ <= BufImport_Z2; ZZZ++)
                {
                    for (var YYY = BufImport_Y1; YYY <= BufImport_Y2; YYY++)
                    {
                        for (var XXX = BufImport_X1; XXX <= BufImport_X2; XXX++)
                        {
                            if (SceneExists(XXX, YYY, ZZZ))
                            {
                                ImportSuccess = false;
                            }
                        }
                    }
                }
            console.log("Malowanie Zbadano " + performance.now());
                if (ImportSuccess)
                {
                    BufImport_X = BufImport_X2 - BufImport_X1 + 1;
                    BufImport_Y = BufImport_Y2 - BufImport_Y1 + 1;
                    BufImport_Z = BufImport_Z2 - BufImport_Z1 + 1;
                    BufImport_I = 0;
                    BufImport_L = BufImport_X * BufImport_Y * BufImport_Z;
                    BufImportPaint2();
                }
            }
            console.log("Malowanie Stop " + performance.now());
        }

    }

    BufImportFinish1();
}

function BufImportFinish1()
{
    if (BufImport_L > 0)
    {
        setTimeout(BufImportFinish1, SET_BusyWait);
        return;
    }


    if (BufImport_XMode == 3)
    {
        UndoRedoClear();
    }
    else
    {
        UndoRedoUnitEnd(false);
    }


    console.log("A " + performance.now());
    
    RetentionCamCur();

    console.log("B " + performance.now());
    
    SceneBlockListRepaintAsync();
    BufImportFinish2();
}
function BufImportFinish2()
{

    if (SceneBlockListRepaintAsyncL > 0)
    {
        setTimeout(BufImportFinish2, SET_BusyWait);
        return;
    }

    console.log("C " + performance.now());

    if (BufImport_XMode == 2)
    {
        CursorHide();
        Cursor.SetSize(CursorSizeX, CursorSizeY, CursorSizeZ);
        Cursor.SetPosition(CursorX, CursorY, CursorZ);
        CursorCalcBounds();
        CursorShow();
        ScreenRefresh();
    }
    else
    {
        BufScreenRepaintPre();
        BufScreenRepaint();
        ColorSetDef();
    }
    console.log("Stop " + performance.now());
    BusyStop();
}


function BufImportPaint1()
{
    BusyStatus(BusyStatusPercent(BufImport_I / 2, BufImport_L));

    let WorkTime = performance.now() + SET_BusyWork;
    console.log(">>>Malujemy 1 " + BufImport_I + "/" + BufImport_L);
    while (true)
    {
        console.log("Malujemy 1 " + BufImport_I + "/" + BufImport_L);
        let BufX = BufImport_Buf[BufImport_I].split("|");
        if (BufX.length > 6)
        {
            let IdxX = NumI(BufX[0]) + BufImport_X;
            let IdxY = NumI(BufX[1]) + BufImport_Y;
            let IdxZ = NumI(BufX[2]) + BufImport_Z;
            if (BufImportSetColorFaces(IdxX, IdxY, IdxZ, BufX[3], BufX[4], BufX[5], BufX[6]))
            {
                SceneBlockListAddXYZ(IdxX, IdxY, IdxZ);
            }
        }
        BufImport_I++;
        if (BufImport_I == BufImport_L)
        {
            break;
        }
        if (performance.now() > WorkTime)
        {
            break;
        }
    }
    if (BufImport_I < BufImport_L)
    {
        setTimeout(BufImportPaint1, SET_BusyTime);
    }
    else
    {
        BufImport_I = 0;
        BufImport_L = 0;
    }
}

function BufImportPaint2()
{
    BusyStatus(BusyStatusPercent(BufImport_I / 2, BufImport_L));

    let WorkTime = performance.now() + SET_BusyWork;
    console.log(">>>Malujemy 2 " + BufImport_I + "/" + BufImport_L);
    while (true)
    {
        console.log("Malujemy 2 " + BufImport_I + "/" + BufImport_L);
        let XXX = BufImport_I % BufImport_X;
        let YYY = ((BufImport_I - XXX) / BufImport_X) % BufImport_Y;
        let ZZZ = (BufImport_I - XXX - (YYY * BufImport_X)) / (BufImport_X * BufImport_Y);

        let XXX_ = XXX * 6;
        let YYY_ = (YYY + (ZZZ * BufImport_Y)) * 2 + 9;
        
        XXX = XXX + BufImport_X1;
        YYY = YYY + BufImport_Y1;
        ZZZ = ZZZ + BufImport_Z1;

        let Buf1 = BufImport_Buf[YYY_ + 0].substr(XXX_ + 0, 3);
        let Buf2 = BufImport_Buf[YYY_ + 0].substr(XXX_ + 3, 3);
        let Buf3 = BufImport_Buf[YYY_ + 1].substr(XXX_ + 0, 3);
        let Buf4 = BufImport_Buf[YYY_ + 1].substr(XXX_ + 3, 3);
        if (BufImportSetColorFaces(XXX, YYY, ZZZ, Buf1, Buf2, Buf3, Buf4))
        {
            SceneBlockListAddXYZ(XXX, YYY, ZZZ);
        }
        BufImport_I++;
        if (BufImport_I == BufImport_L)
        {
            break;
        }
        if (performance.now() > WorkTime)
        {
            break;
        }
    }
    if (BufImport_I < BufImport_L)
    {
        setTimeout(BufImportPaint2, SET_BusyTime);
    }
    else
    {
        BufImport_I = 0;
        BufImport_L = 0;
    }
}




function BufScreenRepaintPre()
{
    CursorHide();
}

function BufScreenRepaint()
{
    Cursor.SetSize(CursorSizeX, CursorSizeY, CursorSizeZ);
    Cursor.SetPosition(CursorX, CursorY, CursorZ);
    CursorCalcBounds();
    GuiGet();
    ColorGet();
    GuiSet();
    CursorShow();
    ScreenRefresh();    
    RetentionCamCur();
}

var BufImportColorR;
var BufImportColorG;
var BufImportColorB;

function BufImportColor(X)
{
    BufImportColorR = NumI(X.substr(0, 1));
    BufImportColorG = NumI(X.substr(1, 1));
    BufImportColorB = NumI(X.substr(2, 1));
}

function BufImportSetColorFaces(IdxX, IdxY, IdxZ, Color1, Color2, Faces, Shape)
{
    Faces = Replace(Faces, " ", "0");
    Faces = Replace(Faces, "_", "0");
    Faces = Replace(Faces, "<", "1");
    Faces = Replace(Faces, "^", "1");
    Faces = Replace(Faces, "#", "1");
    Faces = Replace(Faces, ">", "2");
    Faces = Replace(Faces, "v", "2");
    Faces = Replace(Faces, "V", "2");
    Faces = Replace(Faces, ".", "2");
    Faces = Replace(Faces, "x", "3");
    Faces = Replace(Faces, "X", "3");

    let ObjGood = true;

    for (var I = 0; I < 3; I++)
    {
        let X1 = Color1.substr(I, 1);
        let X2 = Color2.substr(I, 1);
        let X3 = Faces.substr(I, 1);
        if ((X1 != "0") && (X1 != "1") && (X1 != "2") && (X1 != "3") && (X1 != "4"))
        {
            ObjGood = false;
        }
        if ((X2 != "0") && (X2 != "1") && (X2 != "2") && (X2 != "3") && (X2 != "4"))
        {
            ObjGood = false;
        }
        if ((X3 != "0") && (X3 != "1") && (X3 != "2") && (X3 != "3"))
        {
            ObjGood = false;
        }
    }

    if (ObjGood)
    {
        let F1 = NumI(Faces.substr(0, 1));
        let F2 = NumI(Faces.substr(1, 1));
        let F3 = NumI(Faces.substr(2, 1));

        UndoRedoUnitBlock1Blank(IdxX, IdxY, IdxZ);
        let Obj = SceneAdd(IdxX, IdxY, IdxZ);

        Obj.SetColor(NumI(Color1.substr(0, 1)), NumI(Color1.substr(1, 1)), NumI(Color1.substr(2, 1)), NumI(Color2.substr(0, 1)), NumI(Color2.substr(1, 1)), NumI(Color2.substr(2, 1)));
        Obj.SetFaces((F2 == 1) || (F2 == 3), (F2 == 2) || (F2 == 3), (F1 == 1) || (F1 == 3), (F1 == 2) || (F1 == 3), (F3 == 1) || (F3 == 3), (F3 == 2) || (F3 == 3));
        RetentionAdd(Obj);

        UndoRedoUnitBlock2Obj(Obj);
    }
    
    return ObjGood;
}







function Replace(S, str1, str2, ignore)
{
    return S.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}

let StorageBtnMode = 0;

function StorageBtn()
{
    switch(StorageBtnMode)
    {
        case 0:
            document.getElementById("Storage3").value = "Scene";
            document.getElementById("Storage2").value = "Object";
            document.getElementById("Storage1").value = "View";
            break;
        case 1:
            document.getElementById("Storage3").value = "Scene";
            document.getElementById("Storage2").value = "Object";
            document.getElementById("Storage1").value = "[View]";
            break;
        case 2:
            document.getElementById("Storage3").value = "Scene";
            document.getElementById("Storage2").value = "[Object]";
            document.getElementById("Storage1").value = "View";
            break;
        case 3:
            document.getElementById("Storage3").value = "[Scene]";
            document.getElementById("Storage2").value = "Object";
            document.getElementById("Storage1").value = "View";
            break;
    }
}

function StorageIsFilled()
{
    let X = document.getElementById("StorageName").value.trim();
    if (X == "")
    {
        return false;
    }
    else
    {
        return true;
    }
}

function StorageSet(Mode)
{
    if (StorageIsFilled())
    {
        let X = document.getElementById("StorageName").value.trim();
        if (X == "") { return; }
        let N = StorageList();
        
        let V = "";
        
        switch (Mode)
        {
            case 1: V = BufExport(0); break;
            case 2: V = BufExport(-1); break;
            case 3: V = BufExport(1); break;
        }
        
        for (let I = 0; I < N; I++)
        {
            if (DataGet(LSPrefix + "OBJ_N_" + I) == X)
            {
                if (confirm("Overwrite existing \"" + X + "\"?"))
                {
                    DataSet(LSPrefix + "OBJ_V_" + I, V);
                }
                StorageList();
                return;
            }
            if (DataGet(LSPrefix + "OBJ_N_" + I) > X)
            {
                for (let II = N; II > I; II--)
                {
                    DataSet(LSPrefix + "OBJ_N_" + II, DataGet(LSPrefix + "OBJ_N_" + (II - 1)));
                    DataSet(LSPrefix + "OBJ_V_" + II, DataGet(LSPrefix + "OBJ_V_" + (II - 1)));
                }
                DataSet(LSPrefix + "OBJ_N_" + I, X);
                DataSet(LSPrefix + "OBJ_V_" + I, V);
                StorageList();
                return;
            }
        }

        DataSet(LSPrefix + "OBJ_N_" + N, X);
        DataSet(LSPrefix + "OBJ_V_" + N, V);
    }
    else
    {
        StorageBtnMode = Mode;
        StorageBtn();
    }
    StorageList();
    RetentionStorage();
}

function StorageClr()
{
    if (StorageIsFilled())
    {
        document.getElementById("StorageName").value = "";
    }
    else
    {
        StorageBtnMode = 0;
        StorageBtn();
    }
    RetentionStorage();
}

function StorageRem()
{
    if (StorageIsFilled())
    {
        let X = document.getElementById("StorageName").value.trim();
        if (X == "") { return; }
        let N = StorageList();
        let Idx = -1;
        for (let I = 0; I < N; I++)
        {
            if (DataGet(LSPrefix + "OBJ_N_" + I) == X)
            {
                if (confirm("Remove \"" + X + "\"?"))
                {
                    for (let II = I; II < (N - 1); II++)
                    {
                        DataSet(LSPrefix + "OBJ_N_" + II, DataGet(LSPrefix + "OBJ_N_" + (II + 1)));
                        DataSet(LSPrefix + "OBJ_V_" + II, DataGet(LSPrefix + "OBJ_V_" + (II + 1)));
                    }
                    DataDelete(LSPrefix + "OBJ_N_" + (N - 1));
                    DataDelete(LSPrefix + "OBJ_V_" + (N - 1));
                }
                StorageList();
                return;
            }
        }
    }
    else
    {
        StorageBtnMode = 0;
        StorageBtn();
    }
    RetentionStorage();
}

function StorageInput(X)
{
    if (DataExists(LSPrefix + "OBJ_N_" + X) && DataExists(LSPrefix + "OBJ_V_" + X))
    {
        document.getElementById("StorageName").value = DataGet(LSPrefix + "OBJ_N_" + X);
        RetentionStorage();
        BufImport(DataGet(LSPrefix + "OBJ_V_" + X), StorageBtnMode);
    }
}

function StorageList()
{
    let I = 0;
    let X = "";
    while (DataExists(LSPrefix + "OBJ_N_" + I))
    {
        X = X + "<input type=\"button\" value=\"" + DataGet(LSPrefix + "OBJ_N_" + I) + "\" onclick=\"StorageInput(" + I + ");\" style=\"height:" + SET_Control1Size + "px;font-size:" + SET_Control2Size + "px\"> ";
        I++;
    }
    document.getElementById("StorageList").innerHTML = X;
    return I;
}
