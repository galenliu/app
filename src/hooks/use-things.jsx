import React, {useEffect, useState} from "react";
import Constants from "../constants";
import {createThingFromCapability} from "../schema-impl/capability/capabilities";
import {selectFormHref} from "../utils";


export default function useThings(gateway) {
    const [things, setThings] = useState([])


    useEffect(() => {
        const refreshThings = (ts, ground) => {
            const list = []
            try {
                if (ts.size === 0) {
                    return
                }
                ts.forEach((thing, id) => {
                    let t = createThingFromCapability(thing.selectedCapability, gateway.getThingModel(id), thing)
                    list.push(t)
                })
                console.log("list :", list)
                setThings(list)
            } catch (e) {
                console.warn(e)
            }
            console.log("things :", things)
        }
        gateway.subscribe(Constants.REFRESH_THINGS, refreshThings, true)
        return () => {
            gateway.unsubscribe(Constants.REFRESH_THINGS, refreshThings)
        }
    }, [])

    return [things]
}