// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },
    // other是道具的碰撞器组件
    // self 是自己节点的碰撞器组件
    // 碰撞器是一个组件，所以我们可以通过组件 -->节点
    // 碰撞开始
    onCollisionEnter: function (other, self) {
        console.log("other.name = ", other.node.name, other.node.group, other.node.groupIndex);
        cc.audioEngine.pauseMusic();
        cc.director.loadScene('end');
    },
    start () {

    },

    // update (dt) {},
});
