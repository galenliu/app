import InstalledAddonsView from "./InstelledAddons";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, {useContext, useEffect, useState} from "react";
import AddonCard from "./AddonCard"
import IconButton from "@mui/material/IconButton";
import {Path} from "../../js/menuList";
import {useNavigate} from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from "@mui/icons-material/Add";
import {AppContext} from "../../App";
import {fetchAvailableAddonList} from "./FatchAddons";
import API from "../../js/api";

export default function DiscoverAddonsView(props) {
    const navigate = useNavigate()
    const [addons, setAddons] = useState([])
    const {availableAddons, installedAddons, setAvailableAddons} = useContext(AppContext)

    const installAddon = function (id, url, sum) {
        console.log(id, url, sum)
        let replaceList = new Map(availableAddons)
        replaceList.get(id).status = "installing"
        setAvailableAddons([...replaceList])
        API.installAddon(id, url, sum).then(() => {
            replaceList.get(id).status = "installed"
            setAvailableAddons([...replaceList])
        }).catch((e) => {
            replaceList.get(id).status = "error"
            setAvailableAddons([...replaceList])
        })
    }

    useEffect(() => {
        let installedMap = new Map(installedAddons)
        let availableMap = new Map(availableAddons)
        if (availableMap.size === 0) {
            fetchAvailableAddonList().then((data) => {
                let map = new Map
                data.forEach((addon, index, m) => {
                    if (installedMap.has(addon.id)) {
                        addon.installed = true
                    }
                    addon.installed = false
                    map.set(addon.id, addon)
                })
                setAvailableAddons(map)
            })
        }
    },[])

    useEffect(() => {
        let installedMap = new Map(installedAddons)
        let listAddon = []
        for (let [id, addon] of availableAddons) {
            if(installedMap.has(addon.id)){
                addon.status = "installed"
            }
            listAddon.push(addon)
        }
        setAddons([...listAddon])
    }, [availableAddons])

    return (
        <Box sx={{
            backgroundColor: "primary.background",
            height: "100%",
            p: 1,
        }}>
            <IconButton sx={{position: "fixed", left: 1, mt: 1.5, ml: 1.5, backgroundColor: "primary.light"}}
                        onClick={() => {
                            navigate(Path.InstalledAddons)
                        }}>
                <ArrowBackIosIcon/>
            </IconButton>

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


