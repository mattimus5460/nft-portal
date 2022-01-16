import React from "react";
import "./previews/previews.css"
import grobot from "../images/grobot_tp.png";

const Home = (props) => {

    return (
        <div>
            <img className={'grobot'} src={grobot}/>
        </div>
    );
}

export default Home;