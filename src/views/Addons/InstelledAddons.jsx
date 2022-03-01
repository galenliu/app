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
import DoneIcon from '@mui/icons-material/Done';
import API from "../../js/api";
import {fetchAvailableAddonList} from "./FatchAddons";
import {AppContext} from "../../App";


export default function InstalledAddonsView() {
    const navigate = useNavigate()
    const {installedAddons, setInstalledAddons} = useContext(AppContext)
    const {availableAddons, setAvailableAddons} = useContext(AppContext)
    const [addons, setAddons] = useState([])

    useEffect(() => {
        API.getInstalledAddons().then(data => {
            if (data === null) {
                setInstalledAddons(new Map())
            }
            let addons = new Map()
            data.forEach((addon, index) => {
                if (addon) {
                    addons.set(addon.id, addon)
                }
            })
            setInstalledAddons([...addons])

        }).catch((err) => {
            console.error(err)
            setInstalledAddons(new Map())
        })
        fetchAvailableAddonList().then((data) => {
            let map = new Map

            data.forEach((addon, index, m) => {
                if (installedAddons.hasOwnProperty(addon.id)) {
                    addon.installed = true
                }
                addon.installed = false
                map.set(addon.id, addon)
            })

            setAvailableAddons(map)
        }).catch((e) => {
            console.error(e)
        })
    }, [])


    useEffect(() => {
        let list = []
        for (let [id, addon] of installedAddons) {
            if (availableAddons.has(addon.id)) {
                if (versionStringCompare(availableAddons.get(addon.id).version, addon.version) !== 0) {
                    addon.updated = true
                }
            }
            addon.updated = false
            list.push(addon)
        }
        setAddons([...list])
    }, [installedAddons, availableAddons])

    return (
        <>
            <IconButton sx={{float: "left", mt: 1.5, ml: 1.5, backgroundColor: "primary.light"}} onClick={() => {
                navigate(Path.Settings)
            }}>
                <ArrowBackIosIcon/>
            </IconButton>

            <IconButton sx={{float: "right", mt: 1.5, mr: 1.5, backgroundColor: "primary.light"}} onClick={() => {
                navigate(Path.DiscoverAddons)
            }}>
                <AddIcon/>
            </IconButton>
            <Box sx={{
                boxShadow: 1,
                borderRadius: 1,
                p: 1,
            }}>
                <Grid container
                      sx={{justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center"}}>
                    {
                        addons.map((addon, i) => {
                            return (<AddonCard {...addon} key={i}/>)
                        })
                    }
                </Grid>
            </Box></>
    )
}


export function AddonCard(addon) {
    const {t} = useTranslation()

    return (
        <Card
            sx={{
                width: 430,
                mb: 2,
                backgroundColor: "primary.light",
                flexDirection: "column",
                justifyContent: "space-between"
            }}>
            <Stack direction={{xs: 'row', sm: 'row'}} sx={{mt: 1}}>
                <CardMedia sx={{display: "flex", flex: "30%", justifyContent: "center", alignItems: "center"}}>
                    <AdapterIcon sx={{fontSize: 60}}/>
                </CardMedia>
                <Box sx={{justifyContent: "start", flexDirection: "column", flex: "70%", display: "flex"}}>
                    <Grid container sx={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Typography variant="subtitle1">
                            {addon.name}
                        </Typography>
                        <Typography variant="subtitle1" mr={4}>
                            {addon.version}
                        </Typography>
                    </Grid>
                    <Typography variant="body1" mt={0.5} color="text.secondary" component="span" align={"left"}>
                        {addon.description}
                    </Typography>
                    <Box mt={0.5} container sx={{display: "flex", flexDirection: "row"}}>
                        <Typography sx={{fontStyle: "italic"}} display="block" mr={1} variant="body2"
                                    color="text.secondary" align={"left"}>
                            {t(enTrans.by)}:
                        </Typography>
                        <Link sx={{color: "white", fontStyle: "italic"}} variant="body2" href={addon.homepage_url}
                              mr={1}> {addon.author} </Link>
                        <Link sx={{color: "white", fontStyle: "italic"}} variant="body2"
                              href="https://github.com/">({t(enTrans.license)})</Link>
                    </Box>
                </Box>
            </Stack>
            <Stack spacing={1} direction={{xs: 'row', sm: 'row'}} sx={{m: 1, justifyContent: "flex-end"}}>
                {!addon.schema !== undefined &&
                    <Button variant="contained" startIcon={<SettingsIcon/>}>
                        {t(enTrans.Settings)}
                    </Button>
                }
                <Button variant="contained" sx={{}} startIcon={<DeleteIcon/>}>
                    {t(enTrans.remove)}
                </Button>
                {(addon.enabled !== undefined && addon.enabled) &&
                    <Button variant="contained" startIcon={<PauseIcon/>}>
                        {t(enTrans.disable)}
                    </Button>
                }
                {(addon.enabled !== undefined && !addon.enabled) &&
                    <Button variant="contained" startIcon={<DoneIcon/>}>
                        {t(enTrans.enable)}
                    </Button>
                }
                {
                    addon.enabled === undefined &&
                    <Button variant="contained" startIcon={<AddIcon/>}>
                        {t(enTrans.Add)}
                    </Button>
                }
                {
                    addon.updated &&
                    <Button variant="contained" startIcon={<UpgradeIcon/>}>
                        {t(enTrans.Updates)}
                    </Button>
                }
                {
                    addon.installed &&
                    <Button variant="contained" disabled startIcon={<AddIcon/>}>
                        {t(enTrans.Add)}
                    </Button>
                }
            </Stack>
        </Card>
    )

}


export const versionStringCompare = (preVersion = '', lastVersion = '') => {
    var sources = preVersion.split('.');
    var dests = lastVersion.split('.');
    var maxL = Math.max(sources.length, dests.length);
    var result = 0;
    for (let i = 0; i < maxL; i++) {
        let preValue = sources.length > i ? sources[i] : 0;
        let preNum = isNaN(Number(preValue)) ? preValue.charCodeAt() : Number(preValue);
        let lastValue = dests.length > i ? dests[i] : 0;
        let lastNum = isNaN(Number(lastValue)) ? lastValue.charCodeAt() : Number(lastValue);
        if (preNum < lastNum) {
            result = -1;
            break;
        } else if (preNum > lastNum) {
            result = 1;
            break;
        }
    }
    return result;
}
