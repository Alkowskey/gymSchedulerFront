import { Avatar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Theme, Toolbar, Typography, useTheme } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { StringUtil } from "../../../utils/StringUtil";
import { Component, createElement } from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link as RouterLink } from 'react-router-dom';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { MENU_ITEMS } from "../config/MenuConfig";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  type Props = {
    children: React.ReactNode;
    theme: Theme;
  }

export default class Appbar extends Component<Props, AppBarProps>{
  constructor(props: Props){
    super(props)
    this.state = {
      open: false
    }
  }
  render(){
    const { theme } = this.props;

    const handleDrawerOpen = () => {
      this.setState({
        ...this.state,
        open: true
      })
    };

    const handleDrawerClose = () => {
      this.setState({
        ...this.state,
        open: false
      })
    };
      return (
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleDrawerOpen}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  ZTI project
                </Typography>
                <Avatar {...StringUtil.stringAvatar('Aleksander Kulinsk')} />

              </Toolbar>
            </AppBar>
            <Drawer
                  sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                      width: drawerWidth,
                      boxSizing: 'border-box',
                  },
                  }}
                  variant="persistent"
                  anchor="left"
                  open={this.state.open}
              >
                  <DrawerHeader>
                  <IconButton onClick={handleDrawerClose}>
                      {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
                  </DrawerHeader>
                  <Divider />
                  <List>
                  {MENU_ITEMS.map((item) => (
                      <ListItem key={item.name} disablePadding>
                          <ListItemButton component={RouterLink} to={item.link}>
                              <ListItemIcon>
                              { createElement(item.icon) }
                              </ListItemIcon>
                              <ListItemText primary={item.name} />
                          </ListItemButton>
                      </ListItem>
                  ))}
                  </List>
                  <Divider />
                  <List>
                  {['All mail', 'Trash', 'Spam'].map((text, index) => (
                      <ListItem key={text} disablePadding>
                      <ListItemButton>
                          <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                          </ListItemIcon>
                          <ListItemText primary={text} />
                      </ListItemButton>
                      </ListItem>
                  ))}
                  </List>
              </Drawer>
            <Main open={this.state.open} sx={{
              marginLeft: '10px',
            }}>
              {this.props.children}
            </Main>
          </Box>
        );
  }
}