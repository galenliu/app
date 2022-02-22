import {useEffect, useState} from "react";
import Constants from "../constants";
import {createThingFromCapability} from "../schema-impl/capability/capabilities";
import {gateway} from "../App"


export function useThings() {
    const [things, setThings] = useState([])


    useEffect(() => {

            const refreshThings = (ts) => {

                console.log("thingsMap.entries:", typeof ts)
                let list = []

                for(let {description,thingId} of ts){
                    console.log("thingId:", thingId)
                    console.log("description:", description)
                    let thingModel = gateway.getThingModel(thingId)
                    console.log("thingModel:", thingModel)
                    let t = createThingFromCapability(
                        description.selectedCapability,
                        thingModel,
                        description,
                    )
                    console.log("t:", t)
                    list.push(t)
                }

                console.log("things:", things)
            }
            gateway.subscribe(Constants.REFRESH_THINGS, refreshThings, true)

        }, []
    )

    return [things]
}