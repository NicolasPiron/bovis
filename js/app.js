document.addEventListener('DOMContentLoaded', function () {
    // Dictionary of ranges and messages
    const messageRanges = [
        {
          min: 0,
          max: 5000,
          messages: [
            "la CATA mec",
            "c'est vraiment la HONTE",
            "brûler de la sauge de TOUTE URGENCE",
            "Ne pas toucher cet objet ou individu",
            "Je préfère en rire",
            "mal mal mal",
            "gerbe",
            "Aucune défense contre les forces du mal"
          ],
          image: 'img/annoyed.jpg',
          sound: 'audio/womp.mp3'
        },
        {
          min: 5001,
          max: 10000,
          messages: [
            "frr concentre toi",
            "Besoin 2 chamanisme",
            "C'est mort pour le chakra #narut",
            'Fréquence de parking souterrain',
            "grosse merde va",
            "mal", 
          ],
          image: 'img/bored.jpg',
          sound: 'audio/womp2.mp3'
        },
        {
          min: 10001,
          max: 15000,
          messages: [
            "Achète un talisman",
            "bof (la gerbe)",
            "Possible de VIBRER par PITIÉ",
            "C'est faiblard",
            "Faiblisssime",
            'relire Raël',
          ],
          image: 'img/angry.jpg',
          sound: 'audio/ltoons.mp3'
        },
        {
          min: 15001,
          max: 20000,
          messages: [
            "Presque potable (in term of bovis)",
            "ça vibrotte",
            "Wow (non c'est pas vraiment ça)",
            "yeul",
            "Potentiel pour devenir influenceur yoga au mieux",
            "Une améthyste dans le fiak et ça repart"
          ],
          image: 'img/dumb.jpg',
          sound: 'audio/sponge.mp3'
        },
        {
          min: 20001,
          max: 25000,
          messages: [
              "concentre toi mais ok",
              "ça vibre",
              "Elligible pour un bachelor en psycho au mieux",
              "Juste un peu de sauge et on y est",
              "Autorisation d'utiliser un pendule divinatoire",
              "Protégé des entités maléfiques",
              "j'ADORE les cristaux et autres minéraux scintillants",
              "Trouvez ci-joint ma formation en ligne pour devenir magnétiseur",
          ],
          image: 'img/bien.jpg',
          sound: 'audio/flute.mp3'
        },
        {
            min: 25001,
            max: 30000,
            messages: [
              "BRAVO pour la collection de cristeaux",
              "Impressive (in term of bovis)",
              "ça vibre ça vibre",
              "Bovissely speaking, c'est oui",
              "Remarquable (in term of bovis)",
              "Elligible pour devenir coach spirituel",
              "Plutôt clochettes ou harpe? (in term of esoteric music)"
            ],
          image: 'img/smile.jpg',
          sound: 'audio/bells2.mp3'
          },
          {
            min: 30001,
            max: 35000,
            messages: [
              "Peut lancer sa secte",
              "Lithoterapiste si on me demande",
              "Je peux vous acheter un cristal?",
              "neurones qui vibrent",
              "esotérisme et tutti quanti",
              "^ full of bovis",
              "Potentiel pour devenir thérapeute energétique",
              "Tu m'achètes une amulette?",
            ],
          image: 'img/nice.jpg',
          sound: 'audio/alien.mp3'
          },
          {
            min: 35001,
            max: 40000,
            messages: [
              "Bovisserie, j'ai pas raison la team?",
              "Cosmisme",
              "Sharingan deux points ouvert",
              "ça casse le compteur ou quoi!?",
              "blirp blorg barf (alien language)",
              "les larmes (die Larmen)",
              "Je suis passionné de vie extraterrestre",
            ],
          image: 'img/clap.jpg',
          sound: 'audio/alien2.mp3'
          }
      ];
  
    const video = document.getElementById('video');
    const captureButton = document.getElementById('captureButton');
    const canvas = document.getElementById('canvas');
    const capturedImage = document.getElementById('capturedImage');
    const randomNumberDiv = document.getElementById('randomNumber');
    const messageDiv = document.getElementById('message');
    const scaleCanvas = document.getElementById('scaleCanvas');
    const scaleCtx = scaleCanvas.getContext('2d');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const loadingMessage = document.getElementById('loadingMessage');
    const audioPlayer = document.getElementById('audioPlayer');
    const resultImage = document.getElementById('resultImage');  // Get the result image element
    let isPhotoTaken = false; // Flag to check if a photo has been taken
    let bubbleElement = document.getElementById('bubble');

    const infoIcon = document.getElementById('infoIcon');
    const infoModal = document.getElementById('infoModal');
    const closeBtn = document.getElementById('closeBtn');

    // When the user clicks on the icon, open the modal
    infoIcon.addEventListener('click', function() {
      infoModal.style.display = 'block';
    });

    // When the user clicks on the close button, close the modal
    closeBtn.addEventListener('click', function() {
      infoModal.style.display = 'none';
    });

    // Close the modal if user clicks anywhere outside the modal content
    window.onclick = function(event) {
      if (event.target == infoModal) {
        infoModal.style.display = 'none';
      }
    }


    // Function to draw the semi-circular scale
    function drawScale(randomNumber) {
        const maxValue = 40000;
        const centerX = scaleCanvas.width / 2;
        const centerY = scaleCanvas.height;
        const radius = 150;
        const startAngle = Math.PI;
        const endAngle = 2 * Math.PI;

        const tickLength = 20; // Length of the ticks
        const numberOffset = 38; // Distance of numbers from the scale

        // Clear previous drawing
        scaleCtx.clearRect(0, 0, scaleCanvas.width, scaleCanvas.height);

        // Draw the semi-circular scale (colored segments)
        const gradient = scaleCtx.createLinearGradient(0, 0, scaleCanvas.width, 0);
        gradient.addColorStop(0, '#ff0000'); // Red
        gradient.addColorStop(0.5, '#ffff00'); // Yellow
        gradient.addColorStop(1, '#00ff00'); // Green

        scaleCtx.beginPath();
        scaleCtx.arc(centerX, centerY, radius, startAngle, endAngle);
        scaleCtx.lineWidth = 40;
        scaleCtx.strokeStyle = gradient;
        scaleCtx.stroke();
        scaleCtx.closePath();

          // Draw ticks and numbers
        const numTicks = 10; // Number of ticks
        const tickInterval = maxValue / numTicks; // Interval for numbers and ticks
        for (let i = 0; i <= numTicks; i++) {
            // Calculate the angle for each tick
            const value = i * tickInterval;
            const angle = startAngle + (i / numTicks) * (endAngle - startAngle);

            // Coordinates for the tick start and end points
            const tickStartX = centerX + (radius - tickLength) * Math.cos(angle);
            const tickStartY = centerY + (radius - tickLength) * Math.sin(angle);
            const tickEndX = centerX + radius * Math.cos(angle);
            const tickEndY = centerY + radius * Math.sin(angle);

            // Draw the tick
            scaleCtx.beginPath();
            scaleCtx.moveTo(tickStartX, tickStartY);
            scaleCtx.lineTo(tickEndX, tickEndY);
            scaleCtx.lineWidth = 2;
            scaleCtx.strokeStyle = '#000000';
            scaleCtx.stroke();
            scaleCtx.closePath();

            // Coordinates for the number
            const numberX = centerX + (radius + numberOffset) * Math.cos(angle);
            const numberY = centerY + (radius + numberOffset) * Math.sin(angle);

            // Draw the number
            scaleCtx.font = '14px Arial';
            scaleCtx.fillStyle = '#000000';
            scaleCtx.textAlign = 'center';
            scaleCtx.fillText(value.toString(), numberX, numberY);
        }

        // Calculate the angle for the needle
        const angle = startAngle + (randomNumber / maxValue) * (endAngle - startAngle);

        // Draw the needle
        scaleCtx.beginPath();
        scaleCtx.moveTo(centerX, centerY);
        scaleCtx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
        scaleCtx.lineWidth = 5;
        scaleCtx.strokeStyle = '#000000'; // Black needle
        scaleCtx.stroke();
        scaleCtx.closePath();
  }

    let currentFacingMode = "environment";
    // Function to start the camera
    async function startCamera() {
        try {
            const constraints = {
            video: {
                facingMode: currentFacingMode
            }
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            video.srcObject = stream;
        } catch (error) {
            console.error("Error accessing the camera: ", error);
            alert("Unable to access the back camera. Please ensure it's available and you have granted permission.");
        }
    }

        // Function to toggle between front and back camera
    async function toggleCamera() {
      // Toggle the camera facing mode
      currentFacingMode = currentFacingMode === "environment" ? "user" : "environment";
      
      // Stop all video streams
      if (video.srcObject) {
          video.srcObject.getTracks().forEach(track => track.stop());
      }

      // Restart the camera with the new facing mode
      startCamera();
    }


      // Function to stop the camera
    function stopCamera() {
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());  // Stop each track
        video.srcObject = null;  // Clear the video element's source
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

        // Convert the canvas image to a datad URL and display it
        const dataURL = canvas.toDataURL('image/png');
        capturedImage.src = dataURL;

        // Generate a random number between 0 and 40000
        const randomNumber = Math.floor(Math.random() * 40001);

        // Find the message range corresponding to the random number
        // const foundRange = messageRanges.find(range => randomNumber >= range.min && randomNumber <= range.max);

        // // If a range is found, select a random message from the array
        // const randomMessage = foundRange ? foundRange.messages[Math.floor(Math.random() * foundRange.messages.length)] : "No message found!";

        // Switch from video to the captured image
        video.style.display = 'none';  // Hide the video feed
        capturedImage.style.display = 'block';  // Show the captured image
        captureButton.textContent = 'Reprendre une photo';  // Change button text
        isPhotoTaken = true;  // Set the photo taken flag to true

        // Stop the camera since we don't nee it while the photo is shown
        stopCamera();

        // Show the loading spinner and message
        loadingSpinner.style.display = 'block';
        loadingMessage.style.display = 'block';

        // Simulate a 3-second delay before showing the result
        setTimeout(() => {
            const randomNumber = Math.floor(Math.random() * 40001);
            const foundRange = messageRanges.find(range => randomNumber >= range.min && randomNumber <= range.max);
            const randomMessage = foundRange ? foundRange.messages[Math.floor(Math.random() * foundRange.messages.length)] : "No message found!";
            randomNumberDiv.innerHTML = `<p style="color: white;">${randomNumber} Unités Bovis</p>`;
            randomNumberDiv.classList.add('number-overlay');  // Show the random number text
            messageDiv.textContent = randomMessage;
            bubbleElement.innerHTML = `<p>${randomMessage}</p>`;
            bubbleElement.style.display = 'block';  // Show the message bubble
           // Display the corresponding image
            resultImage.src = foundRange ? foundRange.image : '';
            resultImage.style.display = 'block';  // Show the result image
            // Play the corresponding sound
            audioPlayer.src = foundRange ? foundRange.sound : '';
            audioPlayer.play();  // Play the sound
            // numberOverlay.classList.add('show');  // Show the number overlay
            resultImage.classList.add('rotate-and-flicker');

            // Check if the rotate-and-flicker class is applied
            console.log('foundRange.image:', foundRange.image);
            console.log('Is rotate-and-flicker class applied?', resultImage.classList.contains('rotate-and-flicker'));

            drawScale(randomNumber);

            // Hide the loading spinner and message after the delay
            loadingSpinner.style.display = 'none';
            loadingMessage.style.display = 'none';

            // Show the scale after loading
            scaleCanvas.style.display = 'block';
            }, 3000);  // 3-second delay

    }

        // Function to reset the camera (take another photo)
    function resetToCamera() {
        capturedImage.style.display = 'none'; // Hide the captured image
        resultImage.style.display = 'none'; // Hide the result image
        randomNumberDiv.classList.remove('number-overlay');  // Hide the random number text
        randomNumberDiv.textContent = '';  // Clear the random number text
        messageDiv.textContent = '';  // Clear the message
        bubbleElement.style.display = 'none';  // Hide the message bubble
        scaleCanvas.style.display = 'none';  // Hide the scale
        audioPlayer.pause();  // Pause the audio
        video.style.display = 'block';  // Show the video feed
        captureButton.textContent = 'Prendre une photo';  // Change button text back
        isPhotoTaken = false;  // Set the photo taken flag to false

        // Restart the camera
        startCamera();
    }
  
    // Event listener for the capture button
    captureButton.addEventListener('click', function () {
        if (isPhotoTaken) {
        resetToCamera();  // If photo is taken, reset to camera feed
        } else {
        capturePhoto();  // Otherwise, capture the photo
        }
    });
  
    // Start the camera on page load
    startCamera();

  });
  