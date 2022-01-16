import WalletContext from "./components/WalletContext";
import {useEffect, useState} from "react";
import {addWalletListener, getCurrentWalletConnected} from "./utils/WalletConnectHelpers";
import WalletConnect from "./components/WalletConnect";
import WalletContents from "./components/WalletContents";
import Previews from "./components/previews/Previews";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import Redeem from "./components/Redeem";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from "./components/Home";
import {Container, Nav, Navbar} from "react-bootstrap";

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
                        <Route index element={<Home/>}/>
                        <Route path="explore" element={<Previews/>}/>
                        <Route path="redeem" element={<WalletContents/>}/>
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
            <div id={'App-top'}>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">Grobot's Multiverse</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            {/*<Nav className="me-auto">*/}
                            {/*    <Nav.Link href="/explore">Explore</Nav.Link>*/}
                            {/*    <Nav.Link href="/redeem">Redeem</Nav.Link>*/}
                            {/*</Nav>*/}

                            <Nav>
                                <Nav.Link href="/explore">Explore</Nav.Link>
                                <Nav.Link href="/redeem">Redeem</Nav.Link>
                            </Nav>

                        </Navbar.Collapse>

                    </Container>
                </Navbar>

                <WalletConnect/>
            </div>
            {/*<div id={'App-left'}></div>*/}

            <div id={'App-main'}>
                <Outlet/>
            </div>
        </div>
    );
}

export default App;
