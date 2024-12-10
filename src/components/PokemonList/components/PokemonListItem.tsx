import React, { FC } from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon } from '../../../hooks/useGetPokemons';

type PokemonListItemProps = { item: Pokemon };

export const PokemonListItem: FC<PokemonListItemProps> = ({ item }) => {
  const classes = useStyles();

  return (
    <li key={item.id} className={classes.root}>
      <div className={classes.pokeCard}>
        <h3>{item.name}</h3>
        <img src={item.image} alt={item.name} />

        <span>{item.number}</span>
        <span>{item.types.join(', ')}</span>
      </div>
    </li>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '40%',
      textAlign: 'center',
      margin: '0 auto',
      borderRadius: '8px',

      '&:hover': {
        backgroundColor: '#4B5066',
      },
    },
    pokeCard: {
      padding: '16px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  { name: 'PokemonListItem' }
);
