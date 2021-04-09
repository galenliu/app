import React, {useContext, useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {ErrorOutlined} from "@material-ui/icons";
import TopBar from "../component/topBar";
import {useTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core/styles";
import {AppContext} from "../App";
import {drawerWidth} from "../js/constant";
import clsx from "clsx";
import {CircularProgress} from "@material-ui/core";
import NewThingsDialog from "./AddThing";
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


export default function Things(props) {
    const classes = useStyles()
    const {drawerOpen} = useContext(AppContext)
    const [addThingShow, setAddThingShow] = useState(false)
    const [thingPanelShow, setThingPanelShow] = useState(false)


    const {t} = useTranslation();



    useEffect(() => {


    }, [])


    //把things渲染至页面
    // const renderThings =
    //     () => {
    //         console.log("888888888", props.ts)
    //         for (const thing in props.ts) {
    //             console.log("888888888", thing)
    //             const t = <IconView key={thing.id} {...thing} click={(id) => {
    //                 setShowId(id)
    //                 setThingPanelShow(true)
    //             }} handleClick={thing.handleClick}/>
    //             // thingsScreen.push(t)
    //         }
    //     }


    return (
        <>
            <TopBar add={true} show={setAddThingShow} title={t("Things")}/>
            <div className={classes.drawerHeader}/>
            <Grid className={clsx(classes.containerGrid, {[classes.contentShift]: !drawerOpen,})}
                  container spacing={2}>
                {<CircularProgress disableShrink/>}

                {<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <ErrorOutlined/>
                    <h4>{t("disconnect")}</h4></div>}
                {props.ts}
            </Grid>
            <NewThingsDialog open={addThingShow} show={setAddThingShow}/>
            {
                <ThingPanel open={thingPanelShow} show={setThingPanelShow}/>}
        </>
    )
}


