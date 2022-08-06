import React, {useState,useEffect} from "react";
import { useHistory, useParams } from 'react-router-dom';
import axios from "axios"
import { DataGrid , GridToolbar, GridRowParams} from '@mui/x-data-grid';
import { Button } from "@mui/material";
import { useSnackbar } from 'notistack';
import dompurify from 'dompurify'
//import { authHeader } from '../Authentication/authHeader'



const GetAttendees = (props) => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const eventid = params.eventid;
 // const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
 // const [search, setSearch] = useState('');
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    
    const fetchData = async () => {
      setIsLoading(true);
      try{

        const result = await axios.get(
            'https://bomreactapi.azurewebsites.net/events/geteventattendees', { params: {eventid: Number(eventid)}}
        );
        setData(result.data);
        enqueueSnackbar('Attendees fetch success');
      }
        catch(error){
        setError(true)
        enqueueSnackbar('Attendees fetch failed');
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
      field: "Actions", width:120,
      renderCell: (cellValues) => {
        return (
          <div>
           
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              event.ignore = true;
              viewAttendees(event, cellValues);
            }}
          >
            Manage
          </Button>
          </div>
        );
      }
    },
    { field: 'BPEventID', headerName: 'Event ID', width:75 },
    { field: 'BPAttendeeFN', headerName: 'First Name', width:100},
    { field: 'BPAttendeeLN', headerName: 'Last Name', width:100},
    { field: 'BPAttendeeEmail', headerName:'Email', width:100},
    { field: 'BPAttendeeOrderID', headerName:'Order ID', width:75,
    
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
                <DataGrid flexGrow autoHeight={true} autoPageSize={true} pageSize={100} columns={columns} rows={data} getRowId={(row) => row.BPAttendeeID} 
                //onRowClick={(row) => history.push("/events/edit/" + row.id)} 
                onRowClick={(params, event) => {
                  if (!event.ignore) {
                    history.push("/admin/events/attendeeedit/" + params.row.BPAttendeeID)
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



export default GetAttendees


