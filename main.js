//settings 
const warnDegreesInterval = 36;
const slowDown = 0.12;
const originalRotationPerTick = 0.4;
var rotationPerTick = 0.4;

var wheel = document.getElementById("wheel");
var segments = document.getElementsByClassName("segment");
var object = document.getElementById("object");
var curSegment = 0;
var trackSegment = -1;
var rotationDegree = 0.00;
var rotations = 0;
var warnDegrees = 0;
var isWarning = false;

window.requestAnimationFrame(runLoop);

function update() {
    if(isWarning && warnDegrees >= warnDegreesInterval) {
        rotationPerTick = originalRotationPerTick;
        document.getElementById("wb1").remove();
        document.getElementById("wb2").remove();
        document.getElementById("warnText").remove();
        document.getElementById("warnField").remove();
        isWarning = false;

    }
    if(rotationDegree/72 > curSegment){
        
        curSegment = Math.floor(rotationDegree/72);
    }

    if(rotationDegree >= 360.0) {
        rotationDegree = 0;
        rotations++;
        if(rotations%2 === 0){
            triggerWarning(); 
        }
    }

    if(curSegment > 4) {
        curSegment = 0;
        trackSegment = -1;
    }

    if(isWarning){
        let tempNum = warnDegrees + rotationPerTick;
        warnDegrees = parseFloat(tempNum.toFixed(2));
    }
    let tempNum = rotationDegree+rotationPerTick;
    rotationDegree = parseFloat(tempNum.toFixed(2));
}

function draw(){

    for (let i = 0; i < segments.length; i++) {
        const element = segments[i];
        let mod = i * 72;
        element.style.transform = "rotate(" + ((rotationDegree+mod)-36) +"deg)";
    }
    if(trackSegment !== curSegment)
        changeImage();

    // document.getElementById("object").innerHTML = segmentText();
}
var miliSeconds = 0;

function runLoop(){
    if(miliSeconds == 60) {
        // tickDebug();
        miliSeconds = 0;
    }
    update();

    draw();
    miliSeconds++;
    window.requestAnimationFrame(runLoop);
}

function changeImage() {
    var object = document.getElementById("object");
    if(curSegment == 4)
        object.removeAttribute("class");
    var image = document.getElementById("segmentImage");
    image.remove();
    image = document.createElement("img");
    if(curSegment == 3)
        object.setAttribute("class", "spinObject");
    image.setAttribute("id", "segmentImage");
    image.setAttribute("src", segmentImage());
    object.appendChild(image);
    trackSegment = curSegment;
}
function triggerWarning(){
    rotationPerTick = slowDown;
    var warnDiv = document.getElementById("warn");
    var wb1 = document.createElement("div");
    wb1.setAttribute("id", "wb1");
    wb1.setAttribute("class", "warnBar");

    var wb2 = document.createElement("div");
    wb2.setAttribute("id", "wb2");
    wb2.setAttribute("class", "warnBar");

    var warnField = document.createElement("div");
    warnField.setAttribute("id", "warnField");

    var warnText = document.createElement("h1");
    warnText.setAttribute("id", "warnText");
    warnText.innerHTML = "A Bro Needs Help";
    warnField.appendChild(warnText);
    warnDiv.appendChild(wb1);
    warnDiv.appendChild(warnField);
    warnDiv.appendChild(wb2);
    isWarning = true;
}
function segmentText(){
    switch(curSegment){
        case 0:
            return "Discovery";
        case 1:
            return "Study";
        case 2:
            return "Attempt";
        case 3:
            return "Practice";
        case 4:
            return "Teach";
    }
}

function segmentImage(){
    switch(curSegment){
        case 0:
            return "res/rfkHuh.png";
        case 1:
            return "res/rfkStudy.png";
        case 2:
            return "res/monitorAttempt.png";
        case 3:
            return "res/rfkPractice.png";
        case 4:
            return "res/rfkTeach.png";
    }
}
function tickDebug(){
    console.log(Math.floor(rotationDegree/72));
    console.log("rotationDegree " + rotationDegree);
    console.log("segmentNumber: " + curSegment);
    console.log("trackSegment: " + trackSegment);
    console.log("rotations: " + rotations);
}
