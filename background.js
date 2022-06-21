const startRecording = (tabId) => {
    return chrome.tabs.get(tabId, (tab) => {
        const url = tab.url
        const splitUrl = url.split('/')
        if (url.includes('teleoperation') && url.includes('teleop#')){
            console.log('start recording')
        }
    })
}
/*
    https://gcloud.teleop.tortops.com/teleop#/teleoperation
    chrome.tabs.sendMessage(tabId, {message: 'holi'})

*/

chrome.tabs.onUpdated.addListener((tabId , info) => {
    if (info.status === 'complete'){
        startRecording(tabId)
    }
})

chrome.tabs.onActivated.addListener((activeInfo) => {
    startRecording(activeInfo.tabId)
})