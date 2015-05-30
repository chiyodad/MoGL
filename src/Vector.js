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
     ���� Vector ��ü�� x, y �� z ��� ���� ��� ��ü�� x,y,z���� ���մϴ�.
     */
    fn.add = function add(b) {
        var a = this;
        a[0] = a[0] + b[0], a[1] = a[1] + b[1], a[2] = a[2] + b[2], a;
        return this;
    },
    /*
     ���� Vector ��ü�� x, y �� z ��� ���� ���� x,y,z���� ���մϴ�.
     */
    fn.addXYZ = function addXYZ(x,y,z) {
        var a = this;
        a[0] = a[0] + x, a[1] = a[1] + y, a[2] = a[2] + z, a;
        return this;
    },
    /*
     ���� Vector ��ü�� x, y �� z ��� ���� �ٸ� Vector ��ü�� x, y �� z ��� ������ ���ϴ�.
     */
    fn.subtract = function subtract(b) {
        var a = this;
        a[0] = a[0] - b[0], a[1] = a[1] - b[1], a[2] = a[2] - b[2], a;
        return this
    },
    /*
     ���� Vector ��ü�� x, y �� z ��� ���� �ٸ� ���� x, y ,z ��� ������ ���ϴ�.
     */
    fn.subtractXYZ = function subtract(x,y,z) {
        var a = this;
        a[0] = a[0] - x, a[1] = a[1] - y, a[2] = a[2] - z, a;
        return this
    },
    /*
     ���� Vector ��ü�� ũ�⸦ ��Į�� ����ŭ �����մϴ�.
     */
    fn.scaleBy = function scaleBy(b) {
        var a = this;
        a[0] = a[0] * b, a[1] = a[1] * b, a[2] = a[2] * b, a;
        return this
    },
    /*
    ���� ���Ϳ� ��� ���� ��ü ������ �Ÿ��� ��ȯ�մϴ�.
     */
    fn.distance = function distance(b) {
        var a = this;
        var x = b[0] - a[0], y = b[1] - a[1], z = b[2] - a[2];
        return SQRT(x * x + y * y + z * z);
    },
    /*
     ���� Vector ��ü�� ������ �����մϴ�.
     */
    fn.negate = function negate() {
        var a = this;
        a[0] = -a[0], a[1] = -a[1], a[2] = -a[2], a;
        return this
    },
    /*
     ���� Vector�� ��������ȭ�� �����Դϴ�.
     */
    fn.normalize = function normalize() {
        var a = this;
        var x = a[0], y = a[1], z = a[2];
        var len = x * x + y * y + z * z;
        if (len > 0) len = 1 / SQRT(len), a[0] = a[0] * len, a[1] = a[1] * len, a[2] = a[2] * len;
        return this;
    },
    /*
     ������ ��ȯ
     */
    fn.dot = function (b) {
        var a = this;
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    },
    /*
     �κ��Ϳ� ������ ���͸� ��ȯ
     */
    fn.cross = function (b) {
        var a = this, out = new Vector();
        var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2];
        out[0] = ay * bz - az * by, out[1] = az * bx - ax * bz, out[2] = ax * by - ay * bx;
        return out
    }
    return MoGL.ext(Vector, Mesh);
})();

