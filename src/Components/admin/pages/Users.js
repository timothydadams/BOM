import React, {useState,useEffect} from "react";
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import { DataGrid , GridToolbar} from '@mui/x-data-grid';
import useData from '../../../Hooks/useData';


const path = '/users/getusers';

const Users = (props) => {
  const { auth } = useData();
  const token = auth?.token;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
          const result = await axios.get(
            path, 
            { 
              header: {Authorization: `Bearer ${token}`},
              withCredentials:true
            }
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
    { field: 'UserID', headerName: 'ID', width:200 },
    { field: 'UserName', headerName: 'Username', width:400},
    { field: 'FirstName', headerName: 'First Name', width:200},
    { field: 'LastName', headerName:'Last Name', width:300},
    { field: 'Email', headerName:'Email', width:300},
    { field: 'BP_DOB', headerName:'Date of Birth', width:300}
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
            <div style={{ display: 'flex', height: '500px', width:'1000px' }}>
              <div style={{ flexGrow: 1 }}>
              <DataGrid columns={columns} rows={data} getRowId={(row) => row.UserID} 
                onRowClick={(params, event) => {
                    navigate("/users/edit/" + params.row.UserID)
                    //console.log("push -> /roles/" + params.row.id);
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



export default Users


