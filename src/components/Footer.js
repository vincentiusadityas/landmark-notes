
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        WebkitBoxSizing: 'border-box',
        boxSizing: 'border-box',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 'auto',
        paddingRight: 'auto',
        textAlign: 'center!important',
        color: '#115293',
    },
    love: {
        color: 'red',
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            textDecoration: 'underline',
            color: '#115293'
        }
    }
  }));

export default function Footer() {
    const classes = useStyles();

    return (
        <footer>
            <div className={classes.footer}>
                Made with <span className={classes.love}>♥</span> by <a className={classes.link} href="https://vincentiusadityas.dev/" rel="noreferrer" target="_blank">vincentiusadityas.dev</a>
            </div>
        </footer>
    )
}