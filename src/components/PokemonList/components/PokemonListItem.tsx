import React, { FC } from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon } from '../../../hooks/useGetPokemons';
import { Link, useSearchParams } from 'react-router-dom';

type PokemonListItemProps = { item: Pokemon; handleOpen: () => void };

export const PokemonListItem: FC<PokemonListItemProps> = ({
  item,
  handleOpen,
}) => {
  const classes = useStyles();
  const [_searchParams, setSearchParams] = useSearchParams();

  const onClickItem = () => {
    setSearchParams({ pokeID: item.id, pokeName: item.name });
    handleOpen();
  };

  return (
    <li key={item.id} className={classes.root}>
      <div onClick={onClickItem} className={classes.pokeCard}>
        <h3>
          {item.name}, {item.id}
        </h3>
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
