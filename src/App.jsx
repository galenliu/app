import {useState, createContext, useEffect} from 'react'
import './App.css'
import Things from "./views/Things";
import Rules from "./views/Rules";
import {HashRouter as Router, Route, Routes} from "react-router-dom"
import Settings from "./views/Settings";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
import {Theme} from "./js/theme";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useTranslation} from "react-i18next";
import "./i18n"
import GatewayModel from "./models/gatewa-model";
import Layout from "./views/Layout";
import {Path} from "./js/menuList";
import enTrans from "./i18n/en-us.json"
import useThings from "./hooks/use-things";
const theme = createTheme(Theme);
export const AppContext = createContext({})

export const gateway = new GatewayModel()

function App() {
    const {t} = useTranslation();
    const [title, setTitle] = useState(t(enTrans.Things))

    const [things] =useThings(gateway)

    useEffect(() => {
        window.document.title = title
    }, [title])

    return (
        <AppContext.Provider value={{
            setTitle: setTitle,
        }}>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <Router>
                        <Routes>
                            <Route path="/" element={<Layout/>}>
                                <Route index element={<Things things={things}/>}/>
                                <Route path={Path.Home} element={<Things things={things}/>}/>
                                <Route path={Path.Rules} element={<Rules/>}/>
                                <Route path={Path.Settings} element={<Settings/>}/>
                            </Route>
                            <Route exact path={Path.Register} element={<SignUp/>}/>
                            <Route exact path={Path.Login} element={<SignIn/>}/>
                        </Routes>
                    </Router>
                </div>
            </ThemeProvider>
        </AppContext.Provider>
    );
}


export default App
