import react from 'react'

const Tab5 = () =>{

    return(
        <div id="tab5">
        <div className="row px-5 pt-5">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Cotact Name</th>
                    <th scope="col">Contact Relationship</th>
                    <th scope="col">Contact Phone Email</th>
                    <th scope="col">Contact Phone Number</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Smith</td>
                    <td>Brother</td>
                    <td>jsmith@gmail.com</td>
                    <td>(919) 555-5555</td>
                    <td><a data-toggle="collapse" href="#add-contact" role="button" aria-expanded="false" aria-controls="save-contact" className="collapsed"><i className="fa-solid fa-pen-to-square"></i> Edit</a></td>
                  </tr>
                  <tr>
                    <td>Jane Smith</td>
                    <td>Sister</td>
                    <td>jsmith58@gmail.com</td>
                    <td>(919) 555-5555</td>
                    <td><a data-toggle="collapse" href="#add-contact" role="button" aria-expanded="false" aria-controls="save-contact" className="collapsed"><i className="fa-solid fa-pen-to-square"></i> Edit</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-12"> <a data-toggle="collapse" href="#add-contact" role="button" aria-expanded="false" aria-controls="add-contact" className="button-default collapsed">Add Contact</a>
            <div className="collapse" id="add-contact">
              <div className="row pt-5">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="required-caption"><span className="required-field">*</span>Contact Name</label>
                    <input type="text" maxLength="200" className="form-control" placeholder="Contact Name"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="required-caption">Contact Relationship</label>
                    <input type="text" maxLength="200" className="form-control" placeholder="Contact Relationship"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="required-caption"><span className="required-field">*</span>Contact Email</label>
                    <input type="text" maxLength="200" className="form-control" placeholder="Contact Email"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="required-caption"><span className="required-field">*</span>Contact Phone Number</label>
                    <input type="text" maxLength="200" className="form-control" placeholder="Contact Phone Number"/>
                  </div>
                </div>
                <div className="col-md-6 text-white py-1"> <a data-toggle="collapse" href="#add-contact" role="button" aria-expanded="false" aria-controls="save-contact" className="button-default button-green collapsed">Save</a><a data-toggle="collapse" href="#add-contact" role="button" aria-expanded="false" aria-controls="cancel-contact" className="button-default button-gray mx-3 collapsed">Cancel</a></div>
                <div className="col-md-6 text-white py-1 text-right"> <a data-toggle="collapse" href="#add-contact" role="button" aria-expanded="false" aria-controls="delete-contact" className="button-default button-red collapsed">Delete</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
}
export default Tab5