class Nube {
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
      ctx.arc(x-75, y+25, 30, 0, Math.PI * 2, false);//1
      ctx.fillStyle = 'rgb(128, 128, 128)';
      ctx.fill();
     
      ctx.beginPath();
      ctx.arc(x -18, y+20,45, 0, Math.PI * 2, false);//2 arriba
      ctx.fillStyle ='rgb(128, 128, 128)';
      ctx.fill();
     
      ctx.beginPath();
      ctx.arc(x +30, y+50, 40, 0, Math.PI * 2, false);//3
      ctx.fillStyle = 'rgb(128, 128, 128)';
      ctx.fill();
     
      ctx.beginPath();
      ctx.arc(x -30, y +75, 40, 0, Math.PI * 2, false);//4 abajo der
      ctx.fillStyle ='rgb(128, 128, 128)';
      ctx.fill();
     
      ctx.beginPath();
      ctx.arc(x -95, y + 60,35, 0, Math.PI * 2, false);//5 iq abajo
      ctx.fillStyle = 'rgb(128, 128, 128)';
      ctx.fill();
     
      ctx.beginPath();
      ctx.arc(x -60, y + 60, 25, 0, Math.PI * 2, false);//5 iq abajo
      ctx.fillStyle = 'rgb(128, 128, 128)';
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
var yellowCircleSize = 28;


var flower = new Flower(centerX, centerY, petalCount, petalSize, stemHeight, yellowCircleSize );
flower.draw();

// Crea una instancia de Sun y dibújala en el canvas
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var radius = 75;

var sun = new Sun(centerX, centerY, radius);
sun.draw();
// posicion general nube
var x = canvas.width - 175;
var y = 80;



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
var nubeRadius = 80;
var nube = new Nube(centerX, centerY, nubeRadius);

// Bandera para controlar la visibilidad de la nube
var nubeVisible = false;

// Bandera para controlar si está lloviendo
var isRaining = false;

// Arreglo para almacenar las gotas de lluvia
var raindrops = [];

// Agrega un evento de clic al canvas
canvas.addEventListener("click", function(event) {
  var x = event.clientX;
  var y = event.clientY;

  // Verifica si se hizo clic dentro del sol
  if (isInsideCircle(x, y, sun.centerX, sun.centerY, sun.radius)) {
    // Inicia la animación de transición del sol a la luna
    startRain();
    animateTransition();
  } else if (isInsideCircle(x, y, nube.centerX, nube.centerY, nube.radius)) {
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
 
    if (nubeVisible) {
      // Si la luna está visible, dibuja la luna con el radio actual
      nube.radius = nubeRadius;
      nube.draw();
      isRaining= false;
    } 
    else {
      // Si la luna no está visible, dibuja el sol con el radio actual
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      sun.radius = sunRadius;
      sun.draw();
      isRaining= true;
    }

    // Incrementa el paso actual
    currentStep++;

    // Verifica si se completó la animación
    if (currentStep > steps) {
      // Detiene la animación
      clearInterval(animationInterval);

      // Actualiza la visibilidad de la luna
      nubeVisible = !nubeVisible;

      // Reinicia el radio de la luna y el sol
      nube.radius = nubeRadius;
      sun.radius = sunRadius;

      // Dibuja el sol o la luna dependiendo de su visibilidad
      if (nubeVisible) {
        nube.visible = true;
        nube.draw();
      } else {
        nube.visible = false;
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
  flower.draw();
  sun.draw();
  nube.draw();

  // Actualizar la luna
  nube.update();

 // Dibujar las gotas de lluvia si está lloviendo
 if (isRaining) {
  drawRain();
}

  // Solicitar el siguiente cuadro de animación
  requestAnimationFrame(drawFrame);
}

// Iniciar la animación
drawFrame();
// Función para iniciar la lluvia
function startRain() {
  isRaining = true;

  // Generar gotas de lluvia aleatorias en la parte superior de la pantalla
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speed = Math.random() * 9 + 3; // Velocidad aleatoria de la gota de lluvia
    raindrops.push({ x, y, speed });
  }
}

// Función para dibujar las gotas de lluvia
function drawRain() {
  const ctx = canvas.getContext("2d");

  // Establecer el estilo de las gotas de lluvia
  ctx.fillStyle = "#3399FF";

  // Dibujar y actualizar la posición de cada gota de lluvia
  for (let i = 0; i < raindrops.length; i++) {
    const raindrop = raindrops[i];

    // Dibujar la gota de lluvia
    ctx.beginPath();
    ctx.arc(raindrop.x, raindrop.y, 2, 0, Math.PI * 2);
    ctx.fill();

    // Mover la gota de lluvia hacia abajo según su velocidad
    raindrop.y += raindrop.speed;

    // Si la gota de lluvia ha caído fuera de la pantalla, reubicarla en la parte superior
    if (raindrop.y > canvas.height) {
      raindrop.y = 0;
      raindrop.x = Math.random() * canvas.width;
    }
  }
}