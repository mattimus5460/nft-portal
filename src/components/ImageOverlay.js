import React, {useEffect, useState} from "react";
import {HuePicker, SwatchesPicker} from "react-color";
import {Slider} from "@mui/material";

const ImageOverlay = (props) => {

    const [color1, setColor1] = useState(props)
    const [color2, setColor2] = useState(props)
    const [blendPercent, setBlendPercent] = useState(50)
    const [rotation, setRotation] = useState(0)
    const [opacity, setOpacity] = useState(.5)

    // background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
    // linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
    // linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);

    //
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         console.log(rotation)
    //         setRotation(rotation => (rotation + 2) % 360);
    //     }, 50);
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <div>
            <div id="image-container">
                <div className="filter-colors"
                     style={{
                         opacity: `${opacity}`,
                         background: `linear-gradient(${rotation}deg, ${color1}, ${color2} ${blendPercent}%)`
                     }}/>
                <img src={props.image} className="base-image"/>
            </div>

            <Slider aria-label="Volume" value={blendPercent} onChange={(e, v) => setBlendPercent(v)}/>

            <Slider aria-label="Volume" value={rotation} max={360} onChange={(e, v) => setRotation(v)}/>

            <Slider aria-label="Volume" value={opacity} max={1} step={.01} onChange={(e, v) => setOpacity(v)}/>

            <SwatchesPicker
                color={color1}
                onChangeComplete={(color) => {
                    setColor1(color.hex)
                }}/>

            <SwatchesPicker
                color={color2}
                onChangeComplete={(color) => {
                    setColor2(color.hex)
                }}/>


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