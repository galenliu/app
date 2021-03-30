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
import IconView from "../component/icon-view";
import ThingsScreen from "../js/things-screen";
import {ThingPanel} from "../component/thing-panel";


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
    const [things, setThings] = useState(ThingsScreen.things)
    const [addThingShow, setAddThingShow] = useState(false)
    const [thingPanelShow, setThingPanelShow] = useState(false)
    const [showId, setShowId] = useState()
    const [state, setState] = useState(states.pending)
    const {t} = useTranslation();

    //页面加载时，向model定阅更新things
    useEffect(() => {
        const refreshThings = (ts) => {
            setState(states.connected)
            setThings([...ThingsScreen.things])
        }
        App.gatewayModel.subscribe(Constants.REFRESH_THINGS, refreshThings)
        App.showThings()
        return () => {
            App.gatewayModel.unsubscribe(Constants.REFRESH_THINGS, refreshThings)
        }

    }, [])

    //把things渲染至页面
    function renderThings() {
        let thingsScreen = []
        things.forEach((thing, id) => {
            const t = <IconView key={id} {...thing} click={(id) => {
                setShowId(id)
                setThingPanelShow(true)
            }} handleClick={thing.handleClick}/>
            thingsScreen.push(t)
        })
        return thingsScreen
    }


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
            {showId !== undefined && <ThingPanel open={thingPanelShow} show={setThingPanelShow} thingID={showId}/>}
        </>
    )
}


