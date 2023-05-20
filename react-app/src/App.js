import { useRef, useState, useEffect } from 'react';
import styled from "styled-components"
import './App.css';

const Canvas = styled.canvas`
  width: 500px;
  height: 500px;
  border: solid red;
`;

function App() {
  const canvas = useRef(null);
  const [ctx, setCtx] = useState();

  useEffect(() => {
    const context = canvas.current.getContext('2d');
    setCtx(context);
  });


  return (
    <div className="App">
      <Canvas ref={canvas}></Canvas>
    </div>
  );
}

export default App;
