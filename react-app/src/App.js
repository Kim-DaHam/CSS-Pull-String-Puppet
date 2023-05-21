import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import styled from "styled-components"
import './App.css';

import {Point} from './prototypes/Point';

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

  const resize = ()=>{
    clearTimeout(timer);
    timer = setTimeout(()=>{
      canvas.width = stageWidth * pixelRatio;
      canvas.height = stageHeight * pixelRatio;
      ctx.scale(pixelRatio, pixelRatio);
    }, delay)
  }

  const animate = ()=>{
    window.requestAnimationFrame(animate);
    ctx.clearRect(0,0,stageWidth, stageHeight);
  }

  const onDown = (e)=>{
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  }

  const onMove = (e)=>{
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  }

  const onUp = (e)=>{

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
