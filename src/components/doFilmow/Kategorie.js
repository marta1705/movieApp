import { TabContext} from '@mui/lab';
import { Box, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react'

const Kategorie = ({setGenreList, genreList, setPage}) => {

const [genres, setGenres] = useState([]); 
const [value, setValue] = useState(genreList);

const handleChange = (event, newValue) => {
    setValue(newValue);
    setGenreList(newValue);
    setPage(1);
  };

useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_KEY}&languages=en-US`)
    .then((res) => res.json())
    .then((data) => setGenres(data.genres))
}, []);

  return (
    <TabContext value={value}>
        <Box sx={{
          flexGrow: 1, 
          bgcolor: '#521733', 
          display: 'flex', 
          height: 522, 
          justifyContent: 'center', 
          width: '200px',
          borderRadius: '25px', 
          marginTop: '15px', 
          padding: '5px'}}
        >
            <Tabs TabIndicatorProps={{ style: {backgroundColor: "#fefefe"}}} textColor="inherit" orientation='vertical' value={value} onChange={handleChange} variant='scrollable'>
                {genres.map((genre) => 
                    <Tab key={genre.id} label= {genre.name} value={genre.id}/>
                )}
            </Tabs>
        </Box>
    </TabContext>
  )
}

export default Kategorie
