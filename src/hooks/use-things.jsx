import React, {useCallback, useContext, useEffect, useState} from "react";
import Constants from "../constants";
import {createThingFromCapability} from "../schema-impl/capability/capabilities";
import {AppContext} from "../App";

export default function useThings(gateway) {
    const [things, setThings] = useState([])

    useEffect(() => {
        const refreshThings = (ts, ground) => {
            if (!ts.size > 0) {
                return
            }
            try {
                let list = []
                let t
                for (let [id, description] of ts) {
                    gateway.getThingModel(id).then(model => {
                        t = createThingFromCapability(description.selectedCapability, model, description)
                        list.push(t)
                    })
                }
                if (list) {
                    console.log("list :", list)
                    setThings(list)
                }
            } catch (e) {
                console.warn(e)
            }
        }
        gateway.subscribe(Constants.REFRESH_THINGS, refreshThings, true)
        return () => {
            gateway.unsubscribe(Constants.REFRESH_THINGS, refreshThings)
        }
    }, [])

    return [things]
}