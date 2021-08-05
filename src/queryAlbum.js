import axios from "axios";

export class SpotifyAPI {
  accessToken = "";

  async authenticate() {
    const client_id = "8b05134a3231406ca27a13d59c5ce446";
    const client_secret = "1b23c620890b4285a7c6dfce8f4755d5";
    try {
      const response = await axios.post("https://accounts.spotify.com/api/token",
        "grant_type=client_credentials", {
          headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
          }
        });
      this.accessToken = response.data.access_token;
    } catch {
      console.error("Spotify authentication failed");
    }
  }

  async queryAlbum(term) {
    if (!this.accessToken) {
      console.error("Cannot use Spotify API without access token");
      return;
    }

    const id = await this.queryAlbumsForId(term);
    if (id) {
      try {
        const response = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
          headers: this.getPostAuthorizationHeaders()
        });
        return response.data;
      } catch {
        console.error("Album query by ID failed");
      }
    }
  }

  async queryAlbumsForId(term) {
    try {
      const response = await axios.get(`https://api.spotify.com/v1/search?query=${term}&offset=0&limit=1&type=album`, {
        headers: this.getPostAuthorizationHeaders()
      });
      return response.data.albums.items[0].id;
    } catch {
      console.error("Spotify search failed");
      return null;
    }
  }

  getPostAuthorizationHeaders() {
    return {
      Authorization: 'Bearer ' + this.accessToken
    }
  }

}