// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        let mv1 = cc.moveBy(Math.random()*1+2,0,-1880);
        let removeFunc = cc.callFunc(()=>{
            this.node.removeFromParent()
        });
        let moneyAction = cc.sequence(mv1,removeFunc);

        this.node.runAction(moneyAction);
    },

    start () {

    },

    // update (dt) {},
});
