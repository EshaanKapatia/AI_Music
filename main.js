song1="";
song2="";
leftscore=0;
rightscore=0;
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;


function preload(){
    
    song=loadSound("animal.mp3")
    song1=loadSound("music.mp3")
}
function setup(){
canvas=createCanvas(400,400);
canvas.position(540,430);
video=createCapture(VIDEO);
video.hide();
video.size(400,400)
posenet=ml5.poseNet(video,modelLoaded);

}
function modelLoaded(){
    console.log("posenet is launched")
}
function draw(){
    image(video,0,0,400,400);
    stroke("red");
    fill("red");
    if(leftscore > 0.05){
        circle(leftwristx,leftwristy,20)
        song_status=song.isPlaying()
        if(song_status==false){
            song1.stop();
            song.play();
        }
        console.log('harry status='+song_status);
    }
    if(rightscore > 0.05){
        circle(rightwristx,rightwristy,20)
        song1_status=song1.isPlaying()
        if(song1_status==false){
            song.stop();
            song1.play();
        }
        console.log('animal status='+song1_status);
    }
}
function song_play(){
    song.setVolume(1);
    song.rate(1);
    song1.setVolume(1);
    song1.rate(1);
    posenet.on("pose",gotPoses);
}
function song_pause(){
    song.stop();
    song1.stop();
}
function gotPoses(results){
    if(results.length>0){
        console.log(results)
rightscore=results[0].pose.keypoints[10].score;
leftscore=results[0].pose.keypoints[9].score;
console.log(leftscore);
console.log(rightscore);
leftwristx=results[0].pose.leftWrist.x;
leftwristy=results[0].pose.leftWrist.y;
rightwristx=results[0].pose.leftWrist.x;
rightwristy=results[0].pose.leftWrist.y;
console.log(leftwristx);
console.log(leftwristy);
console.log(rightwristx);
console.log(rightwristy);
    }
    
}
