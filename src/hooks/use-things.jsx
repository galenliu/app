import React, {useEffect, useState} from "react";
import Constants from "../constants";
import {createThingFromCapability} from "../schema-impl/capability/capabilities";


export default function useThings(gateway) {
    const [things, setThings] = useState([])

    const refreshThings = async (ts, ground) => {
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

    }, [things])

    useEffect(() => {
        gateway.subscribe(Constants.REFRESH_THINGS, refreshThings, true)
        return () => {
            gateway.unsubscribe(Constants.REFRESH_THINGS, refreshThings)
        }
    }, [])

    return [things]
}