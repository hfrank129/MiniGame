// Spielfeld
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Spieler
const player = {
    x: 180, y: 180,
    width: 40, height: 40,
    color: "blue",
    speed: 4
};

// Pfeiltasten
const keys = {
    ArrowUp: false, ArrowDown: false,
    ArrowLeft: false, ArrowRight: false
};

document.addEventListener("keydown", e => keys[e.key] = true)
document.addEventListener("keyup", e => keys[e.key] = false)

//Münze
const coin = {
    x: Math.random() * 360,
    y: Math.random() * 360,
    radius: 10,
    width: 20,
    height: 20,
    color: 'gold'
  };

// Punkte
let score = 0;
const scoreText = document.getElementById('scoreText');

// Gegner
const enemy = {
    x: 0, y: 100,
    width: 40, height: 40,
    color: 'red',
    speed: 3
  };
  

// Spiellogik
function update() {
    // Spielerposition updaten
    if (keys.ArrowUp) player.y -= player.speed;
    if (keys.ArrowDown) player.y += player.speed;
    if (keys.ArrowLeft) player.x -= player.speed;
    if (keys.ArrowRight) player.x += player.speed;
  
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));

    // Münze eingesammelt?
    if (checkCollision(player, coin)) {
        // Punktzahl erhöhen
        score += 10;
        scoreText.textContent = "Punkte: " + score;
        if (score == 200){ 
            // gewonnen
            alert("Gewonnen!")
        }
        // Münzposition updaten
        coin.x = Math.random() * (canvas.width - coin.width);
        coin.y = Math.random() * (canvas.height - coin.height);
      }

    // Gegnerposition updaten
    enemy.x += enemy.speed;
    if (enemy.x <= 0 || enemy.x + enemy.width >= canvas.width) {
        enemy.speed *= -1;
    }

    // Gegner getroffen?
    if (checkCollision(player, enemy)) {
        // verloren
        alert("Verloren!");
      }
    
  }

// Kollisionscheck > Münze eingesammelt / Gegner getroffen?
function checkCollision(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

// Darstellung
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Spieler
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    // Münze
    ctx.fillStyle = coin.color;
    ctx.beginPath();
    ctx.arc(coin.x, coin.y, coin.radius, 0, Math.PI * 2);
    ctx.fill();
    //ctx.fillRect(coin.x, coin.y, coin.width, coin.height);
    // Gegner
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

// Game Loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// spielen
gameLoop();
  