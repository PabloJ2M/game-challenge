class Platform
{
    constructor(position, width)
    {
        this.position = position;
        this.width = width;
        
        this.holePosition = 0;
        this.holeSize = 100;
        this.thickness = 25;
    }

    draw()
    {
        var point = this.holePosition;
        rect(point + this.holeSize, this.position.y, this.width, this.thickness);

        point -= this.width;
        rect(point, this.position.y, this.width, this.thickness);
    }
    update(speed)
    {
        this.position.y -= speed;
    }
    reset(position, holePosition)
    {
        this.position.y = position;
        this.holePosition = holePosition; 
    }
}
class Character
{
    constructor(position)
    {
        this.position = position;
        this.size = 50;

        this.fallSpeed = 0;
        this.isGrounded = false;
    }

    draw()
    {
        fill('red');
        circle(this.position.x, this.position.y, this.size);
        fill('white');
    }
    update(speed)
    {
        this.position.y = this.isGrounded ? this.position.y - speed : this.position.y + this.fallSpeed;
        
        if (!this.isGrounded) this.fallSpeed = Math.min(Math.max(this.fallSpeed += 0.5, 0), 10);
        else this.fallSpeed = 0;
    }
}