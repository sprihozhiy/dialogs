import React from "react";
import clsx from "clsx";
import { auth } from "../../../firebase.js";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

import LogList from "./LogList";
import Average from "./Average";
import Chart from "./Chart";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        DiaLogs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    // height: "100vh",
    // overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 250,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={() => auth.signOut()}>
            Log Out
            <ExitToAppIcon></ExitToAppIcon>
          </Button>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Average Data */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Average />
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className="fixedHeightPaper">
                <LogList />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={3}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
