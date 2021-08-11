import {SpotifyAPI} from "./queryAlbum.js";
import startApi from "./api.js";
import query from "./api.js";

const spotify = new SpotifyAPI();
spotify.authenticate();

setTimeout(() => query(spotify), 500)