import react, {useState} from 'react'

const Tab4 = () =>{
  const bomReferences = {
    BPReferencesID:0,
    BP_UserGUID:'',
    BP_R_Name:'',
    BP_R_Phone:'',
  }

  const [references, setReferences] = useState();

    return(
        <div id="tab4">
        <div className="row px-5 pt-5">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Reference Name</th>
                    <th scope="col">Reference Phone Number</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Smith</td>
                    <td>(919) 555-5555</td>
                    <td><a data-toggle="collapse" href="#add-ref" role="button" aria-expanded="false" aria-controls="save-reference" className="collapsed"><i className="fa-solid fa-pen-to-square"></i> Edit</a></td>
                  </tr>
                  <tr>
                    <td>Jane Doe</td>
                    <td>(516) 444-4444</td>
                    <td><a data-toggle="collapse" href="#add-ref" role="button" aria-expanded="false" aria-controls="save-reference" className="collapsed"><i className="fa-solid fa-pen-to-square"></i> Edit</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-12"> <a data-toggle="collapse" href="#add-ref" role="button" aria-expanded="false" aria-controls="add-reference" className="button-default collapsed">Add Reference</a>
            <div className="collapse" id="add-ref">
              <div className="row pt-5">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="required-caption"><span className="required-field">*</span>Reference Name</label>
                    <input type="text" maxLength="200" className="form-control" placeholder="Reference Name"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="required-caption"><span className="required-field">*</span>Reference Phone Number</label>
                    <input type="text" maxLength="200" className="form-control" placeholder="Reference Phone Number"/>
                  </div>
                </div>
                <div className="col-md-6 text-white py-1"> <a data-toggle="collapse" href="#add-ref" role="button" aria-expanded="false" aria-controls="save-reference" className="button-default button-green collapsed">Save</a><a data-toggle="collapse" href="#add-ref" role="button" aria-expanded="false" aria-controls="cancel-reference" className="button-default button-gray mx-3 collapsed">Cancel</a></div>
                <div className="col-md-6 text-white py-1 text-right"> <a data-toggle="collapse" href="#add-ref" role="button" aria-expanded="false" aria-controls="delete-reference" className="button-default button-red collapsed">Delete</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
}
export default Tab4