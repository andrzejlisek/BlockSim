function HtmlSetVisible(Id, Val)
{
    if (Val)
    {
        document.getElementById(Id).style["display"] = "";
    }
    else
    {
        document.getElementById(Id).style["display"] = "none";
    }
}

function GuiArrange()
{
    if (SET_Layout_Split < 0)
    {
        SET_Layout_Split = 0;
    }
    if (SET_Layout_Split > 10)
    {
        SET_Layout_Split = 10;
    }
    document.getElementById("Col1").style["width"] = SET_Layout_Split + "0%";
    document.getElementById("Col2").style["width"] = (10 - SET_Layout_Split) + "0%";
    HtmlSetVisible("Col1", SET_Layout_Split > 0);
    HtmlSetVisible("Col2", SET_Layout_Split < 10);
    

    for (let T = 0; T < 2; T++)
    {
        let SET_Layout = "";
        let LayoutSide = "";
        if (T == 0)
        {
            LayoutSide = "L";
            SET_Layout = SET_Layout_L;
        }
        if (T == 1)
        {
            LayoutSide = "R";
            SET_Layout = SET_Layout_R;
        }
        HtmlSetVisible("ModuleSplit" + LayoutSide, SET_LayoutBtn ? 1 : 0);
        HtmlSetVisible("ModuleSwapX" + LayoutSide, SET_LayoutBtn ? 1 : 0);
        for (var I = 0; I < SET_Layout.length; I++)
        {
            HtmlSetVisible("ModuleSwap" + I + LayoutSide, SET_LayoutBtn ? 1 : 0);
            var Obj1 = document.getElementById("D" + I + LayoutSide);
            var Obj2 = document.getElementById("T" + SET_Layout.substr(I, 1));
            if (Obj1 && Obj2)
            {
                Obj1.appendChild(Obj2);
            }
        }
        for (var I = (SET_Layout.length - 1); I < 10; I++)
        {
            if (I >= 0)
            {
                HtmlSetVisible("ModuleSwap" + I + LayoutSide, 0);
            }
        }
    }
}

function GuiSwap(Swap1, Swap2, N)
{
    if ((Swap1 == 0) && (Swap2 == 0))
    {
        if ((N == 0) && (SET_Layout_L.length > 0))
        {
            SET_Layout_R = SET_Layout_L.substr(0, 1) + SET_Layout_R;
            SET_Layout_L = SET_Layout_L.substr(1);
        }
        if ((N == 1) && (SET_Layout_R.length > 0))
        {
            SET_Layout_L = SET_Layout_R.substr(0, 1) + SET_Layout_L;
            SET_Layout_R = SET_Layout_R.substr(1);
        }
    }
    else
    {
        if (N == 0)
        {
            SET_Layout_L = GuiSwapWork(Swap1, Swap2, SET_Layout_L);
        }
        if (N == 1)
        {
            SET_Layout_R = GuiSwapWork(Swap1, Swap2, SET_Layout_R);
        }
    }
    DataSet("SET_Layout_L", SET_Layout_L);
    DataSet("SET_Layout_R", SET_Layout_R);
    GuiArrange();
}

function GuiSwapWork(Swap1, Swap2, SET_Layout)
{
    if ((SET_Layout.length > Swap1) && (SET_Layout.length > Swap2) && (Swap1 != Swap2))
    {
        let _ = "";
        for (var I = 0; I < SET_Layout.length; I++)
        {
            var C = SET_Layout.substr(I, 1);
            if ((I == Swap1) || (I == Swap2))
            {
                if (I == Swap1)
                {
                    _ = _ + SET_Layout.substr(Swap2, 1);
                }
                if (I == Swap2)
                {
                    _ = _ + SET_Layout.substr(Swap1, 1);
                }
            }
            else
            {
                _ = _ + C;
            }
        }
        SET_Layout = _;
    }
    return SET_Layout;
}

