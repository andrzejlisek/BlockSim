function CursorEditStateBtn()
{
    document.getElementById("CtrlBtn0").value = "Cursor";
    document.getElementById("CtrlBtn1").value = "Add";
    document.getElementById("CtrlBtn2").value = "Move";
    document.getElementById("CtrlBtn3").value = "Color";
    document.getElementById("CtrlBtn4").value = "Erase";
    document.getElementById("CtrlBtn5").value = "Rotate";
    switch (EditState)
    {
        case 0:
            document.getElementById("CtrlBtn0").value = "[" + document.getElementById("CtrlBtn0").value + "]";
            break;
        case 2:
            document.getElementById("CtrlBtn1").value = "[" + document.getElementById("CtrlBtn1").value + "]";
            break;
        case 4:
            document.getElementById("CtrlBtn2").value = "[" + document.getElementById("CtrlBtn2").value + "]";
            break;
        case 1:
            document.getElementById("CtrlBtn3").value = "[" + document.getElementById("CtrlBtn3").value + "]";
            break;
        case 3:
            document.getElementById("CtrlBtn4").value = "[" + document.getElementById("CtrlBtn4").value + "]";
            break;
        case 5:
            document.getElementById("CtrlBtn5").value = "[" + document.getElementById("CtrlBtn5").value + "]";
            break;
    }
}


function CursorEditState(X)
{
    EditState = X;
    CursorEditStateBtn();
    if (EditState == 2)
    {
        var Obj = SceneGet(CursorX, CursorY, CursorZ);
        if (Obj)
        {
            ColorDef1R = Obj.Color1R;
            ColorDef1G = Obj.Color1G;
            ColorDef1B = Obj.Color1B;
            ColorDef2R = Obj.Color2R;
            ColorDef2G = Obj.Color2G;
            ColorDef2B = Obj.Color2B;
        }
    }
    CursorMove(0, 0, 0);
    CursorSize(0, 0, 0);
    ScreenRefresh();
}


