var Mesh = (function () {
    var geometry, material, culling;
    //private
    geometry = {},
    material = {},
    culling = {};
    //shared private
    $setPrivate('Mesh', {
        geometry : geometry,
        material : material,
        culling : culling
    });
    return Matrix.extend('Mesh', {
        description: [
            "���ϱ����� ������ ������ �� �ִ� �ϳ��� ������ ������ Mesh�� ������.",
            "* id�� ���ڷ� �����ϸ� [Scene](Scene.md)�� [addChild](Scene.md#addchild-idstring-meshmesh-)�ϴ� ���� id�� ���ε��ϸ� �����ϸ� ��ϵ��� ����.",
            "* ��ü�� ���ڷ� �����ϸ� [Scene](Scene.md)�� [addChild](Scene.md#addchild-idstring-meshmesh-)�ϴ� ���� Mesh������ [Geometry](Geometry.md)�� [Material](Material.md)�� ������ id�� �ڵ���ϵǸ�, shader Id�� �������� ������ ���ܰ� �߻���( [addChild](Scene.md#addchild-idstring-meshmesh-) ���� )"
        ],
        param: [
            "1. geometry:* - ���ϱ���ü�� ������ ������ ���� ������ �� �� ����.",
            "   * string - Mesh�� ��ϵ� [Scene](Scene.md)�� �̹� ��ϵǾ��ִ� [Geometry](Geometry.md)�� id�� ������.",
            "   * [Geometry](Geometry.md) - ���� [Geometry](Geometry.md)��ü�� ������.",
            "   * null - null�� �����Ǹ� [Scene](Scene.md)�� ������ ��󿡼� ���ܵ�.",
            "2. material:* - �ش� ���ϱ����� ������ ������ ������ ������ ���� ������ �� �� ����.",
            "   * string - Mesh�� ��ϵ� [Scene](Scene.md)�� �̹� ��ϵǾ��ִ� [Material](Material.md)�� id�� ������.",
            "   * [Material](Material.md) - ���� [Material](Material.md) ��ü�� ������.",
            "   * null - null�� �����Ǹ� [Scene](Scene.md)�� ������ ��󿡼� ���ܵ�."
        ],
        sample: [
            "var mesh1 = new Mesh(",
            "   new Geometry( vertex, index ),",
            "   new Material('#f00')",
            ");",
            "",
            "// ���� ��ϵ� Geometry, Material ���",
            "var mesh2 = new Mesh( scene.getGeometry(geometryID), scene.getMaterial(materialID) )",
            "",
            "//���丮�Լ��ε� ��밡��",
            "var mesh3 = Mesh( scene.getGeometry(geometryID), scene.getMaterial(materialID) );"
        ],
        value:function Mesh(geometry, material) {
            this.geometry = geometry;
            this.material = material;
        }
    })
    .field('culling', {
        get:$getter(culling, false, 'cullingNone'),
        set:function cullingSet(v) {
            if (Mesh[v]) {
                culling[this] = v;
            } else {
                this.error(0);
            }
        }
    })
    .field('geometry', {
        description: "�� Mesh�� ���ϱ��� ������ ������ [Geometry](Geometry.md) ��ü",
        sample: [
            "// ���� ��ϵ� ���ϱ����� ��ü�Ҽ� ���� - set",
            "mesh1.geometry = scene.getGeometry(geometryID);",
            "",
            "// �ٸ� Mesh�� ���ϱ��� ��ü�� �˷��ټ� ���� - get",
            "mesh2.geometry = mesh1.geometry;"
        ],
        get:$getter(geometry),
        set:function geometrySet(v) {
            if (v instanceof Geometry) {
                geometry[this] = v;
            } else {
                this.error(0);
            }
        }
    })
    .field('material', {
        description: "�� Mesh�� ������ ǥ���ϴ� [Material](Material.md) ��ü",
        sample: [
            "// ���� ��ϵ� ������ ��ü�Ҽ� ���� - set",
            "mesh1.material = scene.getMaterial(materialID);",
            "",
            "// �ٸ� Mesh�� ���� ��ü�� �˷��ټ� ���� - get",
            "mesh2.material = mesh1.material;"
        ],
        get:$getter(material),
        set:function materialSet(v) {
            if (v instanceof Material) {
                material[this] = v;
            } else {
                this.error(0);
            }
        }
    })
    .constant('cullingNone', 'cullingNone')
    .constant('cullingFront', 'cullingFront')
    .constant('cullingBack', 'cullingBack')
    .build();
})();