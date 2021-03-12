import SimpleMap from './Map';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button, Container, TextField, Typography, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import SaveIcon from '@material-ui/icons/Save';
import React from 'react'
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    gridRoot: {
        marginBlock: 10,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing(1),
    },
    title: {
        marginTop: 15,
        color: '#115293'
    },
    user: {
        marginBottom: 10,
        width: '150px',
    },
    notes: {
        marginTop: 13,
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function PageHome() {
    const classes = useStyles(); 

    const [user, setUser] = React.useState("Guest")

    const [coord] = React.useState({ lat: -34.397, lng: 150.644 })

    const [chosenCoord, setChosenCoord] = React.useState(coord)

    const [notes, setNotes] = React.useState("")

    const [alertOpen, setAlertOpen] = React.useState(false);

    const [alertType, setAlertType] = React.useState(null)

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setAlertOpen(false);
    }

    const handleSaveNotes = async () => {
        if (notes) {
            const data = {user:user, coords: chosenCoord, notes:notes}
            await postData(data);
            
            setNotes("")
            setAlertType("success")
        } else {
            setAlertType("error")
        }
        setAlertOpen(true)
    }

    const postData = async (data) => {
        await fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
        })
    }
    
    return (
        <>
            <Container maxWidth={false}>
                <Typography variant="h5" className={classes.title}>My Community Landmark</Typography>
                <Grid container spacing={2} className={classes.gridRoot}>
                <Grid item md={6} sm={6} xs={12}>
                    <Paper className={classes.paper} elevation={3}>
                    <SimpleMap coord={coord} setChosenCoord={setChosenCoord}></SimpleMap>
                    </Paper>
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <Paper className={classes.paper} elevation={3}>
                    <Typography variant="h6">
                        Hello, <TextField 
                                    className={classes.user} 
                                    defaultValue={user} 
                                    placeholder="Your name here!"
                                    onChange={(e) => {setUser(e.target.value)}}
                                />
                        !
                    </Typography>
                    <Typography variant="body1">
                        Your chosen location coordinate is:
                    </Typography>
                    <Typography variant="overline">
                        Latitude: {chosenCoord.lat}
                    </Typography><br/>
                    <Typography variant="overline">
                        Longitude: {chosenCoord.lng}
                    </Typography>
                    <Typography variant="body1" className={classes.notes}>
                        Write your notes below!
                    </Typography>
                    <TextField
                        id="filled-multiline-static"
                        label="My Notes"
                        multiline
                        rows={5}
                        fullWidth
                        placeholder="This is a great location!"
                        value={notes}
                        onChange={(e) => {setNotes(e.target.value)}}
                        variant="filled"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={handleSaveNotes}
                    >
                        Save
                    </Button>
                    </Paper>
                </Grid>
                </Grid>
            </Container>
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                {alertType === "error"?
                <Alert onClose={handleAlertClose} severity="error">
                    Cannot save empty notes!
                </Alert>
                : alertType === "success"?
                    <Alert onClose={handleAlertClose} severity="success">
                    Successfully saved your notes! Check it <NavLink to="/notes">here</NavLink>.
                    </Alert>
                :
                <></>
                }
            </Snackbar>
        </>
    )
}