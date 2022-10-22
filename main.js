song1 = "";
song2 ="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWristX = 0;
scoreRightWrist = 0;
song1status = "";
song2status = "";

function setup(){
canvas = createCanvas(600,500);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses)
}

function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    song1status = song1.isPlaying();
    song2status = song2.isPlaying();
    if(scoreRightWrist > 0.2){
        circle(RightWristX,RightWristY,20);
        song2.stop();
        if(song1status == false){
            song1.play();
            document.getElementById("song").innerHTML = "Playing song 1";
        }
    }
    if(scoreLeftWristX > 0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2status == false){
            song2.play();
            document.getElementById("song").innerHTML = "Playing song 2";
        }
    }
}

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
    
}

function modelLoaded(){
    console.log("PoseNet is initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWristX = results[0].pose.keypoints[9].score;
        console.log("LeftWrist = " + scoreLeftWristX);
    
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("left wrist x = " + leftWristX + " left wrist y = " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("right wrist x = " + rightWristX + " right wrist y = " + rightWristY);
    }
}

