class Sun {
  constructor(centerX, centerY, radius) {
    this.centerX = centerX+590;
    this.centerY = centerY-190;
    this.radius = radius;
  }
  draw(){
    const ctx = canvas.getContext("2d");

    //dibujar sol
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 4);
    ctx.fillStyle = "yellow";
    ctx.fill();

    // Dibujar los rayos del sol
    ctx.lineWidth = 5;
    ctx.strokeStyle = "yellow";

    for (let i = 0; i < 8; i++) {
        const angle = (Math.PI / 4) * i;
        const startX = this.centerX + Math.cos(angle) * this.radius;
        const startY = this.centerY + Math.sin(angle) * this.radius;
        const endX = this.centerX + Math.cos(angle) * (this.radius + 40);
        const endY = this.centerY + Math.sin(angle) * (this.radius + 40);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
  }

}



// Definir la clase Flower
class Flower {
  constructor(centerX, centerY, petalCount, petalSize, stemHeight,yellowCircleSize) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.yellowCircleSize = yellowCircleSize;
    this.petalCount = petalCount;
    this.petalSize = petalSize;
    this.stemHeight = stemHeight;
    this.isAnimating = false;
    this.animationStartTime = null;
    this.animationDuration = 1000; // Duración de la animación en milisegundos
    this.originalCenterX = centerX;
    this.leaves = []; // Arreglo para almacenar las hojas
  }

  // Método para dibujar la flor y las hojas
  draw() {
    const ctx = canvas.getContext("2d");

    // Dibujar el fondo celeste
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar el paisaje verde en la parte inferior
    var landscapeHeight = canvas.height -606; // Ajusta este valor para cambiar la altura del paisaje
    ctx.fillStyle = "#00ff00"; // Verde diferente para el paisaje
    ctx.fillRect(0, canvas.height - landscapeHeight, canvas.width, landscapeHeight);

    // Dibujar el tallo
    ctx.beginPath();
    ctx.moveTo(this.centerX, canvas.height);
    ctx.lineTo(this.centerX, canvas.height - this.stemHeight+50);
    ctx.strokeStyle = "#008000"; // Verde diferente para el tallo
    ctx.lineWidth = 20;
    ctx.stroke();

    // Dibujar las hojas en el tallo
    const leafSize = this.stemHeight / 10; // Ajusta este valor para cambiar el tamaño de las hojas
    ctx.fillStyle = "#008000"; // Verde diferente para las hojas

    // Dibujar las hojas del tallo
    ctx.beginPath();
    ctx.ellipse(this.centerX - leafSize / 2, canvas.height - this.stemHeight + 110, leafSize * 2, leafSize / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(this.centerX + leafSize / 2, canvas.height - this.stemHeight + 110, leafSize * 2, leafSize / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Dibujar las hojas volando
    ctx.fillStyle = "#00ff00"; // Verde diferente para las hojas voladoras
    for (let leaf of this.leaves) {
      ctx.beginPath();
      ctx.ellipse(leaf.x, leaf.y, leaf.size * 2, leaf.size / 2, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Dibujar los pétalos
    const angleStep = (Math.PI * 2) / this.petalCount;
    const initialAngleOffset = Math.PI / 3.5; // Ajusta este valor para cambiar la orientación inicial de los pétalos

    for (let i = 0; i < this.petalCount; i++) {
      const angle = initialAngleOffset + i * angleStep;
      const x = this.centerX + Math.cos(angle) * this.petalSize;
      const y = canvas.height - this.stemHeight + Math.sin(angle) * this.petalSize;

      ctx.beginPath();
      ctx.arc(x, y, this.petalSize, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();
    }

    // Dibujar el centro de la flor
    ctx.beginPath();
    ctx.arc(this.centerX, canvas.height - this.stemHeight, this.petalSize, this.yellowCircleSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();

    // Dibujar los ojos
    const eyeSize = this.yellowCircleSize / 6; // Ajusta este valor para cambiar el tamaño de los ojos
    const eyeOffset = this.yellowCircleSize / 3; // Ajusta este valor para cambiar el espacio entre los ojos y el círculo amarillo

    // Ojo izquierdo
    ctx.beginPath();
    ctx.arc(this.centerX - eyeOffset, canvas.height - this.stemHeight, eyeSize, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();

    // Ojo derecho
    ctx.beginPath();
    ctx.arc(this.centerX + eyeOffset, canvas.height - this.stemHeight, eyeSize, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();

    // Dibujar la sonrisa
    const smileRadius = this.yellowCircleSize / 2; // Ajusta este valor para cambiar el tamaño de la sonrisa
    const smileStartAngle = Math.PI / 4; // Ajusta este valor para cambiar el ángulo inicial de la sonrisa
    const smileEndAngle = (Math.PI * 3) / 4; // Ajusta este valor para cambiar el ángulo final de la sonrisa

    ctx.beginPath();
    ctx.arc(this.centerX, canvas.height - this.stemHeight + eyeSize, smileRadius, smileStartAngle, smileEndAngle);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();



  }
  // Método para generar las hojas volando
  generateLeaves() {
    const leafCount = 0; // Cantidad de hojas volando
    const minSize = 5;
    const maxSize = 10;

    for (let i = 0; i < leafCount; i++) {
      const x = Math.random() * canvas.width; // Coordenada x aleatoria en toda la pantalla
      const y = Math.random() * canvas.height; // Coordenada y aleatoria en toda la pantalla
      const size = Math.random() * (maxSize - minSize) + minSize;

      this.leaves.push({ x, y, size });
    }
  }

  // Método para animar la flor
  animate() {
    if (this.isAnimating) {
      return;
    }

    this.isAnimating = true;
    this.animationStartTime = performance.now();

    const animateStep = (timestamp) => {
      const elapsedTime = timestamp - this.animationStartTime;
      const progress = Math.min(elapsedTime / this.animationDuration, 1);
      const angle = progress * Math.PI * 2;
      const amplitude = 5; // Ajusta este valor para cambiar la amplitud del movimiento

      this.centerX = this.originalCenterX + Math.sin(angle) * amplitude;
      this.draw();

      if (progress < 1) {
        // Continuar animando
        sun.draw();
        requestAnimationFrame(animateStep);
      } else {
        // La animación ha finalizado
        sun.draw();
        this.isAnimating = false;
        this.centerX = this.originalCenterX; // Restaurar la posición original
      }
    };

    // Iniciar la animación
    requestAnimationFrame(animateStep);
  }
}
// Obtén el elemento canvas del DOM
var canvas = document.getElementById("miCanvas");
canvas.width = window.innerWidth-17;
canvas.height = window.innerHeight-120;

// Crea una instancia de Flower y dibújala en el canvas
var centerX = canvas.width / 2;
var centerY = canvas.height;
var stemHeight = canvas.height / 4;
var petalCount = 5;
var petalSize = 40;
var yellowCircleSize = 29;

var flower = new Flower(centerX, centerY, petalCount, petalSize, stemHeight, yellowCircleSize);
flower.draw();

// Crea una instancia de Sun y dibújala en el canvas
var centerXSun = canvas.width / 2;
var centerYSun = canvas.height / 2;
var radius = 75;

var sun = new Sun(centerXSun, centerYSun, radius);
sun.draw();


// Manejador de evento para iniciar la animación al hacer clic sobre la flor
canvas.addEventListener("click", function () {
  if (!flower.isAnimating) {
    flower.animate();
  }
});this.yellowCircleSize 
