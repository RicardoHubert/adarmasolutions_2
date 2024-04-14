import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
// import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

const Contacts = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2024-04-15") - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Mengatur interval untuk memperbarui timeLeft setiap detik
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Membersihkan interval ketika komponen di-unmount
    return () => clearInterval(timer);
  }, []); // Kosongkan array dependency agar useEffect hanya berjalan sekali saat komponen dimount

  // Sisanya sama seperti kode Anda
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setTimeLeft(calculateTimeLeft());
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // });

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setTimeLeft(calculateTimeLeft("2024-01-01"));
  //   }, 1000);
  
  //   return () => clearTimeout(timer);
  // }, [timeLeft]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const updatedMockDataContacts = mockDataContacts.map(contact => ({
    ...contact,
    timeLeft: `${timeLeft.days} Days ${timeLeft.hours} Hours ${timeLeft.minutes} Minutes ${timeLeft.seconds} Seconds`
  }));

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "customerId", headerName: "Customer ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "birthdate",
      headerName: "Birthdate",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
    {
      field: "membershipType",
      headerName: "Membership Type",
      flex: 1,
    },
    {
      field: "timeLeft",
      headerName: "Time Left",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={updatedMockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>

  );
};

export default Contacts;
