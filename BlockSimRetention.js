let RetentionHeader = {};
let RetentionCounter = 0;

let RetentionDataCount = 0;
let RetentionDataHole = [];
let RetentionDataMap = {};

if (DataExists(LSPrefix + "RetentionCounter")) { RetentionCounter = DataGetI(LSPrefix + "RetentionCounter"); }
if (DataExists(LSPrefix + "RetentionDataCount")) { RetentionDataCount = DataGetI(LSPrefix + "RetentionDataCount"); }

function RetentionClear()
{
    RetentionDataMap = {};
    RetentionDataHole = [];
    for (let I = 0; I < RetentionDataCount; I++)
    {
        if (DataExists(LSPrefix + "RetentionData_" + I))
        {
            DataDelete(LSPrefix + "RetentionData_" + I);
        }
    }
    RetentionDataCount = 0;
    DataSet(LSPrefix + "RetentionDataCount", RetentionDataCount);
}

function RetentionAdd(Idx, Obj)
{
    if (Idx in RetentionDataMap)
    {
        DataSet(LSPrefix + "RetentionData_" + RetentionDataMap[Idx], JSON.stringify(Obj.GetInfo()));
    }
    else
    {
        if (RetentionDataHole.length > 0)
        {
            DataSet(LSPrefix + "RetentionData_" + RetentionDataHole[0], JSON.stringify(Obj.GetInfo()));
            RetentionDataMap[Idx] = RetentionDataHole[0];
            RetentionDataHole.splice(0, 1);
        }
        else
        {
            RetentionDataMap[Idx] = RetentionDataCount;
            DataSet(LSPrefix + "RetentionData_" + RetentionDataCount, JSON.stringify(Obj.GetInfo()));
            RetentionDataCount++;
            DataSet(LSPrefix + "RetentionDataCount", RetentionDataCount);
        }
    }

    RetentionResetCounter();
}

function RetentionRem(Idx)
{
    if (Idx in RetentionDataMap)
    {
        let N = RetentionDataMap[Idx];
        DataDelete(LSPrefix + "RetentionData_" + N);
        RetentionDataHole.push(N);
        
        delete RetentionDataMap[Idx];
        
        let RetentionDataCount0 = RetentionDataCount;

        let IdxOf = RetentionDataHole.indexOf(RetentionDataCount - 1);
        
        while (IdxOf >= 0)
        {
            RetentionDataHole.splice(IdxOf, 1);
            
            RetentionDataCount--;
            DataSet(LSPrefix + "RetentionDataCount", RetentionDataCount);

            IdxOf = RetentionDataHole.indexOf(RetentionDataCount - 1);
        }
    }
    RetentionResetCounter();
}


function RetentionAddObj(Obj)
{
    RetentionAdd(Idx_(Obj.PosX, Obj.PosY, Obj.PosZ), Obj);
}

function RetentionResetCounter()
{
    RetentionCounter = 0;
    DataSet(LSPrefix + "RetentionCounter", RetentionCounter);
}

function RetentionCamCur()
{
    RetentionHeader.ScaleX = ScaleX;
    RetentionHeader.ScaleY = ScaleY;
    RetentionHeader.ScaleZ = ScaleZ;
    RetentionHeader.CamPosX = CameraPosX;
    RetentionHeader.CamPosY = CameraPosY;
    RetentionHeader.CamPosZ = CameraPosZ;
    RetentionHeader.CamRotX = CameraRotX;
    RetentionHeader.CamRotY = CameraRotY;
    RetentionHeader.CamRotZ = CameraRotZ;
    RetentionHeader.CameraAngle = CameraAngle;
    RetentionHeader.PosX = CursorX;
    RetentionHeader.PosY = CursorY;
    RetentionHeader.PosZ = CursorZ;
    RetentionHeader.SizeX = CursorSizeX;
    RetentionHeader.SizeY = CursorSizeY;
    RetentionHeader.SizeZ = CursorSizeZ;
    
    RetentionHeader.ColorBackR = ColorBackR;
    RetentionHeader.ColorBackG = ColorBackG;
    RetentionHeader.ColorBackB = ColorBackB;
    RetentionHeader.ColorCursorR = CursorColorR;
    RetentionHeader.ColorCursorG = CursorColorG;
    RetentionHeader.ColorCursorB = CursorColorB;
    RetentionHeader.ColorDef1R = ColorDef1R;
    RetentionHeader.ColorDef1G = ColorDef1G;
    RetentionHeader.ColorDef1B = ColorDef1B;
    RetentionHeader.ColorDef2R = ColorDef2R;
    RetentionHeader.ColorDef2G = ColorDef2G;
    RetentionHeader.ColorDef2B = ColorDef2B;
    
    RetentionHeader.EditState = EditState;

    DataSet(LSPrefix + "RetentionHeader", JSON.stringify(RetentionHeader));

    RetentionResetCounter();
}


