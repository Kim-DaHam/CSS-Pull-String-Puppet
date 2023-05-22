import {Point} from './Point';

const FOLLOW_SPEED = 0.08;
const ROTATE_SPEED = 0.12;
const SPEED_REDUCE = 0.8;
const FPS = 1000/60; // 초당 프레임
const WIDTH = 260;
const HEIGHT = 260;

export class Dialog {
    constructor(){
        this.pos = new Point(); // Dialog 좌표
        this.target = new Point(); // Dialog 위에 클릭한 좌표
        this.prevPos = new Point(); // 이전 좌표
        this.downPos = new Point(); // 마우스 내려놓은 위치
        this.speedPos = new Point();
        this.startPos = new Point(); // 마우스 클릭했을 당시 Dialog 좌표
        this.mousePos = new Point();
        this.centerPos = new Point(); // Dialog 가운데 좌표
        this.origin = new Point();
        this.rotation = 0;
        this.sideValue = 0;
        this.isDown = false; // Dialog가 클릭 되었는지
    }

    resize(stageWidth, stageHeight){
        this.pos.x = Math.random() * (stageWidth-WIDTH);
        this.pos.y = Math.random() * (stageHeight-HEIGHT);
        this.target = this.pos.clone();
        this.prevPos = this.pos.clone();
    }

    animate(ctx){
        ctx.beginPath();
        ctx.fillStyle = '#f4e55a';
        ctx.fillRect(this.pos.x, this.pos.y, WIDTH, HEIGHT);
    }

    down(point){
        if(point.collide(this.pos, WIDTH, HEIGHT)){
            this.isDown = true;
            this.startPos = this.pos.clone();
            this.downPos = point.clone();
            this.mousePos = point.clone().subtract(this.pos);
            return this;
        } else {
            return null
        }
    }

    move(point){
        if(this.isDown){
            this.target = this.startPos.clone().add(point).subtract(this.downPos);
        }
    }

    up(point){
        this.isDown = false;
    }
}