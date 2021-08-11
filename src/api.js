import {buildSchema, graphql} from "graphql";

const schema = buildSchema(`
    type Query {
      getAlbum(title: String!): Album
    }
    type Album {
      artist: Artist!
      id: String!
      link: String
      genres: [String]
      images: [Image]
      label: String
      name: String!
      popularity: Int
      release_date: String
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
  `);

async function query(spotifyApi, q) {
  const root = {
    getAlbum: async (args) => {
      const data = await spotifyApi.queryAlbum(args.title);
      return {
        ...data,
        artist: data.artists[0],
        link: data.href,
      }
    },
    Album: {
      artist: (obj) => {
        return { ...obj, link: obj.href }
      }
    },
    Artist: (obj) => {
      return {
        id: obj.id,
        name: obj.artists.name,
        link: obj.href
      }
    },
  }

  // Example query
   //  `{ getAlbum(title: "blue+album") {
   //  artist {
   //    name
   //  }
   //  images {
   //    url
   //  }
   // }}`

  const result = await graphql(schema, `{ getAlbum(title: "blue+album") { 
   artist {
     name    
     link    
   }
   images {
     url
   } 
  }}`, root);
  console.log(JSON.stringify(result));
}

export default query;

