import React from "react";
import { useState, useEffect, useContext } from "react";
import { HiOutlineSortAscending } from "react-icons/hi";
import { HiSortDescending } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
// import useFetch from "../useFetch"
import { DataContext } from "../../contexts/DataContext";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import "./MainPage.css";

function MainPage() {
  const [searchWord, setSearchWord] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sorting, setSorting] = useState({ property: null, order: "asc" });
  const navigate = useNavigate();
  const {
    userData,
    loading,
    error,
    //SortData,
    // filteredData,
    // setFilteredData,
    // sorting,
    // SearchWordFn,
    // searchWord,
  } = useContext(DataContext);

  console.log("userData, loading, error", userData, loading, error);

  // const { data, loading, error } = useFetch(
  //   "https://jsonplaceholder.typicode.com/users"
  // );

  useEffect(() => {
    if (userData) {
      setFilteredData(userData);
    }
  }, [userData]);

  // const handleSearchWord = (e) => {
  //   SearchWordFn(e);
  // };

  const handleSearchWord = (e) => {
    const newSearch = e.target.value;
    setSearchWord(newSearch);

    setFilteredData(
      userData.filter((f) => {
        return f.name.toLowerCase().includes(newSearch.toLowerCase());
      })
    );
  };

  const handleSort = (property) => {
    let order = "asc";
    let sortedData;
    if (sorting.property === property && sorting.order === "asc") {
      order = "desc";
    }

    sortedData = [...filteredData].sort((a, b) => {
      if (a[property] < b[property]) return order === "asc" ? -1 : 1;
      if (a[property] > b[property]) return order === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredData(sortedData);
    setSorting({ property, order });
  };

  // const handleSort = (property) => {
  //   SortData(property);
  // };

  // const handleSort = (property) => {
  //   let order = "asc";
  //   if (sorting.property === property && sorting.order === "asc") {
  //     order = "desc";
  //   }
  //   function compreName(a, b) {
  //     if (a[property] < b[property]) return order === "asc" ? -1 : 1;
  //     if (a[property] > b[property]) return order === "asc" ? 1 : -1;
  //     return 0;
  //   }
  //   const sortedData = [...filteredData].sort(compreName);
  //   setFilteredData(sortedData);
  //   setSorting({ property, order });
  // };

  const handleClick = (e, rowData) => {
    navigate(`/users/${rowData.id}`, { state: { rowData } });
  };

  if (loading) return <h1>Data is loading </h1>;
  if (error) return <h1>message : {error.message}</h1>;
  return (
    <div className="main-page">
      <h1> User Data</h1>

      <div>
        <TextField
          className="search-field"
          data-testid="search"
          id="search"
          label="type autor name"
          variant="outlined"
          onChange={handleSearchWord}
          value={searchWord}
          fullWidth
          size="small"
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
        {/* <label htmlFor="search-input">Search your data here </label>
        {/* <input */}
        {/* id="search-input"
          type="text"
          placeholder="type author name"
          value={searchWord}
          onChange={handleSearchWord}
        />
        <FaSearch /> */}{" "}
      </div>
      <table border="1">
        {/* <caption>User Information</caption> */}
        <thead>
          <tr>
            <th>
              Name{" "}
              <button onClick={() => handleSort("name")}>
                {sorting.property === "name" && sorting.order === "asc" ? (
                  <HiOutlineSortAscending />
                ) : (
                  <HiSortDescending />
                )}
              </button>
            </th>
            <th>
              User Name{" "}
              <button onClick={() => handleSort("username")}>
                {sorting.property === "username" && sorting.order === "asc" ? (
                  <HiOutlineSortAscending />
                ) : (
                  <HiSortDescending />
                )}
              </button>
            </th>
            <th>Email</th>
            <th>Address (zipcode)</th>
            <th>Phone </th>
            <th>Website</th>
            <th>Company</th>
            <th>
              Edit{" "}
              <button onClick={() => handleSort("id")}>
                {sorting.property === "id" && sorting.order === "asc" ? (
                  <HiOutlineSortAscending />
                ) : (
                  <HiSortDescending />
                )}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((m) => {
            return (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.username}</td>
                <td>{m.email}</td>
                <td>{m.address.zipcode}</td>
                <td>{m.phone}</td>
                <td>{m.website}</td>
                <td>{m.company.name}</td>
                <td>
                  {/* <Link to={`/users/${m.id}/`}>{m.id} </Link> */}
                  <button onClick={(e) => handleClick(e, m)}>{m.id}</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MainPage;

// const { data, loading, error } = useFetch(
//   "https://jsonplaceholder.typicode.com/users"
// );

// filterD = useMemo(() => {
//   return data.filter((f) =>
//     f.name.toLowerCase().includes(searchWord.toLowerCase())
//   );
// }, [data, searchWord]);

// const handleSearchWord = (e) => {
//   const newSearch = e.target.value;
//   setSearchWord(newSearch);
// };