function RetentionLoad()
{
    RetentionCounter++;
    
    if (RetentionCounter < 3)
    {
        RetentionDataMap = {};
        RetentionDataHole = [];
    
        let RetentionCounter_ = RetentionCounter;
        let EditState_ = 0;
    
        if (DataExists(LSPrefix + "RetentionHeader"))
        {
            RetentionHeader = JSON.parse(DataGet(LSPrefix + "RetentionHeader"));
            
            ScaleSet(RetentionHeader.ScaleX, RetentionHeader.ScaleY, RetentionHeader.ScaleZ);

            CameraPosX = RetentionHeader.CamPosX;
            CameraPosY = RetentionHeader.CamPosY;
            CameraPosZ = RetentionHeader.CamPosZ;
            CameraRotX = RetentionHeader.CamRotX;
            CameraRotY = RetentionHeader.CamRotY;
            CameraRotZ = RetentionHeader.CamRotZ;
            CameraAngle = RetentionHeader.CameraAngle;
            CursorX = RetentionHeader.PosX;
            CursorY = RetentionHeader.PosY;
            CursorZ = RetentionHeader.PosZ;
            CursorSizeX = RetentionHeader.SizeX;
            CursorSizeY = RetentionHeader.SizeY;
            CursorSizeZ = RetentionHeader.SizeZ;
            
            ColorBackR = RetentionHeader.ColorBackR;
            ColorBackG = RetentionHeader.ColorBackG;
            ColorBackB = RetentionHeader.ColorBackB;
            CursorColorR = RetentionHeader.ColorCursorR;
            CursorColorG = RetentionHeader.ColorCursorG;
            CursorColorB = RetentionHeader.ColorCursorB;
            ColorDef1R = RetentionHeader.ColorDef1R;
            ColorDef1G = RetentionHeader.ColorDef1G;
            ColorDef1B = RetentionHeader.ColorDef1B;
            ColorDef2R = RetentionHeader.ColorDef2R;
            ColorDef2G = RetentionHeader.ColorDef2G;
            ColorDef2B = RetentionHeader.ColorDef2B;

            EditState_ = RetentionHeader.EditState;
        }
    
       
        for (let I = 0; I < RetentionDataCount; I++)
        {
            let DataItemName = LSPrefix + "RetentionData_" + I;
            if (DataExists(DataItemName))
            {
                let ObjInfo = JSON.parse(DataGet(DataItemName));
                RetentionDataMap[Idx_(ObjInfo.PX, ObjInfo.PY, ObjInfo.PZ)] = I;
                let Obj = SceneAdd(ObjInfo.PX, ObjInfo.PY, ObjInfo.PZ);
                Obj.SetFaces(ObjInfo.F0, ObjInfo.F1, ObjInfo.F2, ObjInfo.F3, ObjInfo.F4, ObjInfo.F5);
                Obj.SetColor(ObjInfo.C1R, ObjInfo.C1G, ObjInfo.C1B, ObjInfo.C2R, ObjInfo.C2G, ObjInfo.C2B);
                RetentionAddObj(Obj);
            }
            else
            {
                RetentionDataHole.push(I);
            }
        }
        
        BufScreenRepaint();
        ColorSetDef();
        
        EditState = EditState_;
        CursorEditStateBtn();

        RetentionCounter = RetentionCounter_;
        DataSet(LSPrefix + "RetentionCounter", RetentionCounter);

        if (DataExists(LSPrefix + "RetentionText"))
        {
            document.getElementById("TextBuffer").value = DataGet(LSPrefix + "RetentionText");
        }
    }
    else
    {
        RetentionCounter = 0;
        DataSet(LSPrefix + "RetentionCounter", RetentionCounter);
        RetentionClear();
        
        if (DataExists(LSPrefix + "RetentionText"))
        {
            DataDelete(LSPrefix + "RetentionText");
        }
        if (DataExists(LSPrefix + "RetentionHeader"))
        {
            DataDelete(LSPrefix + "RetentionHeader");
        }
        if (DataExists(LSPrefix + "RetentionDataCount"))
        {
            let C = DataGetI(LSPrefix + "RetentionDataCount");
            for (let I = 0; I < C; I++)
            {
                if (DataExists(LSPrefix + "RetentionData_" + I))
                {
                    DataDelete(LSPrefix + "RetentionData_" + I);
                }
            }
            DataDelete(LSPrefix + "RetentionDataCount");
        }        
        document.getElementById("TextBuffer").value = "";
    }
}

function RetentionText()
{
    DataSet(LSPrefix + "RetentionText", document.getElementById("TextBuffer").value);
    RetentionResetCounter();
}


