import React, {useEffect, useState} from "react";
import Constants from "../constants";


export default function useProperty(thing, name) {
    const [value, setValue] = useState(thing.model.property[name])

    useEffect(() => {
        function handler(data) {
            for (let n of data) {
                if (n === name) {
                    setValue(data[n])
                }
            }
        }

        thing.model.subscribe(Constants.PROPERTY_STATUS, handler)

        return (() => {
            thing.model.unsubscribe(Constants.PROPERTY_STATUS, handler)
        })
    })

    function set(value) {
        thing.model.setProperty(name, value)
    }

    return [value, set]
}