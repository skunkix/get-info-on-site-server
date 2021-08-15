import {SpotifyAPI} from "./queryAlbum.js";
import createSchema from "./schema.js";
import express from "express";
import { graphqlHTTP } from 'express-graphql';

const spotify = new SpotifyAPI();
spotify.authenticate();

const app = express();
const schema = createSchema(spotify);
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000);