function BlockObject()
{
    this.ToRepaint = true;

    this.T0C = document.createElement('canvas'),
    this.T0X = this.T0C.getContext('2d');
    this.T0C.width = ViewTextureS;
    this.T0C.height = ViewTextureS;

    this.T1C = document.createElement('canvas'),
    this.T1X = this.T1C.getContext('2d');
    this.T1C.width = ViewTextureS;
    this.T1C.height = ViewTextureS;

    this.T2C = document.createElement('canvas'),
    this.T2X = this.T2C.getContext('2d');
    this.T2C.width = ViewTextureS;
    this.T2C.height = ViewTextureS;

    this.T3C = document.createElement('canvas'),
    this.T3X = this.T3C.getContext('2d');
    this.T3C.width = ViewTextureS;
    this.T3C.height = ViewTextureS;

    this.T4C = document.createElement('canvas'),
    this.T4X = this.T4C.getContext('2d');
    this.T4C.width = ViewTextureS;
    this.T4C.height = ViewTextureS;

    this.T5C = document.createElement('canvas'),
    this.T5X = this.T5C.getContext('2d');
    this.T5C.width = ViewTextureS;
    this.T5C.height = ViewTextureS;

    this.T0 = new THREE.CanvasTexture(this.T0C);
    this.T1 = new THREE.CanvasTexture(this.T1C);
    this.T2 = new THREE.CanvasTexture(this.T2C);
    this.T3 = new THREE.CanvasTexture(this.T3C);
    this.T4 = new THREE.CanvasTexture(this.T4C);
    this.T5 = new THREE.CanvasTexture(this.T5C);
    this.T0.magFilter = THREE.NearestFilter;
    this.T1.magFilter = THREE.NearestFilter;
    this.T2.magFilter = THREE.NearestFilter;
    this.T3.magFilter = THREE.NearestFilter;
    this.T4.magFilter = THREE.NearestFilter;
    this.T5.magFilter = THREE.NearestFilter;
    this.T0.minFilter = THREE.NearestFilter;
    this.T1.minFilter = THREE.NearestFilter;
    this.T2.minFilter = THREE.NearestFilter;
    this.T3.minFilter = THREE.NearestFilter;
    this.T4.minFilter = THREE.NearestFilter;
    this.T5.minFilter = THREE.NearestFilter;

// magFilter
//THREE.NearestFilter
//THREE.LinearFilter

// minFilter
//THREE.NearestFilter
//THREE.NearestMipMapNearestFilter
//THREE.NearestMipMapLinearFilter
//THREE.LinearFilter
//THREE.LinearMipMapNearestFilter
//THREE.LinearMipMapLinearFilter


//var texture = new THREE.Texture(ViewTexture);
//texture.needsUpdate = true;

    this.Geo = new THREE.PlaneBufferGeometry(ViewSize2, ViewSize2);

    this.T0M = new THREE.MeshBasicMaterial({ map: this.T0, side: THREE.BackSide });
    this.T1M = new THREE.MeshBasicMaterial({ map: this.T1, side: THREE.FrontSide });
    this.T2M = new THREE.MeshBasicMaterial({ map: this.T2, side: THREE.BackSide });
    this.T3M = new THREE.MeshBasicMaterial({ map: this.T3, side: THREE.FrontSide });
    this.T4M = new THREE.MeshBasicMaterial({ map: this.T4, side: THREE.FrontSide });
    this.T5M = new THREE.MeshBasicMaterial({ map: this.T5, side: THREE.BackSide });

    this.P0_ = new THREE.Mesh(this.Geo, this.T0M);
    this.P1_ = new THREE.Mesh(this.Geo, this.T1M);
    this.P2_ = new THREE.Mesh(this.Geo, this.T2M);
    this.P3_ = new THREE.Mesh(this.Geo, this.T3M);
    this.P4_ = new THREE.Mesh(this.Geo, this.T4M);
    this.P5_ = new THREE.Mesh(this.Geo, this.T5M);

    this.PosX = 0;
    this.PosY = 0;
    this.PosZ = 0;

    this.Face0 = true;
    this.Face1 = true;
    this.Face2 = true;
    this.Face3 = true;
    this.Face4 = true;
    this.Face5 = true;

    this.P2_.rotation.set(0, ViewAngle90, 0);
    this.P3_.rotation.set(0, ViewAngle90, 0);
    this.P4_.rotation.set(ViewAngle90, 0, 0);
    this.P5_.rotation.set(ViewAngle90, 0, 0);

    this.P0_.scale.set(ScaleZ, ScaleY, 1);
    this.P1_.scale.set(ScaleZ, ScaleY, 1);
    this.P2_.scale.set(ScaleX, ScaleY, 1);
    this.P3_.scale.set(ScaleX, ScaleY, 1);
    this.P4_.scale.set(ScaleZ, ScaleX, 1);
    this.P5_.scale.set(ScaleZ, ScaleX, 1);

    //this.plane.matrixAutoUpdate = false;
    // https://stackoverflow.com/questions/14181631/changing-color-of-cube-in-three-js
    //this.plane.updateMatrix();

    this.SetFace = function(FaceN, Face_)
    {
        switch (FaceN)
        {
            case 0:
                this.Face0 = Face_;
                break;
            case 1:
                this.Face1 = Face_;
                break;
            case 2:
                this.Face2 = Face_;
                break;
            case 3:
                this.Face3 = Face_;
                break;
            case 4:
                this.Face4 = Face_;
                break;
            case 5:
                this.Face5 = Face_;
                break;
        }
        this.SetFaceRepaint();
    }

    this.SetFaces = function(Face0_, Face1_, Face2_, Face3_, Face4_, Face5_)
    {
        this.Face0 = Face0_;
        this.Face1 = Face1_;
        this.Face2 = Face2_;
        this.Face3 = Face3_;
        this.Face4 = Face4_;
        this.Face5 = Face5_;
        this.SetFaceRepaint();
    }

    this.SetFaceRepaint = function()
    {
        this.Remove();
        if (this.Face0)
        {
            ViewScene.add(this.P0_);
        }
        if (this.Face1)
        {
            ViewScene.add(this.P1_);
        }
        if (this.Face2)
        {
            ViewScene.add(this.P2_);
        }
        if (this.Face3)
        {
            ViewScene.add(this.P3_);
        }
        if (this.Face4)
        {
            ViewScene.add(this.P4_);
        }
        if (this.Face5)
        {
            ViewScene.add(this.P5_);
        }
    }

    this.SetPosition = function(X, Y, Z)
    {
        this.PosX = X;
        this.PosY = Y;
        this.PosZ = Z;
        var XX = (0 - Z) * ViewSize2Z;
        var YY = (0 - Y) * ViewSize2Y;
        var ZZ = X * ViewSize2X;
        this.P0_.position.set(XX,             YY,             ZZ - ViewSizeX);
        this.P1_.position.set(XX,             YY,             ZZ + ViewSizeX);
        this.P2_.position.set(XX - ViewSizeZ, YY,             ZZ);
        this.P3_.position.set(XX + ViewSizeZ, YY,             ZZ);
        this.P4_.position.set(XX,             YY - ViewSizeY, ZZ);
        this.P5_.position.set(XX,             YY + ViewSizeY, ZZ);
    }

    this.Color1;
    this.Color1R;
    this.Color1G;
    this.Color1B;
    this.Color1_;
    this.Color2;
    this.Color2R;
    this.Color2G;
    this.Color2B;
    this.Color2_;
    this.Color__;

    
    this.SetColor = function(C1R, C1G, C1B, C2R, C2G, C2B)
    {
        this.Color1R = C1R;
        this.Color1G = C1G;
        this.Color1B = C1B;
        this.Color1_ = C1R * 25 + C1G * 5 + C1B;
        this.Color1 = Color[C1R * 25 + C1G * 5 + C1B];
        
        this.Color2R = C2R;
        this.Color2G = C2G;
        this.Color2B = C2B;
        this.Color2_ = C2R * 25 + C2G * 5 + C2B;
        this.Color2 = Color[C2R * 25 + C2G * 5 + C2B];
        
        this.Color__ = this.Color1_ * 125 + this.Color2_;
    }

    this.GetInfo = function()
    {
        return { PX : this.PosX, PY : this.PosY, PZ : this.PosZ,
         F0 : this.Face0,
         F1 : this.Face1,
         F2 : this.Face2,
         F3 : this.Face3,
         F4 : this.Face4,
         F5 : this.Face5,
         C1R : this.Color1R,
         C1G : this.Color1G,
         C1B : this.Color1B,
         C2R : this.Color2R,
         C2G : this.Color2G,
         C2B : this.Color2B
        };
    }

    this.Repaint = function()
    {
        var _N, _S, _E, _W, _NE, _NW, _SE, _SW, _NE_, _NW_, _SE_, _SW_;

        // Left and right faces
        _NE_ = !SceneBlockListExists(this.PosX, this.PosY - 1, this.PosZ - 1);
        _NW_ = !SceneBlockListExists(this.PosX, this.PosY - 1, this.PosZ + 1);
        _SE_ = !SceneBlockListExists(this.PosX, this.PosY + 1, this.PosZ - 1);
        _SW_ = !SceneBlockListExists(this.PosX, this.PosY + 1, this.PosZ + 1);

        // Left face
        _N = this.Face5 || SceneBlockListExists(this.PosX - 1, this.PosY - 1, this.PosZ); // Back edge
        _S = this.Face4 || SceneBlockListExists(this.PosX - 1, this.PosY + 1, this.PosZ); // Front edge
        _E = this.Face3 || SceneBlockListExists(this.PosX - 1, this.PosY, this.PosZ - 1); // Bottom edge
        _W = this.Face2 || SceneBlockListExists(this.PosX - 1, this.PosY, this.PosZ + 1); // Top edge
        _NE = _NE_ || SceneBlockListExists(this.PosX - 1, this.PosY - 1, this.PosZ - 1);
        _NW = _NW_ || SceneBlockListExists(this.PosX - 1, this.PosY - 1, this.PosZ + 1);
        _SE = _SE_ || SceneBlockListExists(this.PosX - 1, this.PosY + 1, this.PosZ - 1);
        _SW = _SW_ || SceneBlockListExists(this.PosX - 1, this.PosY + 1, this.PosZ + 1);
        this.DrawTexture(this.T0X, _N, _S, _E, _W, _NE, _NW, _SE, _SW, 0);

        // Right face
        _N = this.Face5 || SceneBlockListExists(this.PosX + 1, this.PosY - 1, this.PosZ); // Back edge
        _S = this.Face4 || SceneBlockListExists(this.PosX + 1, this.PosY + 1, this.PosZ); // Front edge
        _E = this.Face3 || SceneBlockListExists(this.PosX + 1, this.PosY, this.PosZ - 1); // Bottom edge
        _W = this.Face2 || SceneBlockListExists(this.PosX + 1, this.PosY, this.PosZ + 1); // Top edge
        _NE = _NE_ || SceneBlockListExists(this.PosX + 1, this.PosY - 1, this.PosZ - 1);
        _NW = _NW_ || SceneBlockListExists(this.PosX + 1, this.PosY - 1, this.PosZ + 1);
        _SE = _SE_ || SceneBlockListExists(this.PosX + 1, this.PosY + 1, this.PosZ - 1);
        _SW = _SW_ || SceneBlockListExists(this.PosX + 1, this.PosY + 1, this.PosZ + 1);
        this.DrawTexture(this.T1X, _N, _S, _E, _W, _NE, _NW, _SE, _SW, 1);

        // Top and bottom faces
        _NE_ = !SceneBlockListExists(this.PosX - 1, this.PosY - 1, this.PosZ);
        _NW_ = !SceneBlockListExists(this.PosX + 1, this.PosY - 1, this.PosZ);
        _SE_ = !SceneBlockListExists(this.PosX - 1, this.PosY + 1, this.PosZ);
        _SW_ = !SceneBlockListExists(this.PosX + 1, this.PosY + 1, this.PosZ);

        // Top face
        _N = this.Face5 || SceneBlockListExists(this.PosX, this.PosY - 1, this.PosZ + 1); // Back edge
        _S = this.Face4 || SceneBlockListExists(this.PosX, this.PosY + 1, this.PosZ + 1); // Front edge
        _E = this.Face0 || SceneBlockListExists(this.PosX - 1, this.PosY, this.PosZ + 1); // Left edge
        _W = this.Face1 || SceneBlockListExists(this.PosX + 1, this.PosY, this.PosZ + 1); // Right edge
        _NE = _NE_ || SceneBlockListExists(this.PosX - 1, this.PosY - 1, this.PosZ + 1);
        _NW = _NW_ || SceneBlockListExists(this.PosX + 1, this.PosY - 1, this.PosZ + 1);
        _SE = _SE_ || SceneBlockListExists(this.PosX - 1, this.PosY + 1, this.PosZ + 1);
        _SW = _SW_ || SceneBlockListExists(this.PosX + 1, this.PosY + 1, this.PosZ + 1);
        this.DrawTexture(this.T2X, _N, _S, _E, _W, _NE, _NW, _SE, _SW, 2);

        // Bottom face
        _N = this.Face5 || SceneBlockListExists(this.PosX, this.PosY - 1, this.PosZ - 1); // Back edge
        _S = this.Face4 || SceneBlockListExists(this.PosX, this.PosY + 1, this.PosZ - 1); // Front edge
        _E = this.Face0 || SceneBlockListExists(this.PosX - 1, this.PosY, this.PosZ - 1); // Left edge
        _W = this.Face1 || SceneBlockListExists(this.PosX + 1, this.PosY, this.PosZ - 1); // Right edge
        _NE = _NE_ || SceneBlockListExists(this.PosX - 1, this.PosY - 1, this.PosZ - 1);
        _NW = _NW_ || SceneBlockListExists(this.PosX + 1, this.PosY - 1, this.PosZ - 1);
        _SE = _SE_ || SceneBlockListExists(this.PosX - 1, this.PosY + 1, this.PosZ - 1);
        _SW = _SW_ || SceneBlockListExists(this.PosX + 1, this.PosY + 1, this.PosZ - 1);
        this.DrawTexture(this.T3X, _N, _S, _E, _W, _NE, _NW, _SE, _SW, 3);

        // Front and back faces
        _NE_ = !SceneBlockListExists(this.PosX + 1, this.PosY, this.PosZ - 1);
        _NW_ = !SceneBlockListExists(this.PosX + 1, this.PosY, this.PosZ + 1);
        _SE_ = !SceneBlockListExists(this.PosX - 1, this.PosY, this.PosZ - 1);
        _SW_ = !SceneBlockListExists(this.PosX - 1, this.PosY, this.PosZ + 1);

        // Front face
        _N = this.Face1 || SceneBlockListExists(this.PosX + 1, this.PosY + 1, this.PosZ); // Right edge
        _S = this.Face0 || SceneBlockListExists(this.PosX - 1, this.PosY + 1, this.PosZ); // Left edge
        _E = this.Face3 || SceneBlockListExists(this.PosX, this.PosY + 1, this.PosZ - 1); // Bottom edge
        _W = this.Face2 || SceneBlockListExists(this.PosX, this.PosY + 1, this.PosZ + 1); // Top edge
        _NE = _NE_ || SceneBlockListExists(this.PosX + 1, this.PosY + 1, this.PosZ - 1);
        _NW = _NW_ || SceneBlockListExists(this.PosX + 1, this.PosY + 1, this.PosZ + 1);
        _SE = _SE_ || SceneBlockListExists(this.PosX - 1, this.PosY + 1, this.PosZ - 1);
        _SW = _SW_ || SceneBlockListExists(this.PosX - 1, this.PosY + 1, this.PosZ + 1);
        this.DrawTexture(this.T4X, _N, _S, _E, _W, _NE, _NW, _SE, _SW, 4);

        // Back face
        _N = this.Face1 || SceneBlockListExists(this.PosX + 1, this.PosY - 1, this.PosZ); // Right edge
        _S = this.Face0 || SceneBlockListExists(this.PosX - 1, this.PosY - 1, this.PosZ); // Left edge
        _E = this.Face3 || SceneBlockListExists(this.PosX, this.PosY - 1, this.PosZ - 1); // Bottom edge
        _W = this.Face2 || SceneBlockListExists(this.PosX, this.PosY - 1, this.PosZ + 1); // Top edge
        _NE = _NE_ || SceneBlockListExists(this.PosX + 1, this.PosY - 1, this.PosZ - 1);
        _NW = _NW_ || SceneBlockListExists(this.PosX + 1, this.PosY - 1, this.PosZ + 1);
        _SE = _SE_ || SceneBlockListExists(this.PosX - 1, this.PosY - 1, this.PosZ - 1);
        _SW = _SW_ || SceneBlockListExists(this.PosX - 1, this.PosY - 1, this.PosZ + 1);
        this.DrawTexture(this.T5X, _N, _S, _E, _W, _NE, _NW, _SE, _SW, 5);

/*
        this.T0M.map.needsUpdate = true;
        this.T1M.map.needsUpdate = true;
        this.T2M.map.needsUpdate = true;
        this.T3M.map.needsUpdate = true;
        this.T4M.map.needsUpdate = true;
        this.T5M.map.needsUpdate = true;
*/
        this.T0.needsUpdate = true;
        this.T1.needsUpdate = true;
        this.T2.needsUpdate = true;
        this.T3.needsUpdate = true;
        this.T4.needsUpdate = true;
        this.T5.needsUpdate = true;

        this.ToRepaint = false;
    }

    this.DrawTexture = function(T_X, _N, _S, _E, _W, _NE, _NW, _SE, _SW, _Face)
    {
        T_X.fillStyle = this.Color1;
        T_X.fillRect(0, 0, ViewTextureS, ViewTextureS);
        T_X.fillStyle = this.Color2;
        let InsideCursor = false;
        let InsideCursorBox = false;
        
        if (this.PosX == CursorX)
        {
            if (this.PosY == CursorY)
            {
                if (this.PosZ == CursorZ)
                {
                    InsideCursor = true;
                    InsideCursorBox = true;
                }
            }
        }
        
        if (!InsideCursor)
        {
            if ((this.PosX >= (CursorX + CursorSizeX_1)) && (this.PosX <= (CursorX + CursorSizeX_2)))
            {
                if ((this.PosY >= (CursorY + CursorSizeY_1)) && (this.PosY <= (CursorY + CursorSizeY_2)))
                {
                    if ((this.PosZ >= (CursorZ + CursorSizeZ_1)) && (this.PosZ <= (CursorZ + CursorSizeZ_2)))
                    {
                        InsideCursorBox = true;
                    }
                }
            }
        }
        
        let ViewTextureT = ViewTextureS - ViewTextureB - 0;
        if (_W)
        {
            T_X.fillRect(0, 0, ViewTextureB, ViewTextureS);
        }
        if (_E)
        {
            T_X.fillRect(ViewTextureT, 0, ViewTextureB, ViewTextureS);
        }
        if (_N)
        {
            T_X.fillRect(0, 0, ViewTextureS, ViewTextureB);
        }
        if (_S)
        {
            T_X.fillRect(0, ViewTextureT, ViewTextureS, ViewTextureB);
        }
        if (_NE)
        {
            T_X.fillRect(ViewTextureT, 0, ViewTextureB, ViewTextureB);
        }
        if (_NW)
        {
            T_X.fillRect(0, 0, ViewTextureB, ViewTextureB);
        }
        if (_SE)
        {
            T_X.fillRect(ViewTextureT, ViewTextureT, ViewTextureB, ViewTextureB);
        }
        if (_SW)
        {
            T_X.fillRect(0, ViewTextureT, ViewTextureB, ViewTextureB);
        }
         
        if (CursorVisible && InsideCursorBox)
        {
            if (InsideCursor)
            {
                T_X.fillRect(0, 0, ViewTextureC, ViewTextureS);
                T_X.fillRect(ViewTextureS - ViewTextureC - 0, 0, ViewTextureC, ViewTextureS);
                T_X.fillRect(0, 0, ViewTextureS, ViewTextureC);
                T_X.fillRect(0, ViewTextureS - ViewTextureC - 0, ViewTextureS, ViewTextureC);
            }
            else
            {
                switch (_Face)
                {
                    case 0:
                    case 1:
                        if (this.PosZ == (CursorZ + CursorSizeZ_2)) T_X.fillRect(0, 0, ViewTextureX, ViewTextureS);
                        if (this.PosZ == (CursorZ + CursorSizeZ_1)) T_X.fillRect(ViewTextureS - ViewTextureC - 0, 0, ViewTextureC, ViewTextureS);
                        if (this.PosY == (CursorY + CursorSizeY_1)) T_X.fillRect(0, 0, ViewTextureS, ViewTextureC);
                        if (this.PosY == (CursorY + CursorSizeY_2)) T_X.fillRect(0, ViewTextureS - ViewTextureC - 0, ViewTextureS, ViewTextureC);
                        break;
                    case 2:
                    case 3:
                        if (this.PosX == (CursorX + CursorSizeX_2)) T_X.fillRect(0, 0, ViewTextureX, ViewTextureS);
                        if (this.PosX == (CursorX + CursorSizeX_1)) T_X.fillRect(ViewTextureS - ViewTextureC - 0, 0, ViewTextureC, ViewTextureS);
                        if (this.PosY == (CursorY + CursorSizeY_1)) T_X.fillRect(0, 0, ViewTextureS, ViewTextureC);
                        if (this.PosY == (CursorY + CursorSizeY_2)) T_X.fillRect(0, ViewTextureS - ViewTextureC - 0, ViewTextureS, ViewTextureC);
                        break;
                    case 4:
                    case 5:
                        if (this.PosZ == (CursorZ + CursorSizeZ_2)) T_X.fillRect(0, 0, ViewTextureX, ViewTextureS);
                        if (this.PosZ == (CursorZ + CursorSizeZ_1)) T_X.fillRect(ViewTextureS - ViewTextureC - 0, 0, ViewTextureC, ViewTextureS);
                        if (this.PosX == (CursorX + CursorSizeX_2)) T_X.fillRect(0, 0, ViewTextureS, ViewTextureC);
                        if (this.PosX == (CursorX + CursorSizeX_1)) T_X.fillRect(0, ViewTextureS - ViewTextureC - 0, ViewTextureS, ViewTextureC);
                        break;
                }
            }
        }
    }

    this.Remove = function()
    {
        ViewScene.remove(this.P0_);
        ViewScene.remove(this.P1_);
        ViewScene.remove(this.P2_);
        ViewScene.remove(this.P3_);
        ViewScene.remove(this.P4_);
        ViewScene.remove(this.P5_);
    }
}
