import './Main.css';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getData, deleteRecord } from "../../utils/Api";
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Popup from '../Popup/Popup';

interface DataItem {
  id: string;
  documentName: string;
  documentType: string;
  documentStatus: string;
  companySignatureName: string;
  companySigDate: string;
  employeeSignatureName: string;
  employeeSigDate: string;
  employeeNumber: string;
}

function Main() {
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);
  const [popupOpened, setPopupOpened] = useState(false);
  const [itemToChange, setItemToChange] = useState<DataItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function fetchData() {
    const token = localStorage.getItem('token') as string;
    setToken(token)
    setIsLoading(true)
    getData(token)
      .then(response => setData(response.data))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  };

  useEffect(() => {
    fetchData();
  }, []);

  const rows: GridRowsProp = data;

  const columns: GridColDef[] = [
    { field: 'documentName', headerName: 'Документ', width: 120 },
    { field: 'documentType', headerName: 'Тип', width: 150 },
    { field: 'documentStatus', headerName: 'Статус', width: 100 },
    { field: 'companySignatureName', headerName: 'Подпись компании', width: 160 },
    { field: 'companySigDate', headerName: 'Дата подписи компании', width: 200 },
    { field: 'employeeSignatureName', headerName: 'Подпись сотрудника', width: 200 },
    { field: 'employeeSigDate', headerName: 'Дата подписи сотрудника', width: 200 },
    { field: 'employeeNumber', headerName: 'Номер сотрудника', width: 150 },
    {
      field: 'actions',
      headerName: 'Действия',
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div>
          <IconButton aria-label="edit" onClick={() => handleOpenEdit(params.row as DataItem)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id as string)}>
            <DeleteIcon />
          </IconButton>
        </div>
      )
    }
  ];

  function handleOpenAdd() {
    setPopupOpened(true);
  }

  function handleOpenEdit(item: DataItem) {
    setItemToChange(item);
    setPopupOpened(true);
  }

  async function handleDelete(id: string) {
    try {
      await deleteRecord(token, id);
      fetchData()
    } catch (error) {
      console.error(error);
    }
  }

  function handleExit() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className="main">
      <div className="buttons-container">
        <Button variant="contained" onClick={handleOpenAdd}>Добавить запись</Button>
        <Button variant="outlined" onClick={handleExit}>Выход</Button>
      </div>

      {
        isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        )
      }

      <Popup token={token} open={popupOpened} setOpen={setPopupOpened} data={itemToChange} setData={setItemToChange} onSave={fetchData} />
    </div>
  )
}

export default Main;