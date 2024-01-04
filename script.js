const canvas = document.getElementById('grenada-flag');
const context = canvas.getContext('2d', { willReadFrequently: true });
const rotation = Math.PI/2;

//Color filling algorithm
function floodFill(x, y, newColor, targetColor) {
console.log(x, y, newColor, targetColor);
const stack = [];
const initialColor = context.getImageData(x, y, 1, 1).data;

if (
    initialColor[0] === newColor[0] &&
    initialColor[1] === newColor[1] &&
    initialColor[2] === newColor[2]
) {
    return;
}

stack.push({ x, y });

while (stack.length) {
    const { x, y } = stack.pop();
    const pixel = context.getImageData(x, y, 1, 1).data;

    if (
    x >= 0 &&
    y >= 0 &&
    x < canvas.width &&
    y < canvas.height &&
    pixel[0] === targetColor[0] &&
    pixel[1] === targetColor[1] &&
    pixel[2] === targetColor[2] &&
    pixel[3] === targetColor[3]
    ) {
    context.fillStyle = newColor;
    context.fillRect(x, y, 1, 1);
    stack.push({ x: x + 1, y });
    stack.push({ x: x - 1, y });
    stack.push({ x, y: y + 1 });
    stack.push({ x, y: y - 1 });
    }
}
}

//Circle drawing algorithm
function circle(centerX, centerY, radius) {
    let x = 0;
    let y = radius;
    let d = 3 - 2 * radius;
    const points = [];
    while (x <= y) {
    points.push(
        { x: centerX + x, y: centerY + y },
        { x: centerX + y, y: centerY + x },
        { x: centerX - y, y: centerY + x },
        { x: centerX - x, y: centerY + y },
        { x: centerX - x, y: centerY - y },
        { x: centerX - y, y: centerY - x },
        { x: centerX + y, y: centerY - x },
        { x: centerX + x, y: centerY - y }
    );
    x++;
    if (d < 0) {
        d += 4 * x + 6;
    } else {
        d += 4 * (x - y) + 10;
        y--;
    }
    }
    points.map((point)=> context.fillRect(point.x, point.y,1,1))
}

//Line drawing algorithm
function drawLineDDA(x1, y1, x2, y2, color) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    const xIncrement = dx / steps;
    const yIncrement = dy / steps;
    let x = x1;
    let y = y1;
    for (let i = 0; i <= steps; i++) {
    context.fillRect(Math.round(x), Math.round(y), 1, 1);
    x += xIncrement;
    y += yIncrement;
    }
}

//Rectangle drawing algorithm
function rectangle(x1,y1,x2,y2){
    drawLineDDA(x1,y1,x1,y2)
    drawLineDDA(x2,y1,x2,y2)
    drawLineDDA(x1,y1,x2,y1)
    drawLineDDA(x1,y2,x2,y2)
}

//Inclined line drawing algorithm
function incline(x1,y1,x2,y2){
    drawLineDDA(x1,y1+1,x2-1,y2)
    drawLineDDA(x1+1,y1,x2,y2-1)
    drawLineDDA(x2-1,y1,x1,y2-1)
    drawLineDDA(x2,y1+1,x1+1,y2)
}

//Star drawing algorithm
function star(centerX, centerY, outerRadius, innerRadius, angle){
    const angleIncrement = Math.PI / 2.5; // 60 degrees in radians

      let firstPointX = centerX + Math.cos(0 + angle) * innerRadius;
      let firstPointY = centerY + Math.sin(0 + angle) * innerRadius;

    for (let i = 0; i < 5; i++) {
        let outerX = centerX + Math.cos(i * angleIncrement + angle) * innerRadius;
        let outerY = centerY + Math.sin(i * angleIncrement + angle) * innerRadius;
        let innerX = centerX + Math.cos((i + 0.5) * angleIncrement + angle) * outerRadius;
        let innerY = centerY + Math.sin((i + 0.5) * angleIncrement + angle) * outerRadius;
        if (i==0){
            drawLineDDA(firstPointX, firstPointY,outerX, outerY)
            drawLineDDA(outerX, outerY,innerX, innerY);
        }else{
            drawLineDDA(x, y,outerX, outerY);
            drawLineDDA(outerX, outerY,innerX, innerY);
        }
        x = innerX, y= innerY;
    }
    drawLineDDA(x,y,firstPointX, firstPointY);
}

//Color for a specific place
function color(x,y,color){
    const initialColor = context.getImageData(x, y, 1, 1).data;
    floodFill(x,y,color,initialColor)
}

//Calling and passing to the functions
rectangle(50,50,600,350)
context.fillStyle = "#EF3340";
circle(330,200,50)
color(300,200,"#EF3340")
incline(50,50,600,350)
color(70,80,"#009739")
color(470,200,"#009739")
color(70,345,"#FFD100")
color(70,55,"#FFD100")

// //Drawing the stars
context.fillStyle = "#009739";
star(330,199,50,20,rotation)
color(330,199,"#FFD100")

// Lower Star
context.fillStyle = "#FFD100";
star(330, 375, 15, 7, rotation);
color(330, 375, "#FFD100");

context.fillStyle = "#FFD100";
star(480, 375, 15, 7, rotation);
color(480, 375, "#FFD100");

context.fillStyle = "#FFD100";
star(180, 375, 15, 7, rotation);
color(180, 375, "#FFD100");

//  Upper Stars
context.fillStyle = "#FFD100";
star(330, 25, 15, 7, rotation);
color(330, 25, "#FFD100");

context.fillStyle = "#FFD100";
star(480, 25, 15, 7, rotation);
color(480, 25, "#FFD100");

context.fillStyle = "#FFD100";
star(180, 25, 15, 7, rotation);
color(180, 25, "#FFD100");
color(1,1,"#EF3340")                                                       