let character;
let platforms = [];
let distance = 180;
let score = 0;
let speed = 1;

let direction = 0;
let playerImg = null;

function preload()
{
    playerImg = loadImage("Assets/logo-full.png");
}
async function setup()
{
    var canvas = createCanvas(fitter.clientWidth, fitter.clientHeight);
    canvas.parent("gameplay");
    imageMode(CENTER);
    pixelDensity(1);

    character = new Character({ x: fitter.clientWidth * 0.5, y: distance * 2.5 });
    character.draw(playerImg);

    //build platforms
    var count = Math.floor(fitter.clientHeight / distance) + 2;
    for(let i = 0; i < count; i++)
    {
        platforms.push(new Platform({ x: 0, y: distance * i }, fitter.clientWidth));
        platforms[i].holePosition = Math.random() * (fitter.clientWidth - platforms[i].holeSize);
        platforms[i].draw();
    }
}
function draw()
{
    if (interface) return;

    clear();
    score += 0.03;

    //draw player
    character.draw(playerImg);
    character.update(speed);
    var halfPlayer = character.size * 0.5;
    // character.position.x += direction * 7; //movement
    character.position.x = Math.min(Math.max(character.position.x + direction * 7, halfPlayer), fitter.clientWidth - halfPlayer);
    
    //ground detection
    character.isGrounded = false; 
    let h = character.position.x;
    let v = character.position.y + halfPlayer;
    for(let i = 0; i < platforms.length; i++)
    {
        var holePoint = platforms[i].holePosition + platforms[i].holeSize;
        var rect1 = { x: holePoint + platforms[i].width * 0.5, y: platforms[i].position.y };
        var rect2 = { x: platforms[i].holePosition - platforms[i].width * 0.5, y: platforms[i].position.y };
        var size = { w: platforms[i].width, h: platforms[i].thickness };

        if (BoxCast2D({ x: h, y: v }, rect1, size) || BoxCast2D({ x: h, y: v }, rect2, size))
        {
            character.isGrounded = true;
            break;
        }
    }

    //pc inputs
    // if (keyIsDown(LEFT_ARROW)) direction = -1;
    // else if (keyIsDown(RIGHT_ARROW)) direction = 1;
    // else direction = 0;

    //draw platforms
    for(let i = 0; i < platforms.length; i++)
    {
        platforms[i].draw();
        platforms[i].update(speed);

        //reset platform with random position
        if (platforms[i].position.y < -platforms[i].thickness)
        {
            var index = i == 0 ? platforms.length - 1 : i - 1;
            var random = Math.random() * (fitter.clientWidth - platforms[i].holeSize);
            platforms[i].reset(platforms[index].position.y + distance, random);
        }
    }

    //UI
    textSize(30);
    fill('black');
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('Score: ' + Math.floor(score), 10, 15);

    //death condition
    if (character.position.y < 0 || character.position.y > fitter.clientHeight)
    {
        showLiderboard(true);
        setDataScore(Math.floor(score));
        interface = true;
    }
}

function touchStarted() { direction = mouseX > (fitter.clientWidth * 0.5) ? 1 : -1; }
function touchEnded() { if (touches.length == 0) direction = 0; }