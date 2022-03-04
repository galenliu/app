import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";



export default function NewThingCard(thing){
    return (
        <Card>
            <Typography>
                {thing.title}
            </Typography>
        </Card>
    )
}