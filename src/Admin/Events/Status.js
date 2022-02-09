import React,{Component} from "react"
import {useState,useEffect} from "react"
import {useParams} from "react-router-dom"
import StatusForm from "../Forms/BackEnd/StatusForm";
import { useSnackbar } from 'notistack';

const Status = (props) => {
   
    const [bomEvent, setEvent] = useState({});
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const params = useParams();

    const eventid = params.eventid;
    console.log(params.eventid);
    
    //use for edit information to be set
    //useEffect(()=>{
    //  fetch("https://bomreactapi.azurewebsites.net/Events/GetSingleEvent/" + eventid)
    //  .then(res => res.json())
    //  .then(
    //    (result) => {
    //      setEvent(result)
     //     enqueueSnackbar('Found specific event');
     //   }
     // )
    //});

    return(
         <StatusForm />           
        )
        
    }


export default Status