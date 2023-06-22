let ClipboardBuf_ = "";
let ClipboardBuf = "";

function ClipboardSwap()
{
    let _ = ClipboardBuf;
    ClipboardBuf = ClipboardBuf_;
    ClipboardBuf_ = _;
}

function ClipboardCut()
{
    ClipboardCopy();
    ClipboardDelete();
}

function ClipboardCopy()
{
    ClipboardBuf = BufExport(0);
}

function ClipboardPaste()
{
    return BufImport(ClipboardBuf);
}

function ClipboardDelete()
{
    SceneBlockList();
    UndoRedoUnitBegin();
    for (var I = 0; I < SceneBlockListX.length; I++)
    {
        UndoRedoUnitBlock1XYZ(SceneBlockListX[I], SceneBlockListY[I], SceneBlockListZ[I]);
        SceneRem(SceneBlockListX[I], SceneBlockListY[I], SceneBlockListZ[I]);
        UndoRedoUnitBlock2Blank(SceneBlockListX[I], SceneBlockListY[I], SceneBlockListZ[I]);
    }
    UndoRedoUnitEnd();
}
