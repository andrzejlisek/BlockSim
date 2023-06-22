let UndoRedoBuf = [];
let UndoRedoBufIdx = 0;
let UndoRedoBufSize = 0;

let UndoRedoUnit = false;
let UndoRedoUnitTemp = false;

function UndoRedoClear()
{
    UndoRedoBuf = [];
    UndoRedoBufIdx = 0;
    UndoRedoBufSize = 0;
    UndoRedoUnit = false;
}

function UndoRedo0()
{
    if (UndoRedoBufIdx == 0)
    {
        return;
    }

    UndoRedoBufIdx--;
        
    for (let I = UndoRedoBuf[UndoRedoBufIdx].ScreenList.length - 1; I >= 0; I--)
    {
        let X = UndoRedoBuf[UndoRedoBufIdx].ScreenList[I].X;
        let Y = UndoRedoBuf[UndoRedoBufIdx].ScreenList[I].Y;
        let Z = UndoRedoBuf[UndoRedoBufIdx].ScreenList[I].Z;
        if (UndoRedoBuf[UndoRedoBufIdx].ScreenList[I].Move)
        {
            let DX = UndoRedoBuf[UndoRedoBufIdx].ScreenList[I].DX;
            let DY = UndoRedoBuf[UndoRedoBufIdx].ScreenList[I].DY;
            let DZ = UndoRedoBuf[UndoRedoBufIdx].ScreenList[I].DZ;
            UndoRedoMove(X + DX, Y + DY, Z + DZ, 0 - DX, 0 - DY, 0 - DZ);
        }
        else
        {
            UndoRedo(X, Y, Z, UndoRedoBuf[UndoRedoBufIdx].ScreenList[I].Step2, UndoRedoBuf[UndoRedoBufIdx].ScreenList[I].Step1);
        }
    }

    CursorX = UndoRedoBuf[UndoRedoBufIdx].CursorX_1;
    CursorY = UndoRedoBuf[UndoRedoBufIdx].CursorY_1;
    CursorZ = UndoRedoBuf[UndoRedoBufIdx].CursorZ_1;
    CursorSizeX = UndoRedoBuf[UndoRedoBufIdx].CursorSizeX_1;
    CursorSizeY = UndoRedoBuf[UndoRedoBufIdx].CursorSizeY_1;
    CursorSizeZ = UndoRedoBuf[UndoRedoBufIdx].CursorSizeZ_1;
    BufScreenRepaint();
}

function UndoRedo1()
{
    if (UndoRedoBufIdx >= UndoRedoBufSize)
    {
        return;
    }
        
    for (let I = 0; I < UndoRedoBuf[UndoRedoBufIdx].ScreenList.length; I++)
    {
        let X = UndoRedoBuf[UndoRedoBufIdx].ScreenList[I].X;
        let Y = UndoRedoBuf[UndoRedoBufIdx].ScreenList[I].Y;
        let Z = UndoRedoBuf[UndoRedoBufIdx].ScreenList[I].Z;
        if (UndoRedoBuf[UndoRedoBufIdx].ScreenList[I].Move)
        {
            let DX = UndoRedoBuf[UndoRedoBufIdx].ScreenList[I].DX;
            let DY = UndoRedoBuf[UndoRedoBufIdx].ScreenList[I].DY;
            let DZ = UndoRedoBuf[UndoRedoBufIdx].ScreenList[I].DZ;
            UndoRedoMove(X, Y, Z, DX, DY, DZ);
        }
        else
        {
            UndoRedo(X, Y, Z, UndoRedoBuf[UndoRedoBufIdx].ScreenList[I].Step1, UndoRedoBuf[UndoRedoBufIdx].ScreenList[I].Step2);
        }
    }
    
    CursorX = UndoRedoBuf[UndoRedoBufIdx].CursorX_2;
    CursorY = UndoRedoBuf[UndoRedoBufIdx].CursorY_2;
    CursorZ = UndoRedoBuf[UndoRedoBufIdx].CursorZ_2;
    CursorSizeX = UndoRedoBuf[UndoRedoBufIdx].CursorSizeX_2;
    CursorSizeY = UndoRedoBuf[UndoRedoBufIdx].CursorSizeY_2;
    CursorSizeZ = UndoRedoBuf[UndoRedoBufIdx].CursorSizeZ_2;
    BufScreenRepaint();

    UndoRedoBufIdx++;
}

