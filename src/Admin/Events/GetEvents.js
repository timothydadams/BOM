import React, {useState,useEffect} from "react";
import axios from "axios"
import EventType from "./EventType"
import { useHistory } from 'react-router-dom';
import { DataGrid , GridToolbar, GridRowParams} from '@mui/x-data-grid';
import { Button } from "@mui/material";
import { useSnackbar } from 'notistack';
//import { authHeader } from '../Authentication/authHeader'



const GetEvents = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //console.log(localStorage.getItem('user'));

  useEffect(() => {
    
    const fetchData = async () => {
      setIsLoading(true);
      try{
          const result = await axios(
            'https://bomreactapi.azurewebsites.net/events/getevents', 
          );
          setData(result.data);
          enqueueSnackbar('Events fetch success');
      }
        catch(error){
        setError(true)
        enqueueSnackbar('Event fetch failed');
      }
 
      
      setIsLoading(false);
      //console.log(data);
    };
 
    fetchData();
  }, []);

  const handleClone = (event, cellValues) => {
    //console.log(cellValues.row);
    enqueueSnackbar('Event Cloned');
  };

  const columns = [
    {
      field: "Actions", width:75,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              event.ignore = true;
              handleClone(event, cellValues);
            }}
          >
            Clone
          </Button>
        );
      }
    },
    { field: 'EventsID', headerName: 'ID', width:125 },
    { field: 'BP_Title', headerName: 'Title', width:200},
    { field: 'BP_Type', headerName: 'Type', width:100},
    { field: 'BP_Address', headerName:'Address', width:200},
    { field: 'BP_Categories', headerName:'Categories', width:100,
  renderCell:(cellValues) => {
    return (
      <div>
        {getCategoriesById(cellValues)}
      </div>
    )
  }},
  ];


  const gridStyle = {
    width: 1000,
  }

  function getCategoriesById(input){
    const returnValueString = '';
    try{
      //console.log(JSON.stringify(values.value));
      let splitVals = input.value.split(';'),i;
      for(i=0; i < splitVals.length; i++){
        //get corresponding categories
        let categoryId = splitVals[i];
        returnValueString += "Category,"
      }
    }
    catch(ex){
     // console.log(ex);
    }
    return returnValueString;
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
                <DataGrid columns={columns} rows={data} getRowId={(row) => row.EventsID} 
                //onRowClick={(row) => history.push("/events/edit/" + row.id)} 
                onRowClick={(params, event) => {
                  if (!event.ignore) {
                    history.push("/admin/events/edit/" + params.row.EventsID)
                    //console.log("push -> /roles/" + params.row.id);
                  }
                }}
                components={{Toolbar: GridToolbar,}} 
                disableMultipleSelection={true} 
                disableSelectionOnClick={true} 
                /> 
              </div>
            </div>
          )}
          </div>) 
}



export default GetEvents


