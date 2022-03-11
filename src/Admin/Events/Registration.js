import React,{Component} from "react"
import {useState,useEffect} from "react"
import {useParams, NavLink} from "react-router-dom"
import axios from "axios"
import { useHistory } from 'react-router-dom';
import RegistrationForm from "../Forms/BackEnd/RegistrationForm";
import { DataGrid , GridToolbar, GridRowParams} from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';

const Registration = (props) => {
   
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const history = useHistory();
    const [bomEvent, setEvent] = useState({});
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const params = useParams();

    const eventid = params.eventid;
    console.log(params.eventid);

    const columns = [
        { field: 'RegistrationID', headerName: 'ID', width:200 },
        { field: 'RegistrationName', headerName: 'Title', width:400},
        { field: 'RegistrationCost', headerName: 'Cost', width:200},
        { field: 'RegistrationDescription', headerName:'Description', width:300}
      ];
    
      useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true);
          try{
              const result = await axios({
                method: 'get',
                url: 'https://bomreactapi.azurewebsites.net/events/getregistrations?eventid=' + eventid,
                data: {
                    eventid: eventid, // This is the body part
                }
              });
              setData(result.data);
              console.log(result.data);
              enqueueSnackbar('Registrations fetch success');
          }
            catch(error){
            setError(true)
            //enqueueSnackbar('Event fetch failed');
          }
     
          
          setIsLoading(false);
          //console.log(data);
        };
  
        fetchData();
    }, []);
  
    
 

    return(
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
                <NavLink className="btn" to={"/admin/events/edit/registration/add/" + eventid}>Add Registration</NavLink>
            <div style={{ display: 'flex', height: '500px', width:'1000px' }}>
                
              <div style={{ flexGrow: 1 }}>
              <DataGrid columns={columns} key="RegistrationID" rows={data} getRowId={(row) => row.RegistrationID}  
                onRowClick={(row, event) => {
                  if (!event.ignore) {
                    history.push("/admin/events/edit/registration/" + eventid + '/' + row.row.RegistrationID)
                  }
                }}
                components={{Toolbar: GridToolbar,}} 
                disableMultipleSelection={true} 
                disableSelectionOnClick={true} 
                /> 
              </div>
            </div>
            </div>
          )}
          </div>) 
                  
    }


export default Registration