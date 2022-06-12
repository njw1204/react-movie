import { Link } from 'react-router-dom';
import styles from './Movie.module.css';

function Movie({ id, title, summary, image, genres, summaryMaxLength }: MovieProps) {
  return (
    <div className={styles.movie_container}>
      <div className={styles.movie_image_container}>
        <img
          className={styles.movie_image}
          src={image}
          alt={title} />
      </div>
      <div>  
        <Link
          className={styles.movie_title}
          to={`/movie/${id}`}>
          <strong>{title}</strong>
        </Link>
        <div className={styles.movie_genres}>
          {genres.length > 0 ?
            (
              <>
                &bull;
                {' '}
                {genres.join(', ')}
              </>
            ) :
            null
          }
        </div>
        <hr />
        <p className={styles.movie_summary}>
          {summaryMaxLength && summary.length > summaryMaxLength ? `${summary.slice(0, summaryMaxLength)}...` : summary}
        </p>
      </div>
    </div>
  );
}

interface MovieProps {
  id: number;
  title: string;
  summary: string;
  image: string;
  genres: string[];
  summaryMaxLength?: number;
}

export default Movie;
