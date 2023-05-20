import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import styled from "styled-components"
import './App.css';

function App() {
  const canvas = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [pixelRatio, setPixelRatio] = useState(0);

  const delay = 300;
  let timer = null;

  const resize = ()=>{
    clearTimeout(timer);
    timer = setTimeout(()=>{
      const stageWidth = document.body.clientWidth;
      const stageHeight = document.body.clientHeight;

      canvas.width = stageWidth * pixelRatio;
      canvas.height = stageHeight * pixelRatio;
      ctx.scale(pixelRatio, pixelRatio);
    }, delay)
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
