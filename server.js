import express from 'express';
const app = express();
import top250 from './top250.json' assert { type: 'json' };
import MostPopular from './MostPopular.json' assert { type: 'json' };
import InTheatres from './InTheatres.json' assert { type: 'json' };

app.get('/top', (req, res) => {
  res.status(200).send(top250);
});
app.get('/popular', (req, res) => {
  res.status(200).send(MostPopular);
});
app.get('/theatres', (req, res) => {
  res.status(200).send(InTheatres);
});

app.get('/details', (req, res) => {
  //call title API with plot included in query
  console.log(req.query.id);
  res.status(200).send({
    plot:
      req.query.id +
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`listening on port ${port}`));
