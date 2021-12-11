import React, {useContext, useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {useTranslation} from "react-i18next";
import {makeStyles} from "@mui/styles";
import {AppContext} from "../App";
import {drawerWidth} from "../js/constant";
import clsx from "clsx";
import NewThingsDialog from "./dialog/NewThingDialog";
// import NewThingsDialog from "./AddThing";


const useStyles = makeStyles((theme) => ({
    containerGrid: {
        alignItems: "flex-start",
        backgroundColor: theme.palette.primary.light,
        height: "100%",
        width: "100%",
        padding: theme.spacing(1),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    contentShift: {
        alignItems: "flex-start",
        height: "100%",
        width: "100%",
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },

}))


export default function Things(props) {

    const classes = useStyles()
    const {drawerOpen, setAppNavTitle, newThingShow, setAddSButtonShow} = useContext(AppContext)

    const [thingPanelShow, setThingPanelShow] = useState(false)
    const {t} = useTranslation();
    const [state, setState] = useState()

    useEffect(() => {
        setAppNavTitle(t("Things"))
        setAddSButtonShow(true)
        return () => {
            setAddSButtonShow(false)
        }
    }, [])

    function handleOnOff(id) {

    }


    //把things渲染至页面
    // const renderThings = () => {
    //     if (props.things === undefined || props.things === null || props.things.size < 1) {
    //         console.log("renderThings:", "空")
    //         return <h1>空</h1>
    //     }
    //     const ls = []
    //     console.log("renderThings", props.things)
    //     // props.things.forEach((id, thing) => {
    //     //   if (thing !== null && thing !== undefined) {
    //     //     const iv = <IconView id={thing.id} key={id} thing={thing}
    //     //                          handleOnOff={handleOnOff}
    //     //                          selectedCapability={thing.selectedCapability}
    //     //                          title={thing.title}/>
    //     //     console.log(" list.push(iv):", iv)
    //     //     console.log("add list:", ls)
    //     //     ls.push(iv)
    //     //   }
    //     // })
    //     console.log("return list:", ls)
    //     return ls
    // }

    return (
        <>
            <Grid className={clsx(classes.containerGrid, {[classes.contentShift]: drawerOpen,})} container
                  direction="row" spacing={3}>
                {/*{state === 1 && renderThings()}*/}
            </Grid>
            <NewThingsDialog open={newThingShow}/>

        </>
    )
}


