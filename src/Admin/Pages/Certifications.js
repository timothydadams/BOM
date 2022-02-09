import React, {useState,useEffect} from "react";
import axios from "axios"
import { useHistory } from 'react-router-dom';
import { DataGrid , GridToolbar} from '@mui/x-data-grid';

const Certifications = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();

  //this table consists of items from the following query/view
  //SELECT DISTINCT  * FROM
//(
 // SELECT CMS_Role.RoleID,CMS_Role.RoleName,CMS_Role.SiteID,CMS_UserRole.UserID,CMS_UserRole.ValidTo FROM CMS_Role
//  INNER JOIN CMS_UserRole ON CMS_UserRole.RoleID = CMS_Role.RoleID --WHERE CMS_Role.RoleGroupID IS NULL
//  UNION ALL 
//  SELECT CMS_Role.RoleID,CMS_Role.RoleName,CMS_Role.SiteID,CMS_MembershipUser.UserID,CMS_MembershipUser.ValidTo FROM CMS_Role
//  INNER JOIN CMS_MembershipRole ON CMS_MembershipRole.RoleID = CMS_Role.RoleID
//  INNER JOIN CMS_MembershipUser ON CMS_MembershipUser.MembershipID= CMS_MembershipRole.MembershipID
 //) AS X

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try{
          const result = await axios(
            'https://bomreactapi.azurewebsites.net/users/getcerts',
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
    { field: 'MembershipDisplayName', headerName: 'Display Name', width:400},
    { field: 'ValidTo', headerName: 'Valid To', width:200},
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
                <DataGrid columns={columns} rows={data} getRowId={(row) => row.RoleID} onRowSelected={(row) => history.push("/roles/edit/" + row.data.RoleID)} components={{Toolbar: GridToolbar,}} disableMultipleSelection={true}  checkboxSelection/> 
              </div>
            </div>
          )}
          </div>) 
}



export default Certifications
