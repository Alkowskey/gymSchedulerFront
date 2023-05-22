import { ITemplateProps } from "../components/Template";

export const SAMPLE_TEMPLATES: ITemplateProps[] = [
    {
        name: 'Legs',
        exercises: [
            {name: 'Squat', sets: 3},
            {name: 'Leg Extension', sets: 3},
            {name: 'Flat Leg Raise', sets: 3},
            {name: 'Standing Calf Raise', sets: 3},
        ]
    },
    {
        name: 'Chest and Triceps',
        exercises: [
            {name: 'Bench Press', sets: 3},
            {name: 'Incline Bench Press', sets: 3},
            {name: 'Strict Military Press', sets: 3},
            {name: 'Lateral Raise', sets: 3},
            {name: 'Skullcrushers', sets: 3},
        ],
    },
    {
        name: 'Back and Biceps',
        exercises: [
            {name: 'Deadlift', sets: 3},
            {name: 'Seated Row', sets: 3},
            {name: 'Lat Pulldown', sets: 3},
            {name: 'Barbell Curl', sets: 3},
        ]  
    }
];