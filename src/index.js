import {SpotifyAPI} from "./queryAlbum.js";
import createSchema from "./schema.js";
import {graphql} from "graphql";

const spotify = new SpotifyAPI();
spotify.authenticate();
const schema = createSchema(spotify);
const query = async () => {
  const result = await graphql(schema, `{ getAlbum(title: "blue+album") { 
   artist {
     name    
     link    
   }
   images {
     url
   },
   genres, popularity
  }}`);

  console.log(JSON.stringify(result));
}

setTimeout(query, 500)