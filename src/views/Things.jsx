import React, {useContext, useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {ErrorOutlined} from "@material-ui/icons";
import TopBar from "../component/topBar";
import {useTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core/styles";
import {App, AppContext} from "../App";
import Constants, {drawerWidth} from "../js/constant";
import clsx from "clsx";
import {CircularProgress} from "@material-ui/core";
import NewThingsDialog from "./AddThing";
import {ThingPanel} from "../component/thing-panel";
import {createThingFromCapability} from "../schema-impl/capability/capabilities";
import IconView from "../component/icon-view";


const useStyles = makeStyles((theme) => ({
    containerGrid: {
        alignItems: "flex-start",
        height: "200",
        minHeight: "200",
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },

}))

const states = {
    pending: "pending",
    connected: "connected",
    disconnected: "disconnected",
}

export default function Things(props) {
    const classes = useStyles()
    const {drawerOpen} = useContext(AppContext)
    const [things, setThings] = useState([])
    const [addThingShow, setAddThingShow] = useState(false)
    const [thingPanelShow, setThingPanelShow] = useState(false)
    const [currentThing, setCurrentThing] = useState(null)
    const [state, setState] = useState(states.pending)
    const {t} = useTranslation();


    useEffect(() => {
        const refreshThings = (ts) => {
            setState(states.connected)
            if (ts.size === 0) {
                setThings([])
            } else {
                const copyThings = things
                ts.forEach((description, thingId) => {
                        App.gatewayModel.getThingModel(thingId).then((thingModel) => {
                            const thing = createThingFromCapability(
                                description.selectedCapability, thingModel, description);

                            copyThings.push(thing)
                        });
                        console.log("refreshThings-------------------------things::", copyThings)
                        setThings([...copyThings])
                    }
                );
            }
        }
        App.gatewayModel.subscribe(Constants.REFRESH_THINGS, refreshThings)
        App.showThings()
        return () => {
            App.gatewayModel.unsubscribe(Constants.REFRESH_THINGS, refreshThings)
        }

    }, [props])

    function renderThings() {
        let thingsScreen = []
        things.forEach(thing => {
            const t = <IconView key={thing.iconViewData.id} {...thing.iconViewData} click={handleOpen}/>
            thingsScreen.push(t)
        })
        return thingsScreen
    }

    function handleOpen(thingId) {

        things.forEach(thing => {
            if (thingId === thing.iconViewData.id) {
                setCurrentThing(thing)
                setThingPanelShow(true)
            }
        })
    }

    function renderThingPanel(thing) {
        return <ThingPanel open={thingPanelShow} show={setThingPanelShow} {...currentThing}/>
    }

    useEffect(() => {
        setThingPanelShow(true)
    }, [currentThing])

    return (
        <>
            <TopBar add={true} show={setAddThingShow} title={t("Things")}/>
            <div className={classes.drawerHeader}/>
            <Grid style={{"justifyContent": !state === states.pending ? 'flex-start' : "center"}}
                  className={clsx(classes.containerGrid, {
                      [classes.contentShift]: !drawerOpen,
                  })}
                  container spacing={2}>
                {state === states.pending && <CircularProgress disableShrink/>}
                {things.size !== 0 && renderThings()}
                {state === states.disconnected &&
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <ErrorOutlined/>
                    <h4>{t("disconnect")}</h4></div>}
            </Grid>
            <NewThingsDialog open={addThingShow} show={setAddThingShow}/>
            {thingPanelShow && renderThingPanel()}
        </>
    )
}


