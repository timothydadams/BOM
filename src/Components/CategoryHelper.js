import React from 'react'
import dompurify from 'dompurify'

const CategoryHelper = (props) => {
    let catStrings = [];
    let splitVals = props?.Event?.BP_Categories?.split(';');
    if(splitVals){
    splitVals.map((catid) => 
    {
        let cat = props?.Categories?.find(x=> x.CategoryID == catid);
        if(cat?.CategoryDisplayName !== 'Events'){
            catStrings.push(cat?.CategoryDisplayName); 
        }    
     });
    }

    return(
        catStrings.map((catString) => {
           return <li>{catString}</li>
        })
    )
}

export default CategoryHelper;
