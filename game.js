const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let player = {
    x: 50,
    y: 50,
    width: 50,
    height: 50,
    color: 'red',
    speed: 5,
    dx: 0,
    dy: 0,
    gravity: 0.8,
    jumpPower: -15,
    onGround: false
};

let platforms = [
    { x: 200, y: 500, width: 400, height: 20, color: 'green' },
    { x: 100, y: 400, width: 200, height: 20, color: 'green' },
    { x: 400, y: 300, width: 200, height: 20, color: 'green' }
];

let collectibles = [
    { x: 250, y: 470, width: 20, height: 20, color: 'gold' },
    { x: 150, y: 370, width: 20, height: 20, color: 'gold' },
    { x: 450, y: 270, width: 20, height: 20, color: 'gold' }
];

let enemies = [
    { x: 350, y: 470, width: 30, height: 30, color: 'blue', speed: 2 }
];

// Draw player
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw platforms
function drawPlatforms() {
    platforms.forEach(platform => {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

// Draw collectibles
function drawCollectibles() {
    collectibles.forEach(collectible => {
        ctx.fillStyle = collectible.color;
        ctx.fillRect(collectible.x, collectible.y, collectible.width, collectible.height);
    });
}

// Draw enemies
function drawEnemies() {
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

// Update enemy positions
function updateEnemies() {
    enemies.forEach(enemy => {
        enemy.x += enemy.speed;
        if (enemy.x <= 0 || enemy.x + enemy.width >= canvas.width) {
            enemy.speed *= -1; // Reverse direction
        }
    });
}

// Check collision with platforms
function checkCollision() {
    player.onGround = false;
    platforms.forEach(platform => {
        if (
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height <= platform.y &&
            player.y + player.height + player.dy >= platform.y
        ) {
            player.y = platform.y - player.height;
            player.dy = 0;
            player.onGround = true;
        }
    });
}

// Check collision with collectibles
function checkCollectibleCollision() {
    collectibles = collectibles.filter(collectible => {
        if (
            player.x < collectible.x + collectible.width &&
            player.x + player.width > collectible.x &&
            player.y < collectible.y + collectible.height &&
            player.y + player.height > collectible.y
        ) {
            // Collect the item (you can increase score here)
            return false;
        }
        return true;
    });
}

// Check collision with enemies
function checkEnemyCollision() {
    enemies.forEach(enemy => {
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            // Handle player-enemy collision (e.g., reduce health)
        }
    });
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawPlatforms();
    drawCollectibles();
    drawEnemies();
    checkCollision();
    checkCollectibleCollision();
    checkEnemyCollision();
    updateEnemies();
    updatePlayer();
    requestAnimationFrame(gameLoop);
}

// Update player position
function updatePlayer() {
    player.dy += player.gravity;
    player.y += player.dy;
    player.x += player.dx;

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
        player.onGround = true;
    }
}

// Keyboard controls
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (player.onGround) {
                player.dy = player.jumpPower;
            }
            break;
        case 'ArrowLeft':
            player.dx = -player.speed;
            break;
        case 'ArrowRight':
            player.dx = player.speed;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
            player.dx = 0;
            break;
    }
});

// Start the game loop
gameLoop();
