import jQuery from 'jquery'

console.log('Init')
const readyStateCheckInterval = setInterval(() => {
  console.log('interval', document.readyState)
  if (document.readyState === "complete") {
    clearInterval(readyStateCheckInterval)
    jQuery('body').css('opacity', 0.5)
    jQuery('body').css('pointer-events', 'none')

    document.title = 'Tind3r - refresh token FB'
    const code = document.querySelectorAll(['[name="fb_dtsg"]'])[0].value

    if (!code) {
      alert('Please login and go back there.')
      window.close()
      return
    }

    jQuery.ajax({
      type: 'post',
      url: 'https://www.facebook.com/v2.0/dialog/oauth/confirm',
      data: {
        app_id: '464891386855067',
        fb_dtsg: code,
        ttstamp: '2658170904850115701205011500',
        redirect_uri: 'fbconnect://success',
        return_format: 'access_token',
        from_post: 1,
        display: 'popup',
        gdp_version: 4,
        sheet_name: 'initial',
        __CONFIRM__: 1,
        sso_device: '',
        ref: 'Default',
      },
    }).done(html => {
      const token = html.match(/access_token=([\w_]+)&/i)

      chrome.runtime.sendMessage({
        type: 'FACEBOOK_RCV_TOKEN',
        token: token[1],
      }, response => {
        console.log('Token', token[1]);
        window.close()
      })
    })
  }
}, 100)
