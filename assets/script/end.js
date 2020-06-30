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
        SumScore:{
            type:cc.Label,
            default:null,
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let sumScore = cc.sys.localStorage.getItem('userScore')|0;
        this.SumScore.string = `最终得分：${sumScore}`;
    },

    start () {

    },
    clickEndButton(){
        cc.director.loadScene('start');
    }
    // update (dt) {},
});
