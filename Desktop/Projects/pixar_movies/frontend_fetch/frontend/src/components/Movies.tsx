import { useState, useEffect, useRef } from "react";
import { Movie } from "../types/types";
import { Boxoffice } from "../types/types";
import fetchData from "../fetch/fetch";

export default function Movies() {
  const moviesPath = "http://localhost:3000/movies";
  const postersPath = "http://localhost:3000/image";
  const boxofficePath = "http://localhost:3000/boxoffice";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [boxoffice, setBoxoffice] = useState<Boxoffice[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetchData(moviesPath);
      setMovies(data);
    };

    const fetchBoxoffice = async () => {
      const data = await fetchData(boxofficePath);
      setBoxoffice(data);
    };

    fetchMovies();
    fetchBoxoffice();
  }, []);

  const handleOpenPopup = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setSelectedMovie(null);
    setIsPopupOpen(false);
  };

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePopupCloseOutsideClick = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        handleClosePopup();
      }
    };

    document.addEventListener("mousedown", handlePopupCloseOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handlePopupCloseOutsideClick);
    };
  }, []);

  return (
    <div>
      <header>
        <h1>Pixar movies</h1>
      </header>
      <div className="container">
        {movies.map((movie) => (
          <div
            className="card"
            key={movie.id}
            onClick={() => handleOpenPopup(movie)}
          >
            <img
              className="card-image"
              src={`${postersPath}/${movie.id}`}
              alt={movie.Title}
            />
            <div className="card-content">
              <h3 className="title">{movie.Title}</h3>
              <div className="rating-circle">
                {boxoffice.find((obj) => obj.Movie_id === movie.id)?.Rating ||
                  "N/A"}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <div
          className={`popup-overlay ${isPopupOpen ? "" : "blur-background"}`}
        >
          <div className="popup" ref={popupRef}>
            <img
              className="popup-image"
              src={`${postersPath}/${selectedMovie.id}`}
              alt={selectedMovie.Title}
            />
            <div className="popup-info">
              <h2>{selectedMovie.Title}</h2>
              <p>
                <strong>Rating:</strong>{" "}
                {
                  boxoffice.find((obj) => obj.Movie_id === selectedMovie.id)
                    ?.Rating
                }
              </p>
              <p>
                <strong>Director:</strong> {selectedMovie.Director}
              </p>
              <p>
                <strong>Year:</strong> {selectedMovie.Year}
              </p>
              <p>
                <strong>Length:</strong> {selectedMovie.Length_minutes} minutes
              </p>
              <p>
                <strong>Domestic sales:</strong>{" "}
                {
                  boxoffice.find((obj) => obj.Movie_id === selectedMovie.id)
                    ?.Domestic_sales
                }$
              </p>
              <p>
                <strong>International sales:</strong>{" "}
                {
                  boxoffice.find((obj) => obj.Movie_id === selectedMovie.id)
                    ?.International_sales
                }$
              </p>
              {/* <button onClick={handleClosePopup}>Close</button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
