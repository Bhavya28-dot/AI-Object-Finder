status="";
object_name="";
function setup(){
    canvas=createCanvas(600,400);
    canvas.center();
    video=createCapture(600,400);
    video.hide();
}
function draw(){
    image( video,0,0,600,500);
}
function start(){
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status: Object Detected";
    object_name=document.getElementById("input_name").value;
}
function modelLoaded(){
    console.log("Model is loaded");
    status=true;
}

