import {useState, createContext, useEffect} from 'react'
import './App.css'
import Things from "./views/Things/Things";
import Rules from "./views/Rules/Rules";
import {HashRouter as Router, Route, Routes} from "react-router-dom"
import Settings from "./views/Settings/Settings";
import SignUp from "./views/Singn/SignUp";
import SignIn from "./views/Singn/SignIn";
import {DefaultTheme} from "./js/defaultTheme";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useTranslation} from "react-i18next";
import "./i18n"
import GatewayModel from "./models/gateway-model";
import Layout from "./views/Layout/Layout";
import {Path} from "./js/menuList";
import enTrans from "./i18n/en-us.json"
import InstalledAddonsView from "./views/Addons/InstelledAddons";
import DiscoverAddonsView from "./views/Addons/DiscoverAddons";
import Box from "@mui/material/Box";
import NewThings from "./views/Things/NewThings";
import ThingPanelLayout from "./views/Layout/ThingPanelLayout";
import ThingDialogLayout from "./views/Layout/ThingDialogLayout";
const theme = createTheme();
export const AppContext = createContext({})

export const gateway = new GatewayModel()

function App() {
    const {t} = useTranslation();
    const [availableAddons, setAvailableAddons] = useState(new Map())
    const [installedAddons, setInstalledAddons] = useState(new Map())

    const [title, setTitle] = useState(t(enTrans.Things))

    useEffect(() => {
        window.document.title = title
    }, [title])

    return (
        <AppContext.Provider value={{
            setTitle,
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
                                <Route path={Path.Home} element={<Things/>}/>
                                <Route path={Path.Rules} element={<Rules/>}/>
                                <Route path={Path.Settings} element={<Settings/>}/>
                            </Route>
                            <Route path={Path.InstalledAddons} element={<InstalledAddonsView/>}/>
                            <Route path={Path.DiscoverAddons} element={<DiscoverAddonsView/>}/>
                            <Route exact path={Path.Register} element={<SignUp/>}/>
                            <Route exact path={Path.Login} element={<SignIn/>}/>
                            <Route exact path={Path.NewThings} element={<NewThings/>}/>
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
