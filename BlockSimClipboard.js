function ClipboardClear()
{
    if (DataExists(LSPrefix + "Clipboard"))
    {
        DataDelete(LSPrefix + "Clipboard");
    }
}

function ClipboardCut()
{
    ClipboardCopy();
    ClipboardDelete();
}

function ClipboardCopy()
{
    DataSet(LSPrefix + "Clipboard", BufExport(-1));
}

function ClipboardPaste()
{
    if (DataExists(LSPrefix + "Clipboard"))
    {
        BufImport(DataGet(LSPrefix + "Clipboard"), 2);
    }
}

function ClipboardDelete()
{
    SceneBlockListCursor();
    UndoRedoUnitBegin();
    for (var I = 0; I < SceneBlockListX.length; I++)
    {
        UndoRedoUnitBlock1XYZ(SceneBlockListX[I], SceneBlockListY[I], SceneBlockListZ[I]);
        SceneRem(SceneBlockListX[I], SceneBlockListY[I], SceneBlockListZ[I]);
        UndoRedoUnitBlock2Blank(SceneBlockListX[I], SceneBlockListY[I], SceneBlockListZ[I]);
    }
    UndoRedoUnitEnd(false);
    ScreenRefresh();
}