function CursorObject()
{
    this.Shown = false;
    this.Margin = 0.02;
    this.BorderS1 = ViewTextureC / ViewTextureS;
    this.BorderS2 = ViewTextureX / ViewTextureS;
    this.Geo1 = new THREE.PlaneBufferGeometry(ViewSize2 - this.Margin - this.Margin, ViewSize2 * this.BorderS1);
    this.Geo2 = new THREE.PlaneBufferGeometry(ViewSize2 * this.BorderS1, ViewSize2 - this.Margin - this.Margin);
    this.Geo1X = null;
    this.Geo1Y = null;
    this.Geo1Z = null;
    this.Geo2X = null;
    this.Geo2Y = null;
    this.Geo2Z = null;
    
    this.SizeOffsetX0 = 0;
    this.SizeOffsetX1 = 0;
    this.SizeOffsetX2 = 0;
    this.SizeOffsetY0 = 0;
    this.SizeOffsetY1 = 0;
    this.SizeOffsetY2 = 0;
    this.SizeOffsetZ0 = 0;
    this.SizeOffsetZ1 = 0;
    this.SizeOffsetZ2 = 0;
    this.SizeX_ = 1000;
    this.SizeY_ = 1000;
    this.SizeZ_ = 1000;
    this.SizeX_1 = 0;
    this.SizeY_1 = 0;
    this.SizeZ_1 = 0;
    this.SizeX_2 = 0;
    this.SizeY_2 = 0;
    this.SizeZ_2 = 0;
    
    
    this.Mat = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );

    // Left and right
    this.P00 = new THREE.Mesh(this.Geo1, this.Mat);
    this.P01 = new THREE.Mesh(this.Geo1, this.Mat);
    this.P02 = new THREE.Mesh(this.Geo1, this.Mat);
    this.P03 = new THREE.Mesh(this.Geo1, this.Mat);
    this.P04 = new THREE.Mesh(this.Geo2, this.Mat);
    this.P05 = new THREE.Mesh(this.Geo2, this.Mat);
    this.P06 = new THREE.Mesh(this.Geo2, this.Mat);
    this.P07 = new THREE.Mesh(this.Geo2, this.Mat);
    this.P00_ = null;
    this.P01_ = null;
    this.P02_ = null;
    this.P03_ = null;
    this.P04_ = null;
    this.P05_ = null;
    this.P06_ = null;
    this.P07_ = null;
    

    // Top and bottom
    this.P10 = new THREE.Mesh(this.Geo1, this.Mat);
    this.P11 = new THREE.Mesh(this.Geo1, this.Mat);
    this.P12 = new THREE.Mesh(this.Geo1, this.Mat);
    this.P13 = new THREE.Mesh(this.Geo1, this.Mat);
    this.P14 = new THREE.Mesh(this.Geo2, this.Mat);
    this.P15 = new THREE.Mesh(this.Geo2, this.Mat);
    this.P16 = new THREE.Mesh(this.Geo2, this.Mat);
    this.P17 = new THREE.Mesh(this.Geo2, this.Mat);
    this.P10_ = null;
    this.P11_ = null;
    this.P12_ = null;
    this.P13_ = null;
    this.P14_ = null;
    this.P15_ = null;
    this.P16_ = null;
    this.P17_ = null;

    // Front and back
    this.P20 = new THREE.Mesh(this.Geo1, this.Mat);
    this.P21 = new THREE.Mesh(this.Geo1, this.Mat);
    this.P22 = new THREE.Mesh(this.Geo1, this.Mat);
    this.P23 = new THREE.Mesh(this.Geo1, this.Mat);
    this.P24 = new THREE.Mesh(this.Geo2, this.Mat);
    this.P25 = new THREE.Mesh(this.Geo2, this.Mat);
    this.P26 = new THREE.Mesh(this.Geo2, this.Mat);
    this.P27 = new THREE.Mesh(this.Geo2, this.Mat);
    this.P20_ = null;
    this.P21_ = null;
    this.P22_ = null;
    this.P23_ = null;
    this.P24_ = null;
    this.P25_ = null;
    this.P26_ = null;
    this.P27_ = null;

    this.SetScale = function(ScaleX_, ScaleY_, ScaleZ_)
    {
        this.ScaleX = ScaleX_;
        this.ScaleY = ScaleY_;
        this.ScaleZ = ScaleZ_;
        
        this.P00.scale.set(this.ScaleZ, this.ScaleY, 1);
        this.P01.scale.set(this.ScaleZ, this.ScaleY, 1);
        this.P02.scale.set(this.ScaleZ, this.ScaleY, 1);
        this.P03.scale.set(this.ScaleZ, this.ScaleY, 1);
        this.P04.scale.set(this.ScaleZ, this.ScaleY, 1);
        this.P05.scale.set(this.ScaleZ, this.ScaleY, 1);
        this.P06.scale.set(this.ScaleZ, this.ScaleY, 1);
        this.P07.scale.set(this.ScaleZ, this.ScaleY, 1);

        this.P10.scale.set(this.ScaleX, this.ScaleY, 1);
        this.P11.scale.set(this.ScaleX, this.ScaleY, 1);
        this.P12.scale.set(this.ScaleX, this.ScaleY, 1);
        this.P13.scale.set(this.ScaleX, this.ScaleY, 1);
        this.P14.scale.set(this.ScaleX, this.ScaleY, 1);
        this.P15.scale.set(this.ScaleX, this.ScaleY, 1);
        this.P16.scale.set(this.ScaleX, this.ScaleY, 1);
        this.P17.scale.set(this.ScaleX, this.ScaleY, 1);

        this.P20.scale.set(this.ScaleZ, this.ScaleX, 1);
        this.P21.scale.set(this.ScaleZ, this.ScaleX, 1);
        this.P22.scale.set(this.ScaleZ, this.ScaleX, 1);
        this.P23.scale.set(this.ScaleZ, this.ScaleX, 1);
        this.P24.scale.set(this.ScaleZ, this.ScaleX, 1);
        this.P25.scale.set(this.ScaleZ, this.ScaleX, 1);
        this.P26.scale.set(this.ScaleZ, this.ScaleX, 1);
        this.P27.scale.set(this.ScaleZ, this.ScaleX, 1);
        
    }

    this.SetScale(ScaleX, ScaleY, ScaleZ);

    this.P10.rotation.set(0, ViewAngle90, 0);
    this.P11.rotation.set(0, ViewAngle90, 0);
    this.P12.rotation.set(0, ViewAngle90, 0);
    this.P13.rotation.set(0, ViewAngle90, 0);
    this.P14.rotation.set(0, ViewAngle90, 0);
    this.P15.rotation.set(0, ViewAngle90, 0);
    this.P16.rotation.set(0, ViewAngle90, 0);
    this.P17.rotation.set(0, ViewAngle90, 0);

    this.P20.rotation.set(ViewAngle90, 0, 0);
    this.P21.rotation.set(ViewAngle90, 0, 0);
    this.P22.rotation.set(ViewAngle90, 0, 0);
    this.P23.rotation.set(ViewAngle90, 0, 0);
    this.P24.rotation.set(ViewAngle90, 0, 0);
    this.P25.rotation.set(ViewAngle90, 0, 0);
    this.P26.rotation.set(ViewAngle90, 0, 0);
    this.P27.rotation.set(ViewAngle90, 0, 0);

    this.SetSizeForce = function(X, Y, Z)
    {
        this.SizeX_ = X + 1;
        this.SetSize(X, Y, Z);
    }

    this.SetSize = function(X, Y, Z)
    {
        if ((this.SizeX_ != X) || (this.SizeY_ != Y) || (this.SizeZ_ != Z))
        {
            this.SizeX_ = X;
            this.SizeY_ = Y;
            this.SizeZ_ = Z;
            
            this.SizeX_1 = (X < 0) ? X : 0;
            this.SizeX_2 = (X > 0) ? X : 0;
            
            this.SizeY_1 = (Y < 0) ? Y : 0;
            this.SizeY_2 = (Y > 0) ? Y : 0;
        
            this.SizeZ_1 = (Z < 0) ? Z : 0;
            this.SizeZ_2 = (Z > 0) ? Z : 0;
        
            this.Geo1X = new THREE.PlaneBufferGeometry((ViewSize2 * (Math.abs(X) + 1)) - this.Margin - this.Margin, ViewSize2 * this.BorderS2);
            this.Geo1Y = new THREE.PlaneBufferGeometry((ViewSize2 * (Math.abs(Y) + 1)) - this.Margin - this.Margin, ViewSize2 * this.BorderS2);
            this.Geo1Z = new THREE.PlaneBufferGeometry((ViewSize2 * (Math.abs(Z) + 1)) - this.Margin - this.Margin, ViewSize2 * this.BorderS2);

            this.Geo2X = new THREE.PlaneBufferGeometry(ViewSize2 * this.BorderS2, (ViewSize2 * (Math.abs(X) + 1)) - this.Margin - this.Margin);
            this.Geo2Y = new THREE.PlaneBufferGeometry(ViewSize2 * this.BorderS2, (ViewSize2 * (Math.abs(Y) + 1)) - this.Margin - this.Margin);
            this.Geo2Z = new THREE.PlaneBufferGeometry(ViewSize2 * this.BorderS2, (ViewSize2 * (Math.abs(Z) + 1)) - this.Margin - this.Margin);

            this.SizeOffsetX0 = ((ViewSize2 * X) / 2.0) * this.ScaleX;
            this.SizeOffsetX1 = (X > 0) ? (ViewSize2 * X * this.ScaleX) : 0;
            this.SizeOffsetX2 = (X < 0) ? (ViewSize2 * X * this.ScaleX) : 0;

            this.SizeOffsetY0 = ((ViewSize2 * Y) / 2.0) * this.ScaleY;
            this.SizeOffsetY1 = (Y > 0) ? (ViewSize2 * Y * this.ScaleY) : 0;
            this.SizeOffsetY2 = (Y < 0) ? (ViewSize2 * Y * this.ScaleY) : 0;
            
            this.SizeOffsetZ0 = ((ViewSize2 * Z) / 2.0) * this.ScaleZ;
            this.SizeOffsetZ1 = (Z > 0) ? (ViewSize2 * Z * this.ScaleZ) : 0;
            this.SizeOffsetZ2 = (Z < 0) ? (ViewSize2 * Z * this.ScaleZ) : 0;

            this.P00_ = new THREE.Mesh(this.Geo1Z, this.Mat);
            this.P01_ = new THREE.Mesh(this.Geo1Z, this.Mat);
            this.P02_ = new THREE.Mesh(this.Geo1Z, this.Mat);
            this.P03_ = new THREE.Mesh(this.Geo1Z, this.Mat);
            this.P04_ = new THREE.Mesh(this.Geo2Y, this.Mat);
            this.P05_ = new THREE.Mesh(this.Geo2Y, this.Mat);
            this.P06_ = new THREE.Mesh(this.Geo2Y, this.Mat);
            this.P07_ = new THREE.Mesh(this.Geo2Y, this.Mat);
            
            this.P10_ = new THREE.Mesh(this.Geo1X, this.Mat);
            this.P11_ = new THREE.Mesh(this.Geo1X, this.Mat);
            this.P12_ = new THREE.Mesh(this.Geo1X, this.Mat);
            this.P13_ = new THREE.Mesh(this.Geo1X, this.Mat);
            this.P14_ = new THREE.Mesh(this.Geo2Y, this.Mat);
            this.P15_ = new THREE.Mesh(this.Geo2Y, this.Mat);
            this.P16_ = new THREE.Mesh(this.Geo2Y, this.Mat);
            this.P17_ = new THREE.Mesh(this.Geo2Y, this.Mat);
            
            this.P20_ = new THREE.Mesh(this.Geo1Z, this.Mat);
            this.P21_ = new THREE.Mesh(this.Geo1Z, this.Mat);
            this.P22_ = new THREE.Mesh(this.Geo1Z, this.Mat);
            this.P23_ = new THREE.Mesh(this.Geo1Z, this.Mat);
            this.P24_ = new THREE.Mesh(this.Geo2X, this.Mat);
            this.P25_ = new THREE.Mesh(this.Geo2X, this.Mat);
            this.P26_ = new THREE.Mesh(this.Geo2X, this.Mat);
            this.P27_ = new THREE.Mesh(this.Geo2X, this.Mat);
            
            this.P00_.scale.set(this.ScaleZ, this.ScaleY, 1);
            this.P01_.scale.set(this.ScaleZ, this.ScaleY, 1);
            this.P02_.scale.set(this.ScaleZ, this.ScaleY, 1);
            this.P03_.scale.set(this.ScaleZ, this.ScaleY, 1);
            this.P04_.scale.set(this.ScaleZ, this.ScaleY, 1);
            this.P05_.scale.set(this.ScaleZ, this.ScaleY, 1);
            this.P06_.scale.set(this.ScaleZ, this.ScaleY, 1);
            this.P07_.scale.set(this.ScaleZ, this.ScaleY, 1);

            this.P10_.scale.set(this.ScaleX, this.ScaleY, 1);
            this.P11_.scale.set(this.ScaleX, this.ScaleY, 1);
            this.P12_.scale.set(this.ScaleX, this.ScaleY, 1);
            this.P13_.scale.set(this.ScaleX, this.ScaleY, 1);
            this.P14_.scale.set(this.ScaleX, this.ScaleY, 1);
            this.P15_.scale.set(this.ScaleX, this.ScaleY, 1);
            this.P16_.scale.set(this.ScaleX, this.ScaleY, 1);
            this.P17_.scale.set(this.ScaleX, this.ScaleY, 1);

            this.P20_.scale.set(this.ScaleZ, this.ScaleX, 1);
            this.P21_.scale.set(this.ScaleZ, this.ScaleX, 1);
            this.P22_.scale.set(this.ScaleZ, this.ScaleX, 1);
            this.P23_.scale.set(this.ScaleZ, this.ScaleX, 1);
            this.P24_.scale.set(this.ScaleZ, this.ScaleX, 1);
            this.P25_.scale.set(this.ScaleZ, this.ScaleX, 1);
            this.P26_.scale.set(this.ScaleZ, this.ScaleX, 1);
            this.P27_.scale.set(this.ScaleZ, this.ScaleX, 1);

            this.P10_.rotation.set(0, ViewAngle90, 0);
            this.P11_.rotation.set(0, ViewAngle90, 0);
            this.P12_.rotation.set(0, ViewAngle90, 0);
            this.P13_.rotation.set(0, ViewAngle90, 0);
            this.P14_.rotation.set(0, ViewAngle90, 0);
            this.P15_.rotation.set(0, ViewAngle90, 0);
            this.P16_.rotation.set(0, ViewAngle90, 0);
            this.P17_.rotation.set(0, ViewAngle90, 0);

            this.P20_.rotation.set(ViewAngle90, 0, 0);
            this.P21_.rotation.set(ViewAngle90, 0, 0);
            this.P22_.rotation.set(ViewAngle90, 0, 0);
            this.P23_.rotation.set(ViewAngle90, 0, 0);
            this.P24_.rotation.set(ViewAngle90, 0, 0);
            this.P25_.rotation.set(ViewAngle90, 0, 0);
            this.P26_.rotation.set(ViewAngle90, 0, 0);
            this.P27_.rotation.set(ViewAngle90, 0, 0);
        }
    }

    this.SetPosition = function(X, Y, Z)
    {
        var S = ViewSize - this.Margin;
        var SX = ViewSizeX - this.Margin;
        var SY = ViewSizeY - this.Margin;
        var SZ = ViewSizeZ - this.Margin;
        var B = ViewSize - (ViewSize * this.BorderS1) - this.Margin;
        var BX = ViewSizeX - (ViewSizeX * this.BorderS1) - this.Margin;
        var BY = ViewSizeY - (ViewSizeY * this.BorderS1) - this.Margin;
        var BZ = ViewSizeZ - (ViewSizeZ * this.BorderS1) - this.Margin;
        var XX = (0 - Z) * ViewSize2Z;
        var YY = (0 - Y) * ViewSize2Y;
        var ZZ = X * ViewSize2X;

        var BX_ = ViewSizeX - (ViewSizeX * this.BorderS2) - this.Margin;
        var BY_ = ViewSizeY - (ViewSizeY * this.BorderS2) - this.Margin;
        var BZ_ = ViewSizeZ - (ViewSizeZ * this.BorderS2) - this.Margin;

        this.P00.position.set(XX,      YY - BY, ZZ - SX);
        this.P01.position.set(XX,      YY - BY, ZZ + SX);
        this.P02.position.set(XX,      YY + BY, ZZ - SX);
        this.P03.position.set(XX,      YY + BY, ZZ + SX);
        this.P04.position.set(XX - BZ, YY,      ZZ - SX);
        this.P05.position.set(XX - BZ, YY,      ZZ + SX);
        this.P06.position.set(XX + BZ, YY,      ZZ - SX);
        this.P07.position.set(XX + BZ, YY,      ZZ + SX);

        this.P10.position.set(XX - SZ, YY - BY, ZZ);
        this.P11.position.set(XX + SZ, YY - BY, ZZ);
        this.P12.position.set(XX - SZ, YY + BY, ZZ);
        this.P13.position.set(XX + SZ, YY + BY, ZZ);
        this.P14.position.set(XX - SZ, YY,      ZZ - BX);
        this.P15.position.set(XX + SZ, YY,      ZZ - BX);
        this.P16.position.set(XX - SZ, YY,      ZZ + BX);
        this.P17.position.set(XX + SZ, YY,      ZZ + BX);

        this.P20.position.set(XX,      YY - SY, ZZ - BX);
        this.P21.position.set(XX,      YY + SY, ZZ - BX);
        this.P22.position.set(XX,      YY - SY, ZZ + BX);
        this.P23.position.set(XX,      YY + SY, ZZ + BX);
        this.P24.position.set(XX - BZ, YY - SY, ZZ);
        this.P25.position.set(XX - BZ, YY + SY, ZZ);
        this.P26.position.set(XX + BZ, YY - SY, ZZ);
        this.P27.position.set(XX + BZ, YY + SY, ZZ);
        
        this.P00_.position.set(XX - this.SizeOffsetZ0,       YY - this.SizeOffsetY1 - BY_, ZZ + this.SizeOffsetX2 - SX);
        this.P01_.position.set(XX - this.SizeOffsetZ0,       YY - this.SizeOffsetY1 - BY_, ZZ + this.SizeOffsetX1 + SX);
        this.P02_.position.set(XX - this.SizeOffsetZ0,       YY - this.SizeOffsetY2 + BY_, ZZ + this.SizeOffsetX2 - SX);
        this.P03_.position.set(XX - this.SizeOffsetZ0,       YY - this.SizeOffsetY2 + BY_, ZZ + this.SizeOffsetX1 + SX);
        this.P04_.position.set(XX - this.SizeOffsetZ1 - BZ_, YY - this.SizeOffsetY0,       ZZ + this.SizeOffsetX2 - SX);
        this.P05_.position.set(XX - this.SizeOffsetZ1 - BZ_, YY - this.SizeOffsetY0,       ZZ + this.SizeOffsetX1 + SX);
        this.P06_.position.set(XX - this.SizeOffsetZ2 + BZ_, YY - this.SizeOffsetY0,       ZZ + this.SizeOffsetX2 - SX);
        this.P07_.position.set(XX - this.SizeOffsetZ2 + BZ_, YY - this.SizeOffsetY0,       ZZ + this.SizeOffsetX1 + SX);

        this.P10_.position.set(XX - this.SizeOffsetZ1 - SZ,  YY - this.SizeOffsetY1 - BY_, ZZ + this.SizeOffsetX0);
        this.P11_.position.set(XX - this.SizeOffsetZ2 + SZ,  YY - this.SizeOffsetY1 - BY_, ZZ + this.SizeOffsetX0);
        this.P12_.position.set(XX - this.SizeOffsetZ1 - SZ,  YY - this.SizeOffsetY2 + BY_, ZZ + this.SizeOffsetX0);
        this.P13_.position.set(XX - this.SizeOffsetZ2 + SZ,  YY - this.SizeOffsetY2 + BY_, ZZ + this.SizeOffsetX0);
        this.P14_.position.set(XX - this.SizeOffsetZ1 - SZ,  YY - this.SizeOffsetY0,       ZZ + this.SizeOffsetX2 - BX_);
        this.P15_.position.set(XX - this.SizeOffsetZ2 + SZ,  YY - this.SizeOffsetY0,       ZZ + this.SizeOffsetX2 - BX_);
        this.P16_.position.set(XX - this.SizeOffsetZ1 - SZ,  YY - this.SizeOffsetY0,       ZZ + this.SizeOffsetX1 + BX_);
        this.P17_.position.set(XX - this.SizeOffsetZ2 + SZ,  YY - this.SizeOffsetY0,       ZZ + this.SizeOffsetX1 + BX_);

        this.P20_.position.set(XX - this.SizeOffsetZ0,       YY - this.SizeOffsetY1 - SY,  ZZ + this.SizeOffsetX2 - BX_);
        this.P21_.position.set(XX - this.SizeOffsetZ0,       YY - this.SizeOffsetY2 + SY,  ZZ + this.SizeOffsetX2 - BX_);
        this.P22_.position.set(XX - this.SizeOffsetZ0,       YY - this.SizeOffsetY1 - SY,  ZZ + this.SizeOffsetX1 + BX_);
        this.P23_.position.set(XX - this.SizeOffsetZ0,       YY - this.SizeOffsetY2 + SY,  ZZ + this.SizeOffsetX1 + BX_);
        this.P24_.position.set(XX - this.SizeOffsetZ1 - BZ_, YY - this.SizeOffsetY1 - SY,  ZZ + this.SizeOffsetX0);
        this.P25_.position.set(XX - this.SizeOffsetZ1 - BZ_, YY - this.SizeOffsetY2 + SY,  ZZ + this.SizeOffsetX0);
        this.P26_.position.set(XX - this.SizeOffsetZ2 + BZ_, YY - this.SizeOffsetY1 - SY,  ZZ + this.SizeOffsetX0);
        this.P27_.position.set(XX - this.SizeOffsetZ2 + BZ_, YY - this.SizeOffsetY2 + SY,  ZZ + this.SizeOffsetX0);
        
    }

    this.Repaint = function()
    {
        this.Mat.color = new THREE.Color(Color[CursorColorR * 25 + CursorColorG * 5 + CursorColorB]);
    }

    this.Show = function()
    {
        if (this.Shown)
        {
            return;
        }

        ViewScene.add(this.P00);
        ViewScene.add(this.P01);
        ViewScene.add(this.P02);
        ViewScene.add(this.P03);
        ViewScene.add(this.P04);
        ViewScene.add(this.P05);
        ViewScene.add(this.P06);
        ViewScene.add(this.P07);
        ViewScene.add(this.P10);
        ViewScene.add(this.P11);
        ViewScene.add(this.P12);
        ViewScene.add(this.P13);
        ViewScene.add(this.P14);
        ViewScene.add(this.P15);
        ViewScene.add(this.P16);
        ViewScene.add(this.P17);
        ViewScene.add(this.P20);
        ViewScene.add(this.P21);
        ViewScene.add(this.P22);
        ViewScene.add(this.P23);
        ViewScene.add(this.P24);
        ViewScene.add(this.P25);
        ViewScene.add(this.P26);
        ViewScene.add(this.P27);
        
        ViewScene.add(this.P00_);
        ViewScene.add(this.P01_);
        ViewScene.add(this.P02_);
        ViewScene.add(this.P03_);
        ViewScene.add(this.P04_);
        ViewScene.add(this.P05_);
        ViewScene.add(this.P06_);
        ViewScene.add(this.P07_);
        ViewScene.add(this.P10_);
        ViewScene.add(this.P11_);
        ViewScene.add(this.P12_);
        ViewScene.add(this.P13_);
        ViewScene.add(this.P14_);
        ViewScene.add(this.P15_);
        ViewScene.add(this.P16_);
        ViewScene.add(this.P17_);
        ViewScene.add(this.P20_);
        ViewScene.add(this.P21_);
        ViewScene.add(this.P22_);
        ViewScene.add(this.P23_);
        ViewScene.add(this.P24_);
        ViewScene.add(this.P25_);
        ViewScene.add(this.P26_);
        ViewScene.add(this.P27_);

        this.Shown = true;
    }
    this.Hide = function()
    {
        if (!this.Shown)
        {
            return;
        }

        ViewScene.remove(this.P00);
        ViewScene.remove(this.P01);
        ViewScene.remove(this.P02);
        ViewScene.remove(this.P03);
        ViewScene.remove(this.P04);
        ViewScene.remove(this.P05);
        ViewScene.remove(this.P06);
        ViewScene.remove(this.P07);
        ViewScene.remove(this.P10);
        ViewScene.remove(this.P11);
        ViewScene.remove(this.P12);
        ViewScene.remove(this.P13);
        ViewScene.remove(this.P14);
        ViewScene.remove(this.P15);
        ViewScene.remove(this.P16);
        ViewScene.remove(this.P17);
        ViewScene.remove(this.P20);
        ViewScene.remove(this.P21);
        ViewScene.remove(this.P22);
        ViewScene.remove(this.P23);
        ViewScene.remove(this.P24);
        ViewScene.remove(this.P25);
        ViewScene.remove(this.P26);
        ViewScene.remove(this.P27);
        
        ViewScene.remove(this.P00_);
        ViewScene.remove(this.P01_);
        ViewScene.remove(this.P02_);
        ViewScene.remove(this.P03_);
        ViewScene.remove(this.P04_);
        ViewScene.remove(this.P05_);
        ViewScene.remove(this.P06_);
        ViewScene.remove(this.P07_);
        ViewScene.remove(this.P10_);
        ViewScene.remove(this.P11_);
        ViewScene.remove(this.P12_);
        ViewScene.remove(this.P13_);
        ViewScene.remove(this.P14_);
        ViewScene.remove(this.P15_);
        ViewScene.remove(this.P16_);
        ViewScene.remove(this.P17_);
        ViewScene.remove(this.P20_);
        ViewScene.remove(this.P21_);
        ViewScene.remove(this.P22_);
        ViewScene.remove(this.P23_);
        ViewScene.remove(this.P24_);
        ViewScene.remove(this.P25_);
        ViewScene.remove(this.P26_);
        ViewScene.remove(this.P27_);

        this.Shown = false;
    }
    this.SetSize(0, 0, 0);
    this.SetPosition(0, 0, 0);
    this.Show();
    this.Repaint();
}

