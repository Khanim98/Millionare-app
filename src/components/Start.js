import React from "react";

export default function Start({setUserName}){

    const inputRef = React.useRef();
    const handleClick = () => {
        inputRef.current.value && setUserName(inputRef.current.value)
    }
    return(
        <div className="start">
            <input ref={inputRef} type="text" placeholder="enter your name" className="startInput"/>
            <button onClick={handleClick} className="start-button">Start</button>
        </div>
    )
}