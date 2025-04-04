// Declare element IDs at the beginning
let chatForm = document.getElementById('chatForm');
let transcriptTextbox = document.getElementById('chatInput');
let chatMessages = document.getElementById('chatMessages');
let voiceButton = document.getElementById('voiceButton');
let stopRecordButton= document.getElementById('stopbutton');
let mediaRecorder;
let audioChunks = [];
let recognition;
let isListening = false;
let currentLanguage = "en-US"; // Default to English
let targetLanguage = "tr"; // Default to Turkish

// // Add event listener for form submission
// chatForm.addEventListener('submit', function(event) {
//     event.preventDefault();
    
//     const messageText = chatInput.value; // Use the chatInput variable
    
//     if (messageText) {
//         addMessage('user', messageText);
//         chatInput.value = ''; // Clear input
//     }
// });

// // Check for browser support for getUserMedia
// if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//     voiceButton.addEventListener('click', async () => {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         mediaRecorder = new MediaRecorder(stream);

//         mediaRecorder.start();
//         voiceButton.classList.add('recording');
        
//         mediaRecorder.addEventListener('dataavailable', (event) => {
//             audioChunks.push(event.data);
//         });

//         mediaRecorder.addEventListener('stop', () => {
//             const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
//             const audioUrl = URL.createObjectURL(audioBlob);

//             // Log the audio message URL to the console
//             console.log('Audio message recorded:', audioUrl);

//             // Optionally, you could also log audioBlob for more raw data information
//             console.log('Audio Blob:', audioBlob);

//             addMessage('user', 'Audio message sent!');

//             // Reset audioChunks for future recordings
//             audioChunks = [];
//         });

//         // Stop recording after a specified duration (3 seconds)
//         setTimeout(() => {
//             mediaRecorder.stop();
//             voiceButton.classList.remove('recording');
//         }, 3000); // Adjust recording time as necessary
//     });
// }

// function addMessage(sender, text) {
//     const messageDiv = document.createElement('div');
//     messageDiv.className = `message ${sender}-message`;
//     messageDiv.innerHTML = `<p>${text}</p>`;
//     chatMessages.appendChild(messageDiv);
//     chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
// }

// Stop Speech Recognition
function stopListening() {
  if (recognition) {
    recognition.stop();
    isListening = false;
    voiceButton.disabled = false; 
    stopRecordButton.disabled = true; 
    stopRecordButton.style.display = "none";
    voiceButton.style.display = "block";
    transcriptTextbox.value=""
    // listeningBars.style.display='none'
   
    console.log("Speech recognition stopped.");
  }
}




// Start Speech Recognition
function startRecording() {
    // if (!("webkitSpeechRecognition" in window)) {
    //   alert("Speech recognition not supported in this browser. Try Chrome.");
    //   return;
    // }

    recognition = new webkitSpeechRecognition();
    recognition.lang = currentLanguage; // Set language dynamically
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
  
    isListening = true;
  
    recognition.onstart = () => {
      console.log("Speech recognition started in:", currentLanguage);

      voiceButton.disabled = true;
      stopRecordButton.disabled = false;
      voiceButton.style.display = "none";
      stopRecordButton.style.display = "block";
      // listeningBars.style.display='flex'
    };
  
    recognition.onresult = async (event) => {
      let interimTranscript = "";
      let finalTranscript = "";
  
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }
  
      transcriptTextbox.value = finalTranscript;
      
      // if (!interimTranscript) {
      //   if (finalTranscript) {
      //     const translatedText = await translateText(finalTranscript, targetLanguage);
      //     translationDiv.textContent = translatedText;
      //     speakText(translatedText, targetLanguage === "tr" ? "tr-TR" : "en-US");
      //   }
      // }
    };
  
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      transcriptTextbox.value = "Error: " + event.error;
      stopListening();
    };
  
    recognition.onend = () => {
      console.log("Speech recognition ended.");
      if (isListening) {
        voiceButton.disabled = false;
        stopRecordButton.disabled = true;
        voiceButton.style.display = "block";
        stopRecordButton.style.display = "none";
      }
    };
  
    recognition.start();
   
  }

  voiceButton.addEventListener("click", startRecording);
  stopRecordButton.addEventListener("click", stopListening);