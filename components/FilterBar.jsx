"use client"
import { MyContext } from '@/context/Context';
import React, { useContext, useState, useEffect } from 'react';
import style from './filter.module.css'

const FilterBar = () => {
  const { applyFilters } = useContext(MyContext);

  const [rover, setRover] = useState('curiosity');
  const [camera, setCamera] = useState('');
  const [earthDate, setEarthDate] = useState('');
  const [sunDate, setSunDate] = useState('');
  const [savedConfigs, setSavedConfigs] = useState([]);

  useEffect(() => {
    const filters = {
      rover,
      camera,
      earthDate,
      sunDate
    };
    applyFilters(filters);
  }, [rover, camera, earthDate, sunDate]);

  useEffect(() => {
    const storedConfigs = JSON.parse(localStorage.getItem('filterConfigs')) || [];
    setSavedConfigs(storedConfigs);
  }, []);

  const handleRoverChange = (event) => {
    setRover(event.target.value);
  };

  const handleCameraChange = (event) => {
    setCamera(event.target.value);
  };

  const handleEarthDayChange = (event) => {
    setEarthDate(event.target.value);
  };

  const handleSunDayChange = (event) => {
    setSunDate(event.target.value);
  };

  const handleClearFilter = () => {
    setCamera('')
    setRover('curiosity')
    setEarthDate('')
    setSunDate('')
  }

  const handleSaveConfig = () => {
    const config = {
      rover,
      camera,
      earthDay: earthDate,
      sunDay: sunDate,
    };

    let savedConfigs = JSON.parse(localStorage.getItem('filterConfigs')) || [];
    savedConfigs.push(config);

    localStorage.setItem('filterConfigs', JSON.stringify(savedConfigs));
    setSavedConfigs(savedConfigs);
    alert('Configuration saved!');
  };


  const handleLoadConfig = (event) => {
    const selectedConfig = JSON.parse(event.target.value);
    setRover(selectedConfig.rover);
    setCamera(selectedConfig.camera);
    setEarthDate(selectedConfig.earthDay);
    setSunDate(selectedConfig.sunDay);
  };

  return (
    <div className={style.container}>
      <div className="row">
        <label>
          Select Saved Configuration:
          <select value="" onChange={handleLoadConfig}>
            <option value="">Select a configuration</option>
            {savedConfigs.map((config, index) => (
              <option key={index} value={JSON.stringify(config)}>
                Configuration {index + 1}
              </option>
            ))}
          </select>
        </label>
      </div>

      <h3>Search</h3>
      <div className={style.row}>
        <label>
          <input type="radio" name="rover" value="curiosity" checked={rover === 'curiosity'} onChange={handleRoverChange} />
          Curiosity
        </label>
        <label>
          <input type="radio" name="rover" value="opportunity" checked={rover === 'opportunity'} onChange={handleRoverChange} />
          Opportunity
        </label>
        <label>
          <input type="radio" name="rover" value="spirit" checked={rover === 'spirit'} onChange={handleRoverChange} />
          Spirit
        </label>
      </div>
      <div className={style.row}>
        <div className={style.field}>
          <label htmlFor="camera">Camera:</label>
          <select id="camera" value={camera} onChange={handleCameraChange}>
            <option value="">Select a camera</option>
            <option value="FHAZ">Front Hazard Avoidance Camera</option>
            <option value="RHAZ">Rear Hazard Avoidance Camera</option>
            <option value="MAST">Mast Camera</option>
            <option value="CHEMCAM">Chemistry and Camera Complex</option>
            <option value="MAHLI">Mars Hand Lens Imager</option>
            <option value="MARDI">Mars Descent Imager</option>
            <option value="NAVCAM">Navigation Camera</option>
            <option value="PANCAM">Panoramic Camera</option>
            <option value="MINITES">Miniature Thermal Emission Spectrometer (Mini-TES)</option>
          </select>
        </div>
        <div className={style.field}>
          <label>
            Earth Day:
          </label>
          <input type="date" value={earthDate} onChange={handleEarthDayChange} />
        </div>
        <div className={style.field}>
          <label>
            Sun Day:
          </label>
          <input type="number" value={sunDate} onChange={handleSunDayChange} />
        </div>
      </div>

      <div className="row">
        <button onClick={handleSaveConfig}>Save Filter</button>
        <button onClick={handleClearFilter}>Clear Filter</button>
      </div>
    </div>
  );
};


export default FilterBar