function UndoRedo(X, Y, Z, Src, Dst)
{
    if (Dst.Block)
    {
        let Obj = SceneAdd(X, Y, Z);
        Obj.SetColor(Dst.Color1R, Dst.Color1G, Dst.Color1B, Dst.Color2R, Dst.Color2G, Dst.Color2B);
        Obj.SetFaces(Dst.Face0, Dst.Face1, Dst.Face2, Dst.Face3, Dst.Face4, Dst.Face5);
    }
    else
    {
        SceneRem(X, Y, Z);
    }
}

function UndoRedoMove(X, Y, Z, DX, DY, DZ)
{
    SceneMove(X, Y, Z, DX, DY, DZ);
}


function UndoRedoUnitBegin()
{
    UndoRedoUnit = {};
    UndoRedoUnit.CursorX_1 = CursorX;
    UndoRedoUnit.CursorY_1 = CursorY;
    UndoRedoUnit.CursorZ_1 = CursorZ;
    UndoRedoUnit.CursorSizeX_1 = CursorSizeX;
    UndoRedoUnit.CursorSizeY_1 = CursorSizeY;
    UndoRedoUnit.CursorSizeZ_1 = CursorSizeZ;
    UndoRedoUnit.ScreenList = [];
}

function UndoRedoUnitEnd()
{
    UndoRedoUnit.CursorX_2 = CursorX;
    UndoRedoUnit.CursorY_2 = CursorY;
    UndoRedoUnit.CursorZ_2 = CursorZ;
    UndoRedoUnit.CursorSizeX_2 = CursorSizeX;
    UndoRedoUnit.CursorSizeY_2 = CursorSizeY;
    UndoRedoUnit.CursorSizeZ_2 = CursorSizeZ;

    if (UndoRedoUnit.ScreenList.length > 0)
    {
        UndoRedoBuf[UndoRedoBufIdx] = UndoRedoUnit;
        UndoRedoBufIdx++;
        UndoRedoBufSize = UndoRedoBufIdx;
    }

    UndoRedoUnit = false;
}


function UndoRedoUnitBlockMoveXYZ(X, Y, Z, DX, DY, DZ)
{
    if (UndoRedoUnit && ((DX != 0) || (DY != 0) || (DZ != 0)))
    {
        let Temp = {};
        Temp.X = X;
        Temp.Y = Y;
        Temp.Z = Z;
        Temp.Move = true;
        Temp.DX = DX;
        Temp.DY = DY;
        Temp.DZ = DZ;
        Temp.NoChange = false;
        UndoRedoUnit.ScreenList.push(Temp);
    }
}


function UndoRedoUnitBlock1Obj(Obj)
{
    if (UndoRedoUnit)
    {
        UndoRedoUnitTemp = {};
        UndoRedoUnitTemp.X = Obj.PosX;
        UndoRedoUnitTemp.Y = Obj.PosY;
        UndoRedoUnitTemp.Z = Obj.PosZ;
        UndoRedoUnitTemp.Move = false;
        UndoRedoUnitTemp.Step1 = {};
        UndoRedoUnitTemp.Step1.Block = true;
        UndoRedoUnitTemp.Step1.Face0 = Obj.Face0;
        UndoRedoUnitTemp.Step1.Face1 = Obj.Face1;
        UndoRedoUnitTemp.Step1.Face2 = Obj.Face2;
        UndoRedoUnitTemp.Step1.Face3 = Obj.Face3;
        UndoRedoUnitTemp.Step1.Face4 = Obj.Face4;
        UndoRedoUnitTemp.Step1.Face5 = Obj.Face5;
        UndoRedoUnitTemp.Step1.Color1R = Obj.Color1R;
        UndoRedoUnitTemp.Step1.Color1G = Obj.Color1G;
        UndoRedoUnitTemp.Step1.Color1B = Obj.Color1B;
        UndoRedoUnitTemp.Step1.Color2R = Obj.Color2R;
        UndoRedoUnitTemp.Step1.Color2G = Obj.Color2G;
        UndoRedoUnitTemp.Step1.Color2B = Obj.Color2B;
    }
}

function UndoRedoUnitBlock2Obj(Obj)
{
    if (UndoRedoUnit)
    {
        UndoRedoUnitTemp.Step2 = {};
        UndoRedoUnitTemp.Step2.Block = true;
        UndoRedoUnitTemp.Step2.Face0 = Obj.Face0;
        UndoRedoUnitTemp.Step2.Face1 = Obj.Face1;
        UndoRedoUnitTemp.Step2.Face2 = Obj.Face2;
        UndoRedoUnitTemp.Step2.Face3 = Obj.Face3;
        UndoRedoUnitTemp.Step2.Face4 = Obj.Face4;
        UndoRedoUnitTemp.Step2.Face5 = Obj.Face5;
        UndoRedoUnitTemp.Step2.Color1R = Obj.Color1R;
        UndoRedoUnitTemp.Step2.Color1G = Obj.Color1G;
        UndoRedoUnitTemp.Step2.Color1B = Obj.Color1B;
        UndoRedoUnitTemp.Step2.Color2R = Obj.Color2R;
        UndoRedoUnitTemp.Step2.Color2G = Obj.Color2G;
        UndoRedoUnitTemp.Step2.Color2B = Obj.Color2B;

        if (UndoRedoUnitTemp.Step1.Block)
        {
            let Change = true;
            if ((UndoRedoUnitTemp.Step1.Face0 == UndoRedoUnitTemp.Step2.Face0) && (UndoRedoUnitTemp.Step1.Face1 == UndoRedoUnitTemp.Step2.Face1) && (UndoRedoUnitTemp.Step1.Face2 == UndoRedoUnitTemp.Step2.Face2))
            {
                if ((UndoRedoUnitTemp.Step1.Face3 == UndoRedoUnitTemp.Step2.Face3) && (UndoRedoUnitTemp.Step1.Face4 == UndoRedoUnitTemp.Step2.Face4) && (UndoRedoUnitTemp.Step1.Face5 == UndoRedoUnitTemp.Step2.Face5))
                {
                    if ((UndoRedoUnitTemp.Step1.Color1R == UndoRedoUnitTemp.Step2.Color1R) && (UndoRedoUnitTemp.Step1.Color1G == UndoRedoUnitTemp.Step2.Color1G) && (UndoRedoUnitTemp.Step1.Color1B == UndoRedoUnitTemp.Step2.Color1B))
                    {
                        if ((UndoRedoUnitTemp.Step1.Color2R == UndoRedoUnitTemp.Step2.Color2R) && (UndoRedoUnitTemp.Step1.Color2G == UndoRedoUnitTemp.Step2.Color2G) && (UndoRedoUnitTemp.Step1.Color2B == UndoRedoUnitTemp.Step2.Color2B))
                        {
                            Change = false;
                        }
                    }
                }
            }
            if (Change)
            {
                UndoRedoUnit.ScreenList.push(UndoRedoUnitTemp);
            }
        }
        else
        {
            UndoRedoUnit.ScreenList.push(UndoRedoUnitTemp);
        }

    }
}

function UndoRedoUnitBlock1Blank(X, Y, Z)
{
    if (UndoRedoUnit)
    {
        UndoRedoUnitTemp = {};
        UndoRedoUnitTemp.X = X;
        UndoRedoUnitTemp.Y = Y;
        UndoRedoUnitTemp.Z = Z;
        UndoRedoUnitTemp.Move = false;
        UndoRedoUnitTemp.Step1 = {};
        UndoRedoUnitTemp.Step1.Block = false;
    }
}

function UndoRedoUnitBlock2Blank(X, Y, Z)
{
    if (UndoRedoUnit)
    {
        UndoRedoUnitTemp.Step2 = {};
        UndoRedoUnitTemp.Step2.Block = false;
        if (UndoRedoUnitTemp.Step1.Block)
        {
            UndoRedoUnit.ScreenList.push(UndoRedoUnitTemp);
        }
    }
}

function UndoRedoUnitBlock1XYZ(X, Y, Z)
{
    if (UndoRedoUnit)
    {
        let Obj = SceneGet(X, Y, Z);
        if (Obj)
        {
            UndoRedoUnitBlock1Obj(Obj);
        }
        else
        {
            UndoRedoUnitBlock1Blank(X, Y, Z);
        }
    }
}

function UndoRedoUnitBlock2XYZ(X, Y, Z)
{
    if (UndoRedoUnit)
    {
        let Obj = SceneGet(X, Y, Z);
        if (Obj)
        {
            UndoRedoUnitBlock2Obj(Obj);
        }
        else
        {
            UndoRedoUnitBlock2Blank(X, Y, Z);
        }
    }
}

