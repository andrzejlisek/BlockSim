function KeyProc()
{
    if (KeyState != 0)
    {
        switch(KeyState)
        {
            case 11: CameraPosChange(1, -1); break;
            case 12: CameraPosChange(1,  1); break;
            case 13: CameraPosChange(2,  1); break;
            case 14: CameraPosChange(2, -1); break;
            case 15: CameraPosChange(0,  1); break;
            case 16: CameraPosChange(0, -1); break;

            case 21: CameraRotChange(0,  1); break;
            case 22: CameraRotChange(0, -1); break;
            case 23: CameraRotChange(1,  1); break;
            case 24: CameraRotChange(1, -1); break;
            case 25: CameraRotChange(2,  1); break;
            case 26: CameraRotChange(2, -1); break;

            case 31: CursorMove(0, -1,  0); break;
            case 32: CursorMove(0,  1,  0); break;
            case 33: CursorMove(-1, 0,  0); break;
            case 34: CursorMove(1,  0,  0); break;
            case 35: CursorMove(0,  0,  1); break;
            case 36: CursorMove(0,  0, -1); break;

            case 41: CursorSize(0, -1,  0); break;
            case 42: CursorSize(0,  1,  0); break;
            case 43: CursorSize(-1, 0,  0); break;
            case 44: CursorSize(1,  0,  0); break;
            case 45: CursorSize(0,  0,  1); break;
            case 46: CursorSize(0,  0, -1); break;
        }
        CameraPosAng();
        GuiGet();
        if ((SET_KeyRepeat1 && (KeyState >= 10) && (KeyState <= 19)))
        {
            setTimeout(function(){ KeyProc(); }, SET_KeyTimer);
        }
        if ((SET_KeyRepeat2 && (KeyState >= 20) && (KeyState <= 29)))
        {
            setTimeout(function(){ KeyProc(); }, SET_KeyTimer);
        }
        if ((SET_KeyRepeat3 && (KeyState >= 30) && (KeyState <= 39)))
        {
            setTimeout(function(){ KeyProc(); }, SET_KeyTimer);
        }
        if ((SET_KeyRepeat4 && (KeyState >= 40) && (KeyState <= 49)))
        {
            setTimeout(function(){ KeyProc(); }, SET_KeyTimer);
        }
    }
}

function ScrKeyRepeat(N, X)
{
    KeyCapture(false);
    if (N == 1)
    {
        SET_KeyRepeat1 = X;
        DataSet("SET_KeyRepeat1", X ? "1" : "0");
    }
    if (N == 2)
    {
        SET_KeyRepeat2 = X;
        DataSet("SET_KeyRepeat2", X ? "1" : "0");
    }
    if (N == 3)
    {
        SET_KeyRepeat3 = X;
        DataSet("SET_KeyRepeat3", X ? "1" : "0");
    }
    if (N == 4)
    {
        SET_KeyRepeat4 = X;
        DataSet("SET_KeyRepeat4", X ? "1" : "0");
    }
}

function ScrKeyDown(Arg)
{
    KeyCapture(false);
    KeyState = Arg;
    KeyFirst = true;
    KeyProc();
    //MsgPrint(Arg1 + "__" + Arg2 + "  Down\n");
}

function ScrKeyUp(Arg)
{
    KeyState = 0;
    //MsgPrint(Arg1 + "__" + Arg2 + "  Up\n");
}

function KeyCapture(X)
{
    if (SET_Keyboard != X)
    {
        SET_Keyboard = X;
        DataSet("SET_Keyboard", X ? "1" : "0");
        CameraPosAng();
    }
}

function KeyPress(e)
{
    if (!SET_Keyboard)
    {
        return;
    }
    console.log(e);
//    alert(EditState);
/*
w-87
s-83
a-65
d-68

q-81
e-69


i-73
k-75
j-74
l-76

u-85
o-79



t-84    y--
g-71    y++
f-70    x--
h-72    x++

r-82    z++
y-89    z--



Z-90
X-88
C-67
V-86
B-66
N-78

M-77
,-188
.-190
/-191

--173/109
=-61/107


1-49
2-50
3-51
8-56
9-57
0-48
*/
//https://keycode.info/
    //alert(e.keyCode);
    switch(e.keyCode)
    {
        case 173: // -_
            if (CameraAngle < 179)
            {
                CameraAngle++;
            }
            break;
        case 61: // =+
            if (CameraAngle > 1)
            {
                CameraAngle--;
            }
            break;

        case 87: CameraPosChange(1, -1); break; // W
        case 83: CameraPosChange(1,  1); break; // S
        case 65: CameraPosChange(2,  1); break; // A
        case 68: CameraPosChange(2, -1); break; // D
        case 81: CameraPosChange(0,  1); break; // Q
        case 69: CameraPosChange(0, -1); break; // E

        case 73: CameraRotChange(0,  1); break; // I
        case 75: CameraRotChange(0, -1); break; // K
        case 74: CameraRotChange(1,  1); break; // J
        case 76: CameraRotChange(1, -1); break; // L
        case 85: CameraRotChange(2,  1); break; // U
        case 79: CameraRotChange(2, -1); break; // O

        case 84: CursorMove(0, -1,  0); break; // T
        case 71: CursorMove(0,  1,  0); break; // G
        case 70: CursorMove(-1, 0,  0); break; // F
        case 72: CursorMove(1,  0,  0); break; // H
        case 82: CursorMove(0,  0,  1); break; // R
        case 89: CursorMove(0,  0, -1); break; // Y

        case 49: CursorEditState(0); break; // 1
        case 50: CursorEditState(1); break; // 2
        case 51: CursorEditState(2); break; // 3
        case 52: CursorEditState(3); break; // 4
        case 53: CursorEditState(4); break; // 5
        case 54: CursorEditState(5); break; // 6

        case 97: CursorEditState(0); break; // Numpad 1
        case 98: CursorEditState(1); break; // Numpad 2
        case 99: CursorEditState(2); break; // Numpad 3
        case 100: CursorEditState(3); break; // Numpad 4
        case 101: CursorEditState(4); break; // Numpad 5
        case 102: CursorEditState(5); break; // Numpad 6

        //case 90: ClipboardDelete(); break; // Z
        //case 88: ClipboardCut(); break; // X
        //case 67: ClipboardCopy(); break; // C
        //case 86: ClipboardPaste(); break; // V

        default:
            return;
    }
    CameraPosAng();
    GuiGet();
}
