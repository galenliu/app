import {useTranslation} from "react-i18next";
import Card from "@mui/material/Card";
import {Alert, CardMedia, Stack} from "@mui/material";
import AdapterIcon from "../../images/adapter-icon";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import enTrans from "../../i18n/en-us.json";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import PauseIcon from "@mui/icons-material/Pause";
import DoneIcon from "@mui/icons-material/Done";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import AddIcon from "@mui/icons-material/Add";
import React from "react";


export default function AddonCard(addon) {
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
                <Box sx={{flexDirection: "column", flex: "70%", display: "flex"}}>
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
                {(addon.schema !== undefined && addon.status !== "removing") &&
                    <Button variant="contained" startIcon={<SettingsIcon/>}>
                        {t(enTrans.Settings)}
                    </Button>
                }
                {(addon.status === "enabled") &&
                    <Button onClick={() => {
                        addon.removeAddon(addon.id)
                    }} variant="contained" sx={{}} startIcon={<DeleteIcon/>}>
                        {t(enTrans.remove)}
                    </Button>}
                {(addon.enabled && true && addon.status !== "removing") &&
                    <Button onClick={()=>{addon.setAddon(addon.id,false)}} variant="contained" startIcon={<PauseIcon/>}>
                        {t(enTrans.disable)}
                    </Button>
                }
                {(!addon.enabled && addon.enabled !== undefined && addon.status !== "removing") &&
                    <Button onClick={()=>{addon.setAddon(addon.id,true)}} variant="contained" startIcon={<DoneIcon/>}>
                        {t(enTrans.enable)}
                    </Button>
                }

                {
                    addon.status === "update" &&
                    <Button variant="contained" startIcon={<UpgradeIcon/>}>
                        {t(enTrans.Updates)}
                    </Button>
                }
                {
                    (addon.status === undefined) &&
                    <Button onClick={() => {
                        addon.installAddon(addon.id, addon.url, addon.checksum)
                    }} variant="contained" startIcon={<AddIcon/>}>
                        {t(enTrans.Add)}
                    </Button>
                }
                {
                    addon.status === "installing" &&
                    <Alert severity="info"> {t(enTrans.Installing)}</Alert>
                }
                {
                    addon.status === "error" &&
                    <Alert severity="error">{addon.error}</Alert>
                }
                {
                    addon.status === "removing" &&
                    <Alert severity="warning">{t(enTrans.removing)}</Alert>
                }
                {
                    (addon.status === "installed") &&
                    <Alert severity="success"> {t(enTrans.Installed)}</Alert>
                }

            </Stack>
        </Card>
    )

}


export const versionStringCompare = (preVersion = '', lastVersion = '') => {
    let sources = preVersion.split('.');
    let dest = lastVersion.split('.');
    let maxL = Math.max(sources.length, dest.length);
    let result = 0;
    for (let i = 0; i < maxL; i++) {
        let preValue = sources.length > i ? sources[i] : 0;
        let preNum = isNaN(Number(preValue)) ? preValue.charCodeAt(0) : Number(preValue);
        let lastValue = dest.length > i ? dest[i] : 0;
        let lastNum = isNaN(Number(lastValue)) ? lastValue.charCodeAt(0) : Number(lastValue);
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
