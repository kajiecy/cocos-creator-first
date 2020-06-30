// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        player:{
            type:cc.Node,
            default:null,
        },
        // 表示当前角色的位置状态 用于玩家点击时的判断。
        _playerDirection:'left',
        diciRoot:{
          type:cc.Node,
          default:null,
        },
        dici:{
            type: cc.Prefab,
            default: null,
        },
        _diciArray:[],
        _diciDistance:101,
        diciMaxCount:7,
        is_debug: true,

        timerNumber:5,
        timerLabel:{
            type:cc.Label,
            default:null,
        },
        scoreLabel:{
            type:cc.Label,
            default:null,
        },
        userScore:0,
        bgAudio:{
            url:cc.AudioClip,
            default:null,
        },
        jumpAudio:{
            url:cc.AudioClip,
            default:null,
        }
    },
    onLoad () {

        var manager = cc.director.getCollisionManager();
        manager.enabled = true; // 开启碰撞
        if (this.is_debug) {
            manager.enabledDebugDraw = true; // 调试状态绘制出我们物体的碰撞器的形状
        }
        this.player.x = -this.node.width/2+85;
        this.bindTouch();
        this.createDiCi();
        // 播放背景音乐
        cc.audioEngine.setEffectsVolume(.2);
        cc.audioEngine.playMusic(this.bgAudio,true);

        this.schedule(()=>{
            console.log('开始倒计时',this.timerNumber);
            this.timerNumber -= 1;
            this.timerLabel.string = `倒计时：${this.timerNumber}`;
            if(this.timerNumber<=0){
                cc.director.loadScene('end');
            }
        },1)
    },
    start () {

    },
    bindTouch(){
        this.node.on(cc.Node.EventType.TOUCH_START,(e)=>{
            //世界坐标
            let touchPoint = e.getLocation();
            if(touchPoint.x < this.node.width/2){
                // console.log('左')
                if(this._playerDirection==='left'){
                    let mov1 = cc.moveBy(0.1,30,0);
                    let mov2 = cc.moveBy(0.1,-30,0);
                    this.player.runAction(cc.sequence(mov1,mov2));
                }else {
                    this._playerDirection = 'left';
                    let moveL = cc.moveTo(0.2,-this.node.width/2+85,this.player.y);
                    let endFunc = cc.callFunc(()=>{
                        this.player.is3DNode = true;
                        this.player.eulerAngles = cc.v3(0, 0, 0)
                    });
                    let playerAction = cc.sequence(endFunc,moveL);
                    this.player.runAction(playerAction);
                }
            }else {
                if(this._playerDirection==='right'){
                    let mov1 = cc.moveBy(0.1,-30,0);
                    let mov2 = cc.moveBy(0.1,30,0);
                    this.player.runAction(cc.sequence(mov1,mov2));
                }else{
                    this._playerDirection = 'right';
                    let moveR = cc.moveTo(0.2,this.node.width/2-85,this.player.y);
                    let endFunc = cc.callFunc(()=>{
                        // this.player.rotationY = 180;
                        this.player.is3DNode = true;
                        this.player.eulerAngles = cc.v3(0, 180, 0)
                    });
                    let playerAction = cc.sequence(endFunc,moveR);
                    this.player.runAction(playerAction);
                }
            }
            this.createDICIAtScreamOut();
            this.userScore ++;
            this.scoreLabel.string = `Score:${this.userScore}`;
            cc.sys.localStorage.setItem('userScore',this.userScore);
            cc.audioEngine.playEffect(this.jumpAudio,false);

        },this)
    },
    createDiCi(){
        while (this._diciArray.length<this.diciMaxCount){
            this.newDICIFunc(this._diciArray.length);
        }

    },
    createDICIAtScreamOut(){
        // 当用户点击的时候在屏幕外面生成一个地刺
        this.newDICIFunc(this.diciMaxCount);
        // this._diciArray.shift();
        // 移动所有地刺
        this.diciRoot.children.forEach((diciItem)=>{
            let diciMove = cc.moveBy(0.1,0,this._diciDistance);
            diciItem.runAction(diciMove);
            if(diciItem.y>=525){
                diciItem.removeFromParent();
            }
        })
    },
    newDICIFunc(yCount){
        let isLeft = Math.random()>0.5;
        let dici = cc.instantiate(this.dici);
        dici.y = 230-(yCount*this._diciDistance);
        if(isLeft){
            dici.x = -this.node.width/2+85;
            dici.is3DNode = true;
            dici.eulerAngles = cc.v3(0, 180, 0)
        }else {
            dici.x = this.node.width/2-85;
        }
        this._diciArray.push(dici);
        this.diciRoot.addChild(dici);
    },
    // update (dt) {},
});
