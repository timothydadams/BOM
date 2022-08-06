import React, {useState,useEffect} from "react";
import axios from "axios"
import EventType from "./EventType"
import { useHistory } from 'react-router-dom';
import { DataGrid , GridToolbar, GridRowParams} from '@mui/x-data-grid';
import { Button } from "@mui/material";
import { useSnackbar } from 'notistack';
import dompurify from 'dompurify'
//import { authHeader } from '../Authentication/authHeader'



const GetEvents = (props) => {
  const [data, setData] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
 // const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
 // const [search, setSearch] = useState('');
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //console.log(localStorage.getItem('user'));

  useEffect(() => {
    
    const fetchData = async () => {
      setIsLoading(true);
      try{

        const categoriesListResult = await axios.get('https://bomreactapi.azurewebsites.net/events/getcategories');
        setCategoriesList(categoriesListResult.data);

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

  const viewAttendees = (event, cellValues) => {
    
    history.push('/admin/events/attendees/' + cellValues.row["EventsID"]);
  };

  const columns = [
    {
      field: "Actions", width:275,
      renderCell: (cellValues) => {
        return (
          <div>
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              event.ignore = true;
              handleClone(event, cellValues);
            }}
          >
            Clone
          </Button> | 
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              event.ignore = true;
              viewAttendees(event, cellValues);
            }}
          >
            View Attendees
          </Button>
          </div>
        );
      }
    },
    { field: 'EventsID', headerName: 'ID', width:75 },
    { field: 'BP_Type', headerName: 'Type', width:100},
    { field: 'BP_Title', headerName: 'Title', width:200},
    { field: 'BP_Address', headerName:'Address', width:200},
    { field: 'BP_Categories', headerName:'Categories', width:300,
    renderCell: (cellValues) => {
      let returnVal ='';
      let splitVals = cellValues?.value?.split(';');
      splitVals?.map((catid) => 
      {
          let cat = categoriesList?.find(x=> x.CategoryID == catid);
          returnVal += cat?.CategoryDisplayName;
          
      }
      );
      return (
        returnVal    
      )
    },
  },
  ];


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
            
            <div>
                <DataGrid flexGrow autoHeight={true} autoPageSize={true} pageSize={100} columns={columns} rows={data} getRowId={(row) => row.EventsID} 
                //onRowClick={(row) => history.push("/events/edit/" + row.id)} 
                onRowClick={(params, event) => {
                  if (!event.ignore) {
                    history.push("/admin/events/" + params.row.EventsID)
                    //console.log("push -> /roles/" + params.row.id);
                  }
                }}
                components={{Toolbar: GridToolbar,}} 
                disableMultipleSelection={true} 
                disableSelectionOnClick={true} 
                /> 
            </div>
           
          )}
          </div>) 
}



export default GetEvents


