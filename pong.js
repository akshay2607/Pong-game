/* Global Initialization */
var currentX= 2;
var currentY= 20;
var offsetX = 5; 
var offsetY = 5; 
var rightBorder= 1050;
var bottomBorder = 484; 
var ballSpeed = 30;
var scoreINT = 0;
var timeout;

/* Function to move the paddle horizontally according to mouse movement */
function movePaddle(e)
{
    var paddle= document.getElementById("paddle");
    //var co = document.getElementById("coordinate");
    //co.innerHTML=e.clientX + "--" + e.clientY;
    
    // Negate the difference between mouse cursor and the paddle. 
    var clientY=e.clientY - 50;
    
    //var paddleTop= paddle.style.top;
    //paddleTop =e.clientY - 50;
    //co.innerHTML=e.pageX + "--" + e.pageY;
    
    /* Keeping the paddle within the boundry */
    if( parseInt(e.clientY) >= 48 && parseInt(e.clientY) <= 530 )
    {
        paddle.style.top=e.clientY - 50 +"px";
    }
    else if( parseInt(e.clientY)< 48)
    {     
        paddle.style.top = 0 + "px";
    }
    else if(parseInt(e.clientY)> 530)
    {
        paddle.style.top = 482 + "px";
    }
}

/* Function to clear timeout */
function initialize()
{
    clearTimeout(timeout);
}

/* Function called to start game after user clicks on the court */
function startGame(e)
{
    clearTimeout(timeout);
    bounceball();
}

/* Function to Reset the score counter to zero */
function resetCounter()
{
    scoreINT = 0;
    document.getElementById("score").innerHTML = scoreINT;
}

/* Function to bounce the ball within the court */
function bounceball()
{
    /* Initialization */
    rightBorder = 1050;
    bottomBorder = 484;
    currentX = currentX + offsetX;
    currentY = currentY + offsetY;
    var boundryX = 0;
    var boundryY = -50;
    var flag = 0;
    
    // Offsetting the ball from the Top and Left for every iteration.
    document.getElementById("ball").style.top = currentY+'px';
    document.getElementById("ball").style.left = currentX+'px';
    
    var paddle = document.getElementById("paddle");
    
    // Gets the rectangle coordinates of the html object.
    var paddlePosition = paddle.getBoundingClientRect();
    
    var ball = document.getElementById("ball");
    
    // Gets the rectangle coordinates of the html object.
    var ballPosition = ball.getBoundingClientRect();
    
    //var co = document.getElementById("coordinate");
    //co.innerHTML=ballPosition.bottom + "--" + paddlePosition.top;
    
    // Checking of the ball is crossing the paddle.
    if(ballPosition.right>=1085)
    {
        // Check if the ball is in contact with the paddle i.e. ball's coordinates are within the paddle coordinates.
        if(ballPosition.top> paddlePosition.top && ballPosition.top< paddlePosition.bottom)
        {
            rightBorder=1000;
        }
        else if(ballPosition.bottom> paddlePosition.top && ballPosition.top<paddlePosition.bottom)
        {
            rightBorder=1000;
        }
        else if(ballPosition.bottom == paddlePosition.top )
        {
            rightBorder=1002;
            //boundryY=parseInt(paddlePosition.top);
            bottomBorder=parseInt(ballPosition.bottom) - 140;
        }
        else if(ballPosition.top == paddlePosition.bottom)
        {
            rightBorder=1002;
            //bottomBorder=parseInt(ballPosition.bottom);
            boundryY=parseInt(ballPosition.top) - 140;
        }
        else
        {
            // xoffset = xoffset * (-1);
            // Restart the game as soon as the ball misses the paddle.
            restart();
            // Increment the score.
            scoreINT++;
            flag = 1;
        }
        
    }
    
    // Update the score.
    document.getElementById("score").innerHTML = scoreINT;
    if(flag == 0)
    {
        var tempX = parseInt(currentX) + parseInt(offsetX);
        var tempY = parseInt(currentY) + parseInt(offsetY);
        
        /* Check if adding the offset value puts the ball outside the court. If it does, then rebound by setting negative offset.*/ 
        if ((tempX >= rightBorder) || (tempX <= boundryX))
        {
            offsetX *=-1;
        }
        if ((tempY >= bottomBorder) || (tempY <= boundryY))
        {
            offsetY *=-1;
        }
        
        // Set timeout according to the ballspeed set.
        timeout = window.setTimeout('bounceball()',ballSpeed);	
    }
}

/* Function to reset values and  restart the game */
function restart()
{
    /* Reset values */
    rightBorder= 1050;
    bottomBorder = 500;
    //scoreINT = 0;
    currentX=2;
    currentY=Math.random()*400;
    offsetX = 5; 
    offsetY = 5;
    var ball = document.getElementById("ball");
    ball.style.top = currentY + 'px';
    ball.style.left = 0 + 'px';
    initialize();    
}


/* Function to set the speed according to the checkbox check value */
function setSpeed(speed)
{
    if(parseInt(speed) == 1)
    {
        ballSpeed = 20;
    }
    else if (parseInt(speed) == 2)
    {
        ballSpeed = 10;
    }
    else 
    {
        ballSpeed = 30;
    }
}

