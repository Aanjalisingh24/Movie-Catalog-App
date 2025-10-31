import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import rawMovies from '../data/movies.json';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import axios from 'axios';
import Select from 'react-select';

const safeLower = (v = '') => (typeof v === 'string' ? v.toLowerCase() : '');
const toNumber = (v) => (Number.isFinite(+v) ? +v : NaN);

const movies = rawMovies.map((m) => ({
  ...m,
  genresArr: Array.isArray(m.genres) ? m.genres :
    String(m.genres).split('|').map((g) => g.trim()).filter(Boolean),
}));

const uniq = (arr) => Array.from(new Set(arr));
const GENRES =uniq(movies.flatMap((m) => m.genresArr));
const YEARS = ['All Release Years', ...uniq(movies.map((m) => m.release_year))];
const RATINGS = ['All IMDb Ratings', ...uniq(movies.map((m) => m.imdb_rating))];

const PER_PAGE = 12;

const MoviesCatalog = () => {
  const navigate = useNavigate();
  const genreOptions = GENRES.map((g) => ({ value: g, label: g }));
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [search, setSearch] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [year, setYear] = useState('All Release Years');
  const [rating, setRating] = useState('All IMDb Ratings');
  const [duration, setDuration] = useState('Duration');
  const [page, setPage] = useState(0);
  const [view, setView] = useState(movies);
  const [favorites, setFavorites] = useState(new Set());
  const [isFavoritesView, setIsFavoritesView] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3005/me', { withCredentials: true })
      .then((res) => {
        if (res.data.loggedIn) {
          setUserId(res.data.user.id);
          setUserEmail(res.data.user.email);
        } else {
          navigate('/login');
        }
      })
      .catch(() => {
        navigate('/login');
      });
  }, []);

  useEffect(() => {
    let data = movies;
    if (selectedGenres.length > 0) {
      data = data.filter((m) =>
        m.genresArr.some((g) => selectedGenres.includes(g))
      );
    }
    if (year !== 'All Release Years') {
      const y = toNumber(year);
      data = data.filter((m) => m.release_year === y);
    }
    if (rating !== 'All IMDb Ratings') {
      const r = parseFloat(rating);
      data = data.filter((m) => m.imdb_rating === r);
    }
    if (duration !== 'Duration') {
      const d = toNumber(duration);
      data = data.filter((m) => m.length_in_min === d);
    }
    if (search.trim()) {
      const q = safeLower(search);
      data = data.filter((m) => safeLower(m.title).includes(q));
    }

    setView(data);
    setPage(0);
  }, [selectedGenres, year, rating, duration, search]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`http://localhost:3005/favorites/${userId}`, {
          credentials: 'include',
        });
        const data = await res.json();
        const favSet = new Set(data.map((f) => `${f.movie_title}_${f.release_year}`));
        setFavorites(favSet);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };
    fetchFavorites();
  }, [userId]);

  const toggleFavorite = async (movie) => {
    if (!userId) {
      alert("Please log in to save favorites.");
      return;
    }
    const res = await fetch('http://localhost:3005/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        title: movie.title,
        release_year: movie.release_year,
      }),
    });
    if (res.ok) {
      const key = `${movie.title}_${movie.release_year}`;
      const updated = new Set(favorites);
      favorites.has(key) ? updated.delete(key) : updated.add(key);
      setFavorites(updated);
    }
  };

  const handleLogout = () => {
    fetch('http://localhost:3005/logout', {
      method: 'POST',
      credentials: 'include',
    }).then(() => {
      navigate('/login');
    });
  };

  const filteredView = isFavoritesView
    ? view.filter((m) => favorites.has(`${m.title}_${m.release_year}`))
    : view;

  const paged = filteredView.slice(page, page + PER_PAGE);

  return (
    <main>
      <div className="p-4 flex flex-col md:flex-row justify-between items-center bg-[#121212] text-white gap-3">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#FFD700]">FilmFlare</h1>

        <div className="flex flex-wrap gap-2 items-center justify-center">
          <span className="bg-gray-800 px-2 py-1 rounded text-sm">{userEmail}</span>

          <button onClick={() => setIsFavoritesView(!isFavoritesView)} 
          className="bg-red-600 text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-red-600 px-3 py-1 rounded">
          {isFavoritesView ? "All Movies" : "Favorites"}
          </button>
          
          <button onClick={handleLogout} className="bg-[#FFD700] text-[#000000] hover:bg-[#000000] hover:text-[#FFD700] px-3 py-1 rounded">Logout</button>
        </div>
      </div>

      <div className="bg-black p-3 flex flex-col lg:flex-row gap-3 items-center">
        <input type="text" placeholder="Search..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full lg:w-1/4"
        />
        <div className="flex flex-wrap gap-3 justify-center lg:ml-auto">
          <Select isMulti name="genres" options={genreOptions}
            value={genreOptions.filter((o) => selectedGenres.includes(o.value))}
            onChange={(selected) => setSelectedGenres(selected.map((s) => s.value))}
            className="min-w-[150px]"
          />
          {[{ list: YEARS, val: year, on: setYear }, { list: RATINGS, val: rating, on: setRating }].map(({ list, val, on }, i) => (
            <select key={i} value={val}
              onChange={(e) => on(e.target.value)}
              className="p-2 border rounded min-w-[120px]">
              {list.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-4 bg-black min-h-screen">
        {paged.length === 0 ? (
          <p className="text-white col-span-full text-center">No movies found</p>
        ) : (
          paged.map((m, i) => {
            const key = `${m.title}_${m.release_year}`;
            return (
              <Card key={i} style={{ position: 'relative', border: 'none', height: '28rem' }}
                className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-[0_3px_12px_1px_#FFD700]">
                <Card.Img src={m.poster} onError={(e) => 
                { e.target.onerror = null; e.target.src = '/no-image-logo.jpg'; }} 
                style={{ height: '15rem' }} />

                <button onClick={() => toggleFavorite(m)}
                  style={{ position: 'absolute', top: 8, right: 8, background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
                  title="Toggle Favorite">
                  {favorites.has(key) ? <FaHeart className="text-red-600" /> : <FaRegHeart className="text-gray-300" />}
                </button>
                
                <Card.Body className="bg-[#121212] text-white">
                  <Card.Title className="text-center mt-1">{m.title}</Card.Title>
                  <p><b>Genre:</b> {m.genresArr.join(', ')}</p>
                  <p><b>IMDb:</b> {m.imdb_rating}</p>
                  <p><b>Year:</b> {m.release_year}</p>
                  <div className="text-center mt-4">
                    <a href={m.movie_url} target="_blank" rel="noreferrer"
                      className="bg-[#FFD700] text-[#000000] hover:bg-[#000000] hover:text-[#FFD700] px-3 py-1 rounded inline-block">
                      Watch&nbsp;Here
                    </a>
                  </div>
                </Card.Body>
              </Card>
            );
          })
        )}
      </div>

      {filteredView.length > PER_PAGE && (
        <div className="flex justify-center gap-3 py-4 bg-[#221F1F]">
          <button onClick={() => setPage((p) => Math.max(0, p - PER_PAGE))} disabled={page === 0} 
          className="bg-[#FFD700] text-[#000000] hover:bg-[#000000] hover:text-[#FFD700] px-3 py-1 rounded disabled:opacity-50">
            Prev
          </button>
          <button onClick={() => setPage((p) => p + PER_PAGE)} disabled={page + PER_PAGE >= filteredView.length} 
          className="bg-[#FFD700] text-[#000000] hover:bg-[#000000] hover:text-[#FFD700] px-3 py-1  rounded disabled:opacity-50">
            Next
          </button>
        </div>
      )}
    </main>
  );
};
export default MoviesCatalog;
