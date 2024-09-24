    // List of messages to display
    const messages = [
        "Beautiful!",
        "Great shot!",
        "Awesome picture!",
        "Stunning!",
        "Magnificent!",
        "Lovely!",
        "Fantastic!",
        "Wonderful!",
        "Superb!",
        "Incredible!"
      ];
  
      const video = document.getElementById('video');
      const captureButton = document.getElementById('captureButton');
      const canvas = document.getElementById('canvas');
      const capturedImage = document.getElementById('capturedImage');
      const messageDiv = document.getElementById('message');
  
      // Function to start the camera
      async function startCamera() {
        try {
          const constraints = {
            video: {
              facingMode: { exact: "environment" } // Use the back camera
            }
          };
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          video.srcObject = stream;
        } catch (error) {
          console.error("Error accessing the camera: ", error);
          alert("Unable to access the back camera. Please ensure it's available and you have granted permission.");
        }
      }
  
      // Function to capture the photo
      function capturePhoto() {
        const context = canvas.getContext('2d');
        const width = video.videoWidth;
        const height = video.videoHeight;
  
        // Set canvas dimensions to video dimensions
        canvas.width = width;
        canvas.height = height;
  
        // Draw the current frame from the video onto the canvas
        context.drawImage(video, 0, 0, width, height);
  
        // Convert the canvas image to a data URL and display it
        const dataURL = canvas.toDataURL('image/png');
        capturedImage.src = dataURL;
  
        // Select and display a random message
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        messageDiv.textContent = randomMessage;
      }
  
      // Event listener for the capture button
      captureButton.addEventListener('click', capturePhoto);
  
      // Start the camera on page load
      window.addEventListener('load', startCamera);