
function MsgClear()
{
    document.getElementById("TextBuffer").value = "";
}

function MsgPrint(X)
{
    document.getElementById("TextBuffer").value += X;
}


function CameraPosAngX(_X, _Y, _Z, __X, __Y, __Z)
{
    CameraPosX = _X;
    CameraPosY = _Y;
    CameraPosZ = _Z;
    CameraRotX = __X;
    CameraRotY = __Y;
    CameraRotZ = __Z;
    CameraPosAng();
    RetentionCamCur();
}


function CameraPosChange(Axis, Dir)
{
    var CameraPosStepX = CameraPosStep;
    var I = 1;
    while (CameraPosStepX >= CameraMargin)
    {
        CameraPosStepX = CameraPosStepX / 2.0;
        I = I * 2;
    }
    CameraPosStepX = Dir * CameraPosStepX;

    while (I > 0)
    {
        switch (Axis)
        {
            case 0:
                CameraPosX -= CameraPosStepX * Sin(CameraRotY) * Sin(CameraRotX);
                CameraPosY += CameraPosStepX * Sin(CameraRotY) * Cos(CameraRotX);
                CameraPosZ += CameraPosStepX * Cos(CameraRotY);
                break;
            case 1:
                CameraPosX -= CameraPosStepX * Cos(CameraRotY) * Sin(CameraRotX);
                CameraPosY += CameraPosStepX * Cos(CameraRotY) * Cos(CameraRotX);
                CameraPosZ -= CameraPosStepX * Sin(CameraRotY);
                break;
            case 2:
                CameraPosX -= CameraPosStepX * Cos(CameraRotX);
                CameraPosY -= CameraPosStepX * Sin(CameraRotX);
                break;
        }

        var CameraPosTemp;
        var CameraBlockX = Math.round(CameraPosX / ViewSize2X);
        var CameraBlockY = Math.round(CameraPosY / ViewSize2Y);
        var CameraBlockZ = Math.round(CameraPosZ / ViewSize2Z);
        if (!SceneExists(CameraBlockX, CameraBlockY, CameraBlockZ))
        {
            if (SceneExists(CameraBlockX - 1, CameraBlockY, CameraBlockZ))
            {
                CameraPosTemp = (CameraBlockX * ViewSize2X) - ViewSizeX + CameraMargin;
                if (CameraPosX < CameraPosTemp)
                {
                    CameraPosX = CameraPosTemp;
                }
            }
            if (SceneExists(CameraBlockX + 1, CameraBlockY, CameraBlockZ))
            {
                CameraPosTemp = (CameraBlockX * ViewSize2X) + ViewSizeX - CameraMargin;
                if (CameraPosX > CameraPosTemp)
                {
                    CameraPosX = CameraPosTemp;
                }
            }
            if (SceneExists(CameraBlockX, CameraBlockY - 1, CameraBlockZ))
            {
                CameraPosTemp = (CameraBlockY * ViewSize2Y) - ViewSizeY + CameraMargin;
                if (CameraPosY < CameraPosTemp)
                {
                    CameraPosY = CameraPosTemp;
                }
            }
            if (SceneExists(CameraBlockX, CameraBlockY + 1, CameraBlockZ))
            {
                CameraPosTemp = (CameraBlockY * ViewSize2Y) + ViewSizeY - CameraMargin;
                if (CameraPosY > CameraPosTemp)
                {
                    CameraPosY = CameraPosTemp;
                }
            }
            if (SceneExists(CameraBlockX, CameraBlockY, CameraBlockZ - 1))
            {
                CameraPosTemp = (CameraBlockZ * ViewSize2Z) - ViewSizeZ + CameraMargin;
                if (CameraPosZ < CameraPosTemp)
                {
                    CameraPosZ = CameraPosTemp;
                }
            }
            if (SceneExists(CameraBlockX, CameraBlockY, CameraBlockZ + 1))
            {
                CameraPosTemp = (CameraBlockZ * ViewSize2Z) + ViewSizeZ - CameraMargin;
                if (CameraPosZ > CameraPosTemp)
                {
                    CameraPosZ = CameraPosTemp;
                }
            }
        }
        I--;
    }
    RetentionCamCur();
}

function CameraRotChange(Axis, Dir)
{
    var CameraRotStepX = Dir * CameraRotStep;
    switch (Axis)
    {
        case 0:
            CameraRotY += CameraRotStepX;
            break;
        case 1:
            CameraRotX -= CameraRotStepX;
            break;
        case 2:
            CameraRotZ -= CameraRotStepX;
            break;
    }
    RetentionCamCur();
}



function Sin(X)
{
    return Math.sin(Ang(X));
}

function Cos(X)
{
    return Math.cos(Ang(X));
}


function AngNorm(X)
{
    while (X < -180)
    {
        X = X + 360;
    }
    while (X >= 180)
    {
        X = X - 360;
    }
    return X;
}

