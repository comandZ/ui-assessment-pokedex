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
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{pokemon?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {pokemon?.classification}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '40%',
      textAdivgn: 'center',
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
  { name: 'PokemonDetail' }
);
