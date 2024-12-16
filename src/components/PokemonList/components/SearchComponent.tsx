import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, useEffect, FC, ChangeEvent } from 'react';
import { createUseStyles } from 'react-jss';

export interface ISearchProps {
  onChangeSearchQuery: (searchQuery: string) => void;
}

export const SearchInput: FC<ISearchProps> = (props: ISearchProps) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const { onChangeSearchQuery } = props;

  useEffect(() => {
    if (searchTerm !== undefined) {
      onChangeSearchQuery(searchTerm);
    }
  }, [searchTerm]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event?.target.value);
  };

  return (
    <div className={classes.root}>
      <TextField
        id="search"
        className={classes.searchField}
        type="search"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
        aria-label="Search Pokemon"
        slotProps={{
          input: {
            endAdornment: <SearchIcon />,
          },
        }}
      />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'right',
      padding: '20px 16px',
    },
    searchField: {
      width: '100%',
      padding: '8px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      color: '#171E2b',
    },
  },
  { name: 'PokemonListItem' }
);
