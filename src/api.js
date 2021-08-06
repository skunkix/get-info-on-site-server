import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Album {
      artist: Artist!,
      id: String!,
      link: String,
      genres: [String],
      images: [Image],
      label: String,
      name: String!,
      popularity: Int,
      release_date: String,
      num_tracks: Int
    }
    type Artist {
      id: String
      name: String
      link: String
    }
    type Image {
      url: String 
    }
    type Query {
      getAlbum(title: String): Album
    }
  `);

function start() {
}

export default start;