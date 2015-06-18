'use strict'
var Scene = (function () {
    var vertexShaderParser, fragmentShaderParser,
        children,childrenArray, cameras, textures, materials, geometrys, vertexShaders, fragmentShaders, updateList;
    //private
    children = {},
    childrenArray = {},
    cameras = {},
    textures = {},
    materials = {},
    geometrys = {},
    vertexShaders = {},
    fragmentShaders = {},
    updateList = {},
    //shared private
    $setPrivate('Scene', {
        children : children,
        childrenArray : childrenArray
    }),
    //lib
    vertexShaderParser = function vertexShaderParser(source) {
        var i, temp, str, resultObject, code;
        code =  source.code,
        resultObject = {
            uniforms: [],
            attributes: [],
            id: source.id,
            shaderStr: null
        },
        str = "",
        temp = code.attributes,
        i = temp.length;
        while (i--) {
            str += 'attribute ' + temp[i] + ';\n',
            resultObject.attributes.push(temp[i].split(' ')[1]);
        }
        temp = code.uniforms,
        i = temp.length;
        while (i--) {
            str += 'uniform ' + temp[i] + ';\n',
            resultObject.uniforms.push(temp[i].split(' ')[1]);
        }
        temp = code.varyings,
        i = temp.length;
        while (i--) {
            str += 'varying ' + temp[i] + ';\n';
        }
        str += VertexShader.baseFunction,
        str += 'void main(void){\n',
        str += code.main + ';\n',
        str += '}\n'
        resultObject.shaderStr = str
        return resultObject;
    },
    fragmentShaderParser = function fragmentShaderParser(source) {
        var i, temp, str, resultObject, code;
        code =  source.code,
        resultObject = {
            uniforms: [],
            id: source.id,
            shaderStr: null
        },
        str = "";
        if (code.precision) {
            str += 'precision ' + code.precision + ';\n';
        }
        else {
            str += 'precision mediump float;\n';
        }
        temp = code.uniforms,
        i = temp.length;
        while (i--) {
            str += 'uniform ' + temp[i] + ';\n',
            resultObject.uniforms.push(temp[i].split(' ')[1]);
        }
        temp = code.varyings,
        i = temp.length;
        while (i--) {
            str += 'varying ' + temp[i] + ';\n';
        }
        str += 'void main(void){\n',
        str += code.main + ';\n',
        str += '}\n'
        resultObject.shaderStr = str
        return resultObject;
    };
    return MoGL.extend(function Scene() {
        // for JS
        children[this] = {},
        childrenArray[this] = [],
        cameras[this] = {},
        textures[this] = {},
        materials[this] = {},
        geometrys[this] = {},
        vertexShaders[this] = {},
        fragmentShaders[this] = {},
        updateList[this] = {
            mesh : [],
            material : [],
            camera : []
        },
        this.addVertexShader(Shader.colorVertexShader),this.addFragmentShader(Shader.colorFragmentShader)
        this.addVertexShader(Shader.wireFrameVertexShader),this.addFragmentShader(Shader.wireFrameFragmentShader),
        this.addVertexShader(Shader.bitmapVertexShader),this.addFragmentShader(Shader.bitmapFragmentShader),
        this.addVertexShader(Shader.bitmapVertexShaderGouraud),this.addFragmentShader(Shader.bitmapFragmentShaderGouraud),
        this.addVertexShader(Shader.colorVertexShaderGouraud),this.addFragmentShader(Shader.colorFragmentShaderGouraud),
        this.addVertexShader(Shader.colorVertexShaderPhong),this.addFragmentShader(Shader.colorFragmentShaderPhong),
        this.addVertexShader(Shader.toonVertexShaderPhong),this.addFragmentShader(Shader.toonFragmentShaderPhong),
        this.addVertexShader(Shader.bitmapVertexShaderPhong),this.addFragmentShader(Shader.bitmapFragmentShaderPhong),
        this.addVertexShader(Shader.bitmapVertexShaderBlinn),this.addFragmentShader(Shader.bitmapFragmentShaderBlinn),
        this.addVertexShader(Shader.postBaseVertexShader),this.addFragmentShader(Shader.postBaseFragmentShader);
    })
    .field('updateList', {
            description: "world가 render 함수를 실행하기전 GPU업데이트가 되어야할 목록.",
            sample: [
                ""
            ],
            defaultValue: '{ mesh : [], material : [], camera : [] } - 업데이트 완료후 각 리스트는 초기화 됨.',
            get: $getter(updateList)
        }
    )
    .field('vertexShaders', {
            description: "현재 씬이 가지고있는 버텍스 쉐이더 자바스크립트 정보",
            sample: [
                ""
            ],
            defaultValue: "{}",
            get:$getter(vertexShaders)}
    )
    .field('fragmentShaders', {
            description: "현재 씬이 가지고 있는 프레그먼트 쉐이더 자바스크립트 정보",
            sample: [
                ""
            ],
            defaultValue: "{}",
            get:$getter(fragmentShaders)
        }
    )
    .field('cameras', {
            description: "씬에 등록된 카메라 리스트",
            sample: [
                "var scene = new Scene()",
                "scene.addChild(new Camera)",
                "console.log(scene.cameras) // 오브젝트 형식의 카메라 리스트를 반환"
            ],
            defaultValue: "{}",
            get:$getter(cameras)
        }
    )
    .field('children', {
            description: "씬에 등록된 자식 리스트를 오브젝트 형식으로 반환",
            sample: [
                "console.log(scene.children)"
            ],
            defaultValue: "{}",
            get:$getter(children)
        }
    )
    .method('addMesh', {
            description:[
                'Mesh객체를 추가함.'
            ],
            param:[
                'mesh:Mesh - 메쉬객체'
            ],
            ret:[
                'this - 메서드체이닝을 위해 자신을 반환함.'
            ],
            sample:[
                "var scene = new Scene()",
                "var geo = new Geometry([],[])",
                "var mat = new Material()",
                "var mesh = new Mesh(geo,mat)",
                "scene.addChild(mesh)"
            ],
            exception:[
                "* 'Scene.addMesh:0' - 이미 등록된 메쉬객체를 등록하려고 할때",
                "* 'Scene.addMesh:1' - 메쉬가 아니 객체를 등록하려고 할때"
            ],
            value : function(v){
                var p = children[this], p2 = updateList[this], mat;
                if (p[v]) this.error(0);
                if (!(v instanceof Mesh)) this.error(1);
                p[v] = v;
                p2.mesh.push(v)
                mat = v.material
                mat.addEventListener(Material.load,function(){
                    //console.log('메쉬의 재질이 변경되었다!')
                    var t= this.diffuse
                    if(t){
                        var i = t.length
                        while(i--){
                            if(p2.material.indexOf(t[i].tex)==-1){
                                p2.material.push(t[i].tex)
                                //console.log('새로운 텍스쳐 업데이트 추가',t[i].tex.isLoaded)
                            }
                        }
                    }
                })
                v.addEventListener(Mesh.changed,function(){
                    p2.mesh.push(v)
                })
                mat.dispatch(Material.load,mat)

                if(childrenArray[this].indexOf(v)==-1){
                    childrenArray[this].push(v)
                }
                return this;
            }
        }
    )
    .method('addCamera', {
        value : function addCamera(v){
            var p = cameras[this];
            if (p[v]) this.error(0);
            if (!(v instanceof Camera)) this.error(1);
            p[v] = v;
            updateList[this].camera.push(v)
            return this;
        }
        }
    )
    .method('addChild', function addChild(v) {
        if(v instanceof Mesh)  this.addMesh(v)
        else if(v instanceof Camera)  this.addCamera(v)
        else this.error(0)
        return this;
    })
    .method('addGeometry', function (v) {
        var p = geometrys[this];
        if (p[v]) this.error(0);
        if (!(v instanceof Geometry)) this.error(1);
        p[v] = v;
        return this;
    })
    .method('addMaterial', function (v) {
        var p = materials[this];
        if (p[v]) this.error(0);
        if (!(v instanceof Material)) this.error(1);
        p[v] = v
        return this;
    })
    .method('addTexture', function addTexture(v) {
        var p = textures[this];
        if (p[v]) this.error(0);
        if (!(v instanceof Texture)) this.error(1);
        p[v] = v
        return this;
    })
    .method('addFragmentShader', function addFragmentShader(v) {
        var p = fragmentShaders[this];
        if (p[v.id]) this.error(0);
        p[v.id] = fragmentShaderParser(v);;
        return this
    })
    .method('addVertexShader', function addVertexShader(v) {
        var p = vertexShaders[this];
        if (p[v.id]) this.error(0);
        p[v.id] = vertexShaderParser(v);
        return this
    })
    .method('getMesh',function (id) {
        var p = children[this],k;
        for(k in p){
            if(p[k].id == id){
                return p[k]
            }
        }
        return null
    })
    .method('getCamera', function (id) {
        var p = cameras[this],k;
        for(k in p){
            if(p[k].id == id){
                return p[k]
            }
        }
        return null
    })
    .method('getChild', function (id) {
        var t;
        if(t = this.getMesh(id)) return t
        if(t = this.getCamera(id)) return t
        return null
    })
    .method('getGeometry', function (id) {
        var p = geometrys[this],k;
        for(k in p){
            if(p[k].id == id){
                return p[k]
            }
        }
        return null
    })
    .method('getMaterial', function (id) {
        var p = materials[this],k;
        for(k in p){
            if(p[k].id == id){
                return p[k]
            }
        }
        return null
    })
    .method('getTexture', function (id) {
        var p = textures[this],k;
        for(k in p){
            if(p[k].id == id){
                return p[k]
            }
        }
        return null
    })
    .method('removeChild', function removeChild(id) {
        var p, k, result;
        p = children[this],
        result = false
        for (k in p) {
            if (p[k].id == id) {
                childrenArray[this].splice(childrenArray[this].indexOf(p[k]),1)
                delete p[k],
                result = true
            }
        }
    
        return result;
    })
    .method('removeGeometry', function removeGeometry(id) {
        var p, k, result;
        p = geometrys[this],
        result = false
        for (k in p) {
            if (p[k].id == id) {
                delete p[k],
                result = true
            }
        }
        return result;
    })
    .method('removeMaterial', function removeMaterial(id) {
        var p, k, result;
        p = materials[this],
            result = false
        for (k in p) {
            if (p[k].id == id) {
                delete p[k],
                result = true
            }
        }
        return result;
    })
    .method('removeTexture', function removeTexture(id) {
        var p, result;
        p = textures[this],
        result = false
        if(p[id] ){
            delete p[id],
            result = true
        }
        return result;
    })
    .build();
//fn.getFragmentShader = function (id) {
//    // TODO 마일스톤0.5
//    return this._fragmentShaders[id];
//},
//fn.getVertexShader = function (id) {
//    // TODO 마일스톤0.5
//    return this._vertexShaders[id];
//},
///////////////////////////////////////////////////////////////////////////
// Remove
//fn.removeFragmentShader = function removeFragmentShader() {
//    // TODO 마일스톤0.5
//    return this;
//},
//fn.removeVertexShader = function VertexShader() {
//    // TODO 마일스톤0.5
//    return this;
//}
})();