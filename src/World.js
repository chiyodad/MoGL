/**
 * Created by redcamel on 2015-05-05.
 * description
 * World�� MoGL�� �⺻ ���۰�ü�� ���ο� �ټ��� Scene�� ������ �� ������,
 * ���� �������Ǵ� �����. ���� World�� �ν��Ͻ��� rendering�Լ� �� ��ü�̱⵵ ��.
 * �޼���ü�̴��� ���� ��κ��� �Լ��� �ڽ��� ��ȯ��.
 */
var World = (function () {
    var World, fn;
    World = function World() {
    },
    fn = World.prototype,
    fn._renderList = [],
    fn._sceneList = {},
    fn.addRender = function addRender($sceneID, $cameraID, $index) {
        var uuid = $sceneID + '_' + $cameraID, t = 1
        for (var i = 0, len = this._renderList.length; i < len; i++) this._renderList[i].uuid == uuid ? (MoGL.error('World', 'addRender', 0), t = 0) : 0,
            fn._sceneList[$sceneID] ? 0 : (MoGL.error('World', 'addRender', 1), t = 0)
        for (var k in this._sceneList) {
            if (k == $sceneID) this._sceneList[k].getChild($cameraID) ? 0 : (MoGL.error('World', 'addRender', 2), t = 0)
        }
        if (t) {
            var temp = {
                uuid: uuid, sceneID: $sceneID, cameraID: $cameraID,
                scene: this._sceneList[$sceneID],
                camera: this._sceneList[$sceneID].getChild($cameraID)
            }
            $index ? this._renderList[$index] = temp : this._renderList.push(temp)
        }
        return this
    },
    fn.addScene = function addScene($sceneID, $scene) {
        var t = 1
        this._sceneList[$sceneID] ? (MoGL.error('World', 'addScene', 0), t = 0) : 0,
            $scene instanceof Scene ? 0 : (MoGL.error('World', 'addScene', 1), t = 0 ),
            t ? this._sceneList[$sceneID] = $scene : 0
        return this
    },
    fn.getScene = function getScene($sceneID) {
        return this._sceneList[$sceneID] ? this._sceneList[$sceneID] : null
    },
    fn.removeRender = function removeRender($sceneID, $cameraID) {
        for (var i = 0, len = this._renderList.length; i < len; i++) {
            if (this._renderList[i].uuid == $sceneID + '_' + $cameraID) this._renderList.splice(i, 1)
        }
        return this
    },
    fn.removeScene = function removeScene($sceneID) {
        this._sceneList[$sceneID] ? 0 : MoGL.error('World', 'addScene', 0),
            delete this._sceneList[$sceneID]
        return this
    }
    return MoGL.ext(World, MoGL);
})();