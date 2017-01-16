export const CONNECT_URL = 'https://www.facebook.com/v2.0/dialog/oauth?response_type=token&display=popup&api_key=464891386855067&redirect_uri=fbconnect%3A%2F%2Fsuccess&scope=user_about_me%2Cuser_activities%2Cuser_education_history%2Cuser_location%2Cuser_photos%2Cuser_relationship_details%2Cuser_status'

const Facebook = {
  openTab() {
    chrome.windows.create({
      url: CONNECT_URL,
      type: 'popup',
      focused: true,
      width: 400,
      height: 400
    });
  }
}

export default Facebook
