#Tind3r.com Chrome Extension

This extension takes responsibility for communication with Tinder API. Needed for [tind3r.com](http://tind3r.com)

##Developing extension

1. Clone the repository.
2. Install [yarn](https://yarnpkg.com): `npm install -g yarn`.
3. Run `yarn`.
6. Run `npm run start`
7. Load your extension on Chrome following:
  1. Access `chrome://extensions/`
  2. Check `Developer mode`
  3. Click on `Load unpacked extension`
  4. Select the `build` folder.
8. Play with with it!

##Structure
All your extension's development code must be placed in `src` folder, including the extension manifest.

##Packing
After the development of your extension run the command

```
$ NODE_ENV=production npm run build
```
Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store..

-------------
Rafał Leśniak
