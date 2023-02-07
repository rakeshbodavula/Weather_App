import './App.css';
import axios from 'axios'
import Map from './Components/Map/Map';
import { useEffect, useState } from 'react';

function App() {

  // States to handle the weather data and pages information
  const [data, setData] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)


  // use Effect Hook that fetches the data from the API in the backend for every 10 minutes and whenever the page changes
  useEffect(() => {
    const fetchDataHandler = async () => {
      axios.get('http://localhost:8080/getCoordinates/v1', {
        params: {
          page,
          pageSize: 10,
        }
      })
        .then(res =>res.data)
        .then(result => {
          setData(result.data);
          setTotalPages(result.totalPages)
        })
        .catch(err => console.log(err))
    }
    fetchDataHandler();
    // interval of 10 minutes to fetch the weather details regularly
    const interval = setInterval(fetchDataHandler, 60000)
    // const interval = setInterval(() => console.log(Date.now()),600)
    return () => clearInterval(interval)
  }, [page]);



  // Handlers to handle pagination and routing between pages
  const handlePrevClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextClick = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="App">
      {data === null && <h1>Loading........</h1>}
      {data !== null && <>
        <Map data={data}></Map>
        <div>
          <button onClick={handlePrevClick} disabled={page === 1}>Prev</button>
          <button onClick={handleNextClick} disabled={page === totalPages}>Next</button>
        </div>
      </>
      }
    </div>
  );
}

export default App;
