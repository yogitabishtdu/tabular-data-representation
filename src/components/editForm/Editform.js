import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { DataContext } from "../../contexts/DataContext";
import "./Editform.css";

function Editform() {
  const location = useLocation();
  const navigate = useNavigate();
  const { saveUserdata, loadingEdit } = useContext(DataContext);

  const { name, username, email, phone, address, company, website, id } =
    location.state.rowData;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: id,
      name: name,
      email: email,
      username: username,
      phone: phone,
      address: address.zipcode,
      company: company.name,
      website: website,
    },
  });

  // const handleSave = async () => {
  //   try {
  //     await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, {
  //       updatedData,
  //     });

  //     navigate("/", {
  //       state: { updatedData, successMessage: "Data updated successfully" },
  //     });
  //   } catch (error) {
  //     console.error("Error updating data:", error);
  //   }
  // };

  // const onSubmit = (data) => {
  //   console.log(data);
  //   setUpdatedData(data);
  //   handleSave();
  // };

  const onSubmit = async (data) => {
    console.log("SingleUserdata:", data);
    saveUserdata(data);
    if (!loadingEdit) {
      navigate("/");
    }
    // navigate("/");

    // try {
    //   const response = await axios.put(
    //     `https://jsonplaceholder.typicode.com/users/${id}`,
    //     {
    //       ...data,
    //     }
    //   );
    //   if (+response.status === 200) {
    //     toast("Updated data has been sent!");
    //     navigate("/");
    //   }
    // } catch (error) {
    //   toast("This is error");
    //   console.error("Error updating data:", error);
    // }
  };

  return (
    <>
      {loadingEdit && <h1>Data is loading </h1>}
      <div>
        <h1>User's detailed information</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="my-form">
          <div>
            <label>Name</label>
            <input {...register("name", { required: "Name is required" })} />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div>
            <label>Username</label>
            <input
              {...register("username", { required: "User name is required" })}
            />
            {errors.username && <span>{errors.username.message}</span>}
          </div>
          <div>
            <label>Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div>
            <label>Address</label>
            <input
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && <span>{errors.address.message}</span>}
          </div>
          <div>
            <label>Phone number</label>
            <input
              {...register("phone", { required: "phone number is required" })}
            />
            {errors.phone && <span>{errors.phone.message}</span>}
          </div>
          <div>
            <label>Website</label>
            <input
              {...register("website", { required: "Website is required" })}
            />
            {errors.website && <span>{errors.website.message}</span>}
          </div>
          <div>
            <label>Company name</label>
            <input
              {...register("company", { required: "Company name is required" })}
            />
            {errors.company && <span>{errors.company.message}</span>}
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={() => reset()}>
            Reset
          </button>
        </form>
      </div>
    </>
  );
}

export default Editform;

//import useFetch from "./useFetch";
// const { id } = useParams();
// const { data } = useFetch(`https://jsonplaceholder.typicode.com/users`);

// const dd = data
//   .filter((item) => item.id === +id)
//   .map((item) => {
//     return item.name;
//   });
