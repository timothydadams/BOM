import React, {useState,useEffect,useCallback} from "react";
import axios from "../../api/axios";
import { useNavigate } from 'react-router-dom';
import { DataGrid , GridToolbar } from '@mui/x-data-grid';
import Select from "react-select";
import EventsTile from './EventsTile';
import debounce from 'lodash.debounce';
import {NoResults} from '../Generic';


const EventsAndOpportunities = (props) => {
  const [data, setData] = useState([]);
  const [filteredData,setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [drpCateogory, setDrpCategory] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [hasFilterData, setHasFilterData] = useState();
  const [categoriesList, setCategoriesList] = useState([]);

  const getEventsData = () => {
    let endpoints = [
      '/events/getcategories',
      '/events/getevents',
    ];
    Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))
        .then(([{data: categories}, {data: events}] )=> {
            setCategoriesList(categories);
            setData(events);
            setIsLoading(false);
    });
  }

  useEffect(() => {
    setIsLoading(true);
    getEventsData();
  }, []);

  const handleCategoryChange = option => {
    setDrpCategory({ drpCateogory: option.value});
   }

   const filterItems = () => {
     let result = data.filter(item => {
        return item["BP_Title"].toLowerCase().includes(searchQuery.toLowerCase()); 
        //|| item["BP_Description"].toLowerCase().includes(value);
     });
     setFilteredData(arr => result); 
   }


   const handleSearchChange = e => {
       setSearchQuery(e.target.value); 
   }

   const delayedFilter = useCallback(debounce(filterItems, 350), [searchQuery]);

   useEffect(() => {
    delayedFilter();
    // Cancel the debounce on useEffect cleanup.
    return delayedFilter.cancel;
   }, [searchQuery, delayedFilter]);

  return (
<div id="">
    <div className="full-row yellow">
        <div className="container-fluid">
            <div className="row pt-4 pb-4">
                <div className="col-md-6 pt-3">
                    <div className="form-group">
                        <Select placeholder="Select Categories" getOptionLabel={options=>options["CategoryDisplayName"]} getOptionValue={options=>options["CategoryID"]} options={categoriesList} value={drpCateogory} onChange={setDrpCategory}/>
                    </div>
                </div>
                <div className="col-md-6 pt-3">
                    <div className="form-group">
                         <input name="search" 
                            type="text" 
                            maxLength="200" 
                            id="" 
                            className="form-control" 
                            placeholder="Search Events..." 
                            value={searchQuery} 
                            onChange={handleSearchChange} />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="full-row white">
            <ul id="event-grid">  
                { filteredData.length > 0 
                    ? filteredData.map(singleEvent =>
                        <EventsTile key={singleEvent.EventsID} 
                            Event={singleEvent} 
                            Categories={categoriesList}
                        />
                    ) : searchQuery !== '' && filteredData.length == 0 
                            ? <NoResults />
                            : data.map(singleEvent =>
                                <EventsTile key={singleEvent.EventsID} 
                                    Event={singleEvent} 
                                    Categories={categoriesList}
                                />
                            )  
                }
                
            </ul>
    </div>
 </div>
  ) 
}



export default EventsAndOpportunities;