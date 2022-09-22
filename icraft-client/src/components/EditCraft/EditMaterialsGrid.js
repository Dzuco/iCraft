import React, {useState, useCallback} from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

function getQtty(params) {
  return eval(`${params.row.totalQtty}-${params.row.currentQtty}`);
}

// function setTotalQtty(params) {
//   const [totalQtty, currentQtty] = params.value.toString().split(' ');
//   return { ...params.row, totalQtty, currentQtty };
// }

// function parseFullName(value) {
//   return String(value)
//     .split(' ')
//     .map((str) => (str.length > 0 ? str[0].toUpperCase() + str.slice(1) : ''))
//     .join(' ');
// }

const columns = [
  { field: 'material', headerName: 'Material', width: 130, editable: true },
  { field: 'description', headerName: 'Descripcion', width: 200, editable: true },
  { field: 'totalQtty', headerName: 'Total', width: 80, editable: true },
  { field: 'currentQtty', headerName: 'Actual', width: 80, editable: true },
  {
    field: 'remainingQtty',
    headerName: 'Restante',
    width: 80,
    valueGetter: getQtty,
    //valueSetter: setTotalQtty,
    //valueParser: parseFullName,
    sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString()),
  },
];

const defaultRows = [
  { id: 1, description: 'plástico, transparentes', material: 'Botellas', currentQtty: 8, totalQtty: 15},
];

const customFooterComponent = ({removeRow, addRow, removeSelection}) => {
  return(
    <Box sx={{ borderTop: 1, borderColor: 'grey.300'}}>
      <Stack spacing={2} direction="row" margin={2} >
          <Button variant='contained' onClick={addRow}>Agregar</Button>
          <Button variant='contained' onClick={removeRow}>Quitar</Button>
          <Button variant='contained' onClick={removeSelection}>Borrar Selección</Button>
      </Stack>
    </Box>
  )
}


const EditMaterialsGrid = () => {
  const [cachedRows, setCachedRows] = useState(defaultRows);
  const [cachedSelectedRowId, setCachedSelectedRowId] = useState(null);

  const processRowUpdate = useCallback(
    (newRow) => {
      setCachedRows([...cachedRows.slice(0,newRow.id-1),newRow,...cachedRows.slice(newRow.id)])
      return newRow;
    },[cachedRows]);

  const processRowUpdateError = useCallback((error)=>{
    return console.log(error);
  },[])

  const addRow = () => {
    if(!cachedRows[0]){
      setCachedRows([{ id: 1, description: '', material: '', currentQtty: 0, totalQtty: 0}])
    } else {
      setCachedRows(cachedRows.concat([{ id: cachedRows[cachedRows.length-1].id+1, description: '', material: '', currentQtty: 0, totalQtty: 0}]))
    }
  }

  const removeRow = () => {
    if(cachedRows.length > 1) setCachedRows(cachedRows.slice(0,cachedRows.length-1));
    console.log(cachedRows);
  }

  const removeSelection = () => {
    if(cachedSelectedRowId){
      console.log(cachedSelectedRowId);
      setCachedRows([...cachedRows.slice(0,cachedSelectedRowId-1),...cachedRows.slice(cachedSelectedRowId).map((row)=>{return{...row, id: row.id-1}})]);
    }
  }

  const setSelectedRowId = (e) => {
    setCachedSelectedRowId(e.id);
    console.log(cachedRows)
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        density='compact'
        rows={cachedRows} 
        columns={columns} 
        processRowUpdate={processRowUpdate}
        onRowClick = {setSelectedRowId}
        onProcessRowUpdateError={processRowUpdateError}
        experimentalFeatures={{ newEditingApi: true }}
        components = {{
          Footer: customFooterComponent,
        }}
        componentsProps = {{
          footer: {removeRow, addRow, removeSelection}
        }}
      />
    </div>
  );
}

export default EditMaterialsGrid;