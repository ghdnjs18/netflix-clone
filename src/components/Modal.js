import React, { useState } from 'react'
import Button from "./Button"
import Detail from "./Detail"

import './Modal.css'

const Modal = ({open, movie}) => {
    const [isopen, setIsopen] = useState(false);
    
    setIsopen(open)

    const closeModal = () => {
        setIsopen(false)
    }

    console.log(movie)
    return (
        <div className={`Modal-container ${isopen? "open":"close"}`}>
            <div className='Modal'>
                <div className="header">-- 상세 정보 --</div>
                <div className="body">
                    {/* <Detail state={{movie}}></Detail> */}
                    {/* {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} */}
                </div>
                <div className="footer">
                    <Button size='small' handleClick={closeModal}>Close</Button>
                </div>
            </div>
        </div>
    )
}

export default Modal

Modal.defaultProps = {
    open: false
}