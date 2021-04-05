import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {ColorPropertyItem, NumberPropertyListItem} from "../thing-property";
import Constants from "../../js/constant";

export const useStyles = makeStyles((theme) => ({
    listItem: {
        width: " 100%",
    }
}));


export function LightControlPanel(props) {
    const classes = useStyles();


    function handleChange(prop) {
        console.log("thing.setProperty(prop.name,prop.value)", prop, props)
        if (prop.name === props.brightnessProperty) {
            if (prop.value === 0) {
                props.setProperty(props.onProperty, false)
                return
            }
            if (prop.value !== 0 && props.displayedProperties[props.onProperty] === false) {
                props.setProperty(props.onProperty, true)
            }
        }
        props.setProperty(prop.name, prop.value)
    }

    return (
        <>
            {props.brightnessProperty !== null &&
            <NumberPropertyListItem {...props.displayedProperties[props.brightnessProperty]}
                                    value={props.model.properties[props.brightnessProperty]}
                                    doChange={handleChange}/>}
            {props.colorProperty !== null &&
            <ColorPropertyItem doChange={handleChange} {...props.displayedProperties[props.colorProperty]}/>}
        </>
    )
}