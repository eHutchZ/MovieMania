import express, { response } from 'express';
const app = express();
import bodyParser from 'body-parser';
import axios from 'axios';
import NodeCache from 'node-cache';
import InTheatres from './InTheatres.json' assert { type: 'json' };

const nodeCache = new NodeCache({ stdTTL: 120 });

//in real world, set as env variable. Pushing, as it's free and giving reviewers ease of access to run
const API_KEY = 'k_73493nue';

const IMDB_BASE_URL = 'https://imdb-api.com/en/API/';
const IMDB_ENDPOINT = {
  TOP_RATED: 'Top250Movies/',
  MOST_POPULAR: 'MostPopularMovies/',
  IN_THEATRES: 'InTheaters/',
  TITLE: 'Title/',
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/top', async (req, res) => {
  try {
    let response;
    if (nodeCache.has('top')) {
      console.log('Top 250 - pulling from cache');
      response = nodeCache.get('top');
      res.status(200).send(response);
    } else {
      response = await axios.get(
        `${IMDB_BASE_URL}${IMDB_ENDPOINT.TOP_RATED}${API_KEY}`
      );
      if (response.data) {
        response.data.errorMessage.length === 0 &&
          nodeCache.set('top', response.data);
        res.status(200).send(response.data);
      } else {
        res.status(500).send({ errorMessage: 'true' });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
app.get('/popular', async (req, res) => {
  try {
    let response;
    if (nodeCache.has('popular')) {
      console.log('Popular - pulling from cache');
      response = nodeCache.get('popular');
      res.status(200).send(response);
    } else {
      response = await axios.get(
        `${IMDB_BASE_URL}${IMDB_ENDPOINT.MOST_POPULAR}${API_KEY}`
      );
      if (response.data) {
        response.data.errorMessage.length === 0 &&
          nodeCache.set('popular', response.data);
        res.status(200).send(response.data);
      } else {
        res.status(500).send({ errorMessage: 'true' });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
app.get('/theatres', async (req, res) => {
  try {
    let response;
    if (nodeCache.has('theatres')) {
      console.log('Theatres - pulling from cache');
      response = nodeCache.get('theatres');
      res.status(200).send(response);
    } else {
      const response = await axios.get(
        `${IMDB_BASE_URL}${IMDB_ENDPOINT.IN_THEATRES}${API_KEY}`
      );
      if (response.data) {
        response.data.errorMessage.length === 0 &&
          nodeCache.set('theatres', response.data);
        res.status(200).send(response.data);
      } else {
        res.status(500).send({ errorMessage: 'true' });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get('/details', async (req, res) => {
  try {
    const response = await axios.get(
      `${IMDB_BASE_URL}${IMDB_ENDPOINT.TITLE}${API_KEY}/${req.query.id}`
    );
    if (response.data) {
      res.status(200).send({ plot: response.data.plot });
    } else {
      res.status(500).send({ errorMessage: 'true' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`listening on port ${port}`));
