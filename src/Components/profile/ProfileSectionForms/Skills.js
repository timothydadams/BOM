import React, { useState, useEffect, useRef } from "react"
import { useSnackbar } from 'notistack';
import axios from "axios";
import useData from "../../../Hooks/useData";
import { DataGrid , GridToolbar } from '@mui/x-data-grid';
import { Editor } from '@tinymce/tinymce-react';
import {useParams, NavLink, useNavigate} from "react-router-dom";

export default function SkillsForm(){
  const navigate = useNavigate();
  const editorRef = useRef(null);
  //const user = useUser();
  const { auth } = useData();
  const user = auth?.User || {};
  const [userSkills, setUserSkills] = useState([]);
  const [skill, setFields] = useState({
    BP_S_Skill: 0,
    BP_S_Years: 0,
    BP_S_License: '',
    BP_S_Status: '',
  });

  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const eventid = params.eventid;
  console.log(params.eventid);

  const columns = [
    { field: 'BP_S_Skill', headerName: 'Skill', width:200 },
    { field: 'BP_S_Years', headerName: 'Years', width:200},
    { field: 'BP_S_License', headerName: 'License', width: 200},
    { field: 'BP_S_Status', headerName: 'Status', width:200},
  ];


    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try{
            const result = await axios(
              'https://bomreactapi.azurewebsites.net/profile/getskills/' + user.UserID,
            );
          setUserSkills(result.data);
          enqueueSnackbar('Skills fetch success');
        }
          catch(error){
          setError(true)
        }
   
        
        setIsLoading(false);
      };

      fetchData();
  }, []);

 

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    
    const handleSubmit = async e => {
      e.preventDefault();
      /*
      console.log(JSON.stringify(profile));

      let response = await axios.post('https://bomreactapi.azurewebsites.net/profile/save', profile )
      
      if (response) {
        //get new token stuff
        enqueueSnackbar("Skill Added");
      } else {
        enqueueSnackbar(error.message);
      }
      */
}
  
   //handlefieldchange
  
   function handleFieldChange(input){
    const target = input.target;
    const value = target.value;
    const name = target.id;
    console.log(name,value);

    //setFields({...bomEvent,
    //  [name]: value
    //});
}



function handleCheckboxChange(input){
  const target = input.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.id;
    console.log(name,value);
    //setFields({...bomEvent,
    //  [name]: value
    //});
}
    


return (
<form onSubmit={handleSubmit}>
    <div className="full-row white">
        <div className="container-fluid">
        <div style={{ display: 'flex', height: '500px', width:'1000px' }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid columns={columns} rows={userSkills} getRowId={(row) => row.BPSkillsID} onRowSelected={(row) => navigate(`/profile/skills/edit/${row.data.RoleID}`)} components={{Toolbar: GridToolbar,}} disableMultipleSelection={true}  checkboxSelection/> 
              </div>
            </div>
        </div>
    </div>
  <div className="full-row gray">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 text-white py-1"><a className="button-default button-green" onClick={handleSubmit}>Save</a><NavLink className="button-default button-gray mx-3" to='/admin/events'>Cancel</NavLink></div>
      </div>
    </div>
  </div>
<div className="full-row white">
<div className="container-fluid">
<div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_DatesFlexible_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_DatesFlexible_checkbox">Event Filled</label>
      <div className="form-check">
        <input id="BP_Filled" type="checkbox" name="m$c$ctl02$BP_DatesFlexible$checkbox" value={/*bomEvent.BP_Filled*/ 1}  onChange={handleCheckboxChange}/>
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted"></small> 
      </div>
      { /* bomEvent.BP_Filled */  1 ==1  ? 
      <div className="col-md-12">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Description_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_Description_editor">Filled Text</label>
        <Editor onInit={(evt,editor) => editorRef.current = editor} id="BP_Description" initialValue={/* bomEvent.BP_FilledText */ 1} init={{height:500, menubar:true}} onChange={handleFieldChange}></Editor>
        <small className="form-text text-muted">Enter the text you want to show when the event is filled.</small> 
      </div>
        </div>
        : "" }
      <div className="col-md-4 mt-3">
      <label id="m_c_ctl02_BP_DatesFlexible_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_DatesFlexible_checkbox">Event Reserved</label>
      <div className="form-check">
        <input id="BP_Reserved" type="checkbox" name="m$c$ctl02$BP_DatesFlexible$checkbox" value={/*bomEvent.BP_Reserved*/ 1}  onChange={handleCheckboxChange}/>
        <label className="form-check-label" htmlFor="gridCheck1"></label>
      </div>
      <small className="form-text text-muted"></small> 
      </div>
      { /* bomEvent.BP_Reserved*/ 1==1 ?
      <div className="col-md-12">
      <div className="form-group">
        <label id="m_c_ctl02_BP_Description_lb" className="control-label editing-form-label" htmlFor="m_c_ctl02_BP_Description_editor">Reserve Instructions</label>
        <Editor onInit={(evt,editor) => editorRef.current = editor} id="BP_ReserveInstructions" initialValue={/* bomEvent.BP_ReserveInstructions */ 1} init={{height:500, menubar:true}} onChange={handleFieldChange}></Editor>
        <small className="form-text text-muted">Enter the instructions that you want to show to users.</small> 
      </div>
        </div>
        : "" }
</div>
</div>

</form>
    );
  }
