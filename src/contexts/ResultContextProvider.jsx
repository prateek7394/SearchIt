import { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseURL = "https://google-search3.p.rapidapi.com/api/v1";

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // type = /search, /image, /videos

  const getResults = async (type) => {
    setIsLoading(true);

    const response = await fetch(`${baseURL}${type}`, {
      method: "GET",
      headers:  {
        'X-User-Agent': 'desktop',
        'X-Proxy-Location': 'IN',
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'google-search3.p.rapidapi.com'
      },
    });

    const data = await response.json();
    // console.log(data);

    // Here instead of directly setResults(data) we modified our code to 
    // handle entries conflict for /news route
    // Even renaming by destructuring also din't work here

    if(type.includes('/news')) {
        setResults(data.entries);
    }
    else if(type.includes('/image')) {
        setResults(data.image_results);
    }
    else{
        setResults(data.results);
    }

    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