function CursorRepaint()
{
    for (let IZ = Cursor.SizeZ_1; IZ <= Cursor.SizeZ_2; IZ++)
    {
        for (let IY = Cursor.SizeY_1; IY <= Cursor.SizeY_2; IY++)
        {
            for (let IX = Cursor.SizeX_1; IX <= Cursor.SizeX_2; IX++)
            {
                var Obj = SceneGet(CursorX + IX, CursorY + IY, CursorZ + IZ);
                if (Obj)
                {
                    SceneBlockListXYZ(CursorX + IX, CursorY + IY, CursorZ + IZ, 3);
                    Obj.Repaint();
                }
            }
        }
    }
}

function CursorHide()
{
    CursorVisible = false;
    Cursor.Hide();
    Cursor.SetSize(CursorSizeX, CursorSizeY, CursorSizeZ);
    Cursor.SetPosition(CursorX, CursorY, CursorZ);
    CursorRepaint();
}

function CursorShow()
{
    CursorVisible = true;
    Cursor.SetSize(CursorSizeX, CursorSizeY, CursorSizeZ);
    Cursor.SetPosition(CursorX, CursorY, CursorZ);
    Cursor.Show();
    CursorRepaint();
}



function CursorMove(DX, DY, DZ)
{
    UndoRedoUnitBegin();

    var Obj1;
    var Obj2;
    var MovePossible = true;

    if ((EditState != 2) && (EditState != 3) && (DX == 0) && (DY == 0) && (DZ == 0))
    {
        return;
    }
    
    CursorHide();
    switch (EditState)
    {
        case 4: // Move
            SceneBlockListCursor();

            // Check if space around block is enough for movement
            if (MovePossible)
            {
                for (var I = 0; I < SceneBlockListX.length; I++)
                {
                    if (SceneExists(SceneBlockListX[I] + DX, SceneBlockListY[I] + DY, SceneBlockListZ[I] + DZ))
                    {
                        if (!SceneBlockListExists(SceneBlockListX[I] + DX, SceneBlockListY[I] + DY, SceneBlockListZ[I] + DZ))
                        {
                            MovePossible = false;
                        }
                    }
                }
            }

            // Doing movement
            if (MovePossible)
            {
                if (DX > 0) { SceneBlockListSort(0); }
                if (DX < 0) { SceneBlockListSort(1); }
                if (DY > 0) { SceneBlockListSort(2); }
                if (DY < 0) { SceneBlockListSort(3); }
                if (DZ > 0) { SceneBlockListSort(4); }
                if (DZ < 0) { SceneBlockListSort(5); }
                for (var I = 0; I < SceneBlockListX.length; I++)
                {
                    UndoRedoUnitBlockMoveXYZ(SceneBlockListX[I], SceneBlockListY[I], SceneBlockListZ[I], DX, DY, DZ);
                    SceneMove(SceneBlockListX[I], SceneBlockListY[I], SceneBlockListZ[I], DX, DY, DZ);
                }
            }
            break;
        case 5: // Rotate
            SceneBlockListCursor();

            // Check if space around block is enough for rotation
            if (MovePossible)
            {
                for (var I = 0; I < SceneBlockListX.length; I++)
                {
                    SceneRotateCoord(SceneBlockListX[I], SceneBlockListY[I], SceneBlockListZ[I], DX, DY, DZ);
                    if (SceneExists(SceneRotateCoordX, SceneRotateCoordY, SceneRotateCoordZ))
                    {
                        if (!SceneBlockListExists(SceneRotateCoordX, SceneRotateCoordY, SceneRotateCoordZ))
                        {
                            MovePossible = false;
                        }
                    }
                }
            }

            // Doing rotation
            if (MovePossible)
            {
                let RotObjs = [];
                let RotObj_;
                for (var I = 0; I < SceneBlockListX.length; I++)
                {
                    UndoRedoUnitBlock1XYZ(SceneBlockListX[I], SceneBlockListY[I], SceneBlockListZ[I]);
                    SceneRotate(SceneBlockListX[I], SceneBlockListY[I], SceneBlockListZ[I], DX, DY, DZ);
                    RotObj_ = SceneGet(SceneBlockListX[I], SceneBlockListY[I], SceneBlockListZ[I]);
                    RotObjs.push(RotObj_);
                    SceneRemIdx(SceneBlockListX[I], SceneBlockListY[I], SceneBlockListZ[I]);
                    UndoRedoUnitBlock2Blank(SceneBlockListX[I], SceneBlockListY[I], SceneBlockListZ[I]);
                }

                for (var I = 0; I < SceneBlockListX.length; I++)
                {
                    SceneRotateCoord(SceneBlockListX[I], SceneBlockListY[I], SceneBlockListZ[I], DX, DY, DZ);
                    UndoRedoUnitBlock1Blank(SceneRotateCoordX, SceneRotateCoordY, SceneRotateCoordZ);
                    SceneAddIdx(SceneRotateCoordX, SceneRotateCoordY, SceneRotateCoordZ, RotObjs[I]);
                    UndoRedoUnitBlock2Obj(RotObjs[I]);
                }                

                let CursorSizeX__ = CursorSizeX;
                let CursorSizeY__ = CursorSizeY;
                let CursorSizeZ__ = CursorSizeZ;
                if (DX > 0) { CursorSizeY = 0 - CursorSizeZ__; CursorSizeZ = 0 + CursorSizeY__; }
                if (DX < 0) { CursorSizeY = 0 + CursorSizeZ__; CursorSizeZ = 0 - CursorSizeY__; }
                if (DY > 0) { CursorSizeX = 0 - CursorSizeZ__; CursorSizeZ = 0 + CursorSizeX__; }
                if (DY < 0) { CursorSizeX = 0 + CursorSizeZ__; CursorSizeZ = 0 - CursorSizeX__; }
                if (DZ > 0) { CursorSizeX = 0 - CursorSizeY__; CursorSizeY = 0 + CursorSizeX__; }
                if (DZ < 0) { CursorSizeX = 0 + CursorSizeY__; CursorSizeY = 0 - CursorSizeX__; }
                CursorCalcBounds();
                
                RotObjs = [];
                SceneBlockListCursor();
                SceneBlockListRepaint();
            }
            MovePossible = false;
            break;
    }
    if (MovePossible)
    {
        CursorX += DX;
        CursorY += DY;
        CursorZ += DZ;
        Cursor.SetSize(CursorSizeX, CursorSizeY, CursorSizeZ);
        Cursor.SetPosition(CursorX, CursorY, CursorZ);
    }
    let ColorDef__ = ColorRGB2(ColorDef1R, ColorDef1G, ColorDef1B, ColorDef2R, ColorDef2G, ColorDef2B);
    switch (EditState)
    {
        case 2: // Add
        
            for (var I_X = CursorSizeX_1; I_X <= CursorSizeX_2; I_X++)
            {
                for (var I_Y = CursorSizeY_1; I_Y <= CursorSizeY_2; I_Y++)
                {
                    for (var I_Z = CursorSizeZ_1; I_Z <= CursorSizeZ_2; I_Z++)
                    {
                        UndoRedoUnitBlock1XYZ(CursorX + I_X, CursorY + I_Y, CursorZ + I_Z);
                        Obj1 = SceneAdd(CursorX + I_X, CursorY + I_Y, CursorZ + I_Z);
                        if (Obj1.Color__ == ColorDef__)
                        {
                            if (I_X > CursorSizeX_1)
                            {
                                Obj2 = SceneGet(CursorX + I_X - 1, CursorY + I_Y, CursorZ + I_Z);
                                if (Obj2)
                                {
                                    if (Obj2.Color__ == ColorDef__)
                                    {
                                        Obj1.SetFace(0, false);
                                    }
                                }
                                else
                                {
                                    Obj1.SetFace(0, false);
                                }
                            }
                            if (I_X < CursorSizeX_2)
                            {
                                Obj2 = SceneGet(CursorX + I_X + 1, CursorY + I_Y, CursorZ + I_Z);
                                if (Obj2)
                                {
                                    if (Obj2.Color__ == ColorDef__)
                                    {
                                        Obj1.SetFace(1, false);
                                    }
                                }
                                else
                                {
                                    Obj1.SetFace(1, false);
                                }
                            }
                            if (I_Y > CursorSizeY_1)
                            {
                                Obj2 = SceneGet(CursorX + I_X, CursorY + I_Y - 1, CursorZ + I_Z);
                                if (Obj2)
                                {
                                    if (Obj2.Color__ == ColorDef__)
                                    {
                                        Obj1.SetFace(5, false);
                                    }
                                }
                                else
                                {
                                    Obj1.SetFace(5, false);
                                }
                            }
                            if (I_Y < CursorSizeY_2)
                            {
                                Obj2 = SceneGet(CursorX + I_X, CursorY + I_Y + 1, CursorZ + I_Z);
                                if (Obj2)
                                {
                                    if (Obj2.Color__ == ColorDef__)
                                    {
                                        Obj1.SetFace(4, false);
                                    }
                                }
                                else
                                {
                                    Obj1.SetFace(4, false);
                                }
                            }
                            if (I_Z > CursorSizeZ_1)
                            {
                                Obj2 = SceneGet(CursorX + I_X, CursorY + I_Y, CursorZ + I_Z - 1);
                                if (Obj2)
                                {
                                    if (Obj2.Color__ == ColorDef__)
                                    {
                                        Obj1.SetFace(3, false);
                                    }
                                }
                                else
                                {
                                    Obj1.SetFace(3, false);
                                }
                            }
                            if (I_Z < CursorSizeZ_2)
                            {
                                Obj2 = SceneGet(CursorX + I_X, CursorY + I_Y, CursorZ + I_Z + 1);
                                if (Obj2)
                                {
                                    if (Obj2.Color__ == ColorDef__)
                                    {
                                        Obj1.SetFace(2, false);
                                    }
                                }
                                else
                                {
                                    Obj1.SetFace(2, false);
                                }
                            }
                        }
                        UndoRedoUnitBlock2Obj(Obj1);
                        RetentionAdd(Obj1);
                    }
                }
            }
            
            for (var I_Y = CursorSizeY_1; I_Y <= CursorSizeY_2; I_Y++)
            {
                for (var I_Z = CursorSizeZ_1; I_Z <= CursorSizeZ_2; I_Z++)
                {
                    Obj1 = SceneGet(CursorX + CursorSizeX_1,     CursorY + I_Y, CursorZ + I_Z);
                    Obj2 = SceneGet(CursorX + CursorSizeX_1 - 1, CursorY + I_Y, CursorZ + I_Z);
                    if (Obj1 && Obj2)
                    {
                        if ((Obj1.Color__ == ColorDef__) && (Obj2.Color__ == ColorDef__))
                        {
                            UndoRedoUnitBlock1Obj(Obj1);
                            Obj1.SetFace(0, false);
                            UndoRedoUnitBlock2Obj(Obj1);
                            RetentionAdd(Obj1);
                            UndoRedoUnitBlock1Obj(Obj2);
                            Obj2.SetFace(1, false);
                            UndoRedoUnitBlock2Obj(Obj2);
                            RetentionAdd(Obj2);
                        }
                    }

                    Obj1 = SceneGet(CursorX + CursorSizeX_2,     CursorY + I_Y, CursorZ + I_Z);
                    Obj2 = SceneGet(CursorX + CursorSizeX_2 + 1, CursorY + I_Y, CursorZ + I_Z);
                    if (Obj1 && Obj2)
                    {
                        if ((Obj1.Color__ == ColorDef__) && (Obj2.Color__ == ColorDef__))
                        {
                            UndoRedoUnitBlock1Obj(Obj1);
                            Obj1.SetFace(1, false);
                            UndoRedoUnitBlock2Obj(Obj1);
                            RetentionAdd(Obj1);
                            UndoRedoUnitBlock1Obj(Obj2);
                            Obj2.SetFace(0, false);
                            UndoRedoUnitBlock2Obj(Obj2);
                            RetentionAdd(Obj2);
                        }
                    }
                }
            }

            for (var I_Z = CursorSizeZ_1; I_Z <= CursorSizeZ_2; I_Z++)
            {
                for (var I_X = CursorSizeX_1; I_X <= CursorSizeX_2; I_X++)
                {
                    Obj1 = SceneGet(CursorX + I_X, CursorY + CursorSizeY_1,     CursorZ + I_Z);
                    Obj2 = SceneGet(CursorX + I_X, CursorY + CursorSizeY_1 - 1, CursorZ + I_Z);
                    if (Obj1 && Obj2)
                    {
                        if ((Obj1.Color__ == ColorDef__) && (Obj2.Color__ == ColorDef__))
                        {
                            UndoRedoUnitBlock1Obj(Obj1);
                            Obj1.SetFace(5, false);
                            UndoRedoUnitBlock2Obj(Obj1);
                            RetentionAdd(Obj1);
                            UndoRedoUnitBlock1Obj(Obj2);
                            Obj2.SetFace(4, false);
                            UndoRedoUnitBlock2Obj(Obj2);
                            RetentionAdd(Obj2);
                        }
                    }

                    Obj1 = SceneGet(CursorX + I_X, CursorY + CursorSizeY_2,     CursorZ + I_Z);
                    Obj2 = SceneGet(CursorX + I_X, CursorY + CursorSizeY_2 + 1, CursorZ + I_Z);
                    if (Obj1 && Obj2)
                    {
                        if ((Obj1.Color__ == ColorDef__) && (Obj2.Color__ == ColorDef__))
                        {
                            UndoRedoUnitBlock1Obj(Obj1);
                            Obj1.SetFace(4, false);
                            UndoRedoUnitBlock2Obj(Obj1);
                            RetentionAdd(Obj1);
                            UndoRedoUnitBlock1Obj(Obj2);
                            Obj2.SetFace(5, false);
                            UndoRedoUnitBlock2Obj(Obj2);
                            RetentionAdd(Obj2);
                        }
                    }
                }
            }
            
            for (var I_X = CursorSizeX_1; I_X <= CursorSizeX_2; I_X++)
            {
                for (var I_Y = CursorSizeY_1; I_Y <= CursorSizeY_2; I_Y++)
                {
                    Obj1 = SceneGet(CursorX + I_X, CursorY + I_Y, CursorZ + CursorSizeZ_1);
                    Obj2 = SceneGet(CursorX + I_X, CursorY + I_Y, CursorZ + CursorSizeZ_1 - 1);
                    if (Obj1 && Obj2)
                    {
                        if ((Obj1.Color__ == ColorDef__) && (Obj2.Color__ == ColorDef__))
                        {
                            UndoRedoUnitBlock1Obj(Obj1);
                            Obj1.SetFace(3, false);
                            UndoRedoUnitBlock2Obj(Obj1);
                            RetentionAdd(Obj1);
                            UndoRedoUnitBlock1Obj(Obj2);
                            Obj2.SetFace(2, false);
                            UndoRedoUnitBlock2Obj(Obj2);
                            RetentionAdd(Obj2);
                        }
                    }

                    Obj1 = SceneGet(CursorX + I_X, CursorY + I_Y, CursorZ + CursorSizeZ_2);
                    Obj2 = SceneGet(CursorX + I_X, CursorY + I_Y, CursorZ + CursorSizeZ_2 + 1);
                    if (Obj1 && Obj2)
                    {
                        if ((Obj1.Color__ == ColorDef__) && (Obj2.Color__ == ColorDef__))
                        {
                            UndoRedoUnitBlock1Obj(Obj1);
                            Obj1.SetFace(2, false);
                            UndoRedoUnitBlock2Obj(Obj1);
                            RetentionAdd(Obj1);
                            UndoRedoUnitBlock1Obj(Obj2);
                            Obj2.SetFace(3, false);
                            UndoRedoUnitBlock2Obj(Obj2);
                            RetentionAdd(Obj2);
                        }
                    }
                }
            }

            SceneBlockListCursor();
            SceneBlockListRepaint();
            
            break;
        case 3: // Erase
        
            for (var I_X = CursorSizeX_1; I_X <= CursorSizeX_2; I_X++)
            {
                for (var I_Y = CursorSizeY_1; I_Y <= CursorSizeY_2; I_Y++)
                {
                    for (var I_Z = CursorSizeZ_1; I_Z <= CursorSizeZ_2; I_Z++)
                    {
                        UndoRedoUnitBlock1XYZ(CursorX + I_X, CursorY + I_Y, CursorZ + I_Z);
                        SceneRem(CursorX + I_X, CursorY + I_Y, CursorZ + I_Z);
                        UndoRedoUnitBlock2Blank(CursorX + I_X, CursorY + I_Y, CursorZ + I_Z);
                    }
                }
            }
        
            for (var I_Y = CursorSizeY_1; I_Y <= CursorSizeY_2; I_Y++)
            {
                for (var I_Z = CursorSizeZ_1; I_Z <= CursorSizeZ_2; I_Z++)
                {
                    Obj2 = SceneGet(CursorX + CursorSizeX_1 - 1, CursorY + I_Y, CursorZ + I_Z);
                    if (Obj2)
                    {
                        UndoRedoUnitBlock1Obj(Obj2);
                        Obj2.SetFace(1, true);
                        UndoRedoUnitBlock2Obj(Obj2);
                        RetentionAdd(Obj2);
                    }

                    Obj2 = SceneGet(CursorX + CursorSizeX_2 + 1, CursorY + I_Y, CursorZ + I_Z);
                    if (Obj2)
                    {
                        UndoRedoUnitBlock1Obj(Obj2);
                        Obj2.SetFace(0, true);
                        UndoRedoUnitBlock2Obj(Obj2);
                        RetentionAdd(Obj2);
                    }
                }
            }

            for (var I_Y = CursorSizeY_1; I_Y <= CursorSizeY_2; I_Y++)
            {
                for (var I_Z = CursorSizeZ_1; I_Z <= CursorSizeZ_2; I_Z++)
                {
                    Obj2 = SceneGet(CursorX + CursorSizeX_1 - 1, CursorY + I_Y, CursorZ + I_Z);
                    if (Obj2)
                    {
                        SceneBlockListXYZ(CursorX + CursorSizeX_1 - 1, CursorY + I_Y, CursorZ + I_Z, 2);
                        SceneBlockListRepaintObj(Obj2);
                    }

                    Obj2 = SceneGet(CursorX + CursorSizeX_2 + 1, CursorY + I_Y, CursorZ + I_Z);
                    if (Obj2)
                    {
                        SceneBlockListXYZ(CursorX + CursorSizeX_2 + 1, CursorY + I_Y, CursorZ + I_Z, 2);
                        SceneBlockListRepaintObj(Obj2);
                    }
                }
            }

            for (var I_Z = CursorSizeZ_1; I_Z <= CursorSizeZ_2; I_Z++)
            {
                for (var I_X = CursorSizeX_1; I_X <= CursorSizeX_2; I_X++)
                {
                    Obj2 = SceneGet(CursorX + I_X, CursorY + CursorSizeY_1 - 1, CursorZ + I_Z);
                    if (Obj2)
                    {
                        UndoRedoUnitBlock1Obj(Obj2);
                        Obj2.SetFace(4, true);
                        UndoRedoUnitBlock2Obj(Obj2);
                        RetentionAdd(Obj2);
                    }

                    Obj2 = SceneGet(CursorX + I_X, CursorY + CursorSizeY_2 + 1, CursorZ + I_Z);
                    if (Obj2)
                    {
                        UndoRedoUnitBlock1Obj(Obj2);
                        Obj2.SetFace(5, true);
                        UndoRedoUnitBlock2Obj(Obj2);
                        RetentionAdd(Obj2);
                    }
                }
            }

            for (var I_Z = CursorSizeZ_1; I_Z <= CursorSizeZ_2; I_Z++)
            {
                for (var I_X = CursorSizeX_1; I_X <= CursorSizeX_2; I_X++)
                {
                    Obj2 = SceneGet(CursorX + I_X, CursorY + CursorSizeY_1 - 1, CursorZ + I_Z);
                    if (Obj2)
                    {
                        SceneBlockListXYZ(CursorX + I_X, CursorY + CursorSizeY_1 - 1, CursorZ + I_Z, 2);
                        SceneBlockListRepaintObj(Obj2);
                    }

                    Obj2 = SceneGet(CursorX + I_X, CursorY + CursorSizeY_2 + 1, CursorZ + I_Z);
                    if (Obj2)
                    {
                        SceneBlockListXYZ(CursorX + I_X, CursorY + CursorSizeY_2 + 1, CursorZ + I_Z, 2);
                        SceneBlockListRepaintObj(Obj2);
                    }
                }
            }
            
            for (var I_X = CursorSizeX_1; I_X <= CursorSizeX_2; I_X++)
            {
                for (var I_Y = CursorSizeY_1; I_Y <= CursorSizeY_2; I_Y++)
                {
                    Obj2 = SceneGet(CursorX + I_X, CursorY + I_Y, CursorZ + CursorSizeZ_1 - 1);
                    if (Obj2)
                    {
                        UndoRedoUnitBlock1Obj(Obj2);
                        Obj2.SetFace(2, true);
                        UndoRedoUnitBlock2Obj(Obj2);
                        RetentionAdd(Obj2);
                    }

                    Obj2 = SceneGet(CursorX + I_X, CursorY + I_Y, CursorZ + CursorSizeZ_2 + 1);
                    if (Obj2)
                    {
                        UndoRedoUnitBlock1Obj(Obj2);
                        Obj2.SetFace(3, true);
                        UndoRedoUnitBlock2Obj(Obj2);
                        RetentionAdd(Obj2);
                    }
                }
            }
        
            for (var I_X = CursorSizeX_1; I_X <= CursorSizeX_2; I_X++)
            {
                for (var I_Y = CursorSizeY_1; I_Y <= CursorSizeY_2; I_Y++)
                {
                    Obj2 = SceneGet(CursorX + I_X, CursorY + I_Y, CursorZ + CursorSizeZ_1 - 1);
                    if (Obj2)
                    {
                        SceneBlockListXYZ(CursorX + I_X, CursorY + I_Y, CursorZ + CursorSizeZ_1 - 1, 2);
                        SceneBlockListRepaintObj(Obj2);
                    }

                    Obj2 = SceneGet(CursorX + I_X, CursorY + I_Y, CursorZ + CursorSizeZ_2 + 1);
                    if (Obj2)
                    {
                        SceneBlockListXYZ(CursorX + I_X, CursorY + I_Y, CursorZ + CursorSizeZ_2 + 1, 2);
                        SceneBlockListRepaintObj(Obj2);
                    }
                }
            }
        
            break;
    }
    CursorShow();

    switch (EditState)
    {
        default:
            UndoRedoUnitEnd(false);
            break;
        case 0: // Cursor
            ColorGet();
            UndoRedoUnitEnd(false);
            break;
        case 1: // Color
            ColorSet();
            UndoRedoUnitEnd(false);
            break;
        case 2: // Add
            UndoRedoUnitEnd(true);
            break;
        case 3: // Erase
            UndoRedoUnitEnd(true);
            break;
    }

    RetentionCamCur();
}

function CursorCalcBounds()
{
    CursorSizeX_1 = (CursorSizeX < 0) ? CursorSizeX : 0;
    CursorSizeX_2 = (CursorSizeX > 0) ? CursorSizeX : 0;
        
    CursorSizeY_1 = (CursorSizeY < 0) ? CursorSizeY : 0;
    CursorSizeY_2 = (CursorSizeY > 0) ? CursorSizeY : 0;

    CursorSizeZ_1 = (CursorSizeZ < 0) ? CursorSizeZ : 0;
    CursorSizeZ_2 = (CursorSizeZ > 0) ? CursorSizeZ : 0;
}

function CursorSize(DX, DY, DZ)
{
    CursorHide();

    CursorSizeX += DX;
    CursorSizeY += DY;
    CursorSizeZ += DZ;
    CursorCalcBounds();
    Cursor.SetSize(CursorSizeX, CursorSizeY, CursorSizeZ);
    Cursor.SetPosition(CursorX, CursorY, CursorZ);

    CursorShow();
    RetentionCamCur();
}

