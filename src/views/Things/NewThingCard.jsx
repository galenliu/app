import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {MenuItem, NativeSelect, Select, Stack, TextField} from "@mui/material";
import {useTranslation} from "react-i18next";
import enTrans from "../../i18n/en-us.json"
import Box from "@mui/material/Box";
import {Lightbulb} from "@mui/icons-material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";


export default function NewThingCard(props) {
    const {t} = useTranslation();

    let {thing} = props
    return (
        <Card sx={{width: 430, backgroundColor: "primary.backgroundColor"}}>
            <Stack direction={"row"}>
                <Stack width={"30%"} justifyContent={"center"} alignItems={"center"}>
                    <Lightbulb/>
                </Stack>
                <Stack width={"70%"} direction={"column"} alignItems={"center"} justifyContent={"center"}>
                    <Stack spacing={1.5} direction={"column"} sx={{mt:1,mb: 1}}>
                        <Box>
                            <TextField
                            required
                            id="standard-required"
                            label={t(enTrans.Title)}
                            defaultValue={thing.title}
                            variant="standard"/>
                        </Box>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <Select
                                value={thing["@type"][0]}
                                inputProps={{ "aria-label": t(enTrans.Capability) }}
                            >
                            {
                                thing["@type"].map((type, index) => {
                                    return  <MenuItem value={type} key={index}>{t(type)}</MenuItem>
                                })
                            }
                            </Select>
                        </FormControl>
                        <Button variant="contained">
                            {t(enTrans.Save)}
                        </Button>
                    </Stack>

                </Stack>
            </Stack>

        </Card>
    )
}