import {
  GraphQLInt as Int,
  GraphQLList as List,
  GraphQLObjectType as Object,
  GraphQLSchema,
  GraphQLString as String
} from "graphql";

function createSchema(spotifyApi) {
  const Album = new Object({
    name: "Album",
    fields: () => ({
      artist: { type: Artist },
      id: { type: String },
      link: { type: String },
      genres: { type: new List(String) },
      images: { type: new List(Image) },
      label: { type: String },
      name: { type: String },
      popularity: { type: Int },
      release_date: { type: String },
      num_tracks: { type: Int }
    })
  });

  const Artist = new Object({
    name: "Artist",
    fields: {
      id: { type: String },
      name: { type: String },
      link: { type: String }
    }
  });

  const Image = new Object({
    name: "Image",
    fields: {
      url: { type: String }
    }
  });

  const Query = new Object({
    name: "Query",
    fields: {
      getAlbum: {
        type: Album,
        args: { title: { type: String } },
        async resolve(parent, args) {
          const result = await spotifyApi.queryAlbum(args.title);
          return {
            ...result,
            artist: {
              id: result.artists[0].id,
              link: result.artists[0].href,
              name: result.artists[0].name
            },
            link: result.href,
            num_tracks: result.total_tracks
          }
        }
      }
    }
  });

  return new GraphQLSchema({ query: Query });
}

export default createSchema;