import * as React from "react";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
const theme = createTheme({
  components: {
    // Name of the component

    MuiInputBase: {
      styleOverrides: {
        root: {
          height: "2.7rem",
        },
        input: {
          "&::placeholder": {
            color: "red",
          },
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          overflow: "hidden !important",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#707070 !important",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#707070 !important",
          },
        },
      },
    },
  },
});

export default function Calendar({ selectedDate, handleDateChange }) {
  const handleClear = () => {
    console.log("clear");
  };
  const handleChange = (date) => {
    console.log("date ", date);
    handleDateChange(date);
  };
  const handleCancel = () => {
    console.log("called cancel");
  };
  const handleAccept = () => {
    console.log("jfhsfhjfh");
  };
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["MobileDatePicker"]}>
          <MobileDatePicker
            label={"Select Due Date"}
            defaultValue={dayjs(selectedDate)} //only use dayjs for default value for this calander libarary
            format={"DD/MM/YYYY"}
            onChange={handleChange}
            cancelText="Custom Cancel"
            onDismiss={handleClear}
            onAccept={handleAccept}
          />
        </DemoContainer>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
