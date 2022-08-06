import react from 'react'

const Tab6 = () =>{

    return(
        <div id="tab6">
          <div className="row px-5 pt-5">
            <div className="col-md-6">
              <div className="health-selection-wrapper">
                <div className="checkboxes-and-radios">
                  <input type="checkbox" id="chkstock1" value="0"/>
                  <label for="chkstock1">Do you take any medication(s)?</label>
                </div>
                <div id="dvstock1" style={{display: 'none'}}>
                  <div className="form-group mt-2">
                    <textarea className="form-control" rows="3" placeholder="If yes, specify medications."></textarea>
                  </div>
                </div>
              </div>
              <div className="health-selection-wrapper">
                <div className="checkboxes-and-radios">
                  <input type="checkbox" id="chkstock2" value="0"/>
                  <label for="chkstock2">Do you have any allergies or dietary restrictions?</label>
                </div>
                <div id="dvstock2" style={{display: 'none'}}>
                  <div className="form-group mt-2">
                    <textarea className="form-control" rows="3" placeholder="If yes, specify allergies or dietary restrictions."></textarea>
                  </div>
                </div>
              </div>
              <div className="health-selection-wrapper">
                <div className="checkboxes-and-radios">
                  <input type="checkbox" id="chkstock3" value="0"/>
                  <label for="chkstock3">Do you have any lifting restrictions?</label>
                </div>
                <div id="dvstock3" style={{display: 'none'}}>
                  <div className="form-group mt-2">
                    <textarea className="form-control" rows="3" placeholder="If yes, specify lifting restrictions."></textarea>
                  </div>
                </div>
              </div>
              <div className="health-selection-wrapper">
                <div className="checkboxes-and-radios">
                  <input type="checkbox" id="chkstock4" value="0"/>
                  <label for="chkstock4">Do you have any chronic ailments?</label>
                </div>
                <div id="dvstock4" style={{display: 'none'}}>
                  <div className="form-group mt-2">
                    <textarea className="form-control" rows="3" placeholder="If yes, specify chronic ailments."></textarea>
                  </div>
                </div>
              </div>
              <div className="health-selection-wrapper">
                <div className="checkboxes-and-radios">
                  <input type="checkbox" id="chkstock5" value="0"/>
                  <label for="chkstock5">Have you had a tetanus shot?</label>
                </div>
                <div id="dvstock5" style={{display: 'none'}}>
                  <div className="form-group mt-2">
                    <div className="form-group">
                      <label for="exampleFormControlSelect1">If yes, what was the year of last tetanus shot?</label>
                      <select className="form-control">
                        <option>2022</option>
                        <option>2021</option>
                        <option>2020</option>
                        <option>2019</option>
                        <option>2018</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="health-selection-wrapper">
                <div className="checkboxes-and-radios">
                  <input type="checkbox" id="chkstock6" value="0"/>
                  <label for="chkstock6">Do you agree to abstain from the use of alcohol/illegal drugs while participating in missions/projects?</label>
                </div>
                <div id="dvstock6" style={{display: 'none'}}>
                  <div className="form-group mt-2">
                    <textarea className="form-control" rows="3" placeholder="If no, provide reason."></textarea>
                  </div>
                </div>
              </div>
              <div className="health-selection-wrapper">
                <div className="checkboxes-and-radios">
                  <input type="checkbox" id="chkstock7" value="0"/>
                  <label for="chkstock7">Do you agree to abstain from the use of tobacco while participating in missions/projects?</label>
                </div>
                <div id="dvstock7" style={{display: 'none'}}>
                  <div className="form-group mt-2">
                    <textarea className="form-control" rows="3" placeholder="If no, provide reason."></textarea>
                  </div>
                </div>
              </div>
              <div className="health-selection-wrapper">
                <div className="checkboxes-and-radios">
                  <input type="checkbox" id="chkstock8" value="0"/>
                  <label for="chkstock8">Do you have High Blood Pressure?</label>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="health-selection-wrapper">
                <div className="checkboxes-and-radios">
                  <input type="checkbox" id="chkstock9" value="0"/>
                  <label for="chkstock9">Do you take medication to control your Blood Pressure?</label>
                </div>
                <div id="dvstock9" style={{display: 'none'}}>
                  <div className="form-group mt-2">
                    <textarea className="form-control" rows="3" placeholder="If yes, list medications."></textarea>
                  </div>
                </div>
              </div>
              <div className="health-selection-wrapper">
                <div className="checkboxes-and-radios">
                  <input type="checkbox" id="chkstock10" value="0"/>
                  <label for="chkstock10">Do you have a history of heart disease?</label>
                </div>
                <div id="dvstock10" style={{display: 'none'}}>
                  <div className="form-group">
                    <label for="exampleFormControlSelect1">Have you ever had any of the following?</label>
                    <select className="form-control">
                      <option>Heart Attack</option>
                      <option>Stent Placement</option>
                      <option>Open Heart Surgery/Bypass</option>
                      <option>Valve Surgery</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="health-selection-wrapper">
                <div className="checkboxes-and-radios">
                  <input type="checkbox" id="chkstock11" value="0"/>
                  <label for="chkstock11">Do you have Diabetes?</label>
                </div>
              </div>
              <div className="health-selection-wrapper">
                <div className="checkboxes-and-radios">
                  <input type="checkbox" id="chkstock12" value="0"/>
                  <label for="chkstock12">Do you take Oral Medication or Insulin for Diabetes?</label>
                </div>
              </div>
              <div className="health-selection-wrapper">
                <div className="checkboxes-and-radios">
                  <input type="checkbox" id="chkstock13" value="0"/>
                  <label for="chkstock13">Do you have an EPI Pen?</label>
                </div>
              </div>
              <div className="health-selection-wrapper">
                <div className="checkboxes-and-radios">
                  <input type="checkbox" id="chkstock14" value="0"/>
                  <label for="chkstock14">Do you have a history of Seizures?</label>
                </div>
              </div>
              <div className="health-selection-wrapper">
                <div className="checkboxes-and-radios">
                  <input type="checkbox" id="chkstock15" value="0"/>
                  <label for="chkstock15">Do you use a breathing devices?</label>
                </div>
                <div id="dvstock15" style={{display: 'none'}}>
                  <div className="form-group">
                    <label for="exampleFormControlSelect1">Please select</label>
                    <select className="form-control">
                      <option>Home Oxygen</option>
                      <option>CPAP</option>
                      <option>BiPAP</option>
                      <option>Inhaler</option>
                      <option>Nebulizer</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="health-selection-wrapper">
                <div className="checkboxes-and-radios">
                  <input type="checkbox" id="chkstock16" value="0"/>
                  <label for="chkstock16">Do you have any disabilities?</label>
                </div>
                <div id="dvstock16" style={{display: 'none'}}>
                  <div className="form-group mt-2">
                    <textarea className="form-control" rows="3" placeholder="If yes, please specify disabilities."></textarea>
                  </div>
                </div>
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
export default Tab6