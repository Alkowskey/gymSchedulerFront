import { trpc } from "../../../utils/trpc";
import { ExercisesList, IExerciseListItem } from "../../shared/components/ExercisesList"

export const Exercise = () => {
    const exercises = trpc.getExercises.useQuery({});
    function mapExercises (): IExerciseListItem[] {
        if (exercises.error || !exercises.data) {
            return [];
        }

        return exercises.data.map((exercise: any) => {
            return {
                title: exercise.excerise,
                description: exercise.description,
                category: exercise.category
            }
        })
    }
    return (
        <ExercisesList exercises={mapExercises()}/>
    )
}