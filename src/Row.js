import React, { useEffect, useState } from "react";
import axios from './axios';
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

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
    }, [fetchUrl]); // fetchUrl의 데이터 만큼 반복

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    
    // Promises - then, catch, all, race, finally 관련 참고자료
    // https://ssungkang.tistory.com/entry/ES6-Promises-then-catch-all-race-finally
    const handleClick = (movie) => {
        console.log(movie);
        console.log(trailerUrl);
        console.log(movieTrailer(movie?.name || ""))
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            console.log('else');
            console.log(movieTrailer(movie?.name || ""));
            movieTrailer(movie?.name || "")
                .then((url) => {
                    console.log(url);
                    // https://www.youtube.com/watch?v=XtMThy8QKqU
                    const urlParams = new URLSearchParams(new URL(url).search);
                    console.log(urlParams);
                    // 주소 뒤에 추가되는 부분 watch? 이후에 v부분을 가져온다.
                    // setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {movies.map((movie) => (
                    <img 
                    key={movie.id}
                    onClick={() => handleClick(movie)}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                    alt={movie.name}/>
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            {/* <YouTube videoId='XtMThy8QKqU' opts={opts} /> */}
        </div>
    )
}

export default Row