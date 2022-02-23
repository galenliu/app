import React,{useEffect, useState} from "react";
import Constants from "../constants";
import {createThingFromCapability} from "../schema-impl/capability/capabilities";
import {gateway} from "../App"


export default function useThings() {
    const [things, setThings] = useState([])


    useEffect(() => {

            const refreshThings =  (ts, ground)=> {

                console.log("thingsMap:", ts)
                let list = []
                ts.forEach((thing,id) =>{
                    console.log("121212",thing,id)
                })

                console.log("things:", things)
            }
            return () => {
                gateway.subscribe(Constants.REFRESH_THINGS, refreshThings, true)
            }
        }, []
    )

    return [things]
}