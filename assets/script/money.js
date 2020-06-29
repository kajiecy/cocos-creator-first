// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        moneyRoot:{
            type: cc.Node,
            default: null,
        },
        money:{
            type:cc.Prefab,
            default:null,
        }
    },
    newMoney(){
        let moneyItem = cc.instantiate(this.money)
        moneyItem.x = Math.random()*400-200;
        moneyItem.y = 1053;
        this.moneyRoot.addChild(moneyItem)
    },
    getNewStartPosition(){
      let randX = Math.random()*200-400;
      let randY = this.node.height/2+100;
      return [randX,randY];
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.schedule(()=>{
            this.newMoney();
            // this.newMoney();
        },0.2)
    },

    start () {

    },

    // update (dt) {},
});
