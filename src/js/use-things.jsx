import React, {useEffect, useState} from "react";
import Constants from "src/js/constants";


export default function useThings(gateway) {
    const [things, setThings] = useState([])

    const refreshThings = async (thingDescriptions, ground) => {
        console.log("!!!!!!!!things descriptions",thingDescriptions)
        try {
            let list = []
            if (things.size !== 0) {
                for (let [thingId, description] of thingDescriptions) {
                    if (description) {
                        list.push({...description})
                    }
                }
            }
            setThings(list.slice())
        } catch (e) {
            console.warn(e)
        }
    }

    useEffect(() => {
        console.log("!!!!!!!!things:",things)
    }, [things])

    useEffect(() => {
        gateway.subscribe(Constants.REFRESH_THINGS, refreshThings, true)
        gateway.subscribe(Constants.DELETE_THINGS, refreshThings)
        return () => {
            gateway.unsubscribe(Constants.REFRESH_THINGS, refreshThings)
            gateway.subscribe(Constants.DELETE_THINGS, refreshThings)

        }
    }, [])

    return [things]
}