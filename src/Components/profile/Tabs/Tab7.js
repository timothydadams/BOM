import react from 'react'

const Tab7 = () =>{

    return(
        <div id="tab7">
        <div className="row px-5 pt-5">
          <div className="col-md-12">
            <p><strong>Health Insurance</strong><br/>
              LIABILITY RELEASE: As a volunteer on this project, I understand that there are certain risks and dangers that are inherent while traveling and participating in such a project. Some of those dangers include accidents while traveling, accidents while working (falls, electrical shock, cuts and other injuries from power equipment, etc.), sickness and other accidents or injuries, foreseeable and unforeseeable, that might pose a risk to me of permanent injury or death. If I accept a term of volunteer service, I wish to make it clear that my understanding is that all sponsoring Baptist Conventions and bodies do not assume any responsibility for loss of property, damage to the same, personal harm or injury or illness that may come, and I, for myself, my heirs, executors, administrators, distributes and assigns, do hereby absolve all sponsoring Baptist bodies and hold them harmless from any claim or demand which I or my agents or heirs might conceivably assert upon the Baptist bodies. </p>
          </div>
          <div className="col-md-4">
            <div className="health-selection-wrapper">
              <div className="checkboxes-and-radios">
                <input type="checkbox" id="chkstock17" value=""/>
                <label htmlFor="chkstock17">Do you have Health Insurance?</label>
              </div>
            </div>
          </div>
          <div className="col-md-8"> </div>
          <div className="col-md-12 mb-3">
            <p><strong>Supplemental Insurance</strong><br/>
              Volunteer may be automatically enrolled in a supplemental insurance policy by North Carolina Baptist Men's office. </p>
          </div>
          <div className="col-md-12">
            <div className="legal form-group form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
              <label className="form-check-label" htmlFor="exampleCheck1">I understand that the supplemental accident insurance that will be provided for me by NC Baptist Men is supplemental and secondary insurance. I am responsible to have and provide my own primary health insurance coverage. I accept full responsibility for any medical bills and expenses that are not covered by this secondary coverage. It is not the responsibility for NC Baptist Men to provide me with health insurance coverage for this mission trip and I will not hold them responsible for any medical expenses that result from sickness, accident or injury while participating on this trip.: </label>
            </div>
          </div>
        </div>
        <hr/>
        <div className="row px-5 pt-5">
          <div className="col-md-4">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>Beneficiary First Name</label>
              <input type="text" maxLength="200" className="form-control" placeholder="Beneficiary First Name"/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="required-caption">Beneficiary Middle Name</label>
              <input type="text" maxLength="200" className="form-control" placeholder="Beneficiary Middle Name"/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>Beneficiary Last Name</label>
              <input type="text" maxLength="200" className="form-control" placeholder="Beneficiary Last Name"/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>Beneficiary Relationship</label>
              <input type="text" maxLength="200" className="form-control" placeholder="Beneficiary Relationship"/>
            </div>
          </div>
        </div>
        <hr/>
        <div className="row my-5">
          <div className="col-md-12 text-center"> <a className="button-default button-green" href="#">Save</a> </div>
        </div>
      </div>

    )
}
export default Tab7