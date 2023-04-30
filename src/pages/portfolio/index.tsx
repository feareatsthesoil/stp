import { Avatar, Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AuthLayout from "../../Components/Layouts/AuthLayout";
import DefaultLayout from "../../Components/Layouts/DefaultLayout";

export default function Portfolio() {


    return <AuthLayout>
        <h1>Your portfolio</h1>
        <Button>Upload</Button>

        <>
            <Grid container>
                <Grid item><Box sx={{ border: "1px solid black", height: 100, width: 100 }}></Box>

                    <Button>Delete</Button>
                </Grid>
                <Grid item><Box sx={{ border: "1px solid black", height: 100, width: 100 }}></Box>

                    <Button>Delete</Button>
                </Grid>

                <Grid item><Box sx={{ border: "1px solid black", height: 100, width: 100 }}></Box>

                    <Button>Delete</Button>
                </Grid>
            </Grid>

        </>
    </AuthLayout>
}