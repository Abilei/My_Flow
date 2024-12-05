class Moon {
  constructor(centerX, centerY, radius) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.visible = false;
    this.opacity = 0;
    this.fadeInSpeed = 0.05;
    this.fadeOutSpeed = 0.02;
  }

  draw() {
    if (this.visible) {
      const ctx = canvas.getContext("2d");
    // Dibujar el fondo celeste
    ctx.fillStyle = "skyblue";
    ctx.fillRect(1230, 0,300,300);

      // Dibujar media luna
      ctx.beginPath();
      ctx.arc(this.centerX+560, this.centerY-190, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = "blue";
      ctx.fill();

      // Dibujar parte oscura de la luna
      ctx.beginPath();
      ctx.arc(
        this.centerX+560 - this.radius * 0.5,
        this.centerY-195,
        this.radius,
        0,
        Math.PI * 2,
        false
      );
      ctx.fillStyle = "skyblue";
      ctx.fill();
    }
  }

  update() {
    if (this.visible && this.opacity < 1) {
      this.opacity += this.fadeInSpeed;
    } else if (!this.visible && this.opacity > 0) {
      this.opacity -= this.fadeOutSpeed;
    }
  }
}

class Sun {
  constructor(centerX, centerY, radius) {
    this.centerX = centerX+590;
    this.centerY = centerY-190;
    this.radius = radius;
    this.visible = true;
  }

  draw() {
    if (this.visible) {
      const ctx = canvas.getContext("2d");


      // Dibujar sol
      ctx.beginPath();
      ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "yellow";
      ctx.fill();

      // Dibujar los rayos del sol
      ctx.lineWidth = 5;
      ctx.strokeStyle = "yellow";

      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI / 4) * i;
        const startX = this.centerX+ Math.cos(angle) * this.radius;
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
    var landscapeHeight = canvas.height  -606; // Ajusta este valor para cambiar la altura del paisaje
    ctx.fillStyle = "#00ff00"; // Verde diferente para el paisaje
    ctx.fillRect(0, canvas.height - landscapeHeight, canvas.width, landscapeHeight);

    // Dibujar el tallo
    ctx.beginPath();
    ctx.moveTo(this.centerX, canvas.height);
    ctx.lineTo(this.centerX, canvas.height - this.stemHeight);
    ctx.strokeStyle = "#008000"; // Verde diferente para el tallo
    ctx.lineWidth = 20;
    ctx.stroke();

    // Dibujar las hojas en el tallo
    const leafSize = this.stemHeight / 10; // Ajusta este valor para cambiar el tamaño de las hojas
    ctx.fillStyle = "#008000"; // Verde diferente para las hojas

    // Dibujar las hojas del tallo
    ctx.beginPath();
    ctx.ellipse(this.centerX - leafSize / 2, canvas.height - this.stemHeight+110 , leafSize * 2, leafSize / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(this.centerX + leafSize / 2, canvas.height - this.stemHeight +110, leafSize * 2, leafSize / 2, 0, 0, Math.PI * 2);
    ctx.fill();


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
  
// Método para animar la flor
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


animate() {
    if (this.isAnimating) {
      return;
    }
  
    this.isAnimating = true;
    this.animationStartTime = performance.now();
  
    this.generateLeaves();
  
    const animateStep = (timestamp) => {
      const elapsedTime = timestamp - this.animationStartTime;
      const progress = Math.min(elapsedTime / this.animationDuration, 1);
      const angle = progress * Math.PI * 2;
      const amplitude = 2; // Ajusta este valor para cambiar la amplitud del movimiento
      this.centerX = this.originalCenterX + Math.sin(angle) * amplitude;
      this.draw();
  
      if (progress < 1) {
        // Continuar animando
        requestAnimationFrame(animateStep);
      } else {
        // La animación ha finalizado
        this.isAnimating = false;
        this.centerX = this.originalCenterX; // Restaurar la posición original
  
        // Retrasar la eliminación
        setTimeout(() => {
          this.draw();
        },1); // Ajusta este valor para cambiar el tiempo de espera antes de eliminar las luna
  
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


var flower = new Flower(centerX, centerY, petalCount, petalSize, stemHeight, yellowCircleSize );
flower.draw();

// Crea una instancia de Sun y dibújala en el canvas
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var radius = 75;

var sun = new Sun(centerX, centerY, radius);
sun.draw();

// Manejador de evento para iniciar la animación al hacer clic sobre la flor
canvas.addEventListener("click", function () {
  if (!flower.isAnimating) {
    flower.animate();
  }
});this.yellowCircleSize 






// Crea una instancia de Sun y dibújala en el canvas
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var sunRadius = 75;
var sun = new Sun(centerX, centerY, sunRadius);

// Crea una instancia de Moon
var moonRadius = 80;
var moon = new Moon(centerX, centerY, moonRadius);

// Bandera para controlar la visibilidad de la luna
var moonVisible = false;

// Agrega un evento de clic al canvas
canvas.addEventListener("click", function(event) {
  var x = event.clientX;
  var y = event.clientY;

  // Verifica si se hizo clic dentro del sol
  if (isInsideCircle(x, y, sun.centerX, sun.centerY, sun.radius)) {
    // Inicia la animación de transición del sol a la luna

    animateTransition();
  } else if (isInsideCircle(x, y, moon.centerX, moon.centerY, moon.radius)) {
    // Inicia la animación de transición de la luna al sol
    animateTransition();
  }
});

// Función auxiliar para verificar si un punto está dentro de un círculo
function isInsideCircle(x, y, centerX, centerY, radius) {
  var distance = Math.sqrt((x - centerX-15) ** 2 + (y - centerY-90) ** 2);
  return distance <= radius;
}

// Función para animar la transición del sol a la luna y viceversa
function animateTransition() {
  // Define los pasos de la animación
  var steps = 30;
  var currentStep = 0;

  var animationInterval = setInterval(function() {

    if (moonVisible) {
      // Si la luna está visible, dibuja la luna con el radio actual
      moon.radius = moonRadius;
      moon.draw();
    } 
    else {
      // Si la luna no está visible, dibuja el sol con el radio actual
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      sun.radius = sunRadius;
      sun.draw();
    }

    // Incrementa el paso actual
    currentStep++;

    // Verifica si se completó la animación
    if (currentStep > steps) {
      // Detiene la animación
      clearInterval(animationInterval);

      // Actualiza la visibilidad de la luna
      moonVisible = !moonVisible;

      // Reinicia el radio de la luna y el sol
      moon.radius = moonRadius;
      sun.radius = sunRadius;

      // Dibuja el sol o la luna dependiendo de su visibilidad
      if (moonVisible) {
        moon.visible = true;
        moon.draw();
      } else {
        moon.visible = false;
        sun.draw();
      }
    }
  }, 5); // Intervalo de tiempo entre cada paso de la animación
}

// Función auxiliar para borrar el contenido del canvas
function clearCanvas() {
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Función para dibujar cada cuadro de la animación
function drawFrame() {

  // Dibujar Sol y Luna
  sun.draw();
  moon.draw();

  // Actualizar la luna
  moon.update();

  // Solicitar el siguiente cuadro de animación
  requestAnimationFrame(drawFrame);
}

// Iniciar la animación
drawFrame();
