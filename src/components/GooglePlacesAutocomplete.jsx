// import React, { useEffect, useState } from "react";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";

// const GooglePlacesAutocomplete = () => {
//   const [predictions, setPredictions] = useState([]);
//   const [inputValue, setInputValue] = useState(""); // for typed input
//   const [selectedValue, setSelectedValue] = useState(null); // for selected option

//   const API_KEY = "YOUR_API_KEY"; // replace with your key

//   useEffect(() => {
//     const loadScript = (url) => {
//       const existingScript = document.querySelector(`script[src="${url}"]`);
//       if (!existingScript) {
//         const script = document.createElement("script");
//         script.src = url;
//         script.async = true;
//         document.body.appendChild(script);
//       }
//     };

//     loadScript(
//       `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`
//     );
//   }, [API_KEY]);

//   const fetchPredictions = (input) => {
//     if (!window.google || !input) return;

//     //const service = new window.google.maps.places.AutocompleteService();
//     const service = new window.google.maps.places.AutocompleteSuggestion();
//     service.getPlacePredictions(
//       {
//         input,
//         componentRestrictions: { country: "us" },
//         types: ["address"],
//       },
//       (preds, status) => {
//         if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//           setPredictions(preds);
//         } else {
//           setPredictions([]);
//         }
//       }
//     );
//   };

//   return (
//     <Autocomplete
//       freeSolo
//       value={selectedValue}
//       onChange={(event, newValue) => {
//         setSelectedValue(newValue); // selected value
//       }}
//       inputValue={inputValue}
//       onInputChange={(event, newInputValue) => {
//         setInputValue(newInputValue); // typing
//         fetchPredictions(newInputValue);
//       }}
//       options={predictions.map((p) => p.description)}
//       renderInput={(params) => (
//         <TextField {...params} label="Enter US Address" variant="outlined" />
//       )}
//     />
//   );
// };

// export default GooglePlacesAutocomplete;

// import React, { useEffect, useState, useRef } from "react";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import { Loader } from "@googlemaps/js-api-loader";

// const GooglePlacesAutocomplete = () => {
//   const [predictions, setPredictions] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [selectedValue, setSelectedValue] = useState(null);
//   const [isApiLoaded, setIsApiLoaded] = useState(false);
//   const loaderRef = useRef(null);

//   const API_KEY = "AIzaSyCpVN2eECi3NBj-11YFhsn62j_lPvZfpxI"; // Replace with your actual API key

//   useEffect(() => {
//     loaderRef.current = new Loader({
//       apiKey: API_KEY,
//       version: "weekly",
//       libraries: ["places"],
//     });

//     const loadApi = async () => {
//       try {
//         await loaderRef.current.load();
//         setIsApiLoaded(true);
//       } catch (error) {
//         console.error("Failed to load Google Maps API", error);
//       }
//     };

//     loadApi();

//     return () => {
//       // Cleanup if needed
//     };
//   }, [API_KEY]);

//   const fetchPredictions = async (input) => {
//     if (!isApiLoaded || !input) {
//       setPredictions([]);
//       return;
//     }

//     try {
//       const service = new window.google.maps.places.AutocompleteService();
//       //const service = new window.google.maps.places.AutocompleteSuggestion();

//       service.getPlacePredictions(
//         {
//           input,
//           componentRestrictions: { country: "us" },
//           types: ["address"],
//         },
//         (preds, status) => {
//           if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//             setPredictions(preds || []);
//           } else {
//             setPredictions([]);
//           }
//         }
//       );
//     } catch (error) {
//       console.error("Error using Google Places API:", error);
//       setPredictions([]);
//     }
//   };

//   return (
//     <Autocomplete
//       freeSolo
//       disableClearable
//       value={selectedValue}
//       onChange={(event, newValue) => {
//         setSelectedValue(newValue);
//       }}
//       inputValue={inputValue}
//       onInputChange={(event, newInputValue) => {
//         setInputValue(newInputValue);
//         fetchPredictions(newInputValue);
//       }}
//       options={predictions.map((p) => p.description)}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label="Enter US Address"
//           variant="outlined"
//           fullWidth
//         />
//       )}
//       noOptionsText={inputValue ? "No addresses found" : "Type an address..."}
//     />
//   );
// };

// export default GooglePlacesAutocomplete;

import React, { useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Loader } from "@googlemaps/js-api-loader";

const GooglePlacesAutocomplete = () => {
  const [predictions, setPredictions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const [apiStatus, setApiStatus] = useState("loading"); // 'loading', 'ready', 'error'
  const loaderRef = useRef(null);

  const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key

  useEffect(() => {
    const loadGoogleMapsAPI = async () => {
      try {
        // Check if already loaded
        if (window.google && window.google.maps) {
          setApiStatus("ready");
          return;
        }

        setApiStatus("loading");
        loaderRef.current = new Loader({
          apiKey: API_KEY,
          version: "weekly",
          libraries: ["places"],
        });

        await loaderRef.current.load();
        setApiStatus("ready");
      } catch (error) {
        console.error("Failed to load Google Maps API", error);
        setApiStatus("error");
      }
    };

    loadGoogleMapsAPI();

    return () => {
      // Cleanup if needed
    };
  }, [API_KEY]);

  const fetchPredictions = (input) => {
    if (!input || apiStatus !== "ready") {
      setPredictions([]);
      return;
    }

    try {
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        throw new Error("Google Maps API not properly loaded");
      }

      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        {
          input,
          componentRestrictions: { country: "us" },
          types: ["address"],
        },
        (preds, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setPredictions(preds || []);
          } else {
            console.warn(`Places API status: ${status}`);
            setPredictions([]);
          }
        }
      );
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setPredictions([]);
    }
  };

  if (apiStatus === "error") {
    return (
      <TextField
        error
        fullWidth
        label="Address"
        helperText="Failed to load address service. Please try again later."
      />
    );
  }

  return (
    <Autocomplete
      freeSolo
      disableClearable
      value={selectedValue}
      onChange={(event, newValue) => {
        setSelectedValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        fetchPredictions(newInputValue);
      }}
      options={predictions.map((p) => p.description)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Enter US Address"
          variant="outlined"
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {apiStatus === "loading" ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          disabled={apiStatus !== "ready"}
        />
      )}
      noOptionsText={
        apiStatus === "loading"
          ? "Loading address service..."
          : inputValue
          ? "No addresses found"
          : "Type an address..."
      }
      loading={apiStatus === "loading"}
    />
  );
};

export default GooglePlacesAutocomplete;
