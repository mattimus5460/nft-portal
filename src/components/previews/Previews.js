import React, {useState} from "react";
import painting from "../../images/atlantis-crop.jpg";
import {HuePicker, SwatchesPicker} from "react-color";
import "./previews.css"
import grobot_green from "../../images/grobot-green-small.png";
import grobot_pink from "../../images/grobot-pink-small.png";
import grobot_yellow from "../../images/grobot-yellow-small.png";
import grobot_ltblue from "../../images/grobot-ltblue-small.png";
import atlantis from "../../images/atlantis-crop.jpg";
import entheo1 from "../../images/entheo-small.png";
import entheo2 from "../../images/entheo-small-2.png";
import entheo3 from "../../images/entheo-small-3.png";
import entheo4 from "../../images/entheo-small-4.png";

const Previews = (props) => {

    return (
        <div>
            <div class="preview-container">
                <div className={'preview-header'}>
                    <div class={'preview-header-left'}>GroBot Collection</div>
                    <div className={'preview-header-right'}>1111 total</div>
                </div>

                <div className={'preview-content'}>
                    <img src={grobot_green} className="base-image"/>
                </div>
                <div className={'preview-content'}>
                    <img src={grobot_pink} className="base-image"/>
                </div>
                <div className={'preview-content'}>
                    <img src={grobot_yellow} className="base-image"/>
                </div>
                <div className={'preview-content'}>
                    <img src={grobot_ltblue} className="base-image"/>
                </div>
            </div>
            <div className="preview-container">
                <div className={'preview-header'}>
                    <div className={'preview-header-left'}>Entheo Collection</div>
                    <div className={'preview-header-right'}>222 total</div>
                </div>

                <div className={'preview-content'}>
                    <img src={entheo1} className="base-image"/>
                </div>
                <div className={'preview-content'}>
                    <img src={entheo2} className="base-image"/>
                </div>
                <div className={'preview-content'}>
                    <img src={entheo3} className="base-image"/>
                </div>
                <div className={'preview-content'}>
                    <img src={entheo4} className="base-image"/>
                </div>
            </div>

            <div className="preview-container">
                <div className={'preview-header'}>
                    <div className={'preview-header-left'}>Atlantis Collection</div>
                    <div className={'preview-header-right'}>333 total</div>
                </div>

                <div className={'preview-content'}>

                    <img src={atlantis} className="base-image"/>
                </div>
                <div className={'preview-content'}>

                    <img src={atlantis} className="base-image"/>
                </div>
            </div>

        </div>
    );
}

export default Previews;