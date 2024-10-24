const verticesCount = 300;
const angleFraction = Math.PI*2/verticesCount;
class Drop{

    constructor(x,y,r,color){
      this.center = new Vector2(x,y);
      this.r = r;

      this.vertices = [];

      for(let i=0;i<verticesCount;i++){
        let angle = angleFraction * i;
        let newX = this.r * Math.cos(angle) + this.center.x;
        let newY = this.r * Math.sin(angle) + this.center.y;
        this.vertices.push(new Vector2(newX,newY))
      }
      this.color = color;
    }

    setCirclePosition(x,y){
      this.center.set(x,y);
      this.vertices =[];
      for(let i=0;i<verticesCount;i++){
        let angle = angleFraction * i;
        let newX = this.r * Math.cos(angle) + this.center.x;
        let newY = this.r * Math.sin(angle) + this.center.y;
        this.vertices.push(new Vector2(newX,newY))
      }
    }

    draw(){
      ctx.beginPath();
      let region = new Path2D();
      region.moveTo(this.vertices[0].x, this.vertices[0].y);
      for (let i = 0; i < this.vertices.length; i++) {
        const currentVertex = this.vertices[i];
        const nextVertex = this.vertices[(i + 1) % this.vertices.length];
        ctx.lineTo(nextVertex.x, nextVertex.y);
      }
      region.closePath(); 
      ctx.fillStyle = this.color;
      ctx.fill();             
    }

    update(other){
      for(let v of other.vertices){
        let c = this.center;
        let r = this.r;
        let p = v.copy();
        p.subtract(c);
        let magnitude = p.magnitude();
        let root = Math.sqrt(1 + (r * r) / (magnitude * magnitude) );
        p = p.scale(root);
        p = p.add(c);
        v.set(p.x,p.y);
      }
    }

    tine(vect,x,y,z,c){
      let u = 1/Math.pow(2,1/c);
      let b = new Vector2(x,y);
      for(let v of this.vertices){
        let pb = v.copy().subtract(b);
        let n = vect.rotate(90);
        let d = Math.abs(Vector2.dotProduct(pb,n));
        let mag = z*Math.pow(u,d);
        v.add(vect.copy().scale(mag))
      }
    }

}


function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256); 
  const b = Math.floor(Math.random() * 256); 
  return `rgb(${r}, ${g}, ${b})`;
}