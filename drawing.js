const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

let drops = [];
let clicked = false;
let start;
let end;
let color;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function tineline(vect,xl,yl,z,c){
   for(drop of drops){  
      drop.tine(vect,xl,yl,z,c);
   }
}

function redraw(){
   ctx.clearRect(0,0,canvas.width,canvas.height);
   for(drop of drops){
      console.log(drop.color);
      drop.draw();
   }
}

canvas.addEventListener("mousemove",(event)=>{
   if(clicked){
      let drop =new Drop(event.x,event.y,30,color);
      if(drops.length > 0){
         for(let other of drops ){
            drop.update(other);
         }
      }
      if(drops.length>100){
         drops.shift();
      }
      drops.push(drop);
      // end = new Vector2(event.x,event.y);
      // end.subtract(start);
      // end = end.normalize();
      // tineline(end,event.x,event.y,50,16);
      redraw();
   }
   start = new Vector2(event.x,event.y);
})

canvas.addEventListener("mousedown",(event)=>{
   clicked =true;
   color = getRandomColor();
   start = new Vector2(event.x,event.y);
})

canvas.addEventListener("mouseup",(event)=>{
   clicked =false;
})

function drawRandomDrops(){
   let x = Math.floor(Math.random() * 1300);
   let y = Math.floor(Math.random() * 1000);
   let drop =new Drop(x,y,100);
   if(drops.length > 0){
      for(let other of drops ){
         drop.update(other);
      }
   }
   drops.push(drop);
}

function getRandomColor() {
   const r = Math.floor(Math.random() * 256);
   const g = Math.floor(Math.random() * 256); 
   const b = Math.floor(Math.random() * 256); 
   return `rgb(${r}, ${g}, ${b})`;
 }

