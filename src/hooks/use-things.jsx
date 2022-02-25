import React, {useCallback, useContext, useEffect, useState} from "react";
import Constants from "../constants";
import {createThingFromCapability} from "../schema-impl/capability/capabilities";
import {AppContext} from "../App";

export default function useThings(gateway) {
    const [things, setThings] = useState([])


    useEffect(() => {
        const refreshThings = (ts, ground) => {
            console.log("ts", ts)
            const list = []
            try {
                for (let [id, description] of ts) {
                    gateway.getThingModel(id).then(model => {
                        let t = createThingFromCapability(description.selectedCapability, model, description)
                        list.push(t)
                        console.log("t", t)
                    })
                    setThings(list)
                }
            } catch (e) {
                console.warn("1111111111", e)
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