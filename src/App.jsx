import './App.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import "../src/i18n"
import SideBar from "./component/sideBar";
import GatewayModel from "./models/gateway-model";
import Things from "./views/Things";
import Settings from "./views/Settings";
import ThingsScreen from "./js/things-screen";
import Constants from "./js/constant";
import {createThingFromCapability} from "./thing-impl/capability/capabilities";


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


ThingsScreen.init()
ThingsScreen.showThings()


function useThingsList(params) {

    const [things, setThings] = useState([])

    const renderThing = (thingModel, description, format) => {
        const thing = createThingFromCapability(
            description.selectedCapability,
            thingModel,
            description,
        );
        setThings([...things, thing])
        return thing;
    }

    const refreshThings = (things) => {
        if (things === undefined || things.size === 0) {
            setThings([])
        } else {
            things.forEach((description, thingId) => {
                App.gatewayModel.getThingModel(thingId).then((thingModel) => {
                    renderThing(thingModel, description);
                });
            });
        }
    }


    useEffect(() => {
        App.gatewayModel.subscribe(Constants.REFRESH_THINGS, refreshThings, true);
        return () => {
            App.gatewayModel.unsubscribe(Constants.REFRESH_THINGS, refreshThings)
        }

    }, [])
    return things
}


function Router() {

    App.init()

    const [thingsList] = useThingsList()
    // //页面加载时，向model定阅更新things
    useEffect(() => {
    }, [])


    const [drawerOpen, setDrawerOpen] = useState(false)
    const [newThingsOpen, setNewThingsOpen] = useState(false)
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
                            <Things ts={thingsList}/>
                            <SideBar/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </AppContext.Provider>
        </ThemeProvider>

    );
}


export default Router;
