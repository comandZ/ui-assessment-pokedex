import React, { FC, useEffect, useState, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';
// import { searchUtil } from '../../utils/searchUtil';
import { PokemonListItem } from './components/PokemonListItem';
import { SearchInput } from './components/SearchComponent';
import { PokemonDetail } from './components/PokemonDetail';
import { useSearchParams } from 'react-router-dom';
import { List, Grid2 } from '@mui/material';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState(pokemons);
  const [open, setOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const pokeID = useMemo(() => {
    const id = searchParams.get('pokeID');
    if (id === null) {
      return null;
    }
    return decodeURIComponent(id);
  }, [searchParams]);
  const pokeName = searchParams.get('pokeName');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSearchParams();
    setOpen(false);
  };

  useEffect(() => {
    if (!searchTerm || searchTerm === '') {
      setFilteredItems(pokemons);
      return;
    }
    const filteredData = pokemons.filter((item) => {
      const lowerTypes = item.types.map((str) => str.toLowerCase());
      if (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lowerTypes.includes(searchTerm.toLowerCase())
      ) {
        return item;
      }
    });

    setFilteredItems(filteredData);
  }, [searchTerm]);

  return (
    <Grid2 container className={classes.root} spacing={4}>
      <Grid2 size={5}>
        <SearchInput onChangeSearchQuery={(query) => setSearchTerm(query)} />
      </Grid2>

      <Grid2 size={7}>
        {loading && <div>Loading...</div>}
        <List className={classes.pokeList}>
          {filteredItems.map((pkmn) => (
            <PokemonListItem item={pkmn} handleOpen={handleOpen} />
          ))}
        </List>
        {pokeID && pokeName && (
          <PokemonDetail
            open={open}
            handleClose={handleClose}
            pokeID={pokeID}
            pokeName={pokeName}
          />
        )}
      </Grid2>
    </Grid2>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },
    pokeList: {
      maxWidth: '100%',
      margin: '0 auto',
    },
  },
  { name: 'PokemonList' }
);
