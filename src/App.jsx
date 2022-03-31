import React, {useState, createContext, useEffect} from 'react'
import './App.css'
import Things from "src/views/Things/Things";
import Rules from "src/views/Rules/Rules";
import {HashRouter as Router, Route, Routes} from "react-router-dom"
import Settings from "src/views/Settings/Settings";
import SignUp from "src/views/Singn/SignUp";
import SignIn from "src/views/Singn/SignIn";
import {Theme} from "src/js/theme";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useTranslation} from "react-i18next";
import GatewayModel from "./models/gateway-model";
import Layout from "src/views/Layout/Layout";
import {PATHS} from "src/js/constants";
import enTrans from "src/js/i18n/en-us.json"
import InstalledAddonsView from "./views/Addons/InstelledAddons";
import DiscoverAddonsView from "src/views/Addons/DiscoverAddons";
import Box from "@mui/material/Box";
import NewThings from "src/views/Things/NewThings";
import ThingPanelLayout from "src/views/Layout/ThingPanelLayout";
import ThingDialogLayout from "src/views/Layout/ThingDialogLayout";
import "src/js/i18n"

const theme = createTheme(Theme);
export const AppContext = createContext({})

function App() {
    const {t} = useTranslation();
    const [availableAddons, setAvailableAddons] = useState(new Map())
    const [installedAddons, setInstalledAddons] = useState(new Map())
    const [title, setTitle] = useState(t(enTrans.Things))

    const [showThingId, setShowThingId] = useState()

    const showThing = (thingId) => {
        setShowThingId(thingId)
    }

    useEffect(() => {
        window.document.title = title.toString()
    }, [title])

    return (
        <AppContext.Provider value={{
            setTitle,
            showThingId,
            showThing,
            availableAddons,
            setAvailableAddons,
            installedAddons,
            setInstalledAddons,
        }}>
            <ThemeProvider theme={theme}>
                <Box className="App">
                    <Router>
                        <Routes>
                            <Route path="/" element={<Layout/>}>
                                <Route index element={<Things/>}/>
                                <Route path={PATHS.Home} element={<Things/>}/>
                                <Route path={PATHS.Rules} element={<Rules/>}/>
                                <Route path={PATHS.Settings} element={<Settings/>}/>
                            </Route>
                            <Route path={PATHS.InstalledAddons} element={<InstalledAddonsView/>}/>
                            <Route path={PATHS.DiscoverAddons} element={<DiscoverAddonsView/>}/>
                            <Route exact path={PATHS.Register} element={<SignUp/>}/>
                            <Route exact path={PATHS.Login} element={<SignIn/>}/>
                            <Route exact path={PATHS.NewThings} element={<NewThings/>}/>
                            <Route path="/things" element={<ThingPanelLayout/>}>
                                {/*<Route path={":thingId"} element={<Thing/>}/>*/}
                                <Route path={":thingId"} element={<ThingDialogLayout/>}/>
                            </Route>
                        </Routes>
                    </Router>
                </Box>
            </ThemeProvider>
        </AppContext.Provider>
    );
}

export default App
