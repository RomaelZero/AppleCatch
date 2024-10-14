// starting variable
let startingState = 0;


let animationId;  // Variable to store the ID from requestAnimationFrame


// Start game menu
const div = document.querySelector(".startup_menu");

const h1 = document.querySelector("#startGame");

const endCard = document.querySelector(".endScreen_menu");

h1.addEventListener("click", ()=>{
    console.log("clicked");
    startingState = 1;
    div.style.display = "none";

    // To start the game call the function
    startGame();
})

// canvas set up

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1200;  // Match background image width
canvas.height = 600;  // Match background image height

// apple generation basic template
// ctx.fillStyle = "pink";
// ctx.fillRect(10,10,100,100);

// apple object configuration

const apple = {
    width:80,
    height:80
}


// score variable
let score = 0;

let scoreCard = "Score: " + score;
ctx.font = "50px Arial";
ctx.fillText(scoreCard,10,80);


// image source
const appleImageSrc = "./images/apple.png";
const appleImage = new Image();
appleImage.src = appleImageSrc;

const basketImageSrc = "./images/basket.png"
const backetImage = new Image();
backetImage.src = basketImageSrc;


// Function to start game
function startGame() {
    
score = 0;  // Reset score when restarting the game
scoreCard = "Score: " + score;  // Update scoreCard
ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas to avoid leftover objects


// Timer Counter
let timeLeft = 15;
let gameTimer;

//Start the timer
function startTimer(){
    gameTimer = setInterval(() => {
        timeLeft--;
        if(timeLeft <= -1){
            clearInterval(gameTimer);
            // Handle the game-over logic here
            
            cancelAnimationFrame(animationId);  // Stops the animation

            //Update the end screen score before showing
            endCardScore.innerHTML = "Your score: "+score;


            //endcard appear
            endCard.style.display = "block";
        }
    },1000); // Update everyone second
}

startTimer();

// apple class

class Apple {
    constructor({x, y}) {
        this.x = x;
        this.y = y;
        this.width = apple.width;
        this.height = apple.height;
        this.Y_velocity = 2;
    }

    // Now the update function will be usefull for gravity
    update(){
        this.y += this.Y_velocity;
    }

    // Redraw the apple for the next frame
    draw(){        
        // ctx.fillStyle = "pink";
        // ctx.fillRect(this.x,this.y, this.width, this.height);
        ctx.drawImage(appleImage, this.x, this.y,this.width,this.height);

    }
}

const applesArray = [];

// creating apple and pushing it in applesArray
function addAppel() {
    applesArray.push(new Apple({
        x: Math.floor(Math.random() * 1000),
        y: Math.floor(Math.random() * 100) + Math.floor(Math.random()* 10 +1)
    }))
};
 
addAppel();
addAppel();
addAppel();
addAppel();
addAppel();
addAppel();
addAppel();
addAppel();

console.log(applesArray);

// ctx.fillStyle = "pink";
// ctx.fillRect(fallingApple.x, fallingApple.y, apple.width, apple.height);


// Player
class Player {
    constructor(){
        this.x = 500;
        this.y = canvas.height - 170;
        this.width = 200;
        this.height = 160;
        this.X_velocity = 10;
    }

    draw(){
        // ctx.fillStyle = "brown";
        // ctx.fillRect(this.x,this.y,100,100);
        ctx.drawImage(backetImage, this.x, this.y,this.width,this.height);
    }

    right() {
        if (this.x + this.width < canvas.width) {
            this.x += this.X_velocity;
        }
    }
    
    left() {
        if (this.x > 0) {
            this.x -= this.X_velocity;
        }
    }    
}

const controller = new Player();
console.log(controller);

window.addEventListener("keydown",(event)=>{
    
    if(event.key == "a"){
        controller.left();        
    }
    if(event.key == "d"){
        controller.right();
    }
})

// ctx.fillStyle = "brown";
// ctx.fillRect(500,500,100,100);


// Collision Detection function
function collisionDetection(player,fallingObjects, index){
    if(player.x + player.width >= fallingObjects.x &&
        player.x <= fallingObjects.x + fallingObjects.width &&
        player.y + player.height >= fallingObjects.y &&
        player.y <= fallingObjects.y + fallingObjects.height
    ){

        applesArray.splice(index,1);

        //Incrementing the score 
        score++;
        scoreCard = "Score: " + score;
        console.log(score);
        console.log()
        //add new apple
        addAppel();
    }
}



// Animation loop for gravity
function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas

 
  
    

  applesArray.forEach((apple,index)=>{
    // Check for Collision
    collisionDetection(controller,apple,index);

    // check if apple is off screen

    if(apple.y - 100 >= canvas.height){
        // remove apple
        applesArray.splice(index,1);
        //add new apple
        addAppel();
        
    }

    apple.update();
    apple.draw();
  });  
  
  controller.draw();

  ctx.font = "50px Arial";
  ctx.fillText(scoreCard,10,80);


  // Timer
  ctx.font = "50px Arial";
  ctx.fillText(timeLeft,canvas.width/2, 75);

  animationId = requestAnimationFrame(animate);
};

 animate();


 }


const endCardScore = document.querySelector(".endCardScore");
 
const restartBtn = document.querySelector(".restartBtn");
restartBtn.addEventListener("click",()=>{

    // Setting display property to none again
    endCard.style.display = "none";

    startGame();
});



