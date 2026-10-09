import {
    Box,
    TextField,
    MenuItem,
    Button
}
from "@mui/material";


function MemberFilterBar({

    search,
    setSearch,

    status,
    setStatus,

    group,
    setGroup,

}) {


return (

<Box

sx={{

display:"flex",

gap:2,

mb:3,

flexWrap:"wrap"

}}

>


<TextField

label="Recherche"

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

size="small"

/>



<TextField

select

label="Statut"

value={status}

onChange={(e)=>
setStatus(e.target.value)
}

size="small"

sx={{

minWidth:150

}}

>


<MenuItem value="">
Tous
</MenuItem>


<MenuItem value="ACTIVE">
Actif
</MenuItem>


<MenuItem value="SUSPENDED">
Suspendu
</MenuItem>


<MenuItem value="EXITED">
Sorti
</MenuItem>


<MenuItem value="PENDING">
En attente
</MenuItem>


</TextField>




<TextField

select

label="Groupe"

value={group}

onChange={(e)=>
setGroup(e.target.value)
}

size="small"

sx={{

minWidth:150

}}

>


<MenuItem value="">
Tous
</MenuItem>


<MenuItem value="standard">
Standard
</MenuItem>


<MenuItem value="premium">
Premium
</MenuItem>


</TextField>




<Button

variant="outlined"

onClick={()=>{

setSearch("");

setStatus("");

setGroup("");

}}

>

Réinitialiser

</Button>


</Box>

);

}


export default MemberFilterBar;