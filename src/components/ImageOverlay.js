import React, {useEffect, useState} from "react";
import {HuePicker} from "react-color";
import {Slider} from "@mui/material";

const ImageOverlay = (props) => {

    const [color1, setColor1] = useState(props)
    const [color2, setColor2] = useState(props)
    const [blendPercent, setBlendPercent] = useState(props)
    const [rotation, setRotation] = useState(props)

    // background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
    // linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
    // linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);

    const onBlendChange = (event, value) =>{
        setBlendPercent(value)
    }

    const onRotationChange = (event, value) =>{
        setRotation(value)
    }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         console.log('This will run every second!' +rotation);
    //
    //         setRotation((rotation+1) % 360)
    //
    //     }, 100);
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <div>
            <div id="image-container">
                <div className="filter-colors"
                     style={{
                         background: `linear-gradient(${rotation}deg, ${color1}, ${color2} ${blendPercent}%)`
                     }}/>
                <img src={props.image} className="base-image"/>
            </div>

            <Slider aria-label="Volume" value={blendPercent} onChange={onBlendChange} />

            <Slider aria-label="Volume" value={rotation} max={360} onChange={onRotationChange} />

            <HuePicker
                color={color1}
                onChangeComplete={(color) => {
                    setColor1(color.hex)
                }}/>

            <HuePicker
                onChangeComplete={(color) => { 
                    setColor2(color.hex)
                }}/>
        </div>
    );

}

export default ImageOverlay;