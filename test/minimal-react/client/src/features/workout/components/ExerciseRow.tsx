import { Select, MenuItem, FormControl, InputLabel, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField, SelectChangeEvent, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent } from "react";
import { trpc } from "../../../utils/trpc";
import AddIcon from '@mui/icons-material/Add';

interface Props {
    currentExercise: {
      exercise: string;
      sets: { weight: number; reps: number; }[];
    };
    setExercise: (exercise: {
      exercise: string;
      sets: { weight: number; reps: number; }[];
    }) => void;
  }

export function ExerciseRow({ currentExercise, setExercise }: Props) {

  const exercises = trpc.getExercises.useQuery({});

  const handleChange = (event: SelectChangeEvent) => {
    setExercise({
      ...currentExercise,
      exercise: event.target.value as string
    });
  };

  const handleAddSet = () => {
    setExercise({
      ...currentExercise,
      sets: [...currentExercise.sets, { weight: 0, reps: 0 }]
    });
  };

  const handleRepsChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const newSets = [...currentExercise.sets];
    newSets[index] = {
      ...newSets[index],
      reps: parseInt(event.target.value) || 0
    };
    setExercise({
      ...currentExercise,
      sets: newSets
    });
  };

  const handleWeightChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const newSets = [...currentExercise.sets];
    newSets[index] = {
      ...newSets[index],
      weight: parseInt(event.target.value) || 0
    };
    setExercise({
      ...currentExercise,
      sets: newSets
    });
  };

  return (
    <Box sx={{ mt: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Exercise</InputLabel>
        <Select
          value={currentExercise.exercise}
          label="Exercise"
          onChange={handleChange}
        >
          {exercises.data?.map((exercise) => (
            <MenuItem key={exercise._id} value={exercise.excerise}>{exercise.excerise}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ mt: 2 }}>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>SET</TableCell>
                <TableCell align="right">KG</TableCell>
                <TableCell align="right">REPS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentExercise.sets.map((set, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      size="small"
                      value={set.weight}
                      onChange={(event) => handleWeightChange(event, index)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      size="small"
                      value={set.reps}
                      onChange={(event) => handleRepsChange(event, index)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <IconButton
            size="large"
            edge="start"
            color="success"
            sx={{ ml: -0.5 }}
            onClick={handleAddSet}
          >
            <AddIcon />
          </IconButton>
        </TableContainer>
      </Box>
    </Box>
  );
}
