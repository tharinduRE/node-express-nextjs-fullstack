import Search from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";

export default function SearchBar() {
  const router = useRouter()
  const handleSearch = (
    e: any
  ) => {
    e.preventDefault();
    let q = e.target?.[0].value
    router.push({pathname : `${router.basePath}/shop`, query : {q}})
  };

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
        color: "#eceff1",
      }}
      elevation={0}
      onSubmit={handleSearch}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        name='query'
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <Search />
      </IconButton>
    </Paper>
  );
}
