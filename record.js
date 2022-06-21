const startCapture = () => {
    return navigator.mediaDevices.getDisplayMedia({audio: true, video: { mediaSource: "screen"}})
        .catch(err => {
            console.error('Error:' + err)
            return null
        })
}

const createRecorder =  (stream) => {
    // the stream data is stored in this array
    let recordedChunks = []; 
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = function (e) {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }  
    }
    mediaRecorder.onstop = function () {
       saveFile(recordedChunks)
       recordedChunks = []
    }
    mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
    return mediaRecorder;
}

const saveFile = (recordedChunks) => {
    const blob = new Blob(recordedChunks, {
       type: 'video/mp4'
     })
     let filename = window.prompt('Enter file name'),
         downloadLink = document.createElement('a')
     downloadLink.href = URL.createObjectURL(blob)
     downloadLink.download = `${filename}.mp4`
     document.body.appendChild(downloadLink)
     downloadLink.click();
     URL.revokeObjectURL(blob); // clear from memory
     document.body.removeChild(downloadLink)
 }


 /* 
 startCapture()
.then((response) => {
    let mediaRecorder = createRecorder(response)
}) 
*/