import Grid from "@mui/material/Grid";
import {CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {AdapterIcon} from "../../components/Icons";


export default function InstalledAddonsView() {

    return (
        <Box sx={{
            boxShadow: 1,
            borderRadius: 1,
            p: 1,
        }}>
            <Grid container sx={{background: 'blue', justifyContent: "center", flexDirection: "center"}}>
                <InstalledAddonCard>

                </InstalledAddonCard>
            </Grid>
        </Box>
    )
}


function InstalledAddonCard() {

    return (
        <Card sx={{minWidth: 275}}>
            <AdapterIcon/>
            <Button>
                Click Me!
            </Button>
        </Card>
    )

}