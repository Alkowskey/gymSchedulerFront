import Workout from "@examples/minimal-react-server/models/workout";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useElapsedTime } from "use-elapsed-time";
import { trpc } from "../../../utils/trpc";
import { Toast } from "../../shared/utils/toast.util";
import { ExerciseRow } from "../../workout/components/ExerciseRow";

interface workoutProps {
    exercise: string,
    sets: {
        weight: number,
        reps: number
    }[],
}

export function EmptyWorkout() {
    const startDate = new Date();
    const isPlaying = true
    const { elapsedTime } = useElapsedTime({isPlaying, updateInterval: 1})
    const finishWorkout = trpc.createWorkout.useMutation(
        {
            onSuccess: (data) => {
                console.log(data)
            },
        }
    );

    const [note, setNote] = useState<string>("");

    const [exercises, setExercises] = useState<workoutProps[]>([{
        exercise: "",
        sets: Array.from({ length: 1 }, () => ({ weight: 0, reps: 0 }))
      }]);

      const handleExerciseChange = (index: number, exercise: workoutProps) => {
        const updatedExercises = [...exercises];
        updatedExercises[index] = exercise;
        setExercises(updatedExercises);
      };

      const handleAddExercise = () => {
        setExercises([
          ...exercises,
          {
            exercise: "",
            sets: Array.from({ length: 1 }, () => ({ weight: 0, reps: 0 }))
          }
        ]);
      };

      const handleFinishWorkout = () => {
        const _exercises: Workout = {note, startDate: startDate.toISOString(), endDate: new Date().toISOString(), exercises: exercises.map((exercise) => ({exercise: exercise.exercise, sets: exercise.sets.length, training: exercise.sets}))};
        finishWorkout.mutate(_exercises);

        Toast.success("Workout finished");
      };

      const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNote(event.target.value);
      }

    return (
        <Box>
            <Typography variant="body1">Empty workout</Typography>
            <Typography variant="caption">Time elapsed: {new Date(elapsedTime * 1000).toISOString().substring(11, 19) }</Typography>
            <Box>
                <TextField label="Workout Note" variant="standard" value={note} onChange={handleNoteChange} sx={{mt: 2}} fullWidth />
                {
                    exercises.map((exercise, index) => (
                        <ExerciseRow key={index} currentExercise={exercise} setExercise={(exercise) => handleExerciseChange(index, exercise)}/>
                    ))
                }
            </Box>
            <Box m={2} sx={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                <Button onClick={handleAddExercise} variant="outlined">Add exercise</Button>
                <Button onClick={handleFinishWorkout} variant="outlined" sx={{marginTop: 2}}>Finish Workout</Button>
                <Button variant="outlined" color="error" sx={{marginTop: 2}}>Cancel workout</Button>
        </Box>
        </Box>
    )
}