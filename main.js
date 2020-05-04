var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

autoSetCanvasSize();
listenToUser();


var eraserEnabled = false;
eraser.onclick = function(e){
    eraserEnabled = true;
    actions.className = "actions x";
}

brush.onclick = function(e){
    eraserEnabled = false;
    actions.className = "actions"
}


function autoSetCanvasSize(){
    setCanvasSize();

    function setCanvasSize(){
        var width = document.documentElement.clientWidth;
        var height = document.documentElement.clientHeight;
        
        canvas.width = width;
        canvas.height = height;
    }
    
    window.onresize = function(){
        setCanvasSize();
    }
}


function listenToUser(){
    var useing = false;
    var lastPoint = {"x": undefined , "y": undefined }


    //*** 特性检测 */
    // 判断设备支持触摸事件决定使用API
    // 判断 ontouchstart 的值 undefined 不支持  null支持
    // 'ontouchstar' in document.documentElement 是false 还有true
    if(document.body.ontouchstart !== undefined && document.body.ontouchstart === null){
        canvas.ontouchstart = function(e){
            useing = true;
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
        
            lastPoint = {"x": x , "y": y};
        
            // drawPoint(x,y);
        
            if(eraserEnabled){
                ctx.clearRect(x-5, y-5, 10, 10);
            }
        }

        canvas.ontouchmove = function(e){
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            var newPoint = {"x":x, "y":y}
        
            if(!useing){ return }
        
            if(eraserEnabled){
                ctx.clearRect(x-5, y-5, 10 ,10)
            }else{
                // drawPoint(x,y);
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint;
            }
        }

        canvas.ontouchend = function(e){
            console.log('end')
        }
    }else{

        canvas.onmousedown = function(e){
            useing = true;
            var x = e.clientX;
            var y = e.clientY;
        
            lastPoint = {"x": x , "y": y};
        
            // drawPoint(x,y);
        
            if(eraserEnabled){
                ctx.clearRect(x-5, y-5, 10, 10);
            }
        
        }
        
        canvas.onmousemove = function(e){
            var x = e.clientX;
            var y = e.clientY;
            var newPoint = {"x":x, "y":y}
        
            if(!useing){ return }
        
            if(eraserEnabled){
                ctx.clearRect(x-5, y-5, 10 ,10)
            }else{
                // drawPoint(x,y);
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint;
            }
        
        }
        
        canvas.onmouseup = function(e){
            useing = false;
        }

    }
    
    function drawPoint(x, y){
        ctx.beginPath();
        ctx.arc(x, y, 10, 10, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    function drawLine(x1, y1, x2 ,y2){
        ctx.beginPath();
        ctx.moveTo(x2,y2);
        ctx.lineTo(x1, y1, x2, y2);
        ctx.stroke();
        ctx.closePath();
    }
}

