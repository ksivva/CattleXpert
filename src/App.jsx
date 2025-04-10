import { useState } from 'react'
import './App.css'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home')
  const [selectedDairy, setSelectedDairy] = useState(null)
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  const [cattleData, setCattleData] = useState({
    'Dairy Location 1': 3,
    'Dairy Location 2': 7,
    'Dairy Location 3': 4,
    'Dairy Location 4': 6,
    'Dairy Location 5': 3,
    'Dairy Location 6': 4,
    'Dairy Location 7': 7,
    'Dairy Location 8': 10,
  })

  const [animals, setAnimals] = useState({})

  const addAnimal = (animalData) => {
    setAnimals({
      ...animals,
      [selectedDairy]: [...(animals[selectedDairy] || []), animalData]
    })
    setCattleData({
      ...cattleData,
      [selectedDairy]: cattleData[selectedDairy] + 1
    })
  }

  const getTotalHead = () => {
    return Object.values(animals).reduce((a, b) => a + b.length, 0)
  }

  const screens = {
    details: (
      <div className="screen">
        <img src="/new-logo.jpeg" alt="Logo" className="logo" />
        <h2>Animal Details</h2>
        <div className="details-container">
          <div className="detail-row">
            <span>EID</span>
            <span>{selectedAnimal?.id}</span>
          </div>
          <div className="detail-row">
            <span>Visual Tag</span>
            <span>{selectedAnimal?.visualTag}</span>
          </div>
          <div className="detail-row">
            <span>Gender</span>
            <span>{selectedAnimal?.gender}</span>
          </div>
          <div className="detail-row">
            <span>Dam Breed</span>
            <span>{selectedAnimal?.damBreed}</span>
          </div>
          <div className="detail-row">
            <span>Sire Breed</span>
            <span>{selectedAnimal?.sireBreed}</span>
          </div>
          <div className="detail-row">
            <span>Weight</span>
            <span>{selectedAnimal?.weight} lbs</span>
          </div>
          <div className="detail-row">
            <span>Date of Birth</span>
            <span>{selectedAnimal?.dateOfBirth}</span>
          </div>
          <div className="detail-row">
            <span>Arrival Date</span>
            <span>{selectedAnimal?.arrivalDate}</span>
          </div>
          <div className="detail-row">
            <span>Health Status</span>
            <span>{selectedAnimal?.healthStatus}</span>
          </div>
          <div className="detail-row">
            <span>Colostrum</span>
            <span>{selectedAnimal?.colostrum ? 'Yes' : 'No'}</span>
          </div>
        </div>
        <button onClick={() => {
          setSelectedAnimal(null);
          setCurrentScreen('pickup');
        }}>Back</button>
      </div>
    ),
    home: (
      <div className="screen">
        <img src="/new-logo.jpeg" alt="Logo" className="logo" />
        <div className="header">
          <h2>Today's Pickups</h2>
          <span className="date">{new Date().toLocaleDateString()}</span>
        </div>
        <div className="dairy-list">
          {Object.entries(cattleData).map(([dairy]) => (
            <div key={dairy} className="dairy-row" onClick={() => {
              setSelectedDairy(dairy)
              setCurrentScreen('pickup')
            }}>
              <span>{dairy}</span>
              <span>{(animals[dairy] || []).length}</span>
            </div>
          ))}
          <div className="dairy-row total">
            <span>Total Head</span>
            <span>{getTotalHead()}</span>
          </div>
        </div>
        <button className="pickup-btn">Pickup</button>
      </div>
    ),
    pickup: (
      <div className="screen">
        <img src="/new-logo.jpeg" alt="Logo" className="logo" />
        <input 
          type="date"
          defaultValue={new Date().toISOString().split('T')[0]}
          className="date-picker"
        />
        <select value={selectedDairy || ''}>
          <option>{selectedDairy}</option>
        </select>
        <div className="animals-list">
          {(animals[selectedDairy] || []).map((animal, index) => (
            <div key={index} className="animal-row" onClick={() => {
              setSelectedAnimal(animal);
              setCurrentScreen('details');
            }}>
              <span>{index + 1}</span>
              <span>{animal.id}</span>
            </div>
          ))}
          <div className="total-row">
            <span>Total Head</span>
            <span>{(animals[selectedDairy] || []).length}</span>
          </div>
          </div>
        <div className="button-group">
          <button onClick={() => setCurrentScreen('home')}>Back</button>
          <button onClick={() => setCurrentScreen('add')}>Add Animal</button>
        </div>
      </div>
    ),
    add: (
      <div className="screen">
        <form onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target)
          addAnimal({
            id: formData.get('eid'),
            visualTag: formData.get('visualTag'),
            gender: formData.get('gender'),
            damBreed: formData.get('damBreed'),
            sireBreed: formData.get('sireBreed'),
            weight: formData.get('weight'),
            dateOfBirth: formData.get('dateOfBirth'),
            arrivalDate: formData.get('arrivalDate'),
            healthStatus: formData.get('healthStatus'),
            colostrum: formData.get('colostrum') === 'true'
          })
          setCurrentScreen('pickup')
        }}>
          <img src="/new-logo.jpeg" alt="Logo" className="logo" />
          <h2>Animal Info</h2>
          <div className="form-group">
            <input name="eid" placeholder="Animal EID" />
            <button type="button">EID</button>
          </div>
          <input name="visualTag" placeholder="Visual Tag" />
          <select name="gender">
            <option>Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <select name="damBreed">
            <option value="">Dam Breed</option>
            <option value="Angus">Angus</option>
            <option value="Hereford">Hereford</option>
            <option value="Holstein-Friesian">Holstein-Friesian</option>
            <option value="Charolais">Charolais</option>
            <option value="Brahman">Brahman</option>
          </select>
          <select name="sireBreed">
            <option value="">Sire Breed</option>
            <option value="Angus">Angus</option>
            <option value="Hereford">Hereford</option>
            <option value="Holstein-Friesian">Holstein-Friesian</option>
            <option value="Charolais">Charolais</option>
            <option value="Brahman">Brahman</option>
          </select>
          <input 
            type="number" 
            name="weight" 
            placeholder="Weight (lbs)"
          />
          <div className="date-field">
            <label>Date of Birth</label>
            <input 
              type="date" 
              name="dateOfBirth"
            />
          </div>
          <div className="date-field">
            <label>Arrival Date</label>
            <input 
              type="date" 
              name="arrivalDate"
              defaultValue={new Date().toISOString().split('T')[0]}
            />
          </div>
          <select name="healthStatus">
            <option value="">Health Status</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Poor">Poor</option>
          </select>
          <select name="colostrum">
            <option value="">Colostrum?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <div className="nav-buttons">
            <button type="button" onClick={() => setCurrentScreen('pickup')}>Back</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    )
  }

  return <main>{screens[currentScreen]}</main>
}