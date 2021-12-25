import Nav from "./components/Nav";
import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Settings from "./views/Settings"
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Theme} from "./js/theme"
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import {useTranslation} from "react-i18next";
import Things from "./views/Things";
import Rules from "./views/Rules";
import GatewayModel from "./models/gateway-model";

export const AppContext = React.createContext({})
const theme = createTheme(Theme);
const gatewayModel = new GatewayModel();

function App() {
    const {t} = useTranslation();
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [navOpen, setNavOpen] = useState(true)
    const [appNavTitle, setAppNavTitle] = useState(t("Things"))
    const [newThingShow, setNewThingShow] = useState(false)
    const [addSButtonShow, setAddSButtonShow] = useState(false)

    useEffect(()=>{


    },[])

    return (
        <AppContext.Provider value={{
            drawerOpen: drawerOpen,
            setDrawerOpen: setDrawerOpen,
            navOpen: navOpen,
            setNavOpen: setNavOpen,
            appNavTitle: appNavTitle,
            setAppNavTitle: setAppNavTitle,
            setNewThingShow: setNewThingShow,
            newThingShow: newThingShow,
            addSButtonShow: addSButtonShow,
            setAddSButtonShow: setAddSButtonShow,
        }}>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Nav/>}>
                                <Route index element={<Things/>}/>
                                <Route path="things" element={<Things/>}/>
                                <Route path="rules" element={<Rules/>}/>
                                <Route path="settings" element={<Settings/>}/>
                            </Route>
                            <Route exact path="register" element={<SignUp/>}/>
                            <Route exact path="login" element={<SignIn/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            </ThemeProvider>
        </AppContext.Provider>
    );
}

export default App;
