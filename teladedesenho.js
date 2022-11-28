let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let altura = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
let largura = document.body.clientWidth

canvas.height = altura * 0.95
canvas.width = largura

const pincel = {
    ativo: false,
    movendo: false,
    pos: {
        x: 0,
        y: 0
    },
    posAnterior: null
}


function rabiscar(linha){
    ctx.lineWidth = 5
    ctx.beginPath();
    ctx.moveTo(linha.posAnterior.x,linha.posAnterior.y);
    ctx.lineTo(linha.pos.x,linha.pos.y);
    ctx.stroke();
}

canvas.onmousedown = ()=>{
    pincel.ativo = true;
};

canvas.onmouseup = ()=>{
    pincel.ativo = false;
};

canvas.onmousemove = (evento)=>{
   
    pincel.pos.x = evento.clientX - 9; 
    pincel.pos.y = evento.clientY - 9;
    pincel.movendo = true; 
}

canvas.addEventListener('touchstart',()=>{
    pincel.ativo = true;
})

canvas.addEventListener('touchend',()=>{
  pincel.ativo = false;  
})

canvas.addEventListener('touchmove',(evento)=>{
    evento.preventDefault()
    var toque = evento.changedTouches;
    pincel.pos.x = toque[0].pageX; 
    pincel.pos.y = toque[0].pageY;
    pincel.movendo = true; 
})

function desenhar(){
    if(pincel.ativo && pincel.movendo && pincel.posAnterior){
        rabiscar({pos: pincel.pos, posAnterior: pincel.posAnterior});
        pincel.movendo = false;
    }
    pincel.posAnterior = {x: pincel.pos.x, y: pincel.pos.y}
    setTimeout(desenhar,10);
}
desenhar()
