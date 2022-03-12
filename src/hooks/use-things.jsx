import React, {useEffect, useState} from "react";
import Constants from "../constants";
import {createThingFromCapability} from "../schema-impl/capability/capabilities";


export default function useThings(gateway) {
    const [things, setThings] = useState([])

    function getThing(thingId) {
        for (const thing of things) {
            if (thing.id === thingId) {
                return thing
            }
        }
    }

    const refreshThings = async (ts, ground) => {
        console.log("ts:", ts)
        try {
            let list = []
            if (ts.size !== 0) {
                for (let [thingId, description] of ts) {
                    let thingModel = await gateway.getThingModel(thingId)
                    list.push(createThingFromCapability(description.selectedCapability, thingModel, description))
                }
                setThings(list)
            }

        } catch (e) {
            console.warn(e)
        }
    }

    useEffect(() => {
        console.log("things:", things)
    }, [things])

    useEffect(() => {
        gateway.subscribe(Constants.REFRESH_THINGS, refreshThings, true)
        return () => {
            gateway.unsubscribe(Constants.REFRESH_THINGS, refreshThings)
        }
    }, [])

    return [things, getThing]
}