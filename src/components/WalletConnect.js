import WalletContext from "./WalletContext";
import {connectWallet} from "../utils/WalletConnectHelpers";
import {useContext} from "react";

const WalletConnect = (props) => {

    const walletContext = useContext(WalletContext);

    const connectWalletPressed = async () => {
        const walletResponse = await connectWallet();
    };

    return (
        <div id={'walletConnect'}>
            <button id="walletButton" onClick={connectWalletPressed}>
                {walletContext.walletAddress.length > 0 ? (
                    String(walletContext.walletAddress).substring(0, 6) +
                    "..." +
                    String(walletContext.walletAddress).substring(38)
                ) : (
                    <span>Connect Wallet</span>
                )}
            </button>
            <p id="status">
                {walletContext.status}
            </p>
        </div>
    );
}

export default WalletConnect;