import './App.css';
import ImageOverlay from "./components/ImageOverlay";
import WalletContext from "./components/WalletContext";
import {useEffect, useState} from "react";
import {addWalletListener, getCurrentWalletConnected} from "./utils/WalletHelpers";
import WalletConnect from "./components/WalletConnect";
import WalletContents from "./components/WalletContents";


function App() {
    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        async function connectWallet() {
            const {address, status} = await getCurrentWalletConnected();
            setWallet(address);
            setStatus(status);
        }

        connectWallet();
        addWalletListener(setStatus, setWallet);
    }, []);

    return (
        <WalletContext.Provider value={{walletAddress: walletAddress, status: status}}>
            <div className="App">
                <WalletConnect/>
                <WalletContents/>
            </div>
        </WalletContext.Provider>
    );
}

export default App;
