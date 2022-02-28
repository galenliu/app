import Grid from "@mui/material/Grid";
import {CardMedia, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
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
import {fontStyle} from "@material-ui/system";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import {Path} from "../../js/menuList";
import {useNavigate} from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function InstalledAddonsView() {
    const navigate = useNavigate()
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
                <Grid container sx={{justifyContent: "center", flexDirection: "row"}}>
                    <AddonCard>

                    </AddonCard>
                </Grid>
            </Box></>
    )
}


export function  AddonCard(props) {
    const {t} = useTranslation()

    return (
        <Card container sx={{
            backgroundColor: "primary.light",
            maxWidth: 430, flexDirection: "column",
            justifyContent: "space-between"
        }}>
            <Stack direction={{xs: 'row', sm: 'row'}}>
                <CardMedia component="item"
                           sx={{display: "flex", flex: "30%", justifyContent: "center", alignItems: "center"}}>
                    <AdapterIcon sx={{fontSize: 60}}/>
                </CardMedia>
                <Box sx={{justifyContent: "start", flexDirection: "column", flex: "70%", display: "flex"}}>
                    <Grid container sx={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Typography variant="subtitle1">
                            HomeKit
                        </Typography>
                        <Typography variant="subtitle1" mr={4}>
                            1.1.0
                        </Typography>
                    </Grid>
                    <Typography variant="body1" mt={0.5} color="text.secondary" component="span" align={"left"}>
                        Yeelight smart bulb adapter plugin for WebThings Gateway
                    </Typography>
                    <Box mt={0.5} container sx={{display: "flex", flexDirection: "row"}}>
                        <Typography sx={{fontStyle: "italic"}} display="block" mr={1} variant="body1"
                                    color="text.secondary" align={"left"}>
                            {t(enTrans.by)}:
                        </Typography>
                        <Link sx={{color: "white", fontStyle: "italic"}} variant="body2" href="https://github.com/"
                              mr={1}> WebThingsIO </Link>
                        <Link sx={{color: "white", fontStyle: "italic"}} variant="body2"
                              href="https://github.com/">({t(enTrans.license)})</Link>
                    </Box>
                </Box>
            </Stack>
            <Stack mr={1} mt={1} spacing={1} direction={{xs: 'row', sm: 'row'}} sx={{justifyContent: "flex-end"}}>
                <Button variant="contained" backgroundColor={"primary.dark"} startIcon={<SettingsIcon/>}>
                    {t(enTrans.Settings)}
                </Button>
                <Button variant="contained" sx={{}} startIcon={<DeleteIcon/>}>
                    {t(enTrans.remove)}
                </Button>
                <Button variant="contained" startIcon={<PauseIcon/>}>
                    {t(enTrans.disable)}
                </Button>
                <Button variant="contained" backgroundColor={"primary.dark"} startIcon={<AddIcon/>}>
                    {t(enTrans.Add)}
                </Button>
            </Stack>
        </Card>
    )

}