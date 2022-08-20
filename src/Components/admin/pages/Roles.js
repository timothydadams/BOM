import React, {useState,useEffect} from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { DataGrid , GridToolbar } from '@mui/x-data-grid';

const Roles = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try{
          const result = await axios(
            'https://bomreactapi.azurewebsites.net/api/roles/getroles',
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
    { field: 'RoleID', headerName: 'ID', width:200 },
    { field: 'RoleDisplayName', headerName: 'Title', width:400},
    { field: 'RoleDescription', headerName: 'Type', width:200},
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
                <DataGrid columns={columns} rows={data} getRowId={(row) => row.RoleID} onRowSelected={(row) => navigate("/roles/edit/" + row.data.RoleID)} components={{Toolbar: GridToolbar,}} disableMultipleSelection={true}  checkboxSelection/> 
              </div>
            </div>
          )}
          </div>) 
}



export default Roles


