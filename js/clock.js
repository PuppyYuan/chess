var clockWidth = window.innerWidth;
var clockHeight = window.innerHeight;
var clock = document.getElementById('clock');
var context = clock.getContext('2d');
var RADIUS = 8;
var offX = clockWidth / 2 - 850 / 2;
var offY = 200;
var time = new Date();
var balls = [];

const colors = ['#FF0000', '#FF6A6A', '#EEEE00', '#EE00EE', '#4876FF', '#9F79EE', '#698B22'];

clock.width = clockWidth;
clock.height = clockHeight;

function render(ctx) {
    
    ctx.clearRect(0, 0, clockWidth, clockHeight);

    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    
    renderDigit(offX, offY, parseInt(hours / 10), ctx);
    renderDigit(offX + 15 * RADIUS + 1, offY, parseInt(hours % 10), ctx);
    renderDigit(offX + 30 * RADIUS + 1, offY, 10, ctx);
    renderDigit(offX + 38 * RADIUS + 1, offY, parseInt(minutes / 10), ctx);
    renderDigit(offX + 53 * RADIUS + 1, offY, parseInt(minutes % 10), ctx);
    renderDigit(offX + 68 * RADIUS + 1, offY, 10, ctx);
    renderDigit(offX + 76 * RADIUS + 1, offY, parseInt(seconds / 10), ctx);
    renderDigit(offX + 91 * RADIUS + 1, offY, parseInt(seconds % 10), ctx);
    
    for(var i = 0; i < balls.length; i++){
        ctx.fillStyle = balls[i].color;
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, balls[i].r, 0, 2 * Math.PI ); 
        ctx.fill();
    }
}

function renderDigit(x, y, num, ctx) {
    for(var i = 0; i < digit[num].length; i++){
        for(var j = 0; j < digit[num][i].length; j++){
            if(digit[num][i][j] == 1){
               context.fillStyle = '#4876FF';
               ctx.beginPath();
               ctx.arc(x + (2 * j + 1) * RADIUS, y + (2 * i + 1) * RADIUS, RADIUS, 0, 2 * Math.PI ); 
               ctx.fill();
            }
        }
    }
}

function update(){
    var curTime = new Date();
    var curHours = curTime.getHours();
    var curMinutes = curTime.getMinutes();
    var curSeconds = curTime.getSeconds();
    
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    
    if(curSeconds != seconds){
        if(parseInt(curHours / 10) != parseInt(hours / 10)){
            addBalls(offX, offY, parseInt(hours / 10));
        }
        
        if(parseInt(curHours % 10) != parseInt(curHours % 10)){
            addBalls(offX + 15 * RADIUS + 1, offY, parseInt(hours % 10));
        }
        
        if(parseInt(curMinutes / 10) != parseInt(minutes / 10)){
            addBalls(offX + 38 * RADIUS + 1, offY, parseInt(minutes / 10));
        }
        
        if(parseInt(curMinutes % 10) != parseInt(minutes % 10)){
            addBalls(offX + 53 * RADIUS + 1, offY, parseInt(minutes % 10));
        }
        
        if(parseInt(curSeconds / 10) != parseInt(seconds / 10)){
            addBalls(offX + 76 * RADIUS + 1, offY, parseInt(seconds / 10));
        }
        
        if(parseInt(curSeconds % 10) != parseInt(seconds % 10)){
            addBalls(offX + 91 * RADIUS + 1, offY, parseInt(seconds % 10));
        }
        
        time = curTime;
    }
    
    for(var i = 0; i < balls.length; i++){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        
        if(balls[i].y >= clockHeight -balls[i].r){
            balls[i].vy = - balls[i].vy * 3 / 4;
            balls[i].y = clockHeight - balls[i].r;
        }
    }
    
    var cnt = 0;
    for(var i = 0; i < balls.length; i++){
        // 判断小球是否出界
        if(balls[i].x < clockWidth - balls[i].r && balls[i].x > -balls[i].r){
            balls[cnt++] = balls[i];
        }
    }
    
    balls.splice(cnt, balls.length - cnt);
    
}

function addBalls(x, y, num){
    for(var i = 0; i < digit[num].length; i++){
        for(var j = 0; j < digit[num][i].length; j++){
            if(digit[num][i][j] == 1){
                var ball = {
                    x: x + (2 * j + 1) * RADIUS, 
                    y: y + (2 * i + 1) * RADIUS, 
                    r: RADIUS,
                    vx: Math.pow(-1, parseInt(Math.random() * 1000)) * (Math.random() * 8 + 1), 
                    vy: -10, 
                    g: Math.random() * 2 + 1,
                    color: colors[parseInt(Math.random() * 7)]
                }
                
                balls.push(ball);
            }
        }
    }
}

setInterval(function(){
    render(context);
    update();
}, 50);