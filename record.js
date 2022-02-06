const buttonPlay = document.getElementById("play");

buttonPlay.addEventListener("click", function(){
    startRecording();
});

function sendMessage(message){
    /* handling recording state */ 
    var port = chrome.runtime.connect();
    port.postMessage({
        'from': 'popup',
        'start': message
    });
};

async function startRecording() {
    let stream = await navigator.mediaDevices.getDisplayMedia({
      video: true
    })
  //needed for better browser support
  const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")  ? "video/webm; codecs=vp9" : "video/webm"
    let mediaRecorder = new MediaRecorder(stream, {
        mimeType: mime
    })

    let chunks = []
    mediaRecorder.addEventListener('dataavailable', function(e) {
        chunks.push(e.data)
    })

    mediaRecorder.addEventListener('stop', function(){
      let blob = new Blob(chunks, {
          type: chunks[0].type
      })
      let url = URL.createObjectURL(blob)

      let a = document.createElement('a')
      a.href = url
      a.download = 'video.webm'
      a.click()
  })

    //we have to start the recorder manually
    mediaRecorder.start()
};