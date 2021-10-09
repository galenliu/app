//向网关定阅property的hooks
import React, {useEffect, useState} from "react";
import {ThingsScreen} from "../App";
import Constants from "./constant";


function useProperty(props) {

    const {thingId, propertyName} = props
    const [value, SetValue] = useState(null)
    const [err, setError] = useState(null)

    useEffect(() => {
        function onChange(property) {
            if (property[propertyName] !== undefined) {
                SetValue(property[propertyName])
            }
        }

        const thing = ThingsScreen.getThing(thingId)
        if (thing == null) {
            setError(Error.ThingIsNull)
        } else {
            thing.model.subscribe(Constants.PROPERTY_STATUS, onChange)
        }
        return () => {
            if (thing !== null) {
                thing.model.unsubscribe(Constants.PROPERTY_STATUS, onChange)
            }
        }
    }, [])

    return [value, err]
}
