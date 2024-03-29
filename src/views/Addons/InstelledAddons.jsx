import Grid from "@mui/material/Grid";
import React, {useContext, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import {Path} from "src/js/menuList";
import {useNavigate} from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import API from "src/js/api";
import {fetchAvailableAddonList} from "./FatchAddons";
import {AppContext} from "../../App";
import AddonCard, {versionStringCompare} from "./AddonCard"
import enTrans from "src/js/i18n/en-us.json"
import {Fab} from "@mui/material";


export default function InstalledAddonsView() {

    const navigate = useNavigate()
    const {installedAddons, setInstalledAddons} = useContext(AppContext)
    const {availableAddons, setAvailableAddons} = useContext(AppContext)
    const [addons, setAddons] = useState([])

    function removeAddon(addonId) {
        let installMap = new Map(installedAddons)
        installMap.get(addonId).status = "removing"
        setInstalledAddons([...installMap])
        API.uninstallAddon(addonId).then(() => {
            updateInstallAddons()
        }).catch((e) => {
                console.error(e)
                installMap.get(addonId).status = "error"
                installMap.get(addonId).error = t(enTrans.Error)
                setInstalledAddons([...installMap])
            }
        )
    }

    function setAddon(id, enabled) {
        API.setAddonSetting(id, enabled).then(() => {
            updateInstallAddons()
        }).catch((e) => {
            console.error(e)
        })
    }

    function updateInstallAddons() {
        API.getInstalledAddons().then(data => {
            if (data === null || data === undefined) {
                setInstalledAddons(new Map())
                return
            }
            let addonMaps = new Map()
            data.forEach((addon, index) => {
                if (addon) {
                    addonMaps.set(addon.id, addon)
                }
            })
            setInstalledAddons([...addonMaps])
        }).catch((err) => {
            setInstalledAddons(new Map())
            console.error(err)
        })
    }

    useEffect(() => {
        updateInstallAddons()
        if (availableAddons.size === 0) {
            fetchAvailableAddonList().then((data) => {
                let avaAddonMaps = new Map()
                data.forEach((addon, index, m) => {
                    avaAddonMaps.set(addon.id, addon)
                })
                setAvailableAddons(avaAddonMaps)
            }).catch((e) => {
                console.error(e)
            })
        }
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
        list.sort(function (a, b) {
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
        setAddons(list)
    }, [installedAddons, availableAddons])

    return (
        <Box className="installedAddonRootBox" sx={{
            backgroundColor: "primary.background",
        }}>
            <Fab
                color="primary"
                size='medium'
                onClick={() => {
                    navigate(Path.Settings)
                }}
                sx={{
                    position: 'fixed',
                    top: (theme) => theme.spacing(1),
                    left: (theme) => theme.spacing(1),
                }}
            >
                <ArrowBackIosIcon/>
            </Fab>

            <Fab
                color="primary"
                size='medium'
                onClick={() => {
                    navigate(Path.DiscoverAddons)
                }}
                sx={{
                    position: 'fixed',
                    top: (theme) => theme.spacing(1),
                    right: (theme) => theme.spacing(1),
                }}
            >
                <AddIcon/>
            </Fab>


            <Grid container className="installedAddonsGrid"
                  sx={{
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      mt: 5,
                      alignItems: "center"
                  }}>
                {
                    addons.map((addon, index, m) => {
                        return (<AddonCard {...addon} key={index} removeAddon={removeAddon} setAddon={setAddon}/>)
                    })
                }
            </Grid>
        </Box>

    )
}


