import './App.css';
import WalletContext from "./components/WalletContext";
import {useEffect, useState} from "react";
import {addWalletListener, getCurrentWalletConnected} from "./utils/WalletHelpers";
import WalletConnect from "./components/WalletConnect";
import WalletContents from "./components/WalletContents";
import Previews from "./components/previews/Previews";
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import grobot from "./images/grobot_tp.png";
import Redeem from "./components/Redeem";

function App() {
    const [walletAddress, setWalletAddress] = useState("");
    const [status, setStatus] = useState("");


    useEffect(() => {
        async function connectWallet() {
            const {address, status} = await getCurrentWalletConnected();
            setWalletAddress(address);
            setStatus(status);
        }

        connectWallet();
        addWalletListener(setWalletAddress, setStatus);
    }, []);

    return (
        <div className="App">
            <WalletContext.Provider value={{walletAddress: walletAddress, status: status}}>
                <Router>
                    <div id={'App-left'}>
                        <Route path="/" component={WalletConnect}/>
                        <ul id={'nav'}>
                            <li><Link to={'/home'}>Home</Link></li>
                            <li><Link to={'/explore'}>Explore</Link></li>
                            <li><Link to={'/redeem'}>Redeem</Link></li>
                        </ul>
                        <img className={'grobot'} src={grobot}/>
                    </div>


                    <div id={'App-right'}>
                        <Route path="/home" component={Previews}/>
                        <Route path="/explore" component={WalletContents}/>
                        <Route path="/redeem" component={Redeem}/>
                    </div>
                </Router>
            </WalletContext.Provider>
        </div>
    );
}

export default App;
