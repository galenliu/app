import React, {useEffect, useState} from "react";
import Constants from "src/js/constants";


export default function useThings(gateway) {
    const [thingMaps, setThings] = useState(new Map())

    const update = (thingDescriptions, group) => {
        let m = new Map()
        for (const [id, thing] of thingDescriptions) {
            if (thing.id !== undefined) {
                m.set(id, thing)
            }
        }
        setThings(m)
    }

    useEffect(() => {
        console.log("thingMaps:",thingMaps)
    }, [thingMaps])

    useEffect(() => {
        gateway.subscribe(Constants.REFRESH_THINGS, update, true)
        gateway.subscribe(Constants.DELETE_THINGS, update)
        return () => {
            gateway.unsubscribe(Constants.REFRESH_THINGS, update)
            gateway.subscribe(Constants.DELETE_THINGS, update)
        }
    }, [])


    return [thingMaps]
}