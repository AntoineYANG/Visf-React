import { Canvas } from './Visf';

export default function Main(): void {
    var canvas = new Canvas(600, 400, 'canvas');
    canvas.renderThis(document.getElementById('root'));
    canvas.fillStyle('rgb(200,0,0)');
    canvas.fillRect(10, 10, 55, 50);
    canvas.fillStyle('rgba(0, 0, 200, 0.5)');
    canvas.fillRect(30, 30, 55, 50);
    canvas.clearRect(25, 25, 45, 40);

    canvas.openPolyline(0, 0, 10, 20, 30, 50, 50, 50, 100, 90, 300, 150, 600, 400);

    canvas.loadFillStyle(-1);
    canvas.fillInside(200, 100, 400, 300, 100, 300);
}
