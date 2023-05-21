import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import styled from "styled-components"
import './App.css';

function App() {
  const canvas = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [pixelRatio, setPixelRatio] = useState(0);

  const delay = 300;
  let timer = null;
  const stageWidth = document.body.clientWidth;
  const stageHeight = document.body.clientHeight;

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
