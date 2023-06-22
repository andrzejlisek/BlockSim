
function NumF(X)
{
    return parseFloat(X);
}

function NumI(X)
{
    return parseInt(X);
}

function Digit(X, N)
{
    X = parseInt(X);
    switch (N)
    {
        case 0: return ((X - (X % 1)) / 1) % 10;
        case 1: return ((X - (X % 10)) / 10) % 10;
        case 2: return ((X - (X % 100)) / 100) % 10;
        case 3: return ((X - (X % 1000)) / 1000) % 10;
        case 4: return ((X - (X % 10000)) / 10000) % 10;
        case 5: return ((X - (X % 100000)) / 100000) % 10;
        case 6: return ((X - (X % 1000000)) / 1000000) % 10;
        case 7: return ((X - (X % 10000000)) / 10000000) % 10;
        case 8: return ((X - (X % 100000000)) / 100000000) % 10;
        case 9: return ((X - (X % 1000000000)) / 1000000000) % 10;
    }
    return 0;
}

function NumText(X)
{
    if (X > 0)
    {
        return "+" + Math.round(X);
    }
    else
    {
        return Math.round(X);
    }
}

function IsGoodNumber(X)
{
    if (X)
    {
        if (isNaN(X))
        {
            return false;
        }
        return true;
    }
    else
    {
        return false;
    }
}
