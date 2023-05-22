
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import ScaleIcon from '@mui/icons-material/Scale';

export interface IMenuConfig {
    name: string;
    icon: React.ComponentType;
}

export const MENU_ITEMS = [
    {name: 'Profile', icon: AccountCircleIcon, link: '/dashboard/profile'},
    {name: 'History', icon: HistoryToggleOffIcon, link: '/dashboard/history'},
    {name: 'Workout', icon: FitnessCenterIcon, link: '/dashboard/workout'},
    {name: 'Exercises', icon: SportsMartialArtsIcon, link: '/dashboard/exercises'},
    {name: 'Measure', icon: ScaleIcon, link: '/dashboard/measure'},
]