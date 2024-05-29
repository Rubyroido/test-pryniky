import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createRecord, editRecord } from '../../utils/Api';

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

interface PopupProps {
  token: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  data: DataItem | null;
  setData: (data: DataItem | null) => void;
  onSave: () => void;
}

function Popup({ token, open, setOpen, data, setData, onSave }: PopupProps) {
  function handleClose() {
    setOpen(false);
    setData(null)
  };

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson: Partial<DataItem> = Object.fromEntries(formData.entries());
    const date = new Date().toISOString();
    formJson.companySigDate = date;
    formJson.employeeSigDate = date;

    const token = localStorage.getItem('token') as string;

    try {
      if (data === null) {
        await createRecord(token, formJson as DataItem);
      } else {
        await editRecord(token, data.id, formJson as DataItem);
      }
      onSave();
    } catch (error) {
      console.error(error);
    }
    handleClose();
  };


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>{data === null ? 'Новая запись' : 'Изменение записи'}</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="documentName"
            name="documentName"
            label="Документ"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={data?.documentName || ''}
          />
          <TextField
            required
            margin="dense"
            id="documentType"
            name="documentType"
            label="Тип документа"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={data?.documentType || ''}
          />
          <TextField
            required
            margin="dense"
            id="documentStatus"
            name="documentStatus"
            label="Статус"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={data?.documentStatus || ''}
          />
          <TextField
            required
            margin="dense"
            id="companySignatureName"
            name="companySignatureName"
            label="Подпись компании"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={data?.companySignatureName || ''}
          />
          <TextField
            required
            margin="dense"
            id="employeeSignatureName"
            name="employeeSignatureName"
            label="Подпись сотрудника"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={data?.employeeSignatureName || ''}
          />
          <TextField
            required
            margin="dense"
            id="employeeNumber"
            name="employeeNumber"
            label="Номер сотрудника"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={data?.employeeNumber || ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отменить</Button>
          <Button type="submit">Сохранить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Popup;