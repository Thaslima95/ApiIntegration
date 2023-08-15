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
import axios from "axios";

import Select from "@mui/material/Select";

function Toys() {
  const [apidata, setApiData] = useState([]);
  const [newData, setdata] = useState({
    createdAt: new Date(),
    name: "",
    Material: "",
    MinimumAge: 0,
    NetQuantity: 0,
    Type: "",
    BatteryOperated: "",
    Country_of_origin: "",
    Rechargeable: "",
    Amount: 0,
  });
  useEffect(() => {
    fetchList();
  }, []);
  const fetchList = async () => {
    try {
      let response = await axios.get(
        "https://64d72d932a017531bc13051d.mockapi.io/toys"
      );
      setApiData(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleEdit = (editdata) => {
    setdata(editdata);
    console.log(editdata);
  };

  const addproduct = async () => {
    setdata(newData);
    try {
      let response = await axios.post(
        `https://64d72d932a017531bc13051d.mockapi.io/toys`,
        newData
      );

      const newapi = [...apidata, response.data];
      setApiData(newapi);
    } catch (err) {
      console.error(err);
    }
  };
  const updateproduct = async (id) => {
    try {
      let response = await axios.put(
        `https://64d72d932a017531bc13051d.mockapi.io/toys/${id}`,
        newData
      );
      const newapi = [...apidata, response.data];
      setApiData(newapi);
    } catch (err) {
      console.error(err);
    }
  };
  const handledelete = async (id) => {
    try {
      let response = await axios.delete(
        `https://64d72d932a017531bc13051d.mockapi.io/toys/${id}`
      );
      if (response.data) {
        alert("Deleted");
        fetchList();
      }
    } catch (err) {
      console.error(err);
    }
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
        <div>
          <TextField
            label="Name"
            id="outlined-size-small"
            size="small"
            onChange={(e) => setdata({ ...newData, name: e.target.value })}
            value={newData.name}
          />
          <TextField
            label="Material"
            id="outlined-size-small"
            size="small"
            onChange={(e) => setdata({ ...newData, Material: e.target.value })}
            value={newData.Material}
          />
        </div>
        <div>
          <TextField
            label="Minimum Age"
            id="outlined-size-small"
            size="small"
            onChange={(e) =>
              setdata({ ...newData, MinimumAge: e.target.value })
            }
            value={newData.MinimumAge}
          />
          <TextField
            label="Net Quantity"
            id="outlined-size-small"
            size="small"
            onChange={(e) =>
              setdata({ ...newData, NetQuantity: e.target.value })
            }
            value={newData.NetQuantity}
          />
        </div>
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ m: 1, minWidth: 200, minHeight: 20 }}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newData.Type}
                label="Type"
                onChange={(e) => setdata({ ...newData, Type: e.target.value })}
                className="food-preference"
              >
                <MenuItem value={"Veg"}>Musical</MenuItem>
                <MenuItem value={"Nonveg"}>Normal</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Country of origin"
              id="outlined-size-small"
              size="small"
              onChange={(e) =>
                setdata({ ...newData, Country_of_origin: e.target.value })
              }
              value={newData.Country_of_origin}
            />
          </Box>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Battery Operated
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) =>
                setdata({ ...newData, BatteryOperated: e.target.value })
              }
              value={newData.BatteryOperated}
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
          <div>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Rechargeable
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) =>
                  setdata({ ...newData, Rechargeable: e.target.value })
                }
                value={newData.Rechargeable}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </div>
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
      {apidata.map((e, idx) => {
        return (
          <>
            <table>
              <thead>
                <th>Name</th>
                <th>Material</th>
                <th>Minimum Age</th>
                <th>BatteryOperated</th>
                <th>Net Quantity</th>
                <th>Amount</th>
                <th>Count_of_origin</th>
                <th>Rechargeable</th>
                <th>Type</th>
              </thead>
              <tbody>
                <tr>
                  <td>{e.name}</td>
                  <td>{e.Material}</td>
                  <td>{e.MinimumAge}</td>
                  <td>{e.BatteryOperated}</td>
                  <td>{e.Net_Quantity}</td>
                  <td>{e.Amount}</td>
                  <td>{e.Country_of_Origin}</td>
                  <td>{e.Rechargeable}</td>
                  <td>{e.Type}</td>
                  <td>
                    <button type="button" onClick={() => handleEdit(e)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => handledelete(e.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        );
      })}
    </>
  );
}

export default Toys;
