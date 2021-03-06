# <img src="logo.png" width="236" height="72" />
Webpage for the Android app [Showman](https://play.google.com/store/apps/details?id=com.fnp.showman) (Closed beta testing).
 
Direct links to TV Shows will serve the purpose of [deep-linking](https://developer.android.com/training/app-indexing/deep-linking.html) them with the Android app.

# Examples
- https://showman-app.herokuapp.com/shows/game-of-thrones
- https://showman-app.herokuapp.com/shows/sons-of-anarchy
- https://showman-app.herokuapp.com/shows/marvel-s-jessica-jones

# Usage
The app gets data and images from [Trakt.tv](https://trakt.tv/). API calls are proxied using a small [Express server](express-server.js). If you want to try this project locally, follow these steps:

1. Create a ```secrets.js``` file inside the root folder.
2. Inside that file write a constant as such:

```
module.exports = {
  TRAKT_API_KEY: "YOUR_TRAKT_API_KEY"
};
```

You can get your api key here https://trakt.tv/oauth/applications/new.

After that, you can just type ```npm start```and go to ```http://localhost:3000/shows/game-of-thrones``` (for example!)

# Testing
Tests are written using [Jest](https://facebook.github.io/jest/), running them is as simple as typing:

```
npm test
```
