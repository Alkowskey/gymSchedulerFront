import { Box, Typography } from "@mui/material"

export interface IExerciseProp {
    name: string;
    sets: number;
}
export interface ITemplateProps {
    name: string;
    exercises: IExerciseProp[]
    lastPerformed?: Date;
}
export function Template({ template }: {template: ITemplateProps}) {
    return (
        <Box mt={2} mb={2} sx={{border: 1, borderRadius: 2, borderColor: 'grey.500', padding: 2}}>
            <Typography variant="h6">{template.name}</Typography>
            {
                template.lastPerformed?<Typography color="darkgray">Last performed: {template.lastPerformed.toLocaleDateString()}</Typography>:null
            }
            {template.exercises.map((exercise: IExerciseProp, index: number) => (
                <Typography key={index} color="darkgray">{exercise.name}</Typography>
            ))}
        </Box>
    )
}