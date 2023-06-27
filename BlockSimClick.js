function ClickPrepare(Node, D)
{
    if (Node instanceof HTMLInputElement)
    {
        if (Node.onclick)
        {
            let Evt = Node.onclick;
            Node.onclick = null;
            Node.removeEventListener("click", Evt);
            Node.addEventListener("touchstart", Evt);
        }

        if (Node.onmousedown)
        {
            let Evt = Node.onmousedown;
            Node.onmousedown = null;
            Node.removeEventListener("mousedown", Evt);
            Node.addEventListener("touchstart", Evt);
        }

        if (Node.onmouseup)
        {
            let Evt = Node.onmouseup;
            Node.onmouseup = null;
            Node.removeEventListener("mouseup", Evt);
            Node.addEventListener("touchend", Evt);
        }
    }

    for (let I = 0; I < Node.childNodes.length; I++)
    {
        if (Node.childNodes[I] instanceof HTMLElement)
        {
            ClickPrepare(Node.childNodes[I], D + 1);
        }
    }
}

