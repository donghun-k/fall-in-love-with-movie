import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

const {
  PORT,
  TMDB_ACCESS_TOKEN,
  CORS_ALLOWED_ORIGIN_DEV,
  CORS_ALLOWED_ORIGIN_PROD,
} = process.env;

const corsOptions = {
  origin: [CORS_ALLOWED_ORIGIN_DEV, CORS_ALLOWED_ORIGIN_PROD].filter(
    (origin): origin is string => Boolean(origin),
  ),
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SEARCH MOVIE ROUTE
app.get('/search/movie', async (req: Request, res: Response) => {
  const { query, page } = req.query;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=ko-KR&page=${page}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },
      },
    );
    const json = await response.json();
    res.json(json);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET MOVIE DETAIL ROUTE
app.get('/movie/:movieId', async (req: Request, res: Response) => {
  const { movieId } = req.params;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },
      },
    );
    const json = await response.json();
    res.json(json);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET SIMILAR MOVIES ROUTE
app.get('/movie/:movieId/similar', async (req: Request, res: Response) => {
  const { movieId } = req.params;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?language=ko-KR`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },
      },
    );
    const json = await response.json();
    res.json(json);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
