import React from "react";
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DataContext = createContext();

function DataContextProvider({ children }) {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(false);
  // const [sorting, setSorting] = useState({ property: null, order: "asc" });
  // const [filteredData, setFilteredData] = useState([]);
  // const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUserData(result.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const saveUserdata = async (data) => {
    try {
      setLoadingEdit(true);
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${data.id}`,
        {
          ...data,
        }
      );

      if (+response.status === 200) {
        toast.success("Updated data has been sent!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        const { data } = response;
        const newData = [...userData].map((m) => {
          if (m.id === data.id) {
            m.name = data.name;
            m.email = data.email;
            m.username = data.username;
            m.phone = data.phone;
            m.address.zipCode = data.address;
            m.company.name = data.company;
            m.website = data.website;
          }
          return m;
        });
        setUserData(newData);
      }
    } catch (error) {
      toast.error("This is error", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.error("Error updating data:", error);
    } finally {
      setLoadingEdit(false);
    }
  };

  // const SortData = (property) => {
  //   let order = "asc";
  //   let sortedData;
  //   if (sorting.property === property && sorting.order === "asc") {
  //     order = "desc";
  //   }

  //   sortedData = [...userData].sort((a, b) => {
  //     if (a[property] < b[property]) return order === "asc" ? -1 : 1;
  //     if (a[property] > b[property]) return order === "asc" ? 1 : -1;
  //     return 0;
  //   });
  //   setSorting({ property, order });
  //   setFilteredData(sortedData);
  // };

  // const SearchWordFn = (e) => {
  //   const newSearch = e.target.value;
  //   setSearchWord(newSearch);

  //   setFilteredData(
  //     userData.filter((f) => {
  //       return f.name.toLowerCase().includes(newSearch.toLowerCase());
  //     })
  //   );
  // };

  return (
    <DataContext.Provider
      value={{
        userData,
        saveUserdata,
        loading,
        error,
        loadingEdit,
        //SortData,
        // filteredData,
        // setFilteredData,
        //sorting,
        //setSorting,
        //SearchWordFn,
        //searchWord,
        //setSearchWord,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
