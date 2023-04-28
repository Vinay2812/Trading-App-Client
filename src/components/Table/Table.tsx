import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import { useColors } from '../../hooks/use-colors'
import Card from '../Cards/Card'

interface TableProps {
  rows: any[],
  columns: GridColDef[],
  uniqueId: string | number
  isLoading?: boolean,
}

function Table ({rows, columns, uniqueId, isLoading = false}: TableProps) {
    const colors = useColors()
  return <Card
  sx={{
    mt: "16px",
    width: "100%",
    height: "calc(100% - 90px)",
    bgcolor: `${colors.card}`,
    "& .MuiDataGrid-columnHeaders": {
      mt: 2,
      fontWeight: 700,
      fontSize: "16px",
      color: colors.textColor[100],
      bgcolor: colors.tableHeader,
      border: "none",
    },
    "& .MuiDataGrid-root": {
      fontSize: "14px",
      color: colors.textColor[400],
      border: "none",
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "none !important",
    },
    "& .MuiDataGrid-cell:focus": {
      outline: "none !important",
      border: "none !important",
    },
    "& .MuiDataGrid-footerContainer": {
      bgcolor: colors.tableHeader,
      border: "none",
    },
  }}
>
  <DataGrid
    getRowId={(rows) => rows[uniqueId]}
    columns={columns}
    rows={rows}
    density="comfortable"
    slots={{
      toolbar: GridToolbar,
    }}
    loading={isLoading}
    disableDensitySelector
    initialState={{
      pagination: {
        paginationModel: {
          pageSize: 10,
        },
      },
    }}
    pageSizeOptions={[10, 25, 50, 100]}
    checkboxSelection
    onRowSelectionModelChange={(arr) => console.log(arr)}
  />
</Card>
}

export default Table