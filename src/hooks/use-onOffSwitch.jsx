import {useEffect, useState} from "react";
import Constants from "../../src/js/constant";


export default function useOnOffSwitch(thing) {
    const [on, SetOn] = useState(false)

    const setOn = () => {
        if(thing.onProperty){
            thing.setProperty(thing.onProperty, !on)
        }
    }

    useEffect(() => {
        const updateProperty = (data) => {
            if (data.hasOwnProperty(thing.onProperty)) {
                let value = data[thing.onProperty]
                if (value !== undefined) {
                    SetOn(value)
                }
            }
        }
        thing.model.subscribe(Constants.PROPERTY_STATUS, updateProperty)
        return () => {
            thing.model.unsubscribe(Constants.PROPERTY_STATUS, updateProperty)
        }
    })
    return [on, setOn]
}