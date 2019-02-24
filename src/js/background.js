import '../icons/icon.png'
import Tinder from './app/tinder'
import Facebook from './app/facebook'
import requestManager from './app/request-manager'

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({
    url: 'https://tind3r.com'
  })
})

const setHeaders = (callback, host) => {
  chrome.webRequest.onBeforeSendHeaders.addListener(eval(callback), { urls: [host] }, ['blocking', 'requestHeaders'])
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'FACEBOOK_RCV_TOKEN') {
    console.log(request);

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

    case 'DELETE':
      Tinder.delete(request.url, request.params, sendResponse)
      return true

    case 'PUT':
      Tinder.put(request.url, request.params, sendResponse)
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

    case 'ATTACH_HEADERS':
      setHeaders(request.callback, request.host)
      break;

    case 'GET_VERSION':
      const version = chrome.runtime.getManifest().version
      sendResponse(version)
      break;

    case 'CONFIG':
      console.log('request', request);

      requestManager.setConfig(request.configObj)
      break;
    default:
  }
})

chrome.runtime.onInstalled.addListener(function listener(details) {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({url: "https://tind3r.com/"});
    chrome.runtime.onInstalled.removeListener(listener);
  }
});