function GuiSetSplit(N)
{
    if ((N == 0) && (SET_Layout_Split > 0))
    {
        SET_Layout_Split--;
    }
    if ((N == 1) && (SET_Layout_Split < 10))
    {
        SET_Layout_Split++;
    }
    DataSet("SET_Layout_Split", SET_Layout_Split);
    GuiArrange();
}

function GuiSetControls()
{
    let CtrlTwoParts = SET_LayoutCtrl >= 4 ? true : false;

    let Size1 = "2%";
    let Size2 = "7%";
    let Size3 = "4%";

    // 100% = Size1 + Size2*3 + Size3 + Size2*3 + Size3 + Size2*3 + Size3 + Size2*3 + Size1
    // 100% = Size1 + Size2*3 + Size3 + Size2*3 + Size1
    
    switch (SET_LayoutCtrl)
    {
        case 0:
            {
                Size1 = "2%";
                Size2 = "7%";
                Size3 = "4%";
            }
            break;
        case 1:
            {
                Size1 = "2%";
                Size2 = "6%";
                Size3 = "8%";
            }
            break;
        case 2:
            {
                Size1 = "5%";
                Size2 = "6%";
                Size3 = "6%";
            }
            break;
        case 3:
            {
                Size1 = "5%";
                Size2 = "5%";
                Size3 = "10%";
            }
            break;
        case 4:
            {
                Size1 = "3%";
                Size2 = "15%";
                Size3 = "4%";
            }
            break;
        case 5:
            {
                Size1 = "5%";
                Size2 = "14%";
                Size3 = "6%";
            }
            break;
        case 6:
            {
                Size1 = "7%";
                Size2 = "13%";
                Size3 = "8%";
            }
            break;
        case 7:
            {
                Size1 = "9%";
                Size2 = "12%";
                Size3 = "10%";
            }
            break;
        case 8:
            {
                Size1 = "11%";
                Size2 = "11%";
                Size3 = "12%";
            }
            break;
        case 9:
            {
                Size1 = "13%";
                Size2 = "10%";
                Size3 = "14%";
            }
            break;
        case 10:
            {
                Size1 = "15%";
                Size2 = "9%";
                Size3 = "16%";
            }
            break;
        case 11:
            {
                Size1 = "17%";
                Size2 = "8%";
                Size3 = "18%";
            }
            break;
    }
    

    let CtrlVisMode = 0;
    if (CtrlTwoParts)
    {
        CtrlVisMode = (SET_LayoutCtrlPos + 1);
    }

    HtmlSetVisible("CtrlBtn01_", 1);
    HtmlSetVisible("CtrlBtn02_", 1);
    HtmlSetVisible("CtrlBtn03_", (CtrlVisMode != 2));
    HtmlSetVisible("CtrlBtn04_", (CtrlVisMode == 0));
    HtmlSetVisible("CtrlBtn05_", (CtrlVisMode != 1));

    HtmlSetVisible("CtrlCaption1_", (CtrlVisMode != 2));
    HtmlSetVisible("CtrlCaption2_", (CtrlVisMode != 2));
    HtmlSetVisible("CtrlCaption3_", (CtrlVisMode != 1));
    HtmlSetVisible("CtrlCaption4_", (CtrlVisMode != 1));

    for (let I = 1; I <= 6; I++)
    {
        HtmlSetVisible("CtrlBtn1" + I + "_", (CtrlVisMode != 2));
        HtmlSetVisible("CtrlBtn2" + I + "_", (CtrlVisMode != 2));
        HtmlSetVisible("CtrlBtn3" + I + "_", (CtrlVisMode != 1));
        HtmlSetVisible("CtrlBtn4" + I + "_", (CtrlVisMode != 1));

        document.getElementById("CtrlBtn1" + I + "_").width = Size2;
        document.getElementById("CtrlBtn2" + I + "_").width = Size2;
        document.getElementById("CtrlBtn3" + I + "_").width = Size2;
        document.getElementById("CtrlBtn4" + I + "_").width = Size2;
    }

    HtmlSetVisible("CtrlKeys11_", (CtrlVisMode != 2));
    HtmlSetVisible("CtrlKeys21_", (CtrlVisMode != 2));
    HtmlSetVisible("CtrlKeys31_", (CtrlVisMode != 1));
    HtmlSetVisible("CtrlKeys41_", (CtrlVisMode != 1));

    HtmlSetVisible("CtrlKeys12_", (CtrlVisMode != 2));
    HtmlSetVisible("CtrlKeys22_", (CtrlVisMode != 2));
    HtmlSetVisible("CtrlKeys32_", (CtrlVisMode != 1));
    HtmlSetVisible("CtrlKeys42_", (CtrlVisMode != 1));

    HtmlSetVisible("CtrlBtn01", (CtrlVisMode != 0));
    HtmlSetVisible("CtrlBtn02", (CtrlVisMode != 0));
    HtmlSetVisible("CtrlBtn03", (CtrlVisMode != 0));
    HtmlSetVisible("CtrlBtn04", (CtrlVisMode != 0));
    HtmlSetVisible("CtrlBtn05", (CtrlVisMode != 0));


    document.getElementById("CtrlBtn01_").width = Size1;
    document.getElementById("CtrlBtn02_").width = Size1;
    document.getElementById("CtrlBtn03_").width = Size3;
    document.getElementById("CtrlBtn04_").width = Size3;
    document.getElementById("CtrlBtn05_").width = Size3;


    document.getElementById("CtrlBtn1_").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn2_").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn3_").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn4_").style["font-size"] = SET_Control2Size + "px";

    document.getElementById("CtrlBtn1_").style["height"] = SET_Control3Size + "px";
    document.getElementById("CtrlBtn2_").style["height"] = SET_Control3Size + "px";
    document.getElementById("CtrlBtn3_").style["height"] = SET_Control3Size + "px";
    document.getElementById("CtrlBtn4_").style["height"] = SET_Control3Size + "px";


    document.getElementById("CtrlBtn01").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn02").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn03").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn04").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn05").style["font-size"] = SET_Control2Size + "px";

    document.getElementById("CtrlBtn01").style["height"] = (SET_Control3Size + SET_Control1Size + SET_Control1Size + SET_Control1Size + SET_Control1Size) + 8 + "px";
    document.getElementById("CtrlBtn02").style["height"] = (SET_Control3Size + SET_Control1Size + SET_Control1Size + SET_Control1Size + SET_Control1Size) + 8 + "px";
    document.getElementById("CtrlBtn03").style["height"] = (SET_Control3Size + SET_Control1Size + SET_Control1Size + SET_Control1Size + SET_Control1Size) + 8 + "px";
    document.getElementById("CtrlBtn04").style["height"] = (SET_Control3Size + SET_Control1Size + SET_Control1Size + SET_Control1Size + SET_Control1Size) + 8 + "px";
    document.getElementById("CtrlBtn05").style["height"] = (SET_Control3Size + SET_Control1Size + SET_Control1Size + SET_Control1Size + SET_Control1Size) + 8 + "px";


    document.getElementById("CtrlBtn11").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn12").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn13").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn14").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn15").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn16").style["font-size"] = SET_Control2Size + "px";

    document.getElementById("CtrlBtn11").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn12").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn13").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn14").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn15").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn16").style["height"] = SET_Control1Size + "px";


    document.getElementById("CtrlBtn21").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn22").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn23").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn24").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn25").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn26").style["font-size"] = SET_Control2Size + "px";

    document.getElementById("CtrlBtn21").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn22").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn23").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn24").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn25").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn26").style["height"] = SET_Control1Size + "px";


    document.getElementById("CtrlBtn31").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn32").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn33").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn34").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn35").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn36").style["font-size"] = SET_Control2Size + "px";

    document.getElementById("CtrlBtn31").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn32").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn33").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn34").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn35").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn36").style["height"] = SET_Control1Size + "px";


    document.getElementById("CtrlBtn41").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn42").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn43").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn44").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn45").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn46").style["font-size"] = SET_Control2Size + "px";

    document.getElementById("CtrlBtn41").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn42").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn43").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn44").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn45").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn46").style["height"] = SET_Control1Size + "px";


    document.getElementById("CtrlKeys11").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlKeys21").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlKeys31").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlKeys41").style["font-size"] = SET_Control2Size + "px";

    document.getElementById("CtrlKeys11").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlKeys21").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlKeys31").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlKeys41").style["height"] = SET_Control1Size + "px";


    document.getElementById("CtrlKeys12").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlKeys22").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlKeys32").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlKeys42").style["font-size"] = SET_Control2Size + "px";

    document.getElementById("CtrlKeys12").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlKeys22").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlKeys32").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlKeys42").style["height"] = SET_Control1Size + "px";


    document.getElementById("CtrlBtn0").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn1").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn2").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn3").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn4").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn5").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn6").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn7").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn8").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("CtrlBtn9").style["font-size"] = SET_Control2Size + "px";

    document.getElementById("CtrlBtn0").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn1").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn2").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn3").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn4").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn5").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn6").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn7").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn8").style["height"] = SET_Control1Size + "px";
    document.getElementById("CtrlBtn9").style["height"] = SET_Control1Size + "px";


    document.getElementById("StorageName").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("Storage1").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("Storage2").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("Storage3").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("Storage4").style["font-size"] = SET_Control2Size + "px";

    document.getElementById("Storage1").style["height"] = SET_Control1Size + "px";
    document.getElementById("Storage2").style["height"] = SET_Control1Size + "px";
    document.getElementById("Storage3").style["height"] = SET_Control1Size + "px";
    document.getElementById("Storage4").style["height"] = SET_Control1Size + "px";


    document.getElementById("TextX").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("Text_").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("Text0").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("Text1").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("Text2").style["font-size"] = SET_Control2Size + "px";

    document.getElementById("TextX").style["height"] = SET_Control1Size + "px";
    document.getElementById("Text_").style["height"] = SET_Control1Size + "px";
    document.getElementById("Text0").style["height"] = SET_Control1Size + "px";
    document.getElementById("Text1").style["height"] = SET_Control1Size + "px";
    document.getElementById("Text2").style["height"] = SET_Control1Size + "px";


    document.getElementById("UndoRedo0").style["font-size"] = SET_Control2Size + "px";
    document.getElementById("UndoRedo1").style["font-size"] = SET_Control2Size + "px";

    document.getElementById("UndoRedo0").style["height"] = SET_Control1Size + "px";
    document.getElementById("UndoRedo1").style["height"] = SET_Control1Size + "px";
    

    //HtmlSetVisible("CtrlBtn02", (CtrlVisMode != 0));

    
    for (let I = 0; I < 3; I++)
    {
        let Cha = "";
        switch (I)
        {
            case 0: Cha = "R"; break;
            case 1: Cha = "G"; break;
            case 2: Cha = "B"; break;
        }

        document.getElementById("Color" + Cha).style["font-size"] = SET_Control2Size + "px";
    
        for (let Num = 1; Num <= 4; Num++)
        {
            document.getElementById("Color" + Num).style["font-size"] = SET_Control2Size + "px";
        
            for (let II = 0; II <= 6; II++)
            {
                document.getElementById("Color" + Num + Cha + "_" + II).style["font-size"] = SET_Control2Size + "px";
                document.getElementById("Color" + Num + Cha + "_" + II).style["height"] = SET_Control1Size + "px";
            }
            
            HtmlSetVisible("Color" + Num + Cha + "_Ctrl0", SET_LayoutColor == 0);
            document.getElementById("Color" + Num + Cha + "_0").style["width"] = "19%";
            document.getElementById("Color" + Num + Cha + "_1").style["width"] = "19%";
            document.getElementById("Color" + Num + Cha + "_2").style["width"] = "19%";
            document.getElementById("Color" + Num + Cha + "_3").style["width"] = "19%";
            document.getElementById("Color" + Num + Cha + "_4").style["width"] = "19%";

            HtmlSetVisible("Color" + Num + Cha + "_Ctrl1", SET_LayoutColor == 1);
            document.getElementById("Color" + Num + Cha + "_5").style["width"] = "48%";
            document.getElementById("Color" + Num + Cha + "_6").style["width"] = "48%";
        }
    }
    
    
    StorageList();
    
    
    document.getElementById("TextBuffer").rows = SET_TextBufSize;
    document.getElementById("TextBuffer").style["font-size"] = SET_TextFontSize + "px";;
    
}

