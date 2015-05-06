/**
 * Created by redcamel on 2015-05-05.
 * description
 �����迭�� �ε��� �迭�� �̿��Ͽ� ���ϱ����� ������.
 �����ڿ��� ������ ���� �� ������ ����Ұ��� ���� ���Ĵ� �б⸸ ������.
 */
var Geometry = (function () {
    var Geometry, fn;
    Geometry = function Geometry($vArray, $iArray/* vertexInfo*/) {
        var t = arguments[2] ? arguments[2].length : 3
        this._vertexCount = $vArray.length / t
        this._triCount = $iArray.length / 3
        this._shaderIDList = {}
        //TODO $vArray �Ǻ� �� �������� ���
        // get Volume
        var minX = 0, minY = 0, minZ = 0
        var maxX = 0, maxY = 0, maxZ = 0
        for (var i = 0, len = $vArray.length; i < len; i++) {
            t = i * 3
            minX = $vArray[t] < minX ? $vArray[t] : minX
            maxX = $vArray[t] > maxX ? $vArray[t] : maxX
            minY = $vArray[t + 1] < minY ? $vArray[t + 1] : minY
            maxY = $vArray[t + 1] > maxY ? $vArray[t + 1] : maxY
            minZ = $vArray[t + 2] < minZ ? $vArray[t + 2] : minZ
            maxZ = $vArray[t + 2] > maxZ ? $vArray[t + 2] : maxZ
        }
        this._volume = [maxX - minX, maxY - minY, maxZ - minZ]
    },
        fn = Geometry.prototype,
        fn.X = 'x',
        fn.Y = 'y',
        fn.Z = 'z',
        fn.R = 'r',
        fn.G = 'g',
        fn.B = 'b',
        fn.A = 'a',
        fn.NORMAL_X = 'normalX',
        fn.NORMAL_Y = 'normalY',
        fn.NORMAL_Z = 'normalZ',
        fn.U = 'u',
        fn.V = 'v',
        fn.addVertexShader = function addVertexShader($id) {
            this._shaderIDList[$id] = $id
            return this
        },
        fn.getVertexCount = function getVertexCount() {return this._vertexCount},
        fn.getTriangleCount = function getTriangleCount() {return this._triCount},
        fn.getVolume = function getVolume() {return this._volume},
        fn.removeVertexShader = function removeVertexShader($id) {return delete this._shaderIDList[$id], this}
    return MoGL.ext(Geometry, MoGL);
})();