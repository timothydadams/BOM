import React, { useState, useEffect } from "react"
import { useSnackbar } from 'notistack';
import Select from 'react-select'
import axios from "../../api/axios";
import { useParams , useNavigate, useLocation} from "react-router-dom"
import ReactInputDateMask from 'react-input-date-mask';
//import { useUser } from "../../../Components/Hooks/useUser";
import useData from '../../Hooks/useData';
import Tab1 from './Tabs/Tab1'

const endpoint = '/users/getusersinfo';

const MyProfile = (props) => {
  
  const [bomUser, setFields] = useState({
    UserID: 0,
    UserName: '',
    FirstName: '',
    LastName: '',
    Email:'',
    Phone:'',
    UserLastModified:'',
    MiddleName:'',
    FullName:'',
    UserEnabled:true,
    BP_DOB:'',
    BP_SubscribeNews:false,
    BP_SubscribeMag:false,
    UserIsEditor:false,
    UserIsGlobalAdministrator:false,
    UserCreated:'',
    UserGUID:'',
    Privilege:0,
  });

  const params = useParams();
  const navigate = useNavigate();
  const [contentLoaded, setContentLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const userid = params.userid;
  const {auth} = useData();
  //if(userid === undefined || user === null)
  //{
      //send user to login page
     // history.push('/login');
  //}
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try{
            const result = await axios(`${endpoint}?userid=${userid}`);
          //alert(JSON.stringify(fields));
          //console.log(JSON.stringify(result.data));
          if(result.data)
          {
            setFields(result.data);
          }
          //alert(JSON.stringify(fields));
          //enqueueSnackbar('User fetch success');
        }
          catch(error){
          setError(true)
          //enqueueSnackbar('User fetch failed');
        }        
      };

      if(!contentLoaded){
        //getSupportingLists();
        fetchData();
        setContentLoaded(true);        
        setIsLoading(false);
      }
  }, []);

    //build lists for dropdown selects
    const privilegeLevelList = [{ value: 0, label: "Normal User" }, { value:1,label:"Editor"}, { value:2, label:"Administrator"}, { value:3, label:"Global Administrator"}];
    const userTabs = [{title: 'General', value: 'General'}, {title:'Settings', value: 'Settings'}, {title:'Roles', value: 'Roles'}, ];

    function handleCheckboxChange(input){
      const target = input.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;
        console.log(name,value);
        setFields({...bomUser,
          [name]: value
        });
    }

    //handlefieldchange
    function handleFieldChange(input){
        const target = input.target;
        const value = target.value;
        const name = target.id;
        console.log(name,value);
        setFields({...bomUser,
          [name]: value
        });
    }

    function handlePrivilegeLevelChange(input){
        console.log(input);
        setFields({...bomUser, Privilege: input.value});
    }

    const handleCancel = async e => {
      console.log('cancel');
      
    }
  
    const handleSubmit = async e => {
        e.preventDefault();

        console.log(JSON.stringify(bomUser));

        axios.post('https://bomreactapi.azurewebsites.net/users/save', bomUser)
        //.then(response => console.log(response))
        .then(response => {
          console.log(response);
          enqueueSnackbar("User Saved");
        })
        .catch(error => {
            console.log(error.message);
            enqueueSnackbar(error.message);
        });
  }

return (
<form onSubmit={handleSubmit}>
<section id="first-tab-group" class="tabgroup">
        
        
        <Tab1/>
        
        
       
        
        
        
      </section>
</form>
    );
  }

  export default MyProfile;


