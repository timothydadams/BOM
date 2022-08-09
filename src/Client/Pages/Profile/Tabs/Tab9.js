import react from 'react'

const Tab9 = () =>{

    return(
        <div id="tab9">
          <div className="row px-5 pt-5">
            <div className="col-md-4">
              <div className="health-selection-wrapper">
                <div className="checkboxes-and-radios">
                  <input type="checkbox" id="chkstock18" value=""/>
                  <label htmlFor="chkstock18">I attend a NC Baptist Church:</label>
                </div>
              </div>
            </div>
            <div className="col-md-8"></div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="required-caption">Church Name</label>
                <input type="text" maxLength="200" className="form-control" placeholder="Enter church name"/>
                <small className="form-text text-muted">Write the full name of your church (i.e. First Baptist Church or Calvary Baptist Church)</small> </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="required-caption">Church City</label>
                <input type="text" maxLength="200" className="form-control" placeholder="Enter church city"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label id="" className="required-caption" htmlFor="">Church State</label>
                <select name="" id="" className="DropDownField form-control">
                  <option value=""></option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC" selected="selected">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="required-caption">Church Phone</label>
                <input type="text" maxLength="200" class="form-control" placeholder="Enter church phone"/>
              </div>
            </div>
          </div>
        </div>

    )
}
export default Tab9