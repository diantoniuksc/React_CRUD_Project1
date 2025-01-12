import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import axios from 'axios';
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import { useUserContext } from './UserContext.tsx';


type UserTableProps = {
  users: User[];
  onDeleteUser: (id: string) => void;
  onSaveUser: (id: string, updatedData: Partial<User>) => void;
};


const UserMUITable: React.FC<UserTableProps> = ({ users, onDeleteUser }) => {
  const [rows, setRows] = React.useState<any[]>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const { setSelectedUserThoughts } = useUserContext(); 

  // Sync rows state with users prop when it changes
  useEffect(() => {
    if (users && users.length > 0) {
      const updatedRows = users.map((user) => ({
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        city: user.city,
        country: user.country,
        thoughts: user.thoughts,
      }));
      setRows(updatedRows);
    }
  }, [users]); // Re-run when the users prop changes

  const handleCancelClick = (id: string) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleSaveClick = async (updatedRow) => {
    try {
      const updatedData = {
        name: updatedRow.name,
        lastName: updatedRow.lastName,
        city: updatedRow.city,
        country: updatedRow.country,
        thoughts: updatedRow.thoughts,
      };
  
      // Send updated data to the server
      await axios.put(`http://localhost:3001/api/users/${updatedRow.id}`, updatedData);
  
      // Reflect the saved changes in the rows state
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
      );
  
      // Update the row mode back to 'view'
      setRowModesModel((prevModel) => ({
        ...prevModel,
        [updatedRow.id]: { mode: GridRowModes.View },
      }));
    } catch (error) {
      console.error("Error saving row:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'First Name', width: 160, editable: true },
    { field: 'lastName', headerName: 'Last Name', width: 160, editable: true },
    { field: 'city', headerName: 'City', width: 160, editable: true },
    { field: 'country', headerName: 'Country', width: 160, editable: true },
    { field: 'thoughts', headerName: 'Thoughts', width: 300, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        const updatedRow = rows.find((row) => row.id === id);

        if (isInEditMode && updatedRow) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={() => {
    handleSaveClick(updatedRow);
  }}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => onDeleteUser(id)}
          />,
        ];
      },
    },
  ];

  const handleRowSelection = (newSelection) => {
    const selectedRow = rows.find((row) => row.id === newSelection[0]);
    setSelectedUserThoughts(selectedRow.thoughts);
  };
  

  const handleCellEditCommit = (params) => {
    const { id, field, value } = params;
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  return (
    <Box sx={{ height: 319, width: '100%', bgcolor: 'rgba(255, 255, 255, 0.7)'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        processRowUpdate={(updatedRow, originalRow) =>
          handleSaveClick(updatedRow)
        }
        onCellEditCommit={handleCellEditCommit}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onRowSelectionModelChange={(newSelection) => handleRowSelection(newSelection)}
        experimentalFeatures={{ newEditingApi: true }}
        rowModesModel={rowModesModel}
        onRowEditStop={(params, event) => {
          if (params.reason === 'commit') {
            onSaveUser(params.id)();
          }
        }}
      />
    </Box>
  );
};

export default UserMUITable;