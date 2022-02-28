import Grid from "@mui/material/Grid";
import {useContext, useEffect} from "react";
import {AppContext} from "../../App";
import {useTranslation} from "react-i18next";

export default function Rules(props) {
    const {t} = useTranslation()
    const {setTitle} = useContext(AppContext)

    useEffect(() => {
        setTitle(t("Rules"))
    }, [])

    return (
        <>
            <Grid>
                <h1>Rules</h1>
            </Grid>
        </>
    )
}