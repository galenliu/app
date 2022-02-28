import InstalledAddonsView, {AddonCard} from "./InstelledAddons";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import Card from "@mui/material/Card";
import {CardMedia, Stack} from "@mui/material";
import {AdapterIcon} from "../../components/Icons";
import Typography from "@mui/material/Typography";
import enTrans from "../../i18n/en-us.json";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import {useTranslation} from "react-i18next";
import IconButton from "@mui/material/IconButton";
import {Path} from "../../js/menuList";
import {useNavigate} from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from "@mui/icons-material/Add";

export default function DiscoverAddonsView(props) {
    const navigate = useNavigate()
    return (
        <>
            <IconButton sx={{float: "left", mt: 1.5, ml: 1.5, backgroundColor: "primary.light"}} onClick={() => {
                navigate(Path.InstalledAddons)
            }}>
                <ArrowBackIosIcon/>
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
            </Box>
        </>
    )
}


