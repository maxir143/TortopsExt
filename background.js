let Record = true;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    let url = tab.url;
    let splitURL =  url.split("/")
    if (splitURL.includes("teleoperation") == true && Record == true){
        console.log("yijes")
        Record = false;
        startRecording();
    };
    
});

// opens a communication port
chrome.runtime.onConnect.addListener(function(port) {
    // listen for every message passing throw it
    port.onMessage.addListener(function(o) {
        // if the message comes from the popup
        console.log(o.start);
    });
});

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