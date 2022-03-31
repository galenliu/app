import {Path} from "src/js/menuList";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom"
import NewThingCard from "src/views/Things/NewThingCard";
import useAddThings from "src/js/use-add-thing";
import {CircularProgress, Fab, LinearProgress, Stack} from "@mui/material";
import Api from "src/js/api";
import LoadingButton from '@mui/lab/LoadingButton';
import {arrayIncludes} from "@mui/lab/internal/pickers/utils";
import {gateway} from "../../main";


export const Status = ["Paring", "Error", "Complete"]

export default function NewThings() {
    let navigate = useNavigate()
    let [newThing, state] = useAddThings(10000)
    let [things, setThings] = useState(new Map)

    useEffect(() => {

        let copy = new Map(things)
        if (newThing === undefined || newThing === null || newThing.id === undefined) {
            return
        }
        if (copy.has(newThing.id)) {
            return;
        }
        copy.set(newThing.id, newThing)
        setThings(copy)
    }, [newThing])

    function handlerSave(thing) {
        if (!thing || !thing.id || !thing.selectedCapability || thing.title === "") {
            return
        }
        Api.addThing(thing).then(() => {
            const copy = new Map(things)
            if (copy.has(thing.id)) {
                copy.delete(thing.id)
                setThings(copy)
            }
        }).catch((e) => {
            console.log(e)
        })
    }

    function reader() {
        const list = []
        for (const [id, thing] of things) {
            list.push(<NewThingCard thing={thing} save={handlerSave} key={id}/>)
        }
        return list
    }

    return (
        <Box sx={{height: "100%"}}>
            <Fab
                color="primary"
                size='medium'
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
                size='medium'
                sx={{
                    position: 'fixed',
                    top: (theme) => theme.spacing(1),
                    right: (theme) => theme.spacing(1),
                }}>
                <CircularProgress/>
            </Fab>}


            <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                <LinearProgress variant="determinate" value={92}/>
                {/*{*/}
                {/*    things.map((id,thing, index) => {*/}
                {/*        if (JSON.stringify(thing) === "{}") {*/}
                {/*            return*/}
                {/*        }*/}
                {/*        console.log("index:", index, "thing:", thing)*/}
                {/*        return <NewThingCard thing={thing} save={handlerSave} key={index}/>*/}
                {/*    })*/}

                {/*}*/}
                {reader()}
            </Stack>
        </Box>
    )
}