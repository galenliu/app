import React, {useContext, useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {useTranslation} from "react-i18next";
import {makeStyles} from "@mui/styles";
import {AppContext, gateway} from "../App";
import clsx from "clsx";
import NewThingsDialog from "./dialog/NewThingDialog";
import Constants from "../constants";
import useThings from "../hooks/use-things";
import ThingCard from "../thing/ThingCard";
// import NewThingsDialog from "./AddThing";


const useStyles = makeStyles((theme) => ({
    containerGrid: {
        alignItems: "flex-start",
        backgroundColor: theme.palette.primary.light,
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
    const {drawerOpen, setTitle, newThingShow, setAddSButtonShow} = useContext(AppContext)
    const {t} = useTranslation();
    const [things] = useThings(gateway)

    useEffect(() => {
        console.log("this is entry things view")
        setTitle(t("Things"))
        setAddSButtonShow(true)
        return () => {
            setAddSButtonShow(false)
        }
    })

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

    function renderThings() {
        let list = []
        if ( things) {
             things.forEach((t, key, m) => {
                 console.log("thingMode:",t)
                if (t !== null && t !== undefined) {
                    list.push(<ThingCard key={key} title={t.title} state={"connected"}>
                    </ThingCard>)
                }
            })
        }
        return list
    }

    return (
        <>
            <Grid className={clsx(classes.containerGrid, {[classes.contentShift]: drawerOpen,})} container
                  direction="row" spacing={4}>
                {renderThings()}
            </Grid>
            {/*<NewThingsDialog open={newThingShow}/>*/}
        </>
    )
}


