var constraints = { video: { facingMode: "environment" }, audio: false};

const cameraView = document.querySelector('#camera--view'),
cameraSensor = document.querySelector('#camera--sensor'),
cameraOutput = document.querySelector('#camera--output'),
cameraTrigger = document.querySelector('#camera--trigger');

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Error: cannot access camera", error);
    });
}

// Take a picture when cameraTrigger is clicked
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
}

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);