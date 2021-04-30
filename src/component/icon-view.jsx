import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import ThingIcons from "./icons";
import Typography from "@material-ui/core/Typography";
import {useTranslation} from "react-i18next";
import Constants from "../js/constant";
import {theme} from "../index";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    thingCard: {
        borderRadius: 12,
        display: 'flex',
        minWidth: 140,
        maxWidth: 140,
        justifyContent: "space-between",
        flexDirection: "column",
        backgroundColor: theme.palette.icon.on,
        cursor: "pointer"
    },
    off: {
        borderRadius: 12,
        display: 'flex',
        minWidth: 140,
        maxWidth: 140,
        justifyContent: "space-between",
        flexDirection: "column",
        backgroundColor: theme.palette.icon.off,
        cursor: "pointer"

    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTop: {
        display: "flex",
        flexDirection: "row",
        marginTop: 5,
        marginRight: 5,
        alignItems: "flex-start",
        justifyContent: 'space-between',
    },
    cardBot: {
        display: "flex",
        marginLeft: 4,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: 'space-between',
    },
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}))

function useIconViewState(thing) {
    const [iconData, setIconData] = useState(thing.model.iconData)

    function updateIconData(iconData) {
        setIconData({...iconData})
    }

    useEffect(() => {

        thing.model.subscribe(Constants.ICON_STATUS, updateIconData)

        return () => {
            thing.model.unsubscribe(Constants.ICON_STATUS, updateIconData)
        }
    }, [])

    return [iconData]
}


export default function IconView({title, selectedCapability, thing}) {

    const {t} = useTranslation();
    const classes = useStyles()
    // const [enable, setEnable] = useState(true)

    const [iconData] = useIconViewState(thing)


    function handleClick(e) {
        e.stopPropagation()
        thing.handleClick()
    }

    useEffect(() => {


    }, [])

    return (
        <Grid item className={classes.root}>
            <Card elevation={10} className={clsx(classes.thingCard, !iconData.on && classes.off)} onClick={handleClick}>
                <div className={classes.cardTop}>
                    <ThingIcons type={selectedCapability} iconData={iconData}/>
                </div>
                <div className={classes.cardBot}>
                    <Typography variant={"body1"}>
                        {title}
                    </Typography>
                    <Typography t={2} style={{color: theme.palette.text.secondary}}>
                        {t(iconData.label)}
                    </Typography>
                </div>
            </Card>
        </Grid>
    )

}
