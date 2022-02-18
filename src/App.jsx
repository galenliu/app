import {useState, createContext, useEffect} from 'react'
import './App.css'
import Nav from "./components/Nav";
import Things from "./views/Things";
import Rules from "./views/Rules";
import {Route, Routes} from "react-router"
import {BrowserRouter} from "react-router-dom"
import Settings from "./views/Settings";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
import {Theme} from "./js/theme";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useTranslation} from "react-i18next";
import "./i18n"
import GatewayModel from "./models/gateway-model";
import Constants from '../src/constants';


export const AppContext = createContext({})
const theme = createTheme(Theme);

const gateway = new GatewayModel()

function App() {

    const {t} = useTranslation();
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [navOpen, setNavOpen] = useState(false)
    const [appNavTitle, setAppNavTitle] = useState(t("Things"))
    const [newThingShow, setNewThingShow] = useState(false)
    const [addSButtonShow, setAddSButtonShow] = useState(false)

    const [things, setThings] = useState(new Map())

    useEffect(() => {
        const refreshThings = (things) => {
            setThings(gateway.thingModels)
        }
        gateway.subscribe(Constants.REFRESH_THINGS, refreshThings, true)
        return () => {
            gateway.unsubscribe(Constants.REFRESH_THINGS, refreshThings)
        }
    }, [])

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
                                {/*<Route index element={<Things thingModels={thingModels}/>}/>*/}
                                <Route path="things" element={<Things things={things}/>}/>
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


export default App
