import React, { useEffect, useState } from "react";

function Row(props) {
    const [movies, setMovies] = useState([]);

    // A snippet of code which runs based on a specific condition/varaible
    useEffect(() => {
        // if [], run once when the row loads, and dont run again
        // movies행이 로드될 때 한 번 실행 후 실행 안함
    }, [movies]);

    return (
        <div>
            <h2>{props.tilte}</h2>

            {/* container -> posters */}

        </div>
    )
}

export default Row