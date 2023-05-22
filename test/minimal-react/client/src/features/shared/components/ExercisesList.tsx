import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React from "react";

export interface IExerciseListItem {
    icon?: React.ComponentType;
    title: string;
    description: string;
    category: string;
}

export function ExercisesList ({ exercises }: {exercises: IExerciseListItem[]}){

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {exercises.map((item, index) => (
            <div>
                <ListItem key={index} alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={item.title}
                        secondary={
                        <React.Fragment>
                            <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            >
                                {item.category}
                            </Typography>
                            {item.description}
                        </React.Fragment>
                        }
                    />
                </ListItem>
                
                <Divider variant="inset" component="li" />
            </div>
        ))}
            
        </List>
    )
}