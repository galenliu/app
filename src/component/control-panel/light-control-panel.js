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
    const [properties, setProperties] = useState(props.model.properties)


    useEffect(() => {
        const update = (prop) => {
            setProperties({...prop})

        }

        props.model.subscribe(Constants.PROPERTY_STATUS, update)

        return () => {
            props.model.unsubscribe(Constants.PROPERTY_STATUS, update)
        }

    }, [])

    function handleChange(prop) {
        console.log("thing.setProperty(prop.name,prop.value)", prop, props)
        if (prop.name === props.brightnessProperty) {
            if (prop.value === 0) {
                props.setProperty(props.onProperty, false)
                return
            }
            if (prop.value !== 0 && !properties[props.onProperty]) {
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