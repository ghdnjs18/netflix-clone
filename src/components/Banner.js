import { useEffect, useState } from "react";
import axios from "../axios";
import requests from '../requests';
import './Banner.css'

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => { // 랜덤으로 데이터 하나만 선택해서 
        async function fetchDate() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[
                Math.floor(Math.random()*request.data.results.length - 1)
            ]);
            // return request; // 왜 필요하지 ? 
        }
        fetchDate();
    }, []);

    // console.log(movie)

    function truncate(str, n) { // n개의 글자수 초과하는 내용은 자르고 ... 으로 대체 아니면 그대로 출력
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    // ?.으로 사용하는 건 뭘까 ? 
    return (
        // 배경 이미지
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
                backgroundPosition: "center center"
            }}
            > 
            <div className="banner__contents">
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>

                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>

                <h1 className="banner__description">{movie?.overview}</h1>
                {truncate(movie?.overview, 150)}
            </div>

            <div className="banner__fadeBottom"/>
        </header>
    )
}

export default Banner