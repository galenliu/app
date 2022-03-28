import Card from "@mui/material/Card";


export default function PropertyCard(props) {
    const {children,backgroundColor, ...other}  = props
    return (
        <Card {...other}
            sx={{
                backgroundColor:backgroundColor,
                boxShadow: 5,
                borderRadius:3,
            }}>
            {children}
        </Card>
    )
}