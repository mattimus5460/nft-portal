import React, {useState} from "react";
import painting from "../images/atlantis-crop.jpg";
import {HuePicker, SwatchesPicker} from "react-color";


const ImageOverlay = (props) => {

    const [color1, setColor1] = useState("#"+Math.floor(Math.random() * 16777215).toString(16))
    const [color2, setColor2] = useState("#"+Math.floor(Math.random() * 16777215).toString(16))

    // background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
    // linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
    // linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);

    return (
        <div>
            <div id="image-container">
                <div className="filter-colors"
                     style={{
                         background: `linear-gradient(to right top, ${color1}, ${color2})`
                     }}/>
                <img src={props.image} className="base-image"/>
            </div>

            <HuePicker
                color={color1}
                onChangeComplete={(color) => {
                    setColor1(color.hex)
                }}/>

            <SwatchesPicker
                onChangeComplete={(color) => { 
                    setColor2(color.hex)
                }}/>
        </div>
    );
}

export default ImageOverlay;