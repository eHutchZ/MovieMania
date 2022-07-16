import { Autocomplete, Box, TextField } from '@mui/material';
import { MovieObj } from '../utils/types';

interface Props {
  list: MovieObj[];
  setSelectedIndex: Function;
}
const Searchbar = ({ list, setSelectedIndex }: Props) => {
  const filterInput = (option: any) => {
    if (option) {
      const idx = list.findIndex((m) => m.title === option);
      setSelectedIndex(idx);
    } else {
      setSelectedIndex(-1);
    }
  };
  return (
    <Box minWidth={300}>
      {list.length > 0 && (
        <Autocomplete
          freeSolo
          options={list.map((m) => m.title)}
          renderInput={(params) => <TextField {...params} label='Search' />}
          onChange={(e, newValue) => filterInput(newValue)}
        />
      )}
    </Box>
  );
};

export default Searchbar;
