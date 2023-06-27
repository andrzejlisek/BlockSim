function TextExport(Mode)
{
    document.getElementById("TextBuffer").value = BufExport(Mode);
    RetentionText();
}

function TextImport()
{
    BufImport(document.getElementById("TextBuffer").value);
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
    var Buf = Mode + "\n";
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

    var MinMaxInit = false;
    for (var I in SceneStruct)
    {
        Obj = SceneStruct[I];
        if (MinMaxInit)
        {
            if (MinX > Obj.PosX) { MinX = Obj.PosX; }
            if (MaxX < Obj.PosX) { MaxX = Obj.PosX; }
            if (MinY > Obj.PosY) { MinY = Obj.PosY; }
            if (MaxY < Obj.PosY) { MaxY = Obj.PosY; }
            if (MinZ > Obj.PosZ) { MinZ = Obj.PosZ; }
            if (MaxZ < Obj.PosZ) { MaxZ = Obj.PosZ; }
        }
        else
        {
            MinX = Obj.PosX;
            MaxX = Obj.PosX;
            MinY = Obj.PosY;
            MaxY = Obj.PosY;
            MinZ = Obj.PosZ;
            MaxZ = Obj.PosZ;
            MinMaxInit = 1;
        }
    }
    Buf = Buf + MinX + "|" + MaxX + "|" + MinY + "|" + MaxY + "|" + MinZ + "|" + MaxZ + "\n";

    if (Mode == 0)
    {
        SceneBlockList();
        for (var I = 0; I < SceneBlockListX.length; I++)
        {
            var Obj = SceneGet(SceneBlockListX[I], SceneBlockListY[I], SceneBlockListZ[I]);
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
    if (Mode == 1)
    {
        for (var I in SceneStruct)
        {
            Obj = SceneStruct[I];
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
    if (Mode == 2)
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
                    Obj = SceneGet(XXX, YYY, ZZZ);
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

function BufImportIsColor(Buf1_, Buf2_)
{
    for (var I = 0; I < 3; I++)
    {
        var X1 = Buf1_.substr(I, 1);
        var X2 = Buf2_.substr(I, 1);
        if ((X1 != "0") && (X1 != "1") && (X1 != "2") && (X1 != "3") && (X1 != "4"))
        {
            return false;
        }
        if ((X2 != "0") && (X2 != "1") && (X2 != "2") && (X2 != "3") && (X2 != "4"))
        {
            return false;
        }
    }
    return true;
}

function BufImport(Buf_)
{
    let ImportSuccess = true;

    let Buf = Buf_.split("\n");

    let BufDataIdx = 9;
    
    if (Buf.length < BufDataIdx)
    {
        ImportSuccess = false;
    }
    let Mode = 0;

    if (ImportSuccess)
    {
        let BufX = Buf[0].split("|");
        Mode = NumI(BufX[0]);

        let CursorX__ = 0;
        let CursorY__ = 0;
        let CursorZ__ = 0;

        if (Mode != (0 - 1))
        {
            EditState = 0;
        }
        CursorEditStateBtn();

        if (Mode != 0)
        {
            if (Mode != (0 - 1))
            {
                SceneClear();

                BufX = Buf[1].split("|");
                ScaleX_ = NumF(BufX[0]);
                ScaleY_ = NumF(BufX[1]);
                ScaleZ_ = NumF(BufX[2]);
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
        
        if (Mode > 0)
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


        if (Mode > 0)
        {
            UndoRedoClear();
        }
        else
        {
            UndoRedoUnitBegin();
        }


        if (Mode > 0)
        {
            BufX = Buf[6].split("|");
            CursorSizeX = NumI(BufX[0]);
            CursorSizeY = NumI(BufX[1]);
            CursorSizeZ = NumI(BufX[2]);
        
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
        var MinX = NumI(BufX[0]);
        var MaxX = NumI(BufX[1]);
        var MinY = NumI(BufX[2]);
        var MaxY = NumI(BufX[3]);
        var MinZ = NumI(BufX[4]);
        var MaxZ = NumI(BufX[5]);

        if ((Mode == 0) || (Mode == 1))
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
            if (ImportSuccess)
            {
                for (var I = BufDataIdx; I < Buf.length; I++)
                {
                    BufX = Buf[I].split("|");
                    if (BufX.length > 6)
                    {
                        let IdxX = NumI(BufX[0]) + CursorX__;
                        let IdxY = NumI(BufX[1]) + CursorY__;
                        let IdxZ = NumI(BufX[2]) + CursorZ__;
                        UndoRedoUnitBlock1Blank(IdxX, IdxY, IdxZ);
                        let Obj_ = SceneAdd(IdxX, IdxY, IdxZ);
                        BufImportSetColorFaces(Obj_, BufX[3], BufX[4], BufX[5]);
                        UndoRedoUnitBlock2Obj(Obj_);
                    }
                }
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
            var ElementAllowed;
            for (var ZZZ = MinZ; ZZZ <= MaxZ; ZZZ++)
            {
                for (var YYY = MinY; YYY <= MaxY; YYY++)
                {
                    II = 0;
                    for (var XXX = MinX; XXX <= MaxX; XXX++)
                    {
                        Buf1 = Buf[I + 0].substr(II + 0, 3);
                        Buf2 = Buf[I + 0].substr(II + 3, 3);
                        Buf3 = Buf[I + 1].substr(II + 0, 3);
                        Buf4 = Buf[I + 1].substr(II + 3, 3);
                        Buf3 = Replace(Buf3, " ", "0");
                        Buf3 = Replace(Buf3, "_", "0");
                        Buf3 = Replace(Buf3, "<", "1");
                        Buf3 = Replace(Buf3, "^", "1");
                        Buf3 = Replace(Buf3, "#", "1");
                        Buf3 = Replace(Buf3, ">", "2");
                        Buf3 = Replace(Buf3, "v", "2");
                        Buf3 = Replace(Buf3, ".", "2");
                        Buf3 = Replace(Buf3, "X", "3");
                        if (BufImportIsColor(Buf1, Buf2))
                        {
                            BufImportSetColorFaces(SceneAdd(XXX, YYY, ZZZ), Buf1, Buf2, Buf3);
                        }
                        II += 6;
                    }
                    I += 2;
                }
            }
        }

        if (Mode > 0)
        {
            UndoRedoClear();
        }
        else
        {
            UndoRedoUnitEnd();
        }
    }
    RetentionCamCur();
    
    if (Mode == 0)
    {
        SceneBlockList();
        SceneBlockListRepaint();
    }
    else
    {
        BufScreenRepaint();
        ColorSetDef();
    }
    return ImportSuccess;
}

function BufScreenRepaint()
{
    CursorHide();
    Cursor.SetSize(CursorSizeX, CursorSizeY, CursorSizeZ);
    Cursor.SetPosition(CursorX, CursorY, CursorZ);
    CursorCalcBounds();
    GuiGet();
    ColorGet();
    GuiSet();
    CursorShow();
    SceneRepaintWhole(true);
    
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

function BufImportSetColorFaces(Obj, Color1, Color2, Faces)
{
    var F1 = Faces.substr(0, 1);
    var F2 = Faces.substr(1, 1);
    var F3 = Faces.substr(2, 1);
    Obj.SetColor(NumI(Color1.substr(0, 1)), NumI(Color1.substr(1, 1)), NumI(Color1.substr(2, 1)), NumI(Color2.substr(0, 1)), NumI(Color2.substr(1, 1)), NumI(Color2.substr(2, 1)));
    Obj.SetFaces((F2 == 1) || (F2 == 3), (F2 == 2) || (F2 == 3), (F1 == 1) || (F1 == 3), (F1 == 2) || (F1 == 3), (F3 == 1) || (F3 == 3), (F3 == 2) || (F3 == 3));
    RetentionAddObj(Obj);
}







function Replace(S, str1, str2, ignore)
{
    return S.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}



function StorageSet(Mode)
{
    let X = document.getElementById("StorageName").value.trim();
    if (X == "") { return; }
    let N = StorageList();
    
    let V = BufExport(Mode);

    for (let I = 0; I < N; I++)
    {
        if (DataGet(LSPrefix + "OBJ_N_" + I) == X)
        {
            DataSet(LSPrefix + "OBJ_V_" + I, V);
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
    StorageList();
}

function StorageRem()
{
    let X = document.getElementById("StorageName").value.trim();
    if (X == "") { return; }
    let N = StorageList();
    let Idx = -1;
    for (let I = 0; I < N; I++)
    {
        if (DataGet(LSPrefix + "OBJ_N_" + I) == X)
        {
            for (let II = I; II < (N - 1); II++)
            {
                DataSet(LSPrefix + "OBJ_N_" + II, DataGet(LSPrefix + "OBJ_N_" + (II + 1)));
                DataSet(LSPrefix + "OBJ_V_" + II, DataGet(LSPrefix + "OBJ_V_" + (II + 1)));
            }
            DataDelete(LSPrefix + "OBJ_N_" + (N - 1));
            DataDelete(LSPrefix + "OBJ_V_" + (N - 1));
            StorageList();
            return;
        }
    }
}

function StorageInput(X)
{
    if (DataExists(LSPrefix + "OBJ_N_" + X) && DataExists(LSPrefix + "OBJ_V_" + X))
    {
        document.getElementById("StorageName").value = DataGet(LSPrefix + "OBJ_N_" + X);
        BufImport(DataGet(LSPrefix + "OBJ_V_" + X));
    }
}

function StorageList()
{
    let I = 0;
    let X = "";
    while (DataExists(LSPrefix + "OBJ_N_" + I))
    {
        X = X + "<input type=\"button\" value=\"" + DataGet(LSPrefix + "OBJ_N_" + I) + "\" onclick=\"StorageInput(" + I + ");\" style=\"height:" + SET_Control1Size + "px;font-size:" + SET_Control2Size + "px\"> ";
        //X = X + "<a href=\"javascript:void(0);\" onclick=\"StorageInput(" + I + ");\">" + DataGet(LSPrefix + "OBJ_N_" + I) + "</a><br/>";
        I++;
    }
    document.getElementById("StorageList").innerHTML = X;
    return I;
}
