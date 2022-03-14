import React, {useEffect, useState} from "react";
import Constants from "../constants";


export default function useProperty(thing, name) {
    const [value, SetValue] = useState(thing.model.properties[name])

    useEffect(() => {
        function handler(data) {
            if (Object.keys(data).length === 0) {
                return
            }
            for (let n in data) {
                if (n === name) {
                    SetValue(data[n])
                }
            }
        }
        thing.model.subscribe(Constants.PROPERTY_STATUS, handler)

        return (() => {
            thing.model.unsubscribe(Constants.PROPERTY_STATUS, handler)
        })
    })

    useEffect(() => {
        console.log("use property value:", value)
    }, [value])

    function set(value) {
        console.log(value, name)
        thing.model.setProperty(name, value)
    }

    return {value, set}
}

