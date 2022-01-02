import './App.css';
import WalletContext from "./components/WalletContext";
import {useEffect, useState} from "react";
import {addWalletListener, getCurrentWalletConnected} from "./utils/WalletConnectHelpers";
import WalletConnect from "./components/WalletConnect";
import WalletContents from "./components/WalletContents";
import Previews from "./components/previews/Previews";
import {BrowserRouter, Link, Outlet, Route, Routes} from "react-router-dom";
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
        <WalletContext.Provider value={{walletAddress: walletAddress, status: status}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Previews/>}/>
                        <Route path="explore" element={<WalletContents/>}/>
                        <Route path="redeem" element={<Redeem/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </WalletContext.Provider>
    );
}

function Layout() {
    return (
        <div className="App">
            <div id={'App-left'}>
                <WalletConnect/>
                <ul id={'nav'}>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='explore'>Explore</Link></li>
                    <li><Link to='redeem'>Redeem</Link></li>
                </ul>
                <img className={'grobot'} src={grobot}/>
            </div>

            <div id={'App-right'}>
                <Outlet/>
            </div>
        </div>
    );
}

export default App;
