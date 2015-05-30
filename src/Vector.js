/**
 * Created by redcamel on 2015-05-30.
 */
var Vector = (function () {
    var Vector, fn;
    var SQRT = Math.sqrt, SIN = Math.sin, COS = Math.cos, ABS = Math.abs;
    Vector = function Vector() {
        this._rowData = new Float32Array([0, 0, 0])
    },
    fn = Vector.prototype,
    /*
     현재 Vector 객체의 x, y 및 z 요소 값에 대상 객체의 x,y,z값을 더합니다.
     */
    fn.add = function add(b) {
        var a = this;
        a[0] = a[0] + b[0], a[1] = a[1] + b[1], a[2] = a[2] + b[2], a;
        return this;
    },
    /*
     현재 Vector 객체의 x, y 및 z 요소 값에 인자 x,y,z값을 더합니다.
     */
    fn.addXYZ = function addXYZ(x,y,z) {
        var a = this;
        a[0] = a[0] + x, a[1] = a[1] + y, a[2] = a[2] + z, a;
        return this;
    },
    /*
     현재 Vector 객체의 x, y 및 z 요소 값을 다른 Vector 객체의 x, y 및 z 요소 값에서 뺍니다.
     */
    fn.subtract = function subtract(b) {
        var a = this;
        a[0] = a[0] - b[0], a[1] = a[1] - b[1], a[2] = a[2] - b[2], a;
        return this
    },
    /*
     현재 Vector 객체의 x, y 및 z 요소 값을 다른 인자 x, y ,z 요소 값에서 뺍니다.
     */
    fn.subtractXYZ = function subtract(x,y,z) {
        var a = this;
        a[0] = a[0] - x, a[1] = a[1] - y, a[2] = a[2] - z, a;
        return this
    },
    /*
     현재 Vector 객체의 크기를 스칼라 값만큼 조절합니다.
     */
    fn.scaleBy = function scaleBy(b) {
        var a = this;
        a[0] = a[0] * b, a[1] = a[1] * b, a[2] = a[2] * b, a;
        return this
    },
    /*
     현재 벡터와 대상 벡터 객체 사이의 거리를 반환합니다.
     */
    fn.distance = function distance(b) {
        var a = this;
        var x = b[0] - a[0], y = b[1] - a[1], z = b[2] - a[2];
        return SQRT(x * x + y * y + z * z);
    },
    /*
     현재 Vector 객체를 역수로 설정합니다.
     */
    fn.negate = function negate() {
        var a = this;
        a[0] = -a[0], a[1] = -a[1], a[2] = -a[2], a;
        return this
    },
    /*
     현재 Vector의 단위벡터화된 길이입니다.
     */
    fn.normalize = function normalize() {
        var a = this;
        var x = a[0], y = a[1], z = a[2];
        var len = x * x + y * y + z * z;
        if (len > 0) len = 1 / SQRT(len), a[0] = a[0] * len, a[1] = a[1] * len, a[2] = a[2] * len;
        return this;
    },
    /*
     내적값 반환
     */
    fn.dot = function (b) {
        var a = this;
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    },
    /*
     두벡터에 수직인 벡터를 반환
     */
    fn.cross = function (b) {
        var a = this, out = new Vector();
        var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2];
        out[0] = ay * bz - az * by, out[1] = az * bx - ax * bz, out[2] = ax * by - ay * bx;
        return out
    };
    return MoGL.ext(Vector, Mesh);
})();