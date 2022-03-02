import Grid from "@mui/material/Grid";
import {CardMedia, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useContext, useEffect, useState} from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {AdapterIcon} from "../../components/Icons";
import SettingsIcon from '@mui/icons-material/Settings';
import PauseIcon from '@mui/icons-material/Pause';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTranslation} from "react-i18next";
import enTrans from "../../i18n/en-us.json"
import Link from '@mui/material/Link';
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import UpgradeIcon from '@mui/icons-material/Upgrade';
import {Path} from "../../js/menuList";
import {useNavigate} from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import API from "../../js/api";
import {fetchAvailableAddonList} from "./FatchAddons";
import {AppContext} from "../../App";
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import AddonCard, {versionStringCompare} from "./AddonCard"


export default function InstalledAddonsView() {
    const navigate = useNavigate()
    const {installedAddons, setInstalledAddons} = useContext(AppContext)
    const {availableAddons, setAvailableAddons} = useContext(AppContext)
    const [addons, setAddons] = useState([])

    useEffect(() => {

        API.getInstalledAddons().then(data => {
            if (data === null) {
               return new Error("installed addons not found")
            }
            let addonMaps = new Map()
            data.forEach((addon, index) => {
                console.log("addon:",addon)
                if (addon) {
                    addonMaps.set(addon.id, addon)
                }
            })
            setInstalledAddons([...addonMaps])
        }).catch((err) => {
            console.error(err)
        })
        fetchAvailableAddonList().then((data) => {
            let avaAddonMaps = new Map()

            data.forEach((addon, index, m) => {
                avaAddonMaps.set(addon.id, addon)
            })
            setAvailableAddons([...avaAddonMaps])
        }).catch((e) => {
            console.error(e)
        })
    }, [])


    useEffect(() => {
        let list = []
        let availableMap = new Map(availableAddons)
        let installedMap = new Map(installedAddons)

        for (let [id, addon] of installedMap) {
            if (availableMap.has(addon.id)) {
                if (versionStringCompare(availableMap.get(addon.id).version, addon.version) !== 0) {
                    addon.status = "update"
                }
            }

            addon.status = "enabled"
            list.push(addon)
        }
        setAddons([...list])
    }, [installedAddons, availableAddons])

    return (
        <Box className="installedAddonRootBox" sx={{
            backgroundColor: "primary.background",
        }}>
            <IconButton sx={{position: "fixed", left: 1, mt: 1.5, ml: 1.5, backgroundColor: "primary.light"}}
                        onClick={() => {
                            navigate(Path.Settings)
                        }}>
                <ArrowBackIosIcon/>
            </IconButton>

            <IconButton sx={{position: "fixed", right: 1, mt: 1.5, mr: 1.5, backgroundColor: "primary.light"}}
                        onClick={() => {
                            navigate(Path.DiscoverAddons)
                        }}>
                <AddIcon/>
            </IconButton>

            <Grid container className="installedAddonsGrid"
                  sx={{
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      mt: 5,
                      alignItems: "center"
                  }}>
                {
                    addons.map((addon, i) => {
                        return (<AddonCard {...addon} key={i}/>)
                    })
                }
            </Grid>
        </Box>

    )
}