function GuiControlsChange()
{
    if (SET_LayoutCtrlPos == 0)
    {
        SET_LayoutCtrlPos = 1;
    }
    else
    {
        SET_LayoutCtrlPos = 0;
    }
    DataSet("SET_LayoutCtrlPos", SET_LayoutCtrlPos);
    GuiSetControls();
}

function GuiSetCanvas()
{
    ViewCanvas.width = SET_CanvasW;
    ViewCanvas.height = SET_CanvasH;
    ViewRenderer.setClearColor(0x000000, 1);
    CameraPosAng();
    RenderUpd = true;
    render();
}

function SettingsGet()
{
    document.getElementById("SET_CanvasW").value = SET_CanvasW;
    document.getElementById("SET_CanvasH").value = SET_CanvasH;
    document.getElementById("SET_TextBufSize").value = SET_TextBufSize;
    document.getElementById("SET_TextFontSize").value = SET_TextFontSize;
    document.getElementById("SET_Control1Size").value = SET_Control1Size;
    document.getElementById("SET_Control2Size").value = SET_Control2Size;
    document.getElementById("SET_Control3Size").value = SET_Control3Size;
    document.getElementById("SET_KeyTimer").value = SET_KeyTimer;
    document.getElementById("SET_LayoutCtrl").selectedIndex = SET_LayoutCtrl;
    document.getElementById("SET_LayoutColor").selectedIndex = SET_LayoutColor;
    document.getElementById("SET_LayoutBtn").selectedIndex = SET_LayoutBtn;
}

