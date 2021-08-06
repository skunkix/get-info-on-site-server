import {SpotifyAPI} from "./queryAlbum.js";
import startApi from "./api.js";

const spotify = new SpotifyAPI();
spotify.authenticate();

setTimeout(async () => console.log(await spotify.queryAlbum("ok+computer")), 500)