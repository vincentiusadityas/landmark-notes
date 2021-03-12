import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import CustomTable from './CustomTable'

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: 15,
    marginBottom: 10,
    color: '#115293'
  }
}));

export default function PageNote() {
  const classes = useStyles();

  const [data, setData] = useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      await fetch('/api/notes')
        .then(results => results.json())
        .then(data => {
          setData(data.notes)
      })
    };
    fetchData();
  }, [])
 
  return (
    <>
      <Container maxWidth={false}>
        <Typography variant="h5" className={classes.title}>Saved Notes</Typography>
        <CustomTable data={data}></CustomTable>
      </Container>
    </>
  );
}