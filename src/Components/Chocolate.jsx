import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Select from "@mui/material/Select";

function Chocolate() {
  const [apidata, setApiData] = useState([]);
  const [newData, setdata] = useState({
    createdAt: new Date(),
    name: "",
    Brand: "",
    Expiry: "",
    Quantity: 0,
    Food_Preference: "",
    Country_of_Origin: "",
    Net_Quantity: "",
    Gift_Pack: "",
    Amount: "",
  });
  useEffect(() => {
    fetchList();
  }, []);
  const fetchList = () => {
    fetch("https://64d72d932a017531bc13051d.mockapi.io/Chocolates")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setApiData(json);
      })
      .catch((error) => console.error(error));
  };
  const handleEdit = (editdata) => {
    setdata(editdata);
    console.log(editdata);
  };

  const addproduct = () => {
    setdata(newData);
    console.log(newData);
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    };
    fetch(`https://64d72d932a017531bc13051d.mockapi.io/Chocolates`, request)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const newapi = [...apidata, json];
        setApiData(newapi);
      })
      .catch((error) => console.error(error));
  };
  const updateproduct = (id) => {
    const request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    };
    fetch(
      `https://64d72d932a017531bc13051d.mockapi.io/Chocolates/${id}`,
      request
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const newapi = [...apidata, json];
        setApiData(newapi);
      })
      .catch((error) => console.error(error));
  };
  const handledelete = (id) => {
    const request = {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
    };
    fetch(
      `https://64d72d932a017531bc13051d.mockapi.io/Chocolates/${id}`,
      request
    )
      .then((res) => res.json())
      .then((json) => {
        alert("record deleted successfully");
        fetchList();
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        justifyContent={"center"}
        className="Box-model"
      >
        <h1>Chocolate</h1>
        <div>
          <TextField
            label="Name"
            id="outlined-size-small"
            size="small"
            onChange={(e) => setdata({ ...newData, name: e.target.value })}
            value={newData.name}
          />
          <TextField
            label="Net Quantity"
            id="outlined-size-small"
            size="small"
            onChange={(e) =>
              setdata({ ...newData, Net_Quantity: e.target.value })
            }
            value={newData.Net_Quantity}
          />
        </div>
        <div>
          <TextField
            label="Brand"
            id="outlined-size-small"
            size="small"
            onChange={(e) => setdata({ ...newData, Brand: e.target.value })}
            value={newData.Brand}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Expiry"
              onChange={(e) => setdata({ ...newData, Expiry: e })}
            />
          </LocalizationProvider>
        </div>
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ m: 1, minWidth: 200, minHeight: 20 }}>
              <InputLabel id="demo-simple-select-label">
                Food Preference
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newData.Food_Preference}
                label="Food Preference"
                onChange={(e) =>
                  setdata({ ...newData, Food_Preference: e.target.value })
                }
                className="food-preference"
              >
                <MenuItem value={"Veg"}>Veg</MenuItem>
                <MenuItem value={"Nonveg"}>Non-Veg</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Country of origin"
              id="outlined-size-small"
              size="small"
              onChange={(e) =>
                setdata({ ...newData, Country_of_Origin: e.target.value })
              }
              value={newData.Country_of_Origin}
            />
          </Box>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gift Pack
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) =>
                setdata({ ...newData, Gift_Pack: e.target.value })
              }
              value={newData.Gift_Pack}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 80 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <Input
              id="standard-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              onChange={(e) => setdata({ ...newData, Amount: e.target.value })}
              value={newData.Amount}
            />
          </FormControl>
        </div>
        {newData.id ? (
          <Button variant="contained" onClick={() => updateproduct(newData.id)}>
            Update Product
          </Button>
        ) : (
          <Button variant="contained" onClick={addproduct}>
            Add Products
          </Button>
        )}
      </Box>
      <table>
        <thead>
          <th>Name</th>
          <th>Brand</th>
          <th>Expiry</th>
          <th>Quantity</th>
          <th>Net Quantity</th>
          <th>Amount</th>
          <th>Count_of_origin</th>
          <th>Gift_pack</th>
          <th>Food Preference</th>
        </thead>
        <tbody>
          {apidata.map((e, idx) => {
            return (
              <tr>
                <td>{e.name}</td>
                <td>{e.Brand}</td>
                <td>{e.Expiry}</td>
                <td>{e.Quantity}</td>
                <td>{e.Net_Quantity}</td>
                <td>{e.Amount}</td>
                <td>{e.Country_of_Origin}</td>
                <td>{e.Gift_Pack}</td>
                <td>{e.Food_Preference}</td>
                <td>
                  <Button onClick={() => handleEdit(e)}>Edit</Button>
                </td>
                <td>
                  <Button onClick={() => handledelete(e.id)}>Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Chocolate;
