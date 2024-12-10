import React, { FC, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';
// import { searchUtil } from '../../utils/searchUtil';
import { PokemonListItem } from './components/PokemonListItem';
import { SearchInput } from './components/SearchComponent';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState(pokemons);

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
      <ul className={classes.pokeList}>
        {filteredItems.map((pkmn) => (
          <PokemonListItem item={pkmn} />
        ))}
      </ul>
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
      listStyle: 'none',
    },
  },
  { name: 'PokemonList' }
);
