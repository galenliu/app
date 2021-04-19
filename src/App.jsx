import './App.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import "../src/i18n"
import SideBar from "./component/sideBar";
import GatewayModel from "./models/gateway-model";
import Things from "./views/Things";
import Settings from "./views/Settings";
import {createThingFromCapability} from "./schema-impl/capability/capabilities";
import Constants from "./js/constant";


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
    gatewayModel: null,
    init: function () {
        this.gatewayModel = new GatewayModel()

    },
    showThings: function () {
        this.gatewayModel.refreshThings()
    },
}

App.init()


export const ThingsScreen = {
    Things: [],

    refreshThings: function (list) {
        if (list === undefined || list.size === 0) {
            return
        } else {
            list.forEach((description, thingId) => {
                App.gatewayModel.getThingModel(thingId).then((thingModel) => {
                    let th = createThingFromCapability(
                        description.selectedCapability,
                        thingModel,
                        description,
                    );
                    console.log("Things:", this.Things)
                    this.Things.push(th)
                });
            })
        }
    },

    getThing: function (id) {
        if (this.Things === null || this.Things.length === 0) {
            return null
        }
        let t = null
        this.Things.forEach((thing) => {
            console.log("eeeeeeee", id, thing.id)
            if (thing.id === id) {
                console.log("dddddd", thing)
                t = thing
            }
        })
        return t
    },

    handleOnOff: function (id) {
        const t = this.getThing(id)
        if (t === null) {
            return
        }
        t.handleOnOff(id)
    },

    init: function () {
        App.gatewayModel.subscribe(Constants.REFRESH_THINGS, this.refreshThings.bind(this), true);
    },

    close: function () {
        App.gatewayModel.unsubscribe(Constants.REFRESH_THINGS, this.refreshThings.bind(this));

    },

}

ThingsScreen.init()
App.showThings()

function Router() {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [newThingsOpen, setNewThingsOpen] = useState(false)
    const [things, setThings] = useState([])

    useEffect(() => {
        function refreshThings() {
            let list = []
            ThingsScreen.Things.forEach((thing)=>{
                list.push(thing.id)
            })
            setThings(list)
        }

        App.gatewayModel.subscribe(Constants.REFRESH_THINGS, refreshThings, true);
        return () => {
            App.gatewayModel.unsubscribe(Constants.REFRESH_THINGS, refreshThings);
        }
    }, [])


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
                            <Things/>
                            <SideBar/>
                        </Route>
                        <Route exact path="/settings">
                            <SideBar/>
                            <Settings/>
                        </Route>
                        <Route path="/">
                            <Things things={things}/>
                            <SideBar/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </AppContext.Provider>
        </ThemeProvider>

    );
}


export default Router;
