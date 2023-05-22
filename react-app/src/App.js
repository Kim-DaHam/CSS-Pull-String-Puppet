import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import styled from "styled-components"
import './App.css';

import {Point} from './prototypes/Point';
import {Dialog} from './prototypes/Dialog';

function App() {
  const canvas = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [pixelRatio, setPixelRatio] = useState(0);

  const delay = 300;
  let timer = null;

  const stageWidth = document.body.clientWidth;
  const stageHeight = document.body.clientHeight;

  const mousePos = new Point();
  let curItem = null;

  let items = [];
  let total = 1;

  const resize = ()=>{
    clearTimeout(timer);
    timer = setTimeout(()=>{
      canvas.width = stageWidth * pixelRatio;
      canvas.height = stageHeight * pixelRatio;
      ctx.scale(pixelRatio, pixelRatio);
    }, delay)

    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 6;
    ctx.shadowColor = `rgba(0,0,0,0.1)`

    ctx.lineWidth = 2;

    for(let i=0; i< items.length; i++) {
      items[i].resize(stageWidth, stageHeight)
    }
  }

  const animate = ()=>{
    window.requestAnimationFrame(animate);
    ctx.clearRect(0,0,stageWidth, stageHeight);

    for(let i=0; i< items.length; i++) {
      items[i].animate(ctx);
    }
  }

  const onDown = (e)=>{
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;

    for(let i= items.length-1; i>=0; i--) {
      const item = items[i].down(mousePos.clone());
      if(item){
        curItem = item;
        const index = items.indexOf(item);
        items.push(items.splice(index, 1)[0]);
        break;
      }
    }
  }

  const onMove = (e)=>{
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;

    for(let i=0; i<items.length; i++){
      items[i].move(mousePos.clone());
    }
  }

  const onUp = (e)=>{
    curItem = null;

    for(let i=0; i<items.length; i++){
      items[i].up();
    }
  }

  useEffect(() => {
    const context = canvas.current.getContext('2d');
    setCtx(context);
    setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)
  },[]);

  useEffect(()=>{
    if(ctx !== null && pixelRatio !== 0) {
      window.addEventListener('resize', resize, false);
      resize();
      window.requestAnimationFrame(animate);

      document.addEventListener('pointerdown', onDown, false);
      document.addEventListener('pointermove', onMove, false);
      document.addEventListener('pointerup', onUp, false);

      for(let i=0; i<total; i++){
        items[i] = new Dialog();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx, pixelRatio])

  return (
    <div className="App">
      <canvas ref={canvas} style={{border:'red solid'}}></canvas>
    </div>
  );
}

export default App;
