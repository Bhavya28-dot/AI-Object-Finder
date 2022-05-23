status="";
object_name="";
object=[];
function setup(){
    canvas=createCanvas(600,400);
    canvas.center();
    video=createCapture(600,400);
    video.hide();
}
function draw(){
    image( video,0,0,600,500);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0; i<object.length;i++){
            document.getElementById("status").innerHTML="Status: Object Found";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected:"+object.length;
            
            fill("brown");
            percent=floor(object[i].confidence*100);
            text(object[i].label+""+percent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke("brown");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            if(object[i].label==object_name){
             video.stop();
             objectDetector.detect(gotResult);
             document.getElementById("status").innerHTML="Status: Object Found";
             var synth=window.speechSynthesis;
             UtterThis=new SpeechSynthesisUtterance(object_name +"found");
            synth.speak(UtterThis);
            } else{
                document.getElementById("status").innerHTML="Status: Object not found";
                var synth=window.speechSynthesis;
             UtterThis=new SpeechSynthesisUtterance("object not found");
            synth.speak(UtterThis);
            }
        }
    }
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
function gotResult(error,results){
    if(error){
        console.log(error);
    } 
    console.log(results);
    object=results;
}

