// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        jumpDuration:0.5,
        jumpHeight:400,
        jumpCount:0,

        ballObj:{
            type:cc.Node,
            default:null,
        },
        countText:{
            type:cc.Label,
            default: null,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.countText.string = `跳动次数${this.jumpCount}次`;
        let jumpUp = cc.moveBy(this.jumpDuration,0,this.jumpHeight).easing(cc.easeCubicActionOut());
        let jumpDown = cc.moveBy(this.jumpDuration,0,-this.jumpHeight).easing(cc.easeCubicActionIn());
        let recordCount = cc.callFunc(()=>{
            this.jumpCount ++;
            this.countText.string = `跳动次数${this.jumpCount}次`;
            if(this.jumpCount === 5){
                cc.director.loadScene('end');
            }
        });
        let jumpAction = cc.repeat(cc.sequence(jumpUp,jumpDown,recordCount),5);
        this.ballObj.runAction(jumpAction);

    },

    start () {

    },

    // update (dt) {},
});
