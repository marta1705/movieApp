import React, {useContext, useState} from 'react'
import { GlobalContext } from '../Context/GlobalState';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { KartaFilmBiblioteka } from '../doFilmow/KartaFilmBiblioteka';

export const Biblioteka = () => {

  const {watchlist} = useContext(GlobalContext); 
  const {watched} = useContext(GlobalContext);
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <h1 className='main_title'>Biblioteka</h1>

      <TabContext value={value}>
        <Box sx={{ borderColor: 'divider'}}>
          <TabList onChange={handleChange} centered textColor='inherit' TabIndicatorProps={{ style: {backgroundColor: "#39445a"}}}>
            <Tab style={{width: "50%"}} label="Do obejrzenia" value="1" />
            <Tab style={{width: "50%"}} label="Obejrzane" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div className='movies_container'>
          {watchlist.map((movie) => 
        <KartaFilmBiblioteka key={`watchlist_${movie.id}`} movie={movie} type="watchlist"/>
    )}
          </div>

        </TabPanel>
        <TabPanel value="2">
        <div className='movies_container'>
          {watched.map((movie) => 
        <KartaFilmBiblioteka key={`watched_${movie.id}`} movie={movie} type="watched"/>
    )}
          </div>
        </TabPanel>
      </TabContext>


    </div>
  );
};

