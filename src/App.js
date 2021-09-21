import './App.css';
import Nav from "./components/Nav";
import React, {useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Settings from "./views/Settings"
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Theme} from "./components/Theme"

export const AppContext = React.createContext({})
const theme = createTheme(Theme);

function App() {

    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
        <AppContext.Provider value={{
            drawerOpen: drawerOpen,
            setDrawerOpen: setDrawerOpen,
        }}>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <Router>
                        <Nav/>
                        <div>
                            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                            <Switch>
                                <Route exact path="/things">
                                    <h1>Things</h1>
                                </Route>
                                <Route exact path="/settings">
                                    <Settings/>
                                </Route>
                                <Route exact path="/users">
                                    <h1>users</h1>
                                </Route>
                                <Route exact path="/rules">
                                    <h1>rules</h1>
                                </Route>
                            </Switch>
                        </div>

                    </Router>

                </div>
            </ThemeProvider>
        </AppContext.Provider>
    );
}

export default App;
