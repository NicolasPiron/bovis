// Select the HTML elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const captureButton = document.getElementById('capture');

// Set up media stream (accessing the camera)
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        // Set the video source to the camera stream
        video.srcObject = stream;
    })
    .catch((err) => {
        console.error("Error accessing camera: ", err);
    });

// Capture photo when the button is clicked
captureButton.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    // Set canvas size to match the video element
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    // Draw the current video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    // Convert the canvas image to a data URL and display it in the img tag
    const imageData = canvas.toDataURL('image/png');
    photo.setAttribute('src', imageData);
    // Optionally display the canvas as well
    canvas.style.display = 'none'; // Set to 'block' if you want to display the canvas
});

