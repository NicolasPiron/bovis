    // Dictionary of ranges and messages
    const messageRanges = [
        { min: 0, max: 2000, message: "Very low score, better luck next time!" },
        { min: 2001, max: 4000, message: "Nice pic!" },
        { min: 4001, max: 10000, message: "Great photo, well done!" },
        { min: 10001, max: 15000, message: "Wow! Impressive!" },
        { min: 15001, max: 20000, message: "Superb shot!" },
        { min: 20001, max: 25000, message: "Magnificent!" },
        { min: 25001, max: 30000, message: "Incredible capture!" },
        { min: 30001, max: 35000, message: "Unbelievable, great work!" },
        { min: 35001, max: 40000, message: "You're a pro photographer!" }
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

         // Generate a random number between 0 and 40000
        const randomNumber = Math.floor(Math.random() * 40001);
  
        // Find the message corresponding to the random number
        const foundMessage = messageRanges.find(range => randomNumber >= range.min && randomNumber <= range.max);

        // Display the random number and the message
        randomNumberDiv.textContent = `Random Number: ${randomNumber}`;
        messageDiv.textContent = foundMessage ? foundMessage.message : "No message found!";
    }
      // Event listener for the capture button
      captureButton.addEventListener('click', capturePhoto);
  
      // Start the camera on page load
      window.addEventListener('load', startCamera);