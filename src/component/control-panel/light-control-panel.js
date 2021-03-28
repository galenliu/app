import React from "react";
import {Slider, withStyles} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {NumberPropertyListItem} from "../thing-property";
import {App} from "../../App";

export const useStyles = makeStyles((theme) => ({
    listItem: {
        width: " 100%",
    }
}));

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);


export function LightControlPanel(props) {
    const classes = useStyles();
    console.log("props id", props)

    const thingModel = App.gatewayModel.thingModels
    const bright = props.displayedProperties[props.brightnessProperty]

    function handleChange(prop) {
        console.log("thing.setProperty(prop.name,prop.value)", prop)
        props.model.setProperty(prop.name, prop.value).then().catch((e) => {
            console.log(e)
        })
    }

    return (
        <>
            {bright !== null &&
            <NumberPropertyListItem min={bright.convertedProperty.minimum}
                                    man={bright.convertedProperty.maximum} {...bright}
                                    doChange={handleChange}/>}
        </>
    )
}