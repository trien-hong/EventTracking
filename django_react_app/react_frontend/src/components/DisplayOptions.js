import { FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material';

function DisplayOptions({eventsPerPage, setEventsPerPage, sortingOptions, setSortingOptions}) {
    function changeEventsPerPage(e) {
        setEventsPerPage(e.target.value);
    }

    function changeSortingOptions(e) {
        setSortingOptions(e.target.value);
    }

    return (
        <div>
            <Stack sx={{ my: 1 }} id="displayOptions" direction="row" justifyContent="center" spacing={2}>
                <Grid>
                    <FormControl sx={{ minWidth: 125, backgroundColor: "white" }} variant="filled" size="small">
                        <InputLabel>Events Per Page</InputLabel>
                        <Select sx={{ background: "white" }} value={eventsPerPage} onChange={changeEventsPerPage}>
                            <MenuItem value={"9"}>9</MenuItem>
                            <MenuItem value={"12"}>12</MenuItem>
                            <MenuItem value={"15"}>15</MenuItem>
                            <MenuItem value={"18"}>18</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid>
                    <FormControl sx={{ minWidth: 200, backgroundColor: "white" }} variant="filled" size="small">
                        <InputLabel>Sorting Options</InputLabel>
                        <Select sx={{ background: "white" }} value={sortingOptions} onChange={changeSortingOptions}>
                            <MenuItem value={"name,asc"}>Name Ascending Order (A-Z)</MenuItem>
                            <MenuItem value={"name,desc"}>Name Descending Order (Z-A)</MenuItem>
                            <MenuItem value={"date,asc"}>Date Ascending Order (L-H)</MenuItem>
                            <MenuItem value={"date,desc"}>Date Descending Order (H-L)</MenuItem>
                            <MenuItem value={"random"}>Random</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Stack>
        </div>
    )
}

export default DisplayOptions;