const dino = document.getElementById('dino');
const ground = document.getElementById('ground');
const scoreDisplay = document.getElementById('score');
let score = 0;
let isJumping = false;
let obstacle;


// Function to make the dinosaur jump
function jump() {
    if (isJumping) return;
    isJumping = true;
    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 100) {
            clearInterval(jumpInterval);
            const fallInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(fallInterval);
                    isJumping = false;
                    dino.style.bottom = '50px'; // Reset position after falling
                }
                jumpHeight -= 5;
                dino.style.bottom = `${50 + jumpHeight}px`;
            }, 20);
        }
        jumpHeight += 5;
        dino.style.bottom = `${50 + jumpHeight}px`;
    }, 20);
}

const collisionAudio = new Audio('khela.m4a'); // Load the audio file
// Add this audio declaration at the top with other variables
const backgroundAudio = new Audio('joyBangla.m4a');  // <-- Add this line
backgroundAudio.loop = true;  // <-- Make it loop

// Function to create an obstacle
function createObstacle() {
    obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    ground.appendChild(obstacle);
    obstacle.style.left = '100%'; // Start from the right edge
    moveObstacle();
}

// Function to move the obstacle
function moveObstacle() {
    const obstacleInterval = setInterval(() => {
        let obstaclePosition = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
        let dinoPosition = parseInt(window.getComputedStyle(dino).getPropertyValue('left'));
        console.log(`Dino Position: ${dinoPosition}, Obstacle Position: ${obstaclePosition}`); // Debugging log

        if (obstaclePosition < -60) {
            clearInterval(obstacleInterval);
            obstacle.remove();
            score++;
            scoreDisplay.innerText = `Score: ${score}`;
            createObstacle(); // Create a new obstacle
            backgroundAudio.play();
        } else {
            obstacle.style.left = `${obstaclePosition - 5}px`;
        }
        // Check for collision only when not jumping
        if (obstaclePosition < (dinoPosition + 80) && obstaclePosition > dinoPosition && !isJumping) {
            console.log(`Collision detected! Obstacle position: ${obstaclePosition}`); // Debugging log
            clearInterval(obstacleInterval);
            dino.style.backgroundImage = "url('hasina-poop.jpg')"; // Change image on collision
            backgroundAudio.pause();  // <-- Add this to pause background music
            collisionAudio.play();  // Existing audio play

            // Delay the alert to allow the image change to be visible
            setTimeout(() => {
                alert('Game Over! Your score: ' + score);
            }, 500); // 500 milliseconds delay
        }
    }, 20);
}

document.addEventListener('keydown', (event) => {
    jump(); // Trigger jump on any key press
});

document.addEventListener('touchstart', (event) => {
    event.preventDefault(); // Prevent screen scroll
    if (!isAudioStarted) {
        backgroundAudio.play();
        isAudioStarted = true;
    }
    jump();
});

// Add this function to start game on any touch

function startGame() {
    if (!isAudioStarted) {
        backgroundAudio.play();
        isAudioStarted = true;
    }
}

// Function to update score
function updateScore() {
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
}

// Game loop to update score every second
setInterval(updateScore, 1000);
createObstacle(); // Start the first obstacle
backgroundAudio.play();

// Function to animate the dinosaur running
function animateDino() {
    dino.classList.add('running');
}

// Start the running animation
animateDino();
