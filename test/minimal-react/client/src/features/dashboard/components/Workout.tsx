import { Box, Button, Divider, IconButton, Typography } from "@mui/material"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Template } from "../../workout/components/Template";
import { SAMPLE_TEMPLATES } from "../../workout/config/sampleTemplates.config";
import { Link as RouterLink } from "react-router-dom";

export const Workout = () => {
    const template = {
        name: "Chest",
        exercises: [
            {
                name: "Bench Press",
                sets: 3
            },
            {
                name: "Incline Bench Press",
                sets: 3
            },
            {
                name: "Decline Bench Press",
                sets: 3
            }
        ],
        lastPerformed: new Date()
    };
    return (
        <Box>
            <Typography variant="h4" marginBottom={4}>Workout</Typography>
            <Box mt={2}>
                <Divider>QUICK START</Divider>
                <Button component={RouterLink} to={"/dashboard/workout/new"} variant="contained" sx={{width: "100%", marginTop: "1rem"}}>Start an empty workout</Button>
            </Box>
            <Box mt={2} sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Typography>MY TEMPLATES</Typography>
                <IconButton aria-label="Add template">
                    <AddOutlinedIcon />
                </IconButton>
            </Box>
            <Box>
                <Template template={template} />
            </Box>
            <Box mt={2} mb={2} sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Typography>SAMPLE TEMPLATES</Typography>
            </Box>
            <Box>
                {
                    SAMPLE_TEMPLATES.map((template) => (
                        <Template key={template.name} template={template} />
                    ))
                }
            </Box>
        </Box>
    )
}