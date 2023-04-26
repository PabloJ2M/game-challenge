function CircleCast(circle, rect)
{
    var disX = Math.abs(circle.x - rect.x - rect.w * 0.5);
    var disY = Math.abs(circle.y - rect.y - rect.h * 0.5);
    
    return disX <= (rect.w * 0.5) && disY <= (rect.h * 0.5);
}
function BoxCast2D(position, target, size)
{
    var width = (size.w * 0.5);
    var hor = position.x >= target.x - width && position.x <= target.x + width;
    
    var height = (size.h * 0.5);
    var ver = position.y >= target.y - height && position.y <= target.y + height;
    
    return hor && ver;
}