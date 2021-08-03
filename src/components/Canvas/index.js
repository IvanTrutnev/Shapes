import React, { useRef, useEffect, useState, useCallback } from 'react'

import Point from '../../Point';

const Canvas = props => {
  const [clicks, setClicks] = useState(0);
  const [points, setPoints] = useState([]);
  const [context, setContext] = useState(null);
  const [isReadyForCreateFigure, setIsReadyForCreatrFigure] = useState(false);
  const [dragableElem, setDragableElem] = useState(null);

  const canvasRef = useRef(null);

  const drawPoint = useCallback((point) => {
    context.beginPath();
    context.arc(point.x, point.y, 11, 0, 2 * Math.PI);
    context.fillStyle = "red";
    context.strokeText(`x: ${point.x}, y: ${point.y}`, point.x, point.y - 20);
    context.fill();
  }, [context]);

  const drawPoints = useCallback(() => {
    for (let i = 0; i < points.length - 1; i++) {
      drawPoint(points[i]);
    }
  }, [drawPoint, points])

  const handleMouseDown = (e) => {
    setClicks((prev) => prev + 1);
    if (!isReadyForCreateFigure) {
      const point = new Point(e.clientX, e.nativeEvent.layerY);
      drawPoint(point);

      setPoints([...points, point]);
    } else {
      const mouse = onMousePos(e);
      for (let i = 0; i < points.length - 1; i++) {
        const point = points[i];
        drawPoint(point);
        if (context.isPointInPath(mouse.x, mouse.y) && i !== 4) {
          setDragableElem(i);
          break;
        }
      }
    }
  }

  const getFourthPoint = useCallback(() => {
    if (points.length === 3) {
      const point4X = points[2].x - points[1].x + points[0].x;
      const point4Y = points[2].y - points[1].y + points[0].y;
      const centerPoint = new Point(point4X, point4Y);
      drawPoint(centerPoint);
      setPoints([...points, centerPoint]);
    }

  }, [points, drawPoint]);

  const getMassCenter = useCallback(() => {
    const massCenterX = (points[0].x + points[2].x) / 2;
    const massCenterY = (points[0].y + points[2].y) / 2;

    if (points.length === 4) {
      setPoints([...points, new Point(massCenterX, massCenterY)]);
    } else if (points.length === 5) {
      const newPoints = points.map((p, i) => {
        if (i === points.length - 1) {
          return new Point(massCenterX, massCenterY);
        }
        return p;
      });
      setPoints(newPoints);
    }
  }, [points]);


  const drawParallelogramAndCircle = useCallback(() => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i++) {
      context.lineTo(points[i].x, points[i].y);

      if (i === 3) {
        context.lineTo(points[0].x, points[0].y);
      }
    }

    context.strokeStyle = "blue";
    context.closePath();
    context.stroke();

    context.beginPath();

    context.arc(points[4].x, points[4].y, 11, 0, 2 * Math.PI);
    context.strokeStyle = "green";
    context.strokeText(`x: ${points[4].x}, y: ${points[4].y}`, points[4].x, points[4].y - 20);
    context.closePath();
    context.fill();

    drawPoints();
  }, [points, context, drawPoints]);

  const onMouseUp = () => {
    setDragableElem(null);
    if (points.length > 4) {
      getMassCenter();
    }

    drawPoints();
  }

  const onMouseMove = (e) => {
    if (isReadyForCreateFigure && typeof dragableElem === 'number') {
      const mouse = onMousePos(e);
      const newPoints = points.map((point, i) => {
        if (i === dragableElem) {
          point.x = mouse.x;
          point.y = mouse.y;
          return {
            x: mouse.x,
            y: mouse.y
          }
        }
        return point;
      })
      setPoints(newPoints);
    }
  }

  const onMousePos = (evt) => {
    var ClientRect = canvasRef.current.getBoundingClientRect();
    return {
      x: Math.round(evt.clientX - ClientRect.left),
      y: Math.round(evt.clientY - ClientRect.top)
    };
  }

  const handleMouseClick = () => {
    setDragableElem(null);
  }

  const handleReset = () => {
    setPoints([]);
    setClicks(0);
    setIsReadyForCreatrFigure(false);
    setDragableElem(null);
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  useEffect(() => {
    if (clicks === 3) {
      setIsReadyForCreatrFigure(true)
    }
  }, [clicks])

  useEffect(() => {
    if (isReadyForCreateFigure) {
      getFourthPoint();
    }
  }, [isReadyForCreateFigure, getFourthPoint]);


  useEffect(() => {
    if (points.length === 4) {
      getMassCenter();
    }
    if (points.length === 5) {
      drawParallelogramAndCircle()
    }
  }, [points, getMassCenter, drawParallelogramAndCircle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext('2d')
    setContext(context);
    context.fillStyle = '#fff'
    context.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  return (
    <>
      {<button onClick={handleReset}>Reset canvas</button>}
      <canvas
        ref={canvasRef}
        {...props}
        onMouseDown={handleMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onClick={handleMouseClick}
      />
    </>
  )
}

export default Canvas