function SettingsSet()
{
    SET_CanvasW = NumI(document.getElementById("SET_CanvasW").value);
    SET_CanvasH = NumI(document.getElementById("SET_CanvasH").value);
    SET_TextBufSize = NumI(document.getElementById("SET_TextBufSize").value);
    SET_TextFontSize = NumI(document.getElementById("SET_TextFontSize").value);
    SET_Control1Size = NumI(document.getElementById("SET_Control1Size").value);
    SET_Control2Size = NumI(document.getElementById("SET_Control2Size").value);
    SET_Control3Size = NumI(document.getElementById("SET_Control3Size").value);
    SET_KeyTimer = NumI(document.getElementById("SET_KeyTimer").value);
    SET_LayoutCtrl = document.getElementById("SET_LayoutCtrl").selectedIndex;
    SET_LayoutColor = document.getElementById("SET_LayoutColor").selectedIndex;
    SET_LayoutBtn = document.getElementById("SET_LayoutBtn").selectedIndex;

    DataSet("SET_CanvasW", SET_CanvasW);
    DataSet("SET_CanvasH", SET_CanvasH);
    DataSet("SET_TextBufSize", SET_TextBufSize);
    DataSet("SET_TextFontSize", SET_TextFontSize);
    DataSet("SET_Control1Size", SET_Control1Size);
    DataSet("SET_Control2Size", SET_Control2Size);
    DataSet("SET_Control3Size", SET_Control3Size);
    DataSet("SET_KeyTimer", SET_KeyTimer);
    DataSet("SET_LayoutCtrl", SET_LayoutCtrl);
    DataSet("SET_LayoutColor", SET_LayoutColor);
    DataSet("SET_LayoutBtn", SET_LayoutBtn);
    
    GuiSetCanvas();
    GuiSetControls();
    GuiArrange();
}


