import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, {useContext, useEffect, useState} from "react";
import AddonCard from "./AddonCard"
import IconButton from "@mui/material/IconButton";
import {Path} from "../../js/menuList";
import {useNavigate} from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {AppContext} from "../../App";
import {fetchAvailableAddonList} from "./FatchAddons";
import API from "../../js/api";
import {useTranslation} from "react-i18next";
import enTrans from "../../i18n/en-us.json"
import {Fab} from "@mui/material";

export default function DiscoverAddonsView(props) {
    const {t} = useTranslation();
    const navigate = useNavigate()
    const [addons, setAddons] = useState([])
    const {availableAddons, installedAddons, setAvailableAddons} = useContext(AppContext)

    const installAddon = function (id, url, sum) {
        console.log(id, url, sum)
        let replaceList = new Map(availableAddons)
        replaceList.get(id).status = "installing"
        setAvailableAddons([...replaceList])
        API.installAddon(id, url, sum).then(() => {
            let replaceList = new Map(availableAddons)
            replaceList.get(id).status = "installed"
            setAvailableAddons([...replaceList])
        }).catch((e) => {
            console.log(e)
            let replaceList = new Map(availableAddons)
            if (replaceList.has(id)) {
                replaceList.get(id).status = "error"
                replaceList.get(id).error = t(enTrans.Fail)
                setAvailableAddons([...replaceList])
            }
        }).catch((e)=>{
            console.log(e)
        })
    }

    useEffect(() => {

        let availableMap = new Map(availableAddons)
        if (availableMap.size === 0) {
            fetchAvailableAddonList().then((data) => {
                let map = new Map
                data.forEach((addon, index, m) => {
                    map.set(addon.id, addon)
                })
                setAvailableAddons(map)
            })
        }else {
            for(let [id,addon]of availableMap){
                if(addon.status === "error"){
                    availableMap.get(id).status = undefined
                }
            }
            setAvailableAddons([...availableMap])
        }
    }, [])

    useEffect(() => {
        let installedMap = new Map(installedAddons)
        let listAddon = []
        for (let [id, addon] of availableAddons) {
            if (installedMap.has(addon.id)) {
                addon.status = "installed"
            }
            listAddon.push(addon)
        }
        listAddon.sort(function (a, b) {
            let x = a.id.toLowerCase();
            let y = b.id.toLowerCase();
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        })
        setAddons(listAddon)
    }, [availableAddons, installedAddons])

    return (
        <Box sx={{
            backgroundColor: "primary.background",
            height: "100%",
            p: 1,
        }}>
            <Fab
                color="secondary"
                onClick={() => {
                    navigate(Path.InstalledAddons)
                }}
                sx={{
                    position: 'fixed',
                    top: (theme) => theme.spacing(1),
                    left: (theme) => theme.spacing(1),
                }}
            >
                <ArrowBackIosIcon/>
            </Fab>

            <Grid container className="discoverAddonsGrid"
                  sx={{
                      justifyContent: "center",
                      mt: 5,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                  }}>
                {
                    addons.map((addon, index, m) => {
                        return <AddonCard {...addon} key={index} installAddon={installAddon}/>
                    })
                }
            </Grid>
        </Box>
    )
}


