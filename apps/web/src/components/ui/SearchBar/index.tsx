import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";

export default function SearchBar() {
  return (
    <Paper
      component="form"
      sx={{
        p: "0px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
        border: 1,
        borderRadius: 16,
        color: '#eceff1'
      }}
      elevation={0}
    >
      <InputBase

        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
