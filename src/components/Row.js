import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import Modal from "./Modal";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [open, setOpen] = useState(false);

  // A snippet of code which runs based on a specific condition/varaible
  // 특정 조건/변수를 기반으로 실행되는 코드 조각
  useEffect(() => {
    // if [], run once when the row loads, and dont run again
    // 빈배열일 경우 로드될 때 한 번 실행 후 실행 안함
    async function fetchDate() {
      // axios에서 데이터베이스에 요청한 인스턴스를 받아온다.
      const request = await axios.get(fetchUrl);
      // console.log(request) // 데이터를 무엇을 받는지 확인을 하고 필요한 데이터를 사용하면된다.
      setMovies(request.data.results);
      return request; // 왜 필요하지 ?
    }
    fetchDate();
  }, [fetchUrl]); // fetchUrl의 데이터가 업데이트 될떄마다 실행

  const opts = {
    // height: "390",
    // width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      modestbranding: 1,
      controls: 0,
    },
  };

  // 깃 참고
  // https://github.com/ahmetalpergit/netflix-clone/blob/master/src/components/Row.js
  // Promises - then, catch, all, race, finally 관련 참고자료
  // https://ssungkang.tistory.com/entry/ES6-Promises-then-catch-all-race-finally
  const handleClick = (movie) => {
    console.log(movie);
    setMovie(movie);
    openModal();
  };
  const openModal = () => {
    setOpen(true);
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {/* 모달창 */}
      {/* <Modal open={open} movie={{movie}}></Modal> */}
      {/* {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} */}
      {/* <YouTube videoId='XtMThy8QKqU' opts={opts} /> */}
    </div>
  );
}

export const handleError = function () {
  const html = `
    <div class="error">
        <div class="error__text">
            <p class="error__heading">Error:</p>
            <p class="error__description">Can't find trailer, please try another title!</p>
        </div>
    </div>
    `;
  const body = document.querySelector("body");
  body.insertAdjacentHTML("afterbegin", html);
  const error = body.querySelector(".error");
  error.classList.add("fade-in");

  setTimeout(function () {
    // error.classList.remove('fade-in');
    error.classList.add("fade-out");
    setTimeout(function () {
      error.remove();
    }, 500);
  }, 2500);
};

export default Row;
