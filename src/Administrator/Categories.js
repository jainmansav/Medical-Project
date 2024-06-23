import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';
import { alpha, styled } from '@mui/material/styles';
import { Grid, TextField, Button, Avatar } from '@mui/material'
import { borderRadius } from '@mui/system';
import { postDataImage } from './FetchNodeServices';
import Swal from "sweetalert2";
import DisplayAllCategories from './DisplayAllCategories';
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subdiv: {
    background: '#7ed6df',
    padding: 20,
    width: 700,
    marginTop: 50

  },
});
const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1.5px solid #FFF',
      borderRadius: 0
    },
    '&:hover fieldset': {
      borderColor: '#FFF',

    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFF',

    },

  },
});
const Input = styled('input')({
  display: 'none',
});

function Categories(props) {
  const classes = useStyles();
  const [categoryName, setCategoryName] = useState('')
  const [viewContainer,setViewContainer] = useState('')
  const [icon, setIcon] = useState({ bytes: '', filename: '/image.png' })
  const handleIconChange = (event) => {

    setIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })

  }
 
  const handleSubmit = async () => {
    var formData = new FormData()
    formData.append('categoryname', categoryName)
    formData.append('icon', icon.bytes)
    var result = await postDataImage('categories/savecategories', formData)
    if(result.result)
    {
      Swal.fire({
        title: "BESTMEDS",
        text: 'Category Submitted Successfully..',
        imageUrl: '/image.png',
        imageWidth: 150,
        imageHeight: 150,
        icon:'success'
      })
    }
    else
    {
      Swal.fire({
        title: "BESTMEDS",
        text: 'Fail To Submit Category',
        imageUrl: '/image.png',
        imageWidth: 150,
        imageHeight: 150,
        icon:'error'
      })
    }

  }
  return (

    <div className={classes.root}>

      <div className={classes.subdiv}>
        <Grid container spacing={2} >
          <Grid item xs={12} style={{display:'flex',alignItems:'center', fontSize: 25, fontWeight: 'bold', color: '#FFF' }}>
          <img src="/category.png" style={{width:50,height:50}}/>
            Category Interface
            <div style={{marginLeft:"auto"}}>
                   <Button onClick={()=>props.setView(<DisplayAllCategories/>)} style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} variant="contained" >List Categories</Button>
               </div>
          </Grid>
          <Grid item xs={12}>
            <CssTextField variant="outlined" InputLabelProps={{
              style: { color: '#FFF' },
            }} inputProps={{ style: { color: "#FFF" } }} label="Category Name" onChange={(event) => setCategoryName(event.target.value)} fullWidth />

          </Grid>
          <Grid item xs={6} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <label htmlFor="contained-button-file">
              <Input onChange={(event) => handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
              <Button style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth>
                Upload
              </Button>
            </label>
          </Grid>
          <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Avatar
              alt="Remy Sharp"
              src={icon.filename}
              variant="rounded"
              sx={{ width: 70, height: 70 }}
            />
          </Grid>

          <Grid item xs={6}>
            <Button onClick={() => handleSubmit()} style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} variant='contained' fullWidth>Submit</Button>

          </Grid>
          <Grid item xs={6}>
            <Button style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} variant='contained' fullWidth>Reset</Button>
          </Grid>

        </Grid>

      </div>

    </div>
  );
}

export default Categories;
