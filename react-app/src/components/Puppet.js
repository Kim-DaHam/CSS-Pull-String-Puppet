import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import styled from "styled-components"
import {Point} from '../prototypes/Point';

const FOLLOW_SPEED = 0.08;
const ROTATE_SPEED = 0.12;
const SPEED_REDUCE = 0.8;
const FPS = 1000/60; // 초당 프레임
const WIDTH = 260;
const HEIGHT = 260;

function Puppet(){
    let pos = new Point(); // Dialog 좌표
    let target = new Point(); // Dialog 위에 클릭한 좌표
    let prevPos = new Point(); // 이전 좌표
    let downPos = new Point(); // 마우스 내려놓은 위치
    let speedPos = new Point();
    let startPos = new Point(); // 마우스 클릭했을 당시 Dialog 좌표
    let mousePos = new Point();
    let centerPos = new Point(); // Dialog 가운데 좌표
    let origin = new Point();
    let rotation = 0;
    let sideValue = 0;
    let isDown = false; // Dialog가 클릭 되었는지

    const resize = (stageWidth, stageHeight)=>{
        pos.x = Math.random() * (stageWidth-WIDTH);
        pos.y = Math.random() * (stageHeight-HEIGHT);
        target = pos.clone();
        prevPos = pos.clone();
    }

    const animate = (ctx)=>{
        ctx.beginPath();
        ctx.fillStyle = '#f4e55a';
        ctx.fillRect(pos.x, pos.y, WIDTH, HEIGHT);
    }

    const down = (point)=>{
        if(point.collide(pos, WIDTH, HEIGHT)){
            isDown = true;
            startPos = pos.clone();
            downPos = point.clone();
            mousePos = point.clone().subtract(pos);
        } else {
            return null
        }
    }

    const move = (point)=>{
        if(isDown){
            target = startPos.clone().add(point).substract(downPos);
        }
    }

    const up = (point)=>{
        isDown = false;
    }

    return (
        <div>

        </div>
    )
}

export default Puppet;