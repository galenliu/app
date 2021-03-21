import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import ThingIcons, {ActionsIcon} from "./thingIcons";
import Typography from "@material-ui/core/Typography";
import {useTranslation} from "react-i18next";
import Constants, {ThingProperties, ThingType} from "../js/constant";
import {App} from "../App";

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

const states = {
    on: "on",
    off: "off",
    disconnect: "disconnect",
    updating: "updating"
}

export default function Thing(props) {

    const classes = useStyles()
    const {t, i18n} = useTranslation();
    const [open, setOpen] = useState(false)
    const [description, setDescription] = useState()
    const [toggleProperty, setToggleProperty] = useState()
    const [state, setState] = useState()

    useEffect(() => {
        function refreshThing(properties) {
            if (!description || !description.properties || !properties) {
                console.log("properties", properties)
                return
            }
            let old = description
            old.properties = properties
            setDescription(old)
        }

        const appThing = App.gatewayModel.things.get(props.thingId)
        console.log("app get thing :", appThing)
        if (appThing) {
            setDescription(appThing)
        }

        let thingModel = App.gatewayModel.thingModels.get(props.thingId)
        thingModel.subscribe(Constants.PROPERTY_STATUS, refreshThing)
        setState(states.updating)
        return () => {
            thingModel.unsubscribe(Constants.PROPERTY_STATUS, refreshThing)
        }
    }, [])

    useEffect(() => {
        console.log("description+++++++++++++++", description)
        if (!description) {
            return
        }
        getToggleProperty()
    }, [description])

    function getToggleProperty() {
        if (!description) {
            return
        }
        switch (description.selectedCapability) {
            case ThingType.Light:
                for (let [name, prop] of Object.entries(description.properties)) {
                    if (!prop["@type"]) {
                        continue
                    }
                    if (prop["@type"] === ThingProperties.OnOffProperty) {
                        setToggleProperty(prop)
                    }
                }
        }
    }

    function stateTextStyle() {
        if (state === states.updating) {
            return {color: "primary", variant: "body2"}
        }
        if (state === states.disconnect) {
            return "secondary"
        }
        return {color: "primary", variant: "h6"}
    }


    function handleToggleClick(e) {
        e.stopPropagation()
        if(toggleProperty.value){

        }
    }

    return (
        <>
            {
                description && <Grid item className={classes.root}>
                    <Card elevation={10} className={classes.thingCard} onClick={() => props.open(props.thingId)}>
                        <div className={classes.cardTop}>
                            <ThingIcons type={description.selectedCapability} value={true} />
                            <ActionsIcon cursor={"pointer"} {...toggleProperty}
                                         onClick={handleToggleClick}/>
                        </div>
                        <div className={classes.cardBot}>
                            <Typography variant={"body1"}>
                                {description.title}
                            </Typography>
                            <Typography {...stateTextStyle()} t={2}>
                                {t(state)}
                            </Typography>
                        </div>
                    </Card>
                </Grid>
            }
        </>)
}
