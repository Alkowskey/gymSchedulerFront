import { trpc } from "../../../utils/trpc";
import { Template } from "../../workout/components/Template";

export interface IExerciseProp {
    name: string;
    sets: number;
}
export interface ITemplateProps {
    name: string;
    exercises: IExerciseProp[]
    lastPerformed?: Date;
}

export const History = () => {
    const exercises = trpc.getWorkouts.useQuery({});

    const mapToTemplate = (workout: any): ITemplateProps => {
        return {
            name: workout.note,
            exercises: workout.exercises.map((exercise: any) => ({
                name: exercise.exercise,
                sets: exercise.sets
            })),
            lastPerformed: new Date(workout.startDate)
        }
    };
    return (
        <div>
            <h1>History</h1>
            {
                exercises.data?.data.workouts.map((workout, index: number) => <Template key={index} template={mapToTemplate(workout)} />)
            }
        </div>
    )
}