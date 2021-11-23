import React, { useEffect, useState } from "react";
import axios from '../axios';
import './Row.css';

const base_url = "https://image.tmdb.org/t/p/original";

function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);

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
            // return request; // 왜 필요하지 ? 
        }
        fetchDate();
    }, [fetchUrl]); // fetchUrl의 데이터 만큼 반복

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {movies.map((movie) => (
                    <img 
                    key={movie.id}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                    alt={movie.name}/>
                ))}
            </div>
            {/* container -> posters */}

        </div>
    )
}

export default Row