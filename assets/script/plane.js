// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        flySpeed:null,
        plane:{
            type:cc.Node,
            default:null,
        },
        _moveUp:false,
        _moveDown:false,
        _moveLeft:false,
        _moveRight:false,
    },
    onLoad () {

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onKeyDown: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.w:
                this._moveUp = true;
                break;
            case cc.macro.KEY.a:
                this._moveLeft = true;
                break;
            case cc.macro.KEY.s:
                this._moveDown = true;
                break;
            case cc.macro.KEY.d:
                this._moveRight = true;
                break;
        }
    },
    onKeyUp: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.w:
                this._moveUp = false;
                break;
            case cc.macro.KEY.a:
                this._moveLeft = false;
                break;
            case cc.macro.KEY.s:
                this._moveDown = false;
                break;
            case cc.macro.KEY.d:
                this._moveRight = false;
                break;
        }
    },

    start () {

    },
    update (dt) {
        if(this._moveUp){
            this.plane.y += dt*this.flySpeed;
        }
        if(this._moveLeft){
            this.plane.x -= dt*this.flySpeed;
        }
        if(this._moveDown){
            this.plane.y -= dt*this.flySpeed;
        }
        if(this._moveRight){
            this.plane.x += dt*this.flySpeed;
        }
    },
});