function CameraPosAngInput(Name1, Vals)
{
    Vals[0] = Math.round(Vals[0]);
    Vals[1] = Math.round(Vals[1]);
    Vals[2] = Math.round(Vals[2]);
    let ValX = prompt(Name1 + " X", Vals[0]);
    if (IsGoodNumber(ValX))
    {
        let ValY = prompt(Name1 + " Y", Vals[1]);
        if (IsGoodNumber(ValY))
        {
            let ValZ = prompt(Name1 + " Z", Vals[2]);
            if (IsGoodNumber(ValZ))
            {
                Vals[0] = NumI(ValX);
                Vals[1] = NumI(ValY);
                Vals[2] = NumI(ValZ);
                return Vals;
            }
        }
    }
    return null;
}

function CameraPosAngInfo(Ctrl, Name, X, Y, Z)
{
    document.getElementById(Ctrl).value = Name + "\n" + NumText(X) + "|" + NumText(Y) + "|" + NumText(Z);
}

function CameraPosAngBtn(N)
{
    KeyCapture(false);
    let OutVals = "";
    switch (N)
    {
        case 1:
            OutVals = CameraPosAngInput("Move", [CameraPosX, CameraPosY, CameraPosZ]);
            if (OutVals)
            {
                CameraPosX = OutVals[0];
                CameraPosY = OutVals[1];
                CameraPosZ = OutVals[2];
            }
            break;
        case 2:
            OutVals = CameraPosAngInput("Rotate", [CameraRotX, CameraRotY, CameraRotZ]);
            if (OutVals)
            {
                CameraRotX = OutVals[0];
                CameraRotY = OutVals[1];
                CameraRotZ = OutVals[2];
            }
            break;
        case 3:
            OutVals = CameraPosAngInput("Position", [CursorX, CursorY, CursorZ]);
            if (OutVals)
            {
                CursorHide();
                CursorX = OutVals[0];
                CursorY = OutVals[1];
                CursorZ = OutVals[2];
                CursorShow();
            }
            break;
        case 4:
            OutVals = CameraPosAngInput("Size", [CursorSizeX, CursorSizeY, CursorSizeZ]);
            if (OutVals)
            {
                CursorHide();
                CursorSizeX = OutVals[0];
                CursorSizeY = OutVals[1];
                CursorSizeZ = OutVals[2];
                CursorShow();
            }
            break;
    }
    CameraPosAng();
    RetentionCamCur();
}

function CameraPosAng()
{
    CameraRotX = AngNorm(CameraRotX);
    CameraRotY = AngNorm(CameraRotY);
    CameraRotZ = AngNorm(CameraRotZ);

    ViewCamera.position.set(0, 0, 0);
    ViewCamera.rotation.set(Ang(CameraRotX + 90), Ang(CameraRotY), Ang((0 - CameraRotZ) + 90));
    ViewCamera.position.set(0 - CameraPosZ, 0 - CameraPosY, CameraPosX);

    if (SET_Keyboard)
    {
        CameraPosAngInfo("CtrlBtn1_", "[Move]", CameraPosX, CameraPosY, CameraPosZ);
        CameraPosAngInfo("CtrlBtn2_", "[Rotate]", CameraRotX, CameraRotY, CameraRotZ);
        CameraPosAngInfo("CtrlBtn3_", "[Position]", CursorX, CursorY, CursorZ);
        CameraPosAngInfo("CtrlBtn4_", "[Size]", CursorSizeX, CursorSizeY, CursorSizeZ);
    }
    else
    {
        CameraPosAngInfo("CtrlBtn1_", "Move", CameraPosX, CameraPosY, CameraPosZ);
        CameraPosAngInfo("CtrlBtn2_", "Rotate", CameraRotX, CameraRotY, CameraRotZ);
        CameraPosAngInfo("CtrlBtn3_", "Position", CursorX, CursorY, CursorZ);
        CameraPosAngInfo("CtrlBtn4_", "Size", CursorSizeX, CursorSizeY, CursorSizeZ);
    }
    document.getElementById("Zoom00").value = CameraAngle;
    ScreenRefresh();
}


function Ang(X)
{
    return X * 3.14159 / 180.0;
}


function ScreenRefresh()
{
    requestAnimationFrame(render);
}

var render = function ()
{
    if (RenderUpd || (CameraAngle_ != CameraAngle))
    {
        ViewRenderer.setSize(SET_CanvasW, SET_CanvasH);
        ViewCamera.aspect = SET_CanvasW / SET_CanvasH;
        ViewCamera.fov = CameraAngle;
        ViewCamera.updateProjectionMatrix();
        CameraAngle_ = CameraAngle;
        RenderUpd = false;
        
        ViewCanvas.style["width"] = (SET_CanvasW / PixelRatio) + "px";
        ViewCanvas.style["height"] = (SET_CanvasH / PixelRatio) + "px";
    }
    ViewRenderer.render(ViewScene, ViewCamera);
};

