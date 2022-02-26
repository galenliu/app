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
import GatewayModel from "./models/gatewa-model";
import useThings from "./hooks/use-things";


const theme = createTheme(Theme);

export const AppContext = createContext({})
export const gateway = new GatewayModel()

function App() {

    const {t} = useTranslation();
    const [navOpen, setNavOpen] = useState(false)
    const [title, setTitle] = useState(t("WebThings"))

    useEffect(() => {
        window.document.title = title
    }, [title])

    return (
        <AppContext.Provider value={{
            navOpen: navOpen,
            setNavOpen: setNavOpen,
            setTitle: setTitle,
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


export default App
