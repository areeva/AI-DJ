song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;


function setup() {
    canvas= createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded(){
    console.log('poseNet is initialized');
}
 
function draw() {
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    
    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        inNumberLeftWrist = Number(leftWristY);
        remove_decimal = floor(inNumberLeftWrist);
        volume = remove_decimal/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }

    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);

        if(rightWristY >0 && rightWristY <= 100)
        {
            song.rate(0.5);
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
        }
        else if(rightWristY >100 && rightWristY <= 200)
        {
            song.rate(1);
            document.getElementById("speed").innerHTML = "Speed = 1x";
        }
        else if(rightWristY >200 && rightWristY <=300){
            song.rate(1.5);
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
        }
        else if (rightWristY >300 && rightWristY <= 400){
            song.rate(2);
            document.getElementById("speed").innerHTML = "Speed = 2x";
        }
        else if (rightWristY >400){
            song.rate(2.5);
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
        }
    }
     
}

function preload(){
    song = loadSound("music.mp3");
}

function start(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results) {
    if(results.length > 0){

        console.log(results);
        scoreLeftWrist =results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        console.log("leftwristscore = " + scoreLeftWrist + " rightwristscore = " + scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist X = " + leftWristX + "leftWrist Y = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist X = " + rightWristX + "rightWrist Y = " + rightWristY);
    }
}