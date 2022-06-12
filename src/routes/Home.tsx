import { useEffect, useState } from "react";
import Movie from "../components/Movie";

function Home() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [searchTitleInput, setSearchTitleInput] = useState('');

  const loadMovies = async () => {
    setLoading(true);

    const json = await (await fetch('https://yts.mx/api/v2/list_movies.json?minimum_rating=9.5&sort_by=year')).json();

    setMovies(json.data.movies);
    setSearchTitleInput('');
    setLoading(false);
  };

  const onClickRefresh = () => {
    loadMovies();
  };

  const searchedMovies = movies.filter(movie =>
    !searchTitleInput
    || movie.title.replace(/\s/g, '').toLowerCase().includes(searchTitleInput.replace(/\s/g, '').toLowerCase())
  );

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div>
      <h1>
        Home
      </h1>
      <div>
        <button
          type="button"
          style={{visibility: loading ? 'hidden' : undefined}}
          onClick={(event) => onClickRefresh()}>
          Refresh
        </button>
      </div>
      <hr />
      <div>
        {loading ?
          null :
          (
            <input
              type="text"
              placeholder="Search Title..."
              value={searchTitleInput}
              onChange={(event) => setSearchTitleInput(event.target.value)} />
          )
        }
      </div>
      <div>
        {loading ?
          (
            <span>
              Loading...
            </span>
          ) :
          null
        }
        {loading ?
          null :
          (
            <>
              {
                (searchedMovies.length > 0) ?
                  searchedMovies.map(movie =>
                    <Movie
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      summary={movie.summary}
                      image={movie.medium_cover_image}
                      genres={movie.genres}
                      summaryMaxLength={300} />
                  ) :
                  (
                    <p>
                      No Result found
                    </p>
                  )
              }
              <div>
                <button
                  type="button"
                  onClick={(event) => onClickRefresh()}>
                  Refresh
                </button>
              </div>
            </>
          )
        }
      </div>
    </div>
  );
}

interface MovieData {
  id: number;
  title: string;
  summary: string;
  medium_cover_image: string;
  genres: string[];
}

export default Home;
