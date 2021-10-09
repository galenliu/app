import './App.css';
import Nav from "./components/Nav";
import React, {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Settings from "./views/Settings"
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Theme} from "./components/Theme"
import SignInSide from "./views/SignIn";
import SignUp from "./views/SignUp";

export const AppContext = React.createContext({})
const theme = createTheme(Theme);


function App() {

    const [drawerOpen, setDrawerOpen] = useState(false)
    const [navOpen, setNavOpen] = useState(true)

    return (
        <AppContext.Provider value={{
            drawerOpen: drawerOpen,
            setDrawerOpen: setDrawerOpen,
            navOpen: navOpen,
            setNavOpen: setNavOpen,
        }}>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Nav/>}>s
                                <Route path="/things/*" element={<h1>Thing</h1>}/>
                                <Route path="/rules" element={<h1>Rules</h1>}/>
                                <Route path="settings" element={<Settings/>}/>
                                <Route path="/users" element={<h1>User</h1>}/>
                            </Route>
                            <Route exact path="/register">
                                <SignUp/>
                            </Route>
                            <Route exact path="/login">
                                <SignInSide/>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </ThemeProvider>
        </AppContext.Provider>
    );
}

export default App;
