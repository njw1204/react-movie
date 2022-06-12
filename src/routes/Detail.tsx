import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<MovieDetailData>();

  const loadMovie = useCallback(async () => {
    setLoading(true);

    const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();

    setMovie(json.data.movie);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    loadMovie();
  }, [loadMovie]);

  return (
    <div>
      <h1>Detail</h1>
      <div>
        <Link to="/">
          <button
            type="button">
            Go Home
          </button>
        </Link>
      </div>
      <hr />
      {loading ?
        (
          <span>
            Loading...
          </span>
        ) :
        (
          <>
            <Movie
              key={movie?.id}
              id={Number(movie?.id)}
              title={String(movie?.title)}
              summary={String(movie?.description_full)}
              image={String(movie?.medium_cover_image)}
              genres={movie?.genres ?? []} />
            <div>
              <p>
                <strong>
                  Torrents
                </strong>
              </p>
              <ol>
                {(movie?.torrents ?? []).map(torrent => (
                  <li key={torrent.url}>
                    <a
                      href={torrent.url}
                      target="_blank"
                      rel="noreferrer">
                      {torrent.hash}
                    </a>
                    {' '}
                    ({torrent.quality.replace(/\s/g, '')}, {torrent.size.replace(/\s/g, '')})
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <Link to="/">
                <button
                  type="button">
                  Go Home
                </button>
              </Link>
            </div>
          </>
        )
      }
    </div>
  );
}

interface MovieDetailData {
  id: number;
  title: string;
  description_full: string;
  medium_cover_image: string;
  genres: string[];
  torrents: MovieDetailTorrentData[];
}

interface MovieDetailTorrentData {
  url: string;
  hash: string;
  quality: string;
  size: string;
}

export default Detail;
