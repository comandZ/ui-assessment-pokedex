import React, { FC, useState, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import {
  Pokemon,
  useGetPokemonById,
  useGetPokemons,
} from '../../../hooks/useGetPokemons';
import {
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Avatar,
  Grid2,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';

type PokemonDetailProps = {
  open: boolean;
  handleClose: () => void;
  pokeID: string;
  pokeName: string;
};

export const PokemonDetail: FC<PokemonDetailProps> = ({
  open,
  handleClose,
  pokeID,
  pokeName,
}) => {
  const classes = useStyles();
  const { pokemon, loading } = useGetPokemonById(pokeID, pokeName);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.root}
    >
      <DialogTitle id="alert-dialog-title">{pokemon?.name}</DialogTitle>
      <DialogContent dividers>
        <Grid2 container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid2 size={5}>
            <Avatar
              src={pokemon?.image}
              alt={pokemon?.name}
              sx={{ width: '200px', height: '200px' }}
            />
          </Grid2>
          <Grid2 size={7}>
            <Typography variant="subtitle1">Classification</Typography>
            <Typography variant="h6">{pokemon?.classification}</Typography>
            <Divider />
            <Typography variant="subtitle1">Types</Typography>
            <Typography variant="h6">{pokemon?.types.join(', ')}</Typography>
            <Divider />
            <Typography variant="subtitle1">Resistant</Typography>
            <Typography variant="h6">
              {pokemon?.resistant.join(', ')}
            </Typography>
            <Divider />
            <Typography variant="subtitle1">Weaknesses"</Typography>
            <Typography variant="h6">
              {pokemon?.weaknesses.join(', ')}
            </Typography>
            <Divider />
            <Typography variant="subtitle1">Fleet Rate"</Typography>
            <Typography variant="h6">{pokemon?.fleeRate}</Typography>
          </Grid2>
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      '& .MuiDialog-paper': {
        width: '80%',
      },
    },
    pokeCard: {
      padding: '16px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  { name: 'PokemonDetail' }
);
