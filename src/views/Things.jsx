import React, {useContext, useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import TopBar from "../component/topBar";
import {useTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core/styles";
import {App, AppContext} from "../App";
import Constants, {drawerWidth} from "../js/constant";
import clsx from "clsx";
import NewThingsDialog from "./AddThing";
import {ThingPanel} from "../component/thing-panel";
import IconView from "../component/icon-view";
import {createThingFromCapability} from "../schema-impl/capability/capabilities";


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

    const [things, setThings] = useState([])

    const refreshThings = (list) => {

        const ts = []
        if (list === undefined || list.size === 0) {

        } else {
            console.log("App list forEach:", list)
            list.forEach((description, thingId) => {
                console.log("App description:", description, thingId)
                App.gatewayModel.getThingModel(thingId).then((thingModel) => {
                    let thing = createThingFromCapability(
                        description.selectedCapability,
                        thingModel,
                        description,
                    );
                    ts.push(thing)
                });
            })
        }
        setThings(ts)
    }

    useEffect(() => {
        console.log("App Things=========:", things)
    }, [things])

    useEffect(() => {
        App.gatewayModel.subscribe(Constants.REFRESH_THINGS, refreshThings);
        return () => {
            App.gatewayModel.unsubscribe(Constants.REFRESH_THINGS, refreshThings)
        }

    }, [])

    useEffect(() => {
        renderThings()
    }, [things !== null])


    //把things渲染至页面
    function renderThings() {
        const list = []
        for (const thing of things) {
            console.log("111111111111111", thing)
            const iv = <IconView on={thing.on} key={thing.id}
                                 selectedCapability={thing.selectedCapability}
                                 title={thing.title}/>
            list.push(iv)
        }
        // things.forEach((thing, id) => {
        //     console.log("22222222222222", thing)
        //
        //
        // })
        console.log("333333333333333", list)
        return list
    }


    return (
        <>
            <TopBar add={true} show={setAddThingShow} title={t("Things")}/>
            <div className={classes.drawerHeader}/>
            <Grid className={clsx(classes.containerGrid, {[classes.contentShift]: !drawerOpen,})}
                  container spacing={2}>
                {renderThings()}
            </Grid>
            {addThingShow && <NewThingsDialog open={addThingShow} show={setAddThingShow}/>}
            {thingPanelShow && <ThingPanel open={thingPanelShow} show={setThingPanelShow}/>}
        </>
    )
}


