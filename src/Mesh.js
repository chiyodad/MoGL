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
    return Matrix.extend('Mesh', function Mesh(geometry, material) {
        this.geometry = geometry;
        this.material = material;
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