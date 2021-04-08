import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import ThingIcons, {ActionsIcon} from "./icons";
import Typography from "@material-ui/core/Typography";
import {useTranslation} from "react-i18next";
import {ThingStates} from "../schema-impl/capability/thing";
import Constants from "../js/constant";
import ThingsScreen from "../js/things-screen";

const useStyles = makeStyles((theme) => ({
    thingCard: {
        borderRadius: 12,
        display: 'flex',
        minWidth: 160,
        maxWidth: 160,
        justifyContent: "space-between",
        flexDirection: "column",
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


export default function IconView(props) {

    const {t} = useTranslation();
    const classes = useStyles()

    const [thing,setThing] = useState()

    const [icon, setIcon] = useState(props.icon)

    function handleClick(e) {
        e.stopPropagation()
        props.handleClick()

    }

    useEffect(() => {

        const update = function (data) {
            setIcon({...props.icon})
        }
        props.model.subscribe(Constants.PROPERTY_STATUS, update)
        return () => {
            props.model.unsubscribe(Constants.PROPERTY_STATUS, update)
        }

        ThingsScreen.getThing(props.id)

    }, [props])

    return (
        <Grid item className={classes.root}>
            <Card elevation={10} className={classes.thingCard} onClick={() => props.click(props.id)}>
                <div className={classes.cardTop}>
                    <ThingIcons type={props.selectedCapability} style={{color: icon.color}}
                                state={icon.on ? "on" : "off"}/>
                    <ActionsIcon type={props.selectedCapability} onClick={handleClick}/>
                </div>
                <div className={classes.cardBot}>
                    <Typography variant={"body1"}>
                        {props.title}
                    </Typography>
                    <Typography t={2} style={{color: props.state === ThingStates.NoResponse ? "red" : ""}}>
                        {t(props.state)}
                    </Typography>
                </div>
            </Card>
        </Grid>
    )

}
