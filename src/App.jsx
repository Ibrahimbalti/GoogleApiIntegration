import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Posts from "./features/post/posts";
import GooglePlacesAutocomplete from "./components/GooglePlacesAutocomplete";
import { LoadScript } from "@react-google-maps/api";

function App() {
  let name = "Ibrahim";

  function changeName() {
    name = "Ishaq"; // Change the variable
    console.log("Name changed to:", name);
  }

  // useEffect(() => {}, [name]);

  // const [postData, setPostData] = useState([]);

  // useEffect(() => {
  //   const callApi = async () => {
  //     try {
  //       const res_data = await axios.get(
  //         "https://jsonplaceholder.typicode.com/posts"
  //       );

  //       setPostData(res_data.data);
  //     } catch (error) {}
  //   };

  //   callApi();
  // }, []);
  // var count = 0;
  // function increament() {
  //   console.log("helel");
  //   count++;
  // }

  // const country = [
  //   { name: "pakistan", city: ["islamabad", "skardu"] },
  //   { name: "India", city: ["Delhi", "indiacity"] },
  // ];

  // const [city, setCity] = useState([]);

  // function handleCity(item) {
  //   console.log("item___", item);
  //   const select = country.find(
  //     (countryName) => countryName.name === item.name
  //   );
  //   console.log("__select", select);
  //   console.log("JSON.stringify(city)", JSON.stringify(city));
  //   if (select) {
  //     if (
  //       !city.length ||
  //       JSON.stringify(city) !== JSON.stringify(select.city)
  //     ) {
  //       setCity(item.city);
  //     }
  //   }
  // }
  // console.log("cityArray__", city);
  const [counter, setCounter] = useState(0);
  function helloSir() {
    setCounter((pre) => pre + 1);
    setCounter((pre) => pre + 1);
    setCounter((pre) => pre + 1);
  }

  const [formData, setFormData] = useState({
    fullname: "",
    bloodtype: "",
  });

  function handleInputField(e) {
    const name = e.target.name;
    const value = e.target.value;
    console.log("name", name);
    console.log("value", value);
    let result = "";

    switch (name) {
      case "fullname":
        result = value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
        break;
      case "bloodtype":
        result = value ? value.toUpperCase() : "";
        break;
      default:
        result = value;
        break;
    }

    console.log("result__", result);

    setFormData((prev) => ({
      ...prev,
      [name]: result,
    }));

    // console.log("Name___", name);
    // console.log("bloodType___", bloodType);
  }

  function handleSubmitForm(even) {
    even.preventDefault();
    console.log(formData.fullname);
    console.log(formData.bloodtype);
  }

  console.log(formData.name);
  console.log(formData.bloodtype);

  const [items, setItems] = useState(["hdh", "hhd"]);
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleDelete = (indexToDelete) => {
    const newItems = items.filter((_, index) => index !== indexToDelete);
    setItems(newItems);

    // Also remove from checked items
    const updatedChecked = { ...checkedItems };
    delete updatedChecked[indexToDelete];
    setCheckedItems(updatedChecked);
  };

  return (
    <>
      <GooglePlacesAutocomplete />

      {/* <div>
        <form
          style={{
            background: "red",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "80%",
          }}
          onSubmit={handleSubmitForm}
        >
          <h1>Change first Character to UperCase Automaitcally</h1>
          <label> Name </label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputField}
          />
          <label> Blood Group </label>
          <input
            type="text"
            name="bloodtype"
            value={formData.bloodtype}
            onChange={handleInputField}
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div>
        <h2>Item List</h2>
        {items.map((item, index) => (
          <div key={index} style={{ marginBottom: "8px" }}>
            <input
              type="checkbox"
              checked={!!checkedItems[index]}
              onChange={() => handleCheckboxChange(index)}
            />
            <span style={{ margin: "0 10px" }}>{item}</span>
            {checkedItems[index] && (
              <button onClick={() => handleDelete(index)}>Delete</button>
            )}
          </div>
        ))}
      </div> */}

      {/* <div>
        {postData.map((item, index) => {
          return (
            <div key={index} style={{ color: "red" }}>
              {item.title}
            </div>
          );
        })}
      </div> */}
      {/* <button onClick={() => increament()}>Increament</button>
      <div>Count is {count}</div>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/contact/home" element={<Contact />} />
        </Routes>
      </Router> */}
      {/* <select
        className="select"
        onChange={(e) => handleCity(country[e.target.selectedIndex])}
      >
        {country.map((item, key) => (
          <option key={key} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>

      <select className="select">
        {city.map((item) => {
          return <option>{item}</option>;
        })}


      </select> */}

      {/* <div style={{ padding: "2rem", background: "red" }}>
        <h1>Redux Toolkit with Vite</h1>
        <Posts />
      </div> */}
    </>
  );
}

export default App;
