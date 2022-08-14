import { Injectable } from '@angular/core';
import { Point } from '../models/realtime-models/draw-point';

export type LineDrawing = {
  fromx: number;
  fromy: number;
  tox: number;
  toy: number;
};

@Injectable({
  providedIn: 'root',
})
export class DrawService {
  constructor() {}

  line(context: CanvasRenderingContext2D, lineData: LineDrawing) {
    context.beginPath();
    context.moveTo(lineData.fromx, lineData.fromy);
    context.lineTo(lineData.tox, lineData.toy);
    context.stroke();
    context.closePath();
  }

  dot(context: CanvasRenderingContext2D, pointData: Point) {
    context.beginPath();
    context.fillStyle = '#000000';
    context.arc(pointData.x, pointData.y, 1, 0, Math.PI * 2, true);
    context.fill();
    context.stroke();
    context.closePath();
  }
}
