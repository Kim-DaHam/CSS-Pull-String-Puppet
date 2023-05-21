import { useRef, useState, useEffect, useMemo, useCallback } from 'react';

function Point(x, y) {
    const [pointX, setPointX] = useState(x || 0);
    const [pointY, setPointY] = useState(y || 0);

    const add = (point)=>{
        setPointX(pointX + point.x);
        setPointY(pointY + point.y);
    }

    const subtract = (point)=>{
        setPointX(pointX - point.x);
        setPointY(pointY - point.y);
    }

    const reduce = (value)=>{
        setPointX(pointX * value);
        setPointY(pointY * value);
    }

    const collide = (point, width, height)=>{
        if(pointX >= point.x &&
            pointX <= point.x + width &&
            pointY >= point.y &&
            pointY <= point.y + height) return true
        else return false;
    }

    return (
        <div>

        </div>
    )
}

export default Point