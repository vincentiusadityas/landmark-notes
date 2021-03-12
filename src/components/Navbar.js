import React from 'react';
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, AppBar, Toolbar, Menu, MenuItem} from "@material-ui/core"
import ExploreIcon from '@material-ui/icons/Explore';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import './Navbar.css'


// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// export default function NavBar() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" className={classes.title}>
//             Home
//           </Typography>
//           <Typography variant="h6" className={classes.title}>
//             Saved Notes
//           </Typography>
//           <Button color="inherit">Login</Button>
//           <Button color="inherit">Signup</Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

const useStyles = makeStyles((theme) => ({
  row:{
    flexGrow:1
  },
  grow:{
    flexGrow:1
  },
  container:{
    width:'100%',
    margin:"auto"
  },
  buttonFontSize:{
    fontSize:"11px",
    color:"#1976d2"
  },
  AppBar:{
    backgroundColor:"#fff",
    backgroundSize:"cover"
  },
  mainLogo:{
    color: "#a1a1a1",
    justifyContent:"center",
    '&:hover':{
      background:"transparent"
    }
  },
  avatar:{
    height:"100%",
    borderRadius:0,
  },
  desktopNav:{
    '@media screen and (max-width:600px)':{
      display: 'none'
    }
  },
  mobileNav:{
    display: 'none',
    '@media screen and (max-width:600px)':{
      display: 'block'
    }
  },
  navLink:{
    textDecoration: 'none'
  }
}));

export default function NavBar() {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.AppBar}>
        <Grid item sm={12} xs={12} className={classes.container}>
          <Toolbar>
            <Grid className={classes.grow}>
              <Button className={classes.mainLogo}>
                <ExploreIcon color="primary" size="large"></ExploreIcon>
              </Button>
            </Grid>
            <div className={classes.desktopNav}>
              <NavLink className={classes.navLink} to="/"><Button color="inherit" className={classes.buttonFontSize}>Home</Button></NavLink>
              <NavLink className={classes.navLink} to="/notes"><Button color="inherit" className={classes.buttonFontSize}>Saved Notes</Button></NavLink>
              <Button color="inherit" disabled>Login</Button>
              <Button color="inherit" disabled>Signup</Button>
            </div>
            <div className={classes.mobileNav}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon color="primary" size="large"/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={NavLink} to="/">Home</MenuItem>
                <MenuItem onClick={handleClose} component={NavLink} to="/notes">Saved Notes</MenuItem>
                <MenuItem onClick={handleClose} disabled>Login</MenuItem>
                <MenuItem onClick={handleClose} disabled>Signup</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </Grid>
      </AppBar>
    </div>
  );
}