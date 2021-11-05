function preload()
{
    replay = loadSound("replay.mp3");
}
input_value = "";
start_status = "";
status = "";
percent = 0;
objects = [];

function setup()
{
    canvas = createCanvas(310, 310);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    object_detector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("detect").innerHTML = "detecting objects";
}
function modelloaded()
{
    console.log("cocossd is loaded", ml5.version);
    status = true;
    object_detector.detect(video,gotresult);
}
function gotresult(error,results)
{
    if(error)
    {
        console.error(error);
      
    }
    else
    {
        console.log(results);
        document.getElementById("detect").innerHTML = "Object Detected"
        objects = results;
        object_detector.detect(video, gotresult);
    }
}
function draw()
{
    if(start_status != "")
    {
    image(video, 0, 0, 310, 310);
    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);  

    for(i=0; i<objects.length; i++)
    {
        if(objects[i].label == input_value)
        {
        replay.stop();
        percent= Math.floor(objects[i].confidence*100);
        object_name= objects[i].label;
        textSize(20);
        strokeWeight(1);
        stroke("red");
        fill("red")
        text(object_name+" "+percent+"%",objects[i].x+15,objects[i].y+40);
        noFill();
        strokeWeight(3);
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
        else
        {
            replay.play();
        }
    }
    }
    }
}
function start()
{
    start_status = true;
    input_value = document.getElementById("input1").value;
}
