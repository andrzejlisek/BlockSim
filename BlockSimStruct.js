function SceneBlockList()
{
    SceneBlockListX = [];
    SceneBlockListY = [];
    SceneBlockListZ = [];
    CursorCalcBounds();
    for (let XX = (CursorX + CursorSizeX_1); XX <= (CursorX + CursorSizeX_2); XX++)
    {
        for (let YY = (CursorY + CursorSizeY_1); YY <= (CursorY + CursorSizeY_2); YY++)
        {
            for (let ZZ = (CursorZ + CursorSizeZ_1); ZZ <= (CursorZ + CursorSizeZ_2); ZZ++)
            {
                SceneBlockListXYZ(XX, YY, ZZ, -2);
            }
        }
    }
}

function SceneBlockListXYZ(XX, YY, ZZ, Depth)
{
    if (Depth > (0 - 2))
    {
        SceneBlockListX = [];
        SceneBlockListY = [];
        SceneBlockListZ = [];
    }
    SceneBlockListWork(XX, YY, ZZ, Depth);
}

function SceneBlockListWork(XX, YY, ZZ, Depth)
{
    if ((Depth == 0) || SceneBlockListExists(XX, YY, ZZ))
    {
        return;
    }
    var Obj = SceneGet(XX, YY, ZZ);
    if (Obj)
    {
        if(!SceneBlockListExists(XX, YY, ZZ))
        {
            SceneBlockListX.push(XX);
            SceneBlockListY.push(YY);
            SceneBlockListZ.push(ZZ);
        }
        if (!Obj.Face0) { SceneBlockListWork(XX - 1, YY, ZZ, Depth - 1); }
        if (!Obj.Face1) { SceneBlockListWork(XX + 1, YY, ZZ, Depth - 1); }
        if (!Obj.Face2) { SceneBlockListWork(XX, YY, ZZ + 1, Depth - 1); }
        if (!Obj.Face3) { SceneBlockListWork(XX, YY, ZZ - 1, Depth - 1); }
        if (!Obj.Face4) { SceneBlockListWork(XX, YY + 1, ZZ, Depth - 1); }
        if (!Obj.Face5) { SceneBlockListWork(XX, YY - 1, ZZ, Depth - 1); }
    }
}

function SceneBlockListExists(XX, YY, ZZ)
{
    for (var I = 0; I < SceneBlockListX.length; I++)
    {
        if (SceneBlockListX[I] == XX)
        {
            if (SceneBlockListY[I] == YY)
            {
                if (SceneBlockListZ[I] == ZZ)
                {
                    return true;
                }
            }
        }
    }
    return false;
}

function SceneBlockListRepaintObj(Obj)
{
    SceneBlockListXYZ(Obj.PosX, Obj.PosY, Obj.PosZ, -1);
    SceneBlockListRepaint();
}

function SceneBlockListRepaint()
{
    for (var I = 0; I < SceneBlockListX.length; I++)
    {
        var Obj = SceneGet(SceneBlockListX[I], SceneBlockListY[I], SceneBlockListZ[I]);
        if (Obj)
        {
            Obj.Repaint();
        }
    }
    return false;
}

function SceneBlockListSort(Mode)
{
    for (var I = 0; I < SceneBlockListX.length; I++)
    {
        for (var II = 0; II < SceneBlockListX.length; II++)
        {
            var SortCompare = false;
            if (Mode == 0) { SortCompare = (SceneBlockListX[II] < SceneBlockListX[I]); }
            if (Mode == 1) { SortCompare = (SceneBlockListX[II] > SceneBlockListX[I]); }
            if (Mode == 2) { SortCompare = (SceneBlockListY[II] < SceneBlockListY[I]); }
            if (Mode == 3) { SortCompare = (SceneBlockListY[II] > SceneBlockListY[I]); }
            if (Mode == 4) { SortCompare = (SceneBlockListZ[II] < SceneBlockListZ[I]); }
            if (Mode == 5) { SortCompare = (SceneBlockListZ[II] > SceneBlockListZ[I]); }
            if (SortCompare)
            {
                SortCompare = SceneBlockListX[I];
                SceneBlockListX[I] = SceneBlockListX[II];
                SceneBlockListX[II] = SortCompare;
                SortCompare = SceneBlockListY[I];
                SceneBlockListY[I] = SceneBlockListY[II];
                SceneBlockListY[II] = SortCompare;
                SortCompare = SceneBlockListZ[I];
                SceneBlockListZ[I] = SceneBlockListZ[II];
                SceneBlockListZ[II] = SortCompare;
            }
        }
    }
}




// https://stackoverflow.com/questions/1208222/how-to-do-associative-array-hashing-in-javascript
// http://pietschsoft.com/post/2015/09/05/JavaScript-Basics-How-to-create-a-Dictionary-with-KeyValue-pairs
// https://flaviocopes.com/how-to-remove-object-property-javascript/

//SceneStruct["a"] = "qwe";
//SceneStruct["s"] = "asd";
//SceneStruct["d"] = "zxc";
//delete SceneStruct["s"];

