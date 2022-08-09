import react from 'react'

const Tab8 = () =>{

    return(
        <div id="tab8">
        <div className="row px-5 pt-5">
          <div className="col-md-12">
            <p>Please enter the following data exactly as it appears on your passport</p>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>Passport Number</label>
              <input type="text" maxLength="200" className="form-control" placeholder="Enter passport number"/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>Given Names (First, Middle)</label>
              <input type="text" maxLength="200" className="form-control" placeholder="Enter given names"/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>Surname (Last Name)</label>
              <input type="text" maxLength="200" className="form-control" placeholder="Enter surname"/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>Nationality</label>
              <input type="text" maxLength="200" className="form-control" placeholder="Enter nationality"/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>Date of Birth</label>
              <input type="text" className="form-control datetimepicker-input" id="datetimepicker3" data-toggle="datetimepicker" data-target="#datetimepicker3" placeholder="MM/DD/YYYY"/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>State Of Birth</label>
              <input type="text" maxLength="200" className="form-control" placeholder="Enter state of birth"/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label id="" className="required-caption" htmlFor=""><span className="required-field">*</span>Gender</label>
              <select name="" id="" className="DropDownField form-control">
                <option selected="selected" value="(select)">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>Date of Issue</label>
              <input type="text" className="form-control datetimepicker-input" id="datetimepicker4" data-toggle="datetimepicker" data-target="#datetimepicker4" placeholder="MM/DD/YYYY"/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>Date of Expiration</label>
              <input type="text" className="form-control datetimepicker-input" id="datetimepicker5" data-toggle="datetimepicker" data-target="#datetimepicker5" placeholder="MM/DD/YYYY"/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>Profession</label>
              <input type="text" maxLength="200" className="form-control" placeholder="Enter profession"/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>Closest Airport</label>
              <input type="text" maxLength="200" className="form-control" placeholder="Enter closest airport"/>
            </div>
          </div>
        </div>
      </div>

    )
}
export default Tab8