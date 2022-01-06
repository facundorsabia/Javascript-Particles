const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
/*You can see all methods for 2d Canvas in console*/ 
console.log(ctx);
/*Then*/ 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
const numberOfParticles = 300;

//measure title element
let titleElement = document.getElementById('title1');
let titleMeasurements = titleElement.getBoundingClientRect();
let title = {
  x: titleMeasurements.left,
  y: titleMeasurements.top,
  width: titleMeasurements.width,
  height: 10
}

class Particle{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.size = Math.random() * 15 + 1;
    this.weight = Math.random() * 1 + 1;
    this.directionX = (Math.random() * 2) - 1;
  }
  update(){
    if(this.y > canvas.height){ 
       this.y = 0 - this.size;
       this.weight = Math.random() * 1 + 1;
       this.x = Math.random() * canvas.width * 1.3;
    }   
    this.weight += 0.01;
    this.y += this.weight;
    this.x += this.directionX;

    //check for collision between wach particle and title element
    if(
      this.x < title.x + title.width &&
      this.x + this.size > title.x &&
      this.y < title.y + title.height &&
      this.y + this.size > title.y
    ){
      //bouncing effect 
      this.y -= 3;
      this.weight *= -0.8;
    }
  }
  draw(){
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}
function init(){
  particlesArray = [];
  for (let i = 0; i< numberOfParticles; i++){
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    particlesArray.push(new Particle(x, y));
  }
}

init();


function animate(){
  ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i< particlesArray.length; i++){
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  titleMeasurements = titleElement.getBoundingClientRect();
  title = {
    x: titleMeasurements.left,
    y: titleMeasurements.top,
    width: titleMeasurements.width,
    height: 10
  }
  init();
})
