import React, { FC } from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon } from '../../../hooks/useGetPokemons';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

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
    <ListItem
      key={item.id}
      className={classes.root}
      onClick={onClickItem}
      secondaryAction={<Typography variant="h6">{item.number}</Typography>}
    >
      <ListItemAvatar className={classes.listItemAvatar}>
        <Avatar
          src={item.image}
          alt={item.name}
          sx={{ width: 144, height: 144 }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={<Typography variant="h4">{item.name}</Typography>}
        secondary={
          <Typography variant="body1">{item.types.join(', ')}</Typography>
        }
      />
    </ListItem>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      margin: '12px auto',
      borderRadius: '8px',
      alignItems: 'flex-start',
      backgroundColor: 'rgba(255, 255, 255, .12)',

      '&:hover': {
        backgroundColor: '#4B5066',
      },
    },
    listItemAvatar: {
      padding: '16px',
    },
  },
  { name: 'PokemonListItem' }
);
