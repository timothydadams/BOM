import react from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'
import DatePicker from '@mui/lab/DatePicker'
import TextField from '@mui/material/TextField'

const Tab1 = () =>{

    const handleChange = (input) => {
        
    }

    return(
        <div id="tab1">
        <div className="row px-5 pt-5">
          <div className="col-md-6">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>First Name</label>
              <input type="text" maxLength="200" className="form-control" placeholder="Enter first name"/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>Last Name</label>
              <input type="text" maxLength="200" className="form-control" placeholder="Enter last name"/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
            <label className="required-caption"><span className="required-field">*</span>Date of Birth</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                renderInput={(props) => <TextField id='DOB' {...props} />}
                value=""
                onChange={handleChange}
            />
            </LocalizationProvider>
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
              <label id="" className="required-caption" htmlFor=""><span className="required-field">*</span>Marital Status</label>
              <select name="" id="" className="DropDownField form-control">
                <option selected="selected" value="(select)">Select</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
          </div>
        </div>
        <hr/>
        <div className="row px-5 pt-5">
          <div className="col-md-12 mb-2">
            <h6>Contact Information</h6>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>Phone Number</label>
              <input type="text" maxLength="200" className="form-control" placeholder="Enter your phone number"/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label id="" className="required-caption" htmlFor="">County/Region:</label>
              <select name="" id="" className="DropDownField form-control">
                <option selected="selected" value="(select)">Select</option>
                <option value="1">Alamance- Region 4</option>
                <option value="2">Alexander- Region 7</option>
                <option value="3">Anson- Region 6</option>
                <option value="4">Ashe - Region 7</option>
                <option value="5">Avery - Region 7</option>
                <option value="6">Beaufort - Region 2</option>
                <option value="7">Bertie - Region 1</option>
                <option value="8">Bladen - Region 3</option>
                <option value="9">Brunswick - Region 3</option>
                <option value="10">Buncombe - Region 9</option>
                <option value="11">Burke - Region 8</option>
                <option value="12">Cabarrus - Region 6</option>
                <option value="13">Caldwell - Region 7</option>
                <option value="14">Camden - Region 1</option>
                <option value="15">Carteret - Region 2</option>
                <option value="16">Caswell - Region 4</option>
                <option value="17">Catawba - Region 8</option>
                <option value="18">Chatham - Region 4</option>
                <option value="19">Cherokee - Region 10</option>
                <option value="20">Chowan - Region 1</option>
                <option value="21">Clay - Region 10</option>
                <option value="22">Cleveland - Region 8</option>
                <option value="23">Columbus - Region 3</option>
                <option value="24">Craven - Region 2</option>
                <option value="25">Cumberland - Region 3</option>
                <option value="26">Currituck - Region 1</option>
                <option value="27">Dare - Region 1</option>
                <option value="28">Davidson - Region 5</option>
                <option value="29">Davie - Region 8</option>
                <option value="30">Duplin - Region 3</option>
                <option value="31">Durham - Region 4</option>
                <option value="32">Edgecombe - Region 2</option>
                <option value="33">Forsyth - Region 5</option>
                <option value="34">Franklin - Region 4</option>
                <option value="35">Gaston - Region 8</option>
                <option value="36">Gates - Region 1</option>
                <option value="37">Graham - Region 10</option>
                <option value="38">Granville - Region 4</option>
                <option value="39">Greene - Region 2</option>
                <option value="40">Guilford - Region 5</option>
                <option value="41">Halifax - Region 2</option>
                <option value="42">Harnett - Region 4</option>
                <option value="43">Haywood - Region 9</option>
                <option value="44">Henderson - Region 9</option>
                <option value="45">Hertford - Region 1</option>
                <option value="46">Hoke - Region 3</option>
                <option value="47">Hyde - Region 1</option>
                <option value="48">Iredell - Region 8</option>
                <option value="49">Jackson - Region 10</option>
                <option value="50">Johnston - Region 4</option>
                <option value="51">Jones - Region 2</option>
                <option value="52">Lee - Region 4</option>
                <option value="53">Lenoir - Region 2</option>
                <option value="54">Lincolnton - Region 8</option>
                <option value="55">Macon - Region 10</option>
                <option value="56">Madison - Region 9</option>
                <option value="57">Martin - Region 2</option>
                <option value="58">McDowell - Region 8</option>
                <option value="59">Mecklenburg - Region 6</option>
                <option value="60">Mitchell - Region 9</option>
                <option value="61">Montgomery - Region 6</option>
                <option value="62">Moore - Region 4</option>
                <option value="63">Nash - Region 2</option>
                <option value="64">New Hanover - Region 3</option>
                <option value="65">Northhampton - Region 1</option>
                <option value="66">Onslow - Region 2</option>
                <option value="67">Orange - Region 4</option>
                <option value="68">Pamlico - Region 2</option>
                <option value="69">Pasqoutank - Region 1</option>
                <option value="70">Pender - Region 3</option>
                <option value="71">Perquimans - Region 1</option>
                <option value="72">Person - Region 4</option>
                <option value="73">Pitt - Region 2</option>
                <option value="74">Polk - Region 8</option>
                <option value="75">Randolph - Region 5</option>
                <option value="76">Richmond - Region 6</option>
                <option value="77">Robeson - Region 3</option>
                <option value="78">Rockingham - Region 5</option>
                <option value="79">Rowan - Region 5</option>
                <option value="80">Rutherford - Region 8</option>
                <option value="81">Sampson - Region 3</option>
                <option value="82">Scotland - Region 6</option>
                <option value="83">Stanly - Region 6</option>
                <option value="84">Stokes - Region 5</option>
                <option value="85">Surry - Region 7</option>
                <option value="86">Swain - Region 10</option>
                <option value="87">Transylvania - Region 9</option>
                <option value="88">Tyrrell - Region 1</option>
                <option value="89">Union - Region 6</option>
                <option value="90">Vance - Region 4</option>
                <option value="91">Wake - Region 4</option>
                <option value="92">Warren - Region 4</option>
                <option value="93">Washington - Region 1</option>
                <option value="94">Watauga - Region 7</option>
                <option value="95">Wayne - Region 2</option>
                <option value="96">Wilkes - Region 7</option>
                <option value="97">Wilmington - Region 3</option>
                <option value="98">Wilson - Region 2</option>
                <option value="99">Yadkin - Region 7</option>
                <option value="100">Yancey - Region 9</option>
                <option value="101">*Other - If you're from outside NC, Select 'Other'</option>
              </select>
            </div>
          </div>
        </div>
        <hr/>
        <div className="row px-5 pt-5">
          <div className="col-md-12 mb-2">
            <h6>Address</h6>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>Address</label>
              <input type="text" maxLength="200" className="form-control" placeholder="Address"/>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <input type="text" maxLength="200" className="form-control" placeholder="Apartment, suite, etc. (optional)"/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>City</label>
              <input type="text" maxLength="200" className="form-control" placeholder="City"/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label id="" className="required-caption" htmlFor="">State</label>
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
          <div className="col-md-4">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>ZIP Code</label>
              <input type="text" maxLength="200" className="form-control" placeholder="ZIP Code"/>
            </div>
          </div>
        </div>
        <hr/>
        <div className="row px-5 pt-5">
          <div className="col-md-12 mb-2">
            <h6>Login Details</h6>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>Username</label>
              <input type="text" maxLength="200" className="form-control" placeholder="Enter a username"/>
              <small className="form-text text-muted">Must be a valid email address.</small> </div>
          </div>
          <div className="col-md-6"> </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>Change Password</label>
              <input type="text" maxLength="200" className="form-control" placeholder=""/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="required-caption"><span className="required-field">*</span>Confirm Password</label>
              <input type="text" maxLength="200" className="form-control" placeholder=""/>
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
export default Tab1