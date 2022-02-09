import React, {useState,useEffect} from "react";
import axios from "axios"
import { useHistory } from 'react-router-dom';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridColumnsToolbarButton, GridFilterToolbarButton } from '@material-ui/data-grid';

const EventsList = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try{
          const result = await axios(
            'https://bomreactapi.azurewebsites.net/events/getevents',
          );
          setData(result.data);
      }
        catch(error){
        setError(true)
      }
 
      
      setIsLoading(false);
      //console.log(data);
    };
 
    fetchData();
  }, []);

  const columns = [
    { field: 'EventsID', headerName: 'ID', width:200 },
    { field: 'BP_Title', headerName: 'Title', width:400},
    { field: 'BP_Type', headerName: 'Type', width:200},
    { field: 'BP_Address', headerName:'Address', width:300}
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
        <GridFilterToolbarButton />
      </GridToolbarContainer>
    );
  }

  const gridStyle = {
    width: 1000,
  }


  return (
          <div>
            {error && (
              <div style={{ color: `red` }}>
                Error occurred while fetching api, Please contact an admin
              </div>
            )}
            {isLoading ? (
        <div>Loading ...</div>
          ) : (
            <div style={{ display: 'flex', height: '500px', width:'1000px' }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid columns={columns} rows={data} getRowId={(row) => row.EventsID} onRowSelected={(row) => history.push("/events/edit/" + row.data.EventsID)} components={{Toolbar: CustomToolbar,}} disableMultipleSelection={true}  checkboxSelection/> 
              </div>
            </div>
          )}
          </div>) 
}



export default EventsList


