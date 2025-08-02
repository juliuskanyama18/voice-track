// Declare element IDs at the beginning
// let container = document.querySelector('.container');
// let leftPanel = document.getElementById('pdfPanel');
// let resizer = document.getElementById('resizer');
// let rightPanel = document.getElementById('chatPanel');
// let chatForm = document.getElementById('chatForm');
// let transcriptTextbox = document.getElementById('chatInput');
// let chatMessages = document.getElementById('chat-box');
// let voiceButton = document.getElementById('voiceButton');
// let stopRecordButton= document.getElementById('stopbutton');




// let mediaRecorder;
// let audioChunks = [];
// let recognition;
// let isListening = false;
// let currentLanguage = "en-US"; // Default to English
// let targetLanguage = "tr"; // Default to Turkish

// // Stop Speech Recognition
// function stopListening() {
//   if (recognition) {
//     recognition.stop();
//     isListening = false;
//     voiceButton.disabled = false; 
//     stopRecordButton.disabled = true; 
//     stopRecordButton.style.display = "none";
//     voiceButton.style.display = "block";
//     transcriptTextbox.value=""
//     transcriptTextbox.disabled = false; // Re-enable editing after stopping
//     // listeningBars.style.display='none'
   
//     console.log("Speech recognition stopped.");
//   }
// }




// // Start Speech Recognition
// function startRecording() {
//     if (!("webkitSpeechRecognition" in window)) {
//       alert("Speech recognition not supported in this browser. Try Chrome.");
//       return;
//     }

//     recognition = new webkitSpeechRecognition();
//     recognition.lang = currentLanguage; // Set language dynamically
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.maxAlternatives = 1;
  
//     isListening = true;
  
//     recognition.onstart = () => {
//       console.log("Speech recognition started in:", currentLanguage);
//       transcriptTextbox.value = "Recording...";

//       // Disable the transcriptTextbox when recording starts
//       transcriptTextbox.disabled = true; // Disable editing
      
//       setTimeout(() => {
//         transcriptTextbox.value = "Recording...";
//         setTimeout(() => {
//             // transcriptTextbox.value = ""; // Clears after 2 seconds
//         }, 2000); // Keeps "Listening..." for 2 seconds
//     }, 100);

//       voiceButton.disabled = true;
//       stopRecordButton.disabled = false;
//       voiceButton.style.display = "none";
//       stopRecordButton.style.display = "block";
//       // listeningBars.style.display='flex'
//     };
//     let accumulatedTranscript = ""; // Add this at the top or near other variable declarations

//     recognition.onresult = async (event) => {
//       let interimTranscript = "";
//       for (let i = event.resultIndex; i < event.results.length; ++i) {
//         const result = event.results[i];
//         if (result.isFinal) {
//           accumulatedTranscript += result[0].transcript + " ";
//         } else {
//           interimTranscript += result[0].transcript;
//         }
//       }
//       transcriptTextbox.value = accumulatedTranscript + interimTranscript;
      
      // if (!interimTranscript) {
      //   if (finalTranscript) {
      //     const translatedText = await translateText(finalTranscript, targetLanguage);
      //     translationDiv.textContent = translatedText;
      //     speakText(translatedText, targetLanguage === "tr" ? "tr-TR" : "en-US");
      //   }
      // }
    // };
  
  //   recognition.onerror = (event) => {
  //     console.error("Speech recognition error:", event.error);
  //     transcriptTextbox.value = "Error: " + event.error;
  //     stopListening();
  //   };
  
  //   recognition.onend = () => {
  //     console.log("Speech recognition ended.");
  //     if (isListening) {
  //       voiceButton.disabled = false;
  //       stopRecordButton.disabled = true;
  //       voiceButton.style.display = "block";
  //       stopRecordButton.style.display = "none";
  //     }
  //   };
  
  //   recognition.start();
   
  // }

  // voiceButton.addEventListener("click", startRecording);
  // stopRecordButton.addEventListener("click", stopListening);
document.addEventListener("DOMContentLoaded", function () {
  let container = document.querySelector('.container');
  let leftPanel = document.getElementById('pdfPanel');
  let resizer = document.getElementById('resizer');
  let rightPanel = document.getElementById('chatPanel');
  
  let isResizing = false;

    resizer.addEventListener('mousedown', function(e) {
      isResizing = true;
      document.body.style.cursor = 'col-resize';
    });

    document.addEventListener('mousemove', function(e) {
      if (!isResizing) return;

      const containerOffsetLeft = container.offsetLeft;
      const pointerRelativeXpos = e.clientX - containerOffsetLeft;
      const containerWidth = container.offsetWidth;

      const leftPanelWidthPercent = (pointerRelativeXpos / containerWidth) * 100;
      const rightPanelWidthPercent = 100 - leftPanelWidthPercent;

      if (leftPanelWidthPercent > 10 && rightPanelWidthPercent > 10) {
        leftPanel.style.width = `${leftPanelWidthPercent}%`;
        rightPanel.style.width = `${rightPanelWidthPercent}%`;
        resizer.style.left = `${pointerRelativeXpos}px`;
      }
      console.log(`Left Panel Width: ${leftPanelWidthPercent}%, Right Panel Width: ${rightPanelWidthPercent}%`);
    });

    document.addEventListener('mouseup', function() {
      isResizing = false;
      document.body.style.cursor = 'default';
    });
  });