import react from 'react'

const Tab2 = () =>{

    return(
        <div id="tab2">
        <div className="row px-5 pt-5">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Skill</th>
                    <th scope="col">Years of Experience</th>
                    <th scope="col">License Number</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Crop Sciences</td>
                    <td>22</td>
                    <td>N/A</td>
                    <td>Retired</td>
                    <td><a data-toggle="collapse" href="#add" role="button" aria-expanded="false" aria-controls="save-skills" className="collapsed"><i className="fa-solid fa-pen-to-square"></i> Edit</a></td>
                  </tr>
                  <tr>
                    <td>Pilot</td>
                    <td>12</td>
                    <td>N/A</td>
                    <td>Active</td>
                    <td><a data-toggle="collapse" href="#add" role="button" aria-expanded="false" aria-controls="save-skills" className="collapsed"><i className="fa-solid fa-pen-to-square"></i> Edit</a></td>
                  </tr>
                  <tr>
                    <td>EMT</td>
                    <td>4</td>
                    <td>554578-123</td>
                    <td>Active</td>
                    <td><a data-toggle="collapse" href="#add" role="button" aria-expanded="false" aria-controls="save-skills" className="collapsed"><i className="fa-solid fa-pen-to-square"></i> Edit</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-12"> <a data-toggle="collapse" href="#add" role="button" aria-expanded="false" aria-controls="add-skills" className="button-default collapsed">Add Skill</a>
            <div className="collapse" id="add">
              <div className="row pt-5">
                <div className="col-md-4">
                  <div className="form-group">
                    <label id="" className="required-caption" for=""><span className="required-field">*</span>Category</label>
                    <select name="" id="" className="DropDownField form-control">
                      <option selected="selected" value="(select)">Select</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Arts/Drama">Arts/Drama</option>
                      <option value="Aviation">Aviation</option>
                      <option value="Business">Business</option>
                      <option value="Church Worker">Church Worker</option>
                      <option value="Communications">Communications</option>
                      <option value="Computers">Computers</option>
                      <option value="Construction">Construction</option>
                      <option value="Education">Education</option>
                      <option value="Emergency Services">Emergency Services</option>
                      <option value="Food Service">Food Service</option>
                      <option value="Medical/Healthcare">Medical/Healthcare</option>
                      <option value="Music">Music</option>
                      <option value="Other">Other</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label id="" className="required-caption" for=""><span className="required-field">*</span>Skill</label>
                    <select name="" id="" className="DropDownField form-control">
                      <option selected="selected" value="(select)">Select</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label id="" className="required-caption" for=""><span className="required-field">*</span>Years of Experience</label>
                    <select name="" id="" className="DropDownField form-control">
                      <option selected="selected" value="(select)">Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="required-caption"><span className="required-field">*</span>License Number</label>
                    <input type="text" maxlength="200" className="form-control" placeholder="Enter License Number if Applicable"/>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label id="" className="required-caption" for=""><span className="required-field">*</span>Status</label>
                    <select name="" id="" className="DropDownField form-control">
                      <option selected="selected" value="(select)">Select</option>
                      <option value="Active">Active</option>
                      <option value="Retired">Retired</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6 text-white py-1"> <a data-toggle="collapse" href="#add" role="button" aria-expanded="false" aria-controls="save-skills" className="button-default button-green collapsed">Save</a><a data-toggle="collapse" href="#add" role="button" aria-expanded="false" aria-controls="cancel-skills" className="button-default button-gray mx-3 collapsed">Cancel</a></div>
                <div className="col-md-6 text-white py-1 text-right"> <a data-toggle="collapse" href="#add" role="button" aria-expanded="false" aria-controls="delete-skills" className="button-default button-red collapsed">Delete</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
}
export default Tab2