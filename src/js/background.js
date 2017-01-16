import '../icons/icon.png'
import Tinder from './app/tinder'
import Facebook from './app/facebook'
import requestManager from './app/request-manager'

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({
    url: 'http://tind3r.com'
  })
})

chrome.webRequest.onBeforeSendHeaders.addListener(details => {
  details.requestHeaders.forEach(header => {
    if (header.name === 'User-Agent') {
      header.value = 'Tinder/6.3.1 (iPhone; iOS 10.0.2; Scale/2.00)'
    }

    if (header.name === 'Origin') {
      header.value = ''
    }
  })

  return { requestHeaders: details.requestHeaders }
}, { urls: ['*://api.gotinder.com/*'] }, ['blocking', 'requestHeaders'])

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'FACEBOOK_RCV_TOKEN') {
    Tinder.auth(request.token).then(resp => {
      sendResponse()
    })
    return true
  }
})

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case 'GET':
      Tinder.get(request.url, request.params, sendResponse)
      return true

    case 'POST':
      Tinder.post(request.url, request.params, sendResponse)
      return true

    case 'CHECK_INSTALLED':
      sendResponse(true)
      break;

    case 'TOKEN_DATE':
      sendResponse(Tinder.tokenDate())
      break;

    case 'FACEBOOK_TOKEN':
      Facebook.openTab()
      break;

    case 'PURGE':
      Tinder.purge()
      break;

    case 'GET_VERSION':
      const version = chrome.runtime.getManifest().version
      sendResponse(version)
      break;
    default:
  }
})
