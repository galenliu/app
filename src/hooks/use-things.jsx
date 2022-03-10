import React, {useEffect, useState} from "react";
import Constants from "../constants";
import {createThingFromCapability} from "../schema-impl/capability/capabilities";


export default function useThings(gateway) {
    const [things, set] = useState([])

    function getThing(thingId) {
        for (const thing of things) {
            if (thing.id === thingId) {
                return thing
            }
        }
    }

    const refreshThings = (ts, ground) => {
        if (!ts.size > 0) {
            return
        }
        console.log("useThings ts :", ts)
        try {
            let list = [];
            let t
            for (let [id, description] of ts) {
                gateway.getThingModel(id).then(model => {
                    t = createThingFromCapability(description.selectedCapability, model, description)
                    list.push(t)
                })
            }
            if (list) {
                console.log("useThings List :", list)
                set(list)
            }
        } catch (e) {
            console.warn(e)
        }
    }

    useEffect(() => {
        gateway.subscribe(Constants.REFRESH_THINGS, refreshThings, true)
        return () => {
            gateway.unsubscribe(Constants.REFRESH_THINGS, refreshThings)
        }
    }, [])

    return [things,getThing]
}