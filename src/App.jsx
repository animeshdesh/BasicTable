/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import "./App.css";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

const URL = "https://fakestoreapi.com/products";

function App() {
  const [count, setCount] = useState(0);
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchByID, setSearchByID] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const FetchAPI = async () => {
    try {
      let response = await axios.get(URL);
      setProduct(response.data);
      if (!searchByID) {
        setFilteredProducts(response.data);
      }
    } catch (error) {
      console.log("Error Fetching the data", error);
    }
  };
  const handleInputChange = (e) => {
    const id = e.target.value;
    setSearchByID(id);
    if (id) {
      const filtered = product.filter((item) => item.id.toString() === id);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(product);
    }
  };

  const handleSelectedCategory = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category) {
      const filtered = product.filter((item) => item.category === category);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(product);
    }
  };
  const handleCategory = useEffect(() => {
    FetchAPI();
  }, []);

  return (
    <>
      <Box>
        <Typography
          variant="h3"
          sx={{ textAlign: "center", margin: "2rem 2rem" }}
        >
          Product
        </Typography>
      </Box>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "2rem 2rem",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Search"
            value={searchByID}
            onChange={handleInputChange}
            variant="outlined"
          />
          <FormControl sx={{ width: "30%" }}>
            <InputLabel id="demo-simple-select-label">
              Select Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              value={selectedCategory}
              onChange={handleSelectedCategory}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="men's clothing">Mens clothing</MenuItem>
              <MenuItem value="jewelery">jewelery</MenuItem>
              <MenuItem value="women's clothing">womenclothing</MenuItem>
              <MenuItem value="electronics">electronics</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <table>
          <thead style={{ border: "1px solid black" }}>
            <tr>
              <th>
                <Typography variant="h5">ID</Typography>
              </th>
              <th>
                <Typography variant="h5">Title</Typography>
              </th>
              <th>
                <Typography variant="h5">Description</Typography>
              </th>
              <th>
                <Typography variant="h5">Category</Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((item, index) => (
              <tr key={item.id}>
                <td>
                  <Typography>{item.id}</Typography>
                </td>
                <td>
                  <Typography>{item.title}</Typography>
                </td>
                <td>
                  <Typography>{item.description}</Typography>
                </td>
                <td>
                  <Typography>{item.category}</Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </>
  );
}

export default App;
