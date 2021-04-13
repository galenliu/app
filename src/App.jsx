import './App.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import "../src/i18n"
import SideBar from "./component/sideBar";
import GatewayModel from "./models/gateway-model";
import Things from "./views/Things";
import Settings from "./views/Settings";
import Constants from "./js/constant";
import {createThingFromCapability} from "./schema-impl/capability/capabilities";


export const AppContext = React.createContext({})
export const theme = createMuiTheme({
    status: {direction: 'ltr'},
    spacing: 4,
    iconSize: {
        s: 10,
        m: 30,
        l: 60,
        xl: 80,
    },
    // palette: {
    //     primary: {
    //         light: '#ff6090',
    //         main: '#e91e63',
    //         dark: '#b0003a',
    //         contrastText: '#fff',
    //     },
    //     secondary: {
    //         light: '#ff7961',
    //         main: '#f44336',
    //         dark: '#ba000d',
    //         contrastText: '#000',
    //     },
    //     icon: {
    //         on: '#e91e63',
    //         off: "darkgray",
    //     }
    //
    // },
});

export const App = {
    ORIGIN: window.location.origin,
    HOST: window.location.host,
    LANGUAGE: 'en-US',
    TIMEZONE: 'UTC',
    UNITS: {},
    init: function () {
        this.gatewayModel = new GatewayModel()

    },
    showThings: function () {
        this.gatewayModel.refreshThings()
    },
}

App.init()
App.showThings()

function Router() {

   // const [things, setThings] = useState([])
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [newThingsOpen, setNewThingsOpen] = useState(false)

    // const refreshThings = (list) => {
    //
    //     const ts = []
    //     if (list === undefined || list.size === 0) {
    //
    //     } else {
    //         console.log("App list forEach:", list)
    //         list.forEach((description, thingId) => {
    //             console.log("App description:", description, thingId)
    //             App.gatewayModel.getThingModel(thingId).then((thingModel) => {
    //                 let thing = createThingFromCapability(
    //                     description.selectedCapability,
    //                     thingModel,
    //                     description,
    //                 );
    //                 ts.push(thing)
    //             });
    //         })
    //     }
    //     setThings(ts)
    // }

    useEffect(() => {
        console.log("App Things=========:")
    }, [])

    // useEffect(() => {
    //     App.gatewayModel.subscribe(Constants.REFRESH_THINGS, refreshThings);
    //     return () => {
    //         App.gatewayModel.unsubscribe(Constants.REFRESH_THINGS, refreshThings)
    //     }
    //
    // }, [])


    return (
        <ThemeProvider theme={theme}>
            <AppContext.Provider value={{
                drawerOpen: drawerOpen,
                setDrawerOpen: setDrawerOpen,
                newThingsOpen: newThingsOpen,
                setNewThingsOpen: setNewThingsOpen,

            }}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/things">
                            <h1>Things</h1>
                        </Route>
                        <Route exact path="/settings">
                            <Settings/>
                        </Route>
                        <Route path="/">
                            <Things/>
                            <SideBar/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </AppContext.Provider>
        </ThemeProvider>

    );
}


export default Router;
