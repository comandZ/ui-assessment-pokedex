import React, { FC, useEffect, useState, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';
// import { searchUtil } from '../../utils/searchUtil';
import { PokemonListItem } from './components/PokemonListItem';
import { SearchInput } from './components/SearchComponent';
import { PokemonDetail } from './components/PokemonDetail';
import { useSearchParams } from 'react-router-dom';
import { List } from '@mui/material';

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
    <div className={classes.root}>
      {loading && <div>Loading...</div>}
      <SearchInput onChangeSearchQuery={(query) => setSearchTerm(query)} />
      {pokeID}
      {pokeName}
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
    </div>
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
