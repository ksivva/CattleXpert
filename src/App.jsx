import { useState } from "react";
import "./App.css";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [selectedDairy, setSelectedDairy] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [cattleData, setCattleData] = useState({
    "Dairy Location 1": 3,
    "Dairy Location 2": 7,
    "Dairy Location 3": 4,
    "Dairy Location 4": 6,
    "Dairy Location 5": 3,
    "Dairy Location 6": 4,
    "Dairy Location 7": 7,
    "Dairy Location 8": 10,
  });

  const [animals, setAnimals] = useState({});

  const [selectedDate, setSelectedDate] = useState('14/04/2025');
  const [selectedDateBirth, setSelectedDateBirth] = useState('14/04/2025');
  const [selectedDateArrival, setSelectedDateArrival] = useState('14/04/2025');

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const formatted = date.toLocaleDateString('en-GB');
    console.log('handleDateChange', formatted)
    setSelectedDate(formatted);
  };

  const handleDateChangeBirth = (e) => {
    const date = new Date(e.target.value);
    const formatted = date.toLocaleDateString('en-GB');
    console.log('handleDateChangeBirth', formatted)
    setSelectedDateBirth(formatted);
  };

  const handleDateChangeArrival = (e) => {
    const date = new Date(e.target.value);
    const formatted = date.toLocaleDateString('en-GB');
    console.log('handleDateChangeArrival', formatted)
    setSelectedDateArrival(formatted);
  };

  const openPicker = () => {
    document.getElementById('date-input')?.showPicker();
  };

  const openPickerBirth = () => {
    document.getElementById('date-input-birth')?.showPicker();
  };

  const openPickerArrival = () => {
    document.getElementById('date-input-arrival')?.showPicker();
  };



  const addAnimal = (animalData) => {
    setAnimals({
      ...animals,
      [selectedDairy]: [...(animals[selectedDairy] || []), animalData],
    });
    setCattleData({
      ...cattleData,
      [selectedDairy]: cattleData[selectedDairy] + 1,
    });
  };

  const getTotalHead = () => {
    return Object.values(animals).reduce((a, b) => a + b.length, 0);
  };

  const screens = {
    details: (
      <div className="screen">
        <div class="header">
          <img src="assets/cx.svg" alt="CX Logo" />
          <img src="assets/arrivalexpert.svg" alt="Arrival Expert" />
          <img src="assets/simplot.svg" alt="Simplot" />
        </div>

        <div class="back-row">
          <div onClick={() => {
            setSelectedAnimal(null);
            setCurrentScreen("pickup");
          }} class="back-icon"><img src="assets/back.svg" class="back-icon" alt="Back" /></div>
          <span>Animal Details</span>
          <span></span>
        </div>

        <div class="table two-column">
          <div
            class="table-row">
            <span class='title'>EID</span>
            <span class='value'>{selectedAnimal?.id}</span>
          </div>

          <div
            class="table-row">
            <span class='title'>Visual Tag</span>
            <span class='value'>{selectedAnimal?.visualTag}</span>
          </div>

          <div
            class="table-row">
            <span class='title'>Gender</span>
            <span class='value'>{selectedAnimal?.gender}</span>
          </div>

          <div
            class="table-row">
            <span class='title'>Dam Breed</span>
            <span class='value'>{selectedAnimal?.damBreed}</span>
          </div>

          <div
            class="table-row">
            <span class='title'>Sire Breed</span>
            <span class='value'>{selectedAnimal?.sireBreed}</span>
          </div>

          <div
            class="table-row">
            <span class='title'>Weight</span>
            <span class='value'>{selectedAnimal?.weight} lbs</span>
          </div>

          <div
            class="table-row">
            <span class='title'>Date of Birth</span>
            <span class='value'>{selectedAnimal?.dateOfBirth}</span>
          </div>

          <div
            class="table-row">
            <span class='title'>Arrival Date</span>
            <span class='value'>{selectedAnimal?.arrivalDate}</span>
          </div>

          <div
            class="table-row">
            <span class='title'>Health Status</span>
            <span class='value'>{selectedAnimal?.healthStatus}</span>
          </div>

          <div
            class="table-row">
            <span class='title'>Colostrum</span>
            <span class='value'>{selectedAnimal?.colostrum ? "Yes" : "No"}</span>
          </div>
        </div>
      </div>
    ),
    home: (
      <div className="screen">

        <div class="header">
          <img src="assets/cx.svg" alt="CX Logo" />
          <img src="assets/arrivalexpert.svg" alt="Arrival Expert" />
          <img src="assets/simplot.svg" alt="Simplot" />
        </div>


        <div class="pickup-card">
          <div class="pickup-card-header">
            <span>Today's Pickups</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>

          {Object.entries(cattleData).map(([dairy], index) => (
            <div
              key={index} class="pickup-row"
              onClick={() => {
                setSelectedDairy(dairy);
                setCurrentScreen("pickup");
              }}
            >
              <span>Dairy Location {index + 1}</span>
              <span>{(animals[dairy] || []).length}</span>
            </div>
          ))}

        </div>

        <div class="nav-buttons">
          <div class="nav-button settings">Settings</div>
          <div class="nav-button pickup">
            <img src="assets/truck.svg" class="pickup-icon" alt="Pickup Icon" />
            Pickup
          </div>
          <div class="nav-button reports">Reports</div>
        </div>

        {/* <div className="dairy-list">

          <div className="dairy-row total">
            <span>Total Head</span>
            <span>{getTotalHead()}</span>
          </div>
        </div> */}
        {/* <button className="pickup-btn">Pickup</button> */}
      </div>
    ),
    pickup: (
      <div className="screen">
        <div class="header">
          <img src="assets/cx.svg" alt="CX Logo" />
          <img src="assets/arrivalexpert.svg" alt="Arrival Expert" />
          <img src="assets/simplot.svg" alt="Simplot" />
        </div>

        <div class="back-row">
          <div onClick={() => setCurrentScreen("home")} class="back-icon"><img src="assets/back.svg" class="back-icon" alt="Back" /></div>
          <span>Dairy Location 1</span>
          <span></span>
        </div>

        <div className="date-picker" onClick={openPicker}>
          <span>{selectedDate}</span>
          <img src="assets/calendar.svg" alt="Calendar Icon" />
          <input
            type="date"
            id="date-input"
            onChange={handleDateChange}
          />
        </div>


        <div class="table">
          <div class="table-header">
            <span>Sr No</span>
            <span>Visual Tag</span>
            <span>Weight</span>
            <span></span>
          </div>

          {(animals[selectedDairy] || []).length > 0 ? (animals[selectedDairy] || []).map((animal, index) =>
            <div
              key={index}
              class="table-row"
              onClick={() => {
                setSelectedAnimal(animal);
                setCurrentScreen("details");
              }}>
              <span>{index + 1}</span>
              <span>{animal?.hide ? '-----' : animal?.visualTag}</span>
              <span>{animal?.hide ? '-----' : animal?.weight}</span>
              <span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setAnimals((prev) => ({
                      ...prev,
                      [selectedDairy]: prev[selectedDairy].map((a, i) =>
                        i === index ? { ...a, hide: !a.hide } : a
                      ),
                    }));
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                  }}
                >
                  <img src="assets/eye.svg" className="eye-icon" alt="View" />
                </button>
              </span>
            </div>
          ) :
            <div
              class="table-row">
              <span>-----</span>
              <span>-----</span>
              <span>-----</span>
              <span><img src="assets/eye.svg" class="eye-icon" alt="View" /></span>
            </div>
          }

          <div class="table-footer">
            <span>Total Head</span>
            <span>{(animals[selectedDairy] || []).length}</span>
          </div>
        </div>

        <div class="btn-primary" onClick={() => setCurrentScreen("add")}>Add Animal</div>
      </div>
    ),
    add: (
      <div className="screen">

        <div class="header">
          <img src="assets/cx.svg" alt="CX Logo" />
          <img src="assets/arrivalexpert.svg" alt="Arrival Expert" />
          <img src="assets/simplot.svg" alt="Simplot" />
        </div>

        <div class="back-row">
          <div onClick={() => setCurrentScreen("home")} class="back-icon"><img src="assets/back.svg" class="back-icon" alt="Back" /></div>
          <span>Animal Info</span>
          <span></span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            addAnimal({
              id: formData.get("eid"),
              visualTag: formData.get("visualTag"),
              gender: formData.get("gender"),
              damBreed: formData.get("damBreed"),
              sireBreed: formData.get("sireBreed"),
              weight: formData.get("weight"),
              dateOfBirth: selectedDateBirth,
              arrivalDate: selectedDateArrival,
              healthStatus: formData.get("healthStatus"),
              colostrum: formData.get("colostrum") === "true",
              hide: false
            });
            setCurrentScreen("pickup");
          }}>

          <div class="form-group input-row">
            <input name="eid" type="text" placeholder="Animal EID" />
            <button type="button" class="scan-btn">Scan</button>
          </div>

          <div class="form-group input-row">
            <input name="visualTag" type="text" placeholder="Visual Tag" />
          </div>

          <div class="form-group input-row">
            <select name="gender">
              <option value="">Gender</option>
              <option value="Bull">Bull</option>
              <option value="Heifer">Heifer</option>
            </select>
          </div>

          <div class="form-group input-row">
            <select name="damBreed">
              <option value="">Dam Breed</option>
              <option value="Angus">Angus</option>
              <option value="Hereford">Hereford</option>
              <option value="Holstein-Friesian">Holstein-Friesian</option>
              <option value="Charolais">Charolais</option>
              <option value="Brahman">Brahman</option>
            </select>
          </div>

          <div class="form-group input-row">
            <select name="sireBreed">
              <option value="">Sire Breed</option>
              <option value="Angus">Angus</option>
              <option value="Hereford">Hereford</option>
              <option value="Holstein-Friesian">Holstein-Friesian</option>
              <option value="Charolais">Charolais</option>
              <option value="Brahman">Brahman</option>
            </select>
          </div>

          <div class="form-group input-row">
            <input name="weight" type="text" placeholder="Weight (lbs)" />
          </div>

          <div className="form-group date-picker" onClick={openPickerBirth}>
            <span>{selectedDateBirth}</span>
            <img src="assets/calendar.svg" alt="Calendar Icon" />
            <input
              type="date"
              id="date-input-birth"
              name="dateOfBirth"
              onChange={handleDateChangeBirth}
            />
          </div>

          <div className="form-group date-picker" onClick={openPickerArrival}>
            <span>{selectedDateArrival}</span>
            <img src="assets/calendar.svg" alt="Calendar Icon" />
            <input
              type="date"
              id="date-input-arrival"
              name="arrivalDate"
              onChange={handleDateChangeArrival}
            />
          </div>

          <div class="form-group input-row">
            <select name="healthStatus">
              <option value="">Health Status</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Poor">Poor</option>
            </select>
          </div>

          <div class="form-group input-row">
            <select name="colostrum">
              <option value="">Colostrum?</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div class="form-group input-row">
            <input name="serum" type="text" placeholder="Serum" />
            <button type="submit" class="scan-btn">Scan</button>
          </div>

          <button type="submit" class="save-btn">Save</button>
        </form>
      </div>
    ),
  };

  return <main>{screens[currentScreen]}</main>;
}
