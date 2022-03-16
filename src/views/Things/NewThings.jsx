import {Path} from "../../js/menuList";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom"
import NewThingCard from "./NewThingCard";
import UseAddThings from "../../hooks/use-add-thing";
import {CircularProgress, Fab, LinearProgress, Stack} from "@mui/material";
import Api from "../../js/api";


export const Status = ["Paring", "Error", "Complete"]

export default function NewThings(props) {
    let navigate = useNavigate()
    let [newThing, state] = UseAddThings(10000)
    let [things, setThings] = useState([])

    useEffect(() => {

        let news = things
        if (newThing === undefined || newThing === null) {
            return
        }
        for (let t of news) {
            if (t.id === newThing.id) {
                return;
            }
        }
        news.push(newThing)
        setThings([...news])
    }, [newThing])

    function handlerSave(thing) {
        if (!thing || !thing.id || !thing.selectedCapability || thing.title=== ""){
            return
        }
        Api.addThing(thing).then(()=>{
            console.log("create thing:",thing)

        }).catch((e)=>{
            console.log(e)
        })
    }

    return (
        <Box sx={{height: "100%", mt: 10}}>

            <Fab
                color="primary"
                onClick={() => {
                    navigate(Path.Home)
                }}
                sx={{
                    position: 'fixed',
                    top: (theme) => theme.spacing(1),
                    left: (theme) => theme.spacing(1),
                }}
            >
                <ArrowBackIosIcon/>
            </Fab>


            {state === Status[0] && <Fab
                sx={{
                    position: 'fixed',
                    top: (theme) => theme.spacing(1),
                    right: (theme) => theme.spacing(1),
                }}
            >
                <CircularProgress/>
            </Fab>}


            <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                <LinearProgress variant="determinate" value={92}/>
                {
                    things.map((thing, index) => {
                        if (JSON.stringify(thing) === "{}") {
                            return
                        }
                        console.log("index:", index, "thing:", thing)
                        return <NewThingCard thing={thing} save={handlerSave} key={index}/>
                    })

                }
            </Stack>
        </Box>

    )
}