function Idx_(IdxX, IdxY, IdxZ)
{
    return ((IdxX + 512) << 20) + ((IdxY + 512) << 10) + (IdxZ + 512);
}

function SceneGet(IdxX, IdxY, IdxZ)
{
    var Idx = Idx_(IdxX, IdxY, IdxZ);
    if (typeof SceneStruct[Idx] === 'undefined')
    {
        return 0;
    }
    else
    {
        return SceneStruct[Idx];
    }
}


function SceneExists(IdxX, IdxY, IdxZ)
{
    var Idx = Idx_(IdxX, IdxY, IdxZ);
    if (typeof SceneStruct[Idx] === 'undefined')
    {
        return false;
    }
    else
    {
        return true;
    }
}


//var MsgX = "";
//for(var key in SceneStruct){
//  var value = SceneStruct[key];
//  MsgX  += "[" + key + "]={" + SceneStruct[key] + "}\n";
//  /* use key/value for intended purpose */
//}
//alert(MsgX);
//alert(Object.keys(SceneStruct));



function SceneAddIdx(IdxX, IdxY, IdxZ, Obj)
{
    var Idx = Idx_(IdxX, IdxY, IdxZ);
    Obj.SetPosition(IdxX, IdxY, IdxZ);
    SceneStruct[Idx] = Obj;
    RetentionAdd(Idx, Obj);
}

function SceneRemIdx(IdxX, IdxY, IdxZ)
{
    var Idx = Idx_(IdxX, IdxY, IdxZ);
    if (typeof SceneStruct[Idx] === 'undefined')
    {
    }
    else
    {
        RetentionRem(Idx);
        delete SceneStruct[Idx];
    }
}

function SceneClear()
{
    for (var I in SceneStruct)
    {
        SceneStruct[I].Remove();
    }
    SceneStruct = {};
    RetentionClear();
}

function SceneAdd(IdxX, IdxY, IdxZ)
{
    var Idx = Idx_(IdxX, IdxY, IdxZ);
    if (typeof SceneStruct[Idx] === 'undefined')
    {
        var Obj = new BlockObject();
        Obj.SetFaces(true, true, true, true, true, true);
        Obj.SetColor(ColorDef1R, ColorDef1G, ColorDef1B, ColorDef2R, ColorDef2G, ColorDef2B);
        Obj.SetPosition(IdxX, IdxY, IdxZ);
        SceneStruct[Idx] = Obj;
        RetentionAdd(Idx, Obj);
        return Obj;
    }
    else
    {
        return SceneStruct[Idx];
    }
}

function SceneRem(IdxX, IdxY, IdxZ)
{
    var Idx = Idx_(IdxX, IdxY, IdxZ);
    if (typeof SceneStruct[Idx] === 'undefined')
    {
    }
    else
    {
        RetentionRem(Idx);
        SceneStruct[Idx].Remove();
        delete SceneStruct[Idx];
    }
}

function SceneMove(IdxX, IdxY, IdxZ, DX, DY, DZ)
{
    var Idx = Idx_(IdxX, IdxY, IdxZ);
    var Idx0 = Idx_(IdxX + DX, IdxY + DY, IdxZ + DZ);
    if (typeof SceneStruct[Idx] === 'undefined')
    {
    }
    else
    {
        if (typeof SceneStruct[Idx0] === 'undefined')
        {
            SceneStruct[Idx0] = SceneStruct[Idx];
            SceneStruct[Idx0].SetPosition(IdxX + DX, IdxY + DY, IdxZ + DZ);
            
            RetentionRem(Idx);
            RetentionAdd(Idx0, SceneStruct[Idx0]);
            
            delete SceneStruct[Idx];
        }
        //SceneStruct[Idx].Remove();
        //delete SceneStruct[Idx];
    }
}

function SceneRotateCoord(XX, YY, ZZ, DX, DY, DZ)
{
    var CursorX_X = XX - CursorX;
    var CursorY_Y = YY - CursorY;
    var CursorZ_Z = ZZ - CursorZ;

    SceneRotateCoordX = XX;
    SceneRotateCoordY = YY;
    SceneRotateCoordZ = ZZ;
    if (DX > 0)
    {
        SceneRotateCoordY -= CursorY_Y;
        SceneRotateCoordZ -= CursorZ_Z;

        SceneRotateCoordY -= CursorZ_Z;
        SceneRotateCoordZ += CursorY_Y;
    }
    if (DX < 0)
    {
        SceneRotateCoordY -= CursorY_Y;
        SceneRotateCoordZ -= CursorZ_Z;

        SceneRotateCoordY += CursorZ_Z;
        SceneRotateCoordZ -= CursorY_Y;
    }
    if (DY > 0)
    {
        SceneRotateCoordX -= CursorX_X;
        SceneRotateCoordZ -= CursorZ_Z;

        SceneRotateCoordX -= CursorZ_Z;
        SceneRotateCoordZ += CursorX_X;
    }
    if (DY < 0)
    {
        SceneRotateCoordX -= CursorX_X;
        SceneRotateCoordZ -= CursorZ_Z;

        SceneRotateCoordX += CursorZ_Z;
        SceneRotateCoordZ -= CursorX_X;
    }
    if (DZ > 0)
    {
        SceneRotateCoordX -= CursorX_X;
        SceneRotateCoordY -= CursorY_Y;

        SceneRotateCoordX -= CursorY_Y;
        SceneRotateCoordY += CursorX_X;
    }
    if (DZ < 0)
    {
        SceneRotateCoordX -= CursorX_X;
        SceneRotateCoordY -= CursorY_Y;

        SceneRotateCoordX += CursorY_Y;
        SceneRotateCoordY -= CursorX_X;
    }
}

function SceneRotate(IdxX, IdxY, IdxZ, DX, DY, DZ)
{
    if ((DX != 0) && (DY != 0))    { return; }
    if ((DY != 0) && (DZ != 0))    { return; }
    if ((DZ != 0) && (DX != 0))    { return; }
    
    var Idx = Idx_(IdxX, IdxY, IdxZ);
    if (typeof SceneStruct[Idx] === 'undefined')
    {
    }
    else
    {
        var XFace0 = SceneStruct[Idx].Face0;
        var XFace1 = SceneStruct[Idx].Face1;
        var XFace2 = SceneStruct[Idx].Face2;
        var XFace3 = SceneStruct[Idx].Face3;
        var XFace4 = SceneStruct[Idx].Face4;
        var XFace5 = SceneStruct[Idx].Face5;
        
        if (DX > 0)
        {
            SceneStruct[Idx].SetFaces(XFace0, XFace1, XFace4, XFace5, XFace3,  XFace2);
        }
        if (DX < 0)
        {
            SceneStruct[Idx].SetFaces(XFace0, XFace1, XFace5, XFace4, XFace2,  XFace3);
        }
        if (DY > 0)
        {
            SceneStruct[Idx].SetFaces(XFace2, XFace3, XFace1, XFace0, XFace4, XFace5);
        }
        if (DY < 0)
        {
            SceneStruct[Idx].SetFaces(XFace3, XFace2, XFace0, XFace1, XFace4, XFace5);
        }
        if (DZ > 0)
        {
            SceneStruct[Idx].SetFaces(XFace4, XFace5, XFace2, XFace3, XFace1, XFace0);
        }
        if (DZ < 0)
        {
            SceneStruct[Idx].SetFaces(XFace5, XFace4, XFace2, XFace3, XFace0, XFace1);
        }
        RetentionAdd(Idx, SceneStruct[Idx]);
    }
}

function SceneRepaintWhole(Flag)
{
    if (Flag)
    {
        for (var I in SceneStruct)
        {
            SceneStruct[I].ToRepaint = true;
        }
    }
    for (var I in SceneStruct)
    {
        var Obj = SceneStruct[I];
        if (Obj.ToRepaint)
        {
            SceneBlockListXYZ(Obj.PosX, Obj.PosY, Obj.PosZ, -1);
            SceneBlockListRepaint();
        }
    }
}

function ScaleSet(ScaleX_, ScaleY_, ScaleZ_)
{
    if ((ScaleX != ScaleX_) || (ScaleY != ScaleY_) || (ScaleZ != ScaleZ_))
    {
        ScaleX = ScaleX_;
        ScaleY = ScaleY_;
        ScaleZ = ScaleZ_;
        ViewSizeX = ViewSize * ScaleX;
        ViewSizeY = ViewSize * ScaleY;
        ViewSizeZ = ViewSize * ScaleZ;
        ViewSize2X = ViewSize2 * ScaleX;
        ViewSize2Y = ViewSize2 * ScaleY;
        ViewSize2Z = ViewSize2 * ScaleZ;


        for (var I in SceneStruct)
        {
            var Obj = SceneStruct[I];
            var Obj_F0 = Obj.Face0;
            var Obj_F1 = Obj.Face1;
            var Obj_F2 = Obj.Face2;
            var Obj_F3 = Obj.Face3;
            var Obj_F4 = Obj.Face4;
            var Obj_F5 = Obj.Face5;
            var Obj_Color1R = Obj.Color1R;
            var Obj_Color1G = Obj.Color1G;
            var Obj_Color1B = Obj.Color1B;
            var Obj_Color2R = Obj.Color2R;
            var Obj_Color2G = Obj.Color2G;
            var Obj_Color2B = Obj.Color2B;
            var Obj_PosX = Obj.PosX;
            var Obj_PosY = Obj.PosY;
            var Obj_PosZ = Obj.PosZ;
            Obj.Remove();
            Obj = new BlockObject();
            Obj.SetFaces(Obj_F0, Obj_F1, Obj_F2, Obj_F3, Obj_F4, Obj_F5);
            Obj.SetColor(Obj_Color1R, Obj_Color1G, Obj_Color1B, Obj_Color2R, Obj_Color2G, Obj_Color2B);
            Obj.SetPosition(Obj_PosX, Obj_PosY, Obj_PosZ);
            SceneStruct[I] = Obj;
        }
        SceneRepaintWhole(false);
        Cursor.Hide();
        Cursor = new CursorObject();
        Cursor.SetSize(CursorSizeX, CursorSizeY, CursorSizeZ);
        Cursor.SetPosition(CursorX, CursorY, CursorZ);
    }
}
