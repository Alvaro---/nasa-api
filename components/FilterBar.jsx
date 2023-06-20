"use client"
import { MyContext } from '@/context/Context';
import React, { useContext, useState, useEffect } from 'react';
import style from './filter.module.css'

const FilterBar = () => {
  const { applyFilters } = useContext(MyContext);

  const [rover, setRover] = useState('');
  const [camera, setCamera] = useState('');
  const [earthDay, setEarthDay] = useState('');
  const [sunDay, setSunDay] = useState('');
  const [savedConfigs, setSavedConfigs] = useState([]);

  useEffect(() => {
    const filters = {
      rover,
      camera,
      earthDay,
      sunDay
    };
    applyFilters(filters);
  }, [rover, camera, earthDay, sunDay]);

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
    setEarthDay(event.target.value);
  };

  const handleSunDayChange = (event) => {
    setSunDay(event.target.value);
  };

  const handleSaveConfig = () => {
    const config = {
      rover,
      camera,
      earthDay,
      sunDay,
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
    setEarthDay(selectedConfig.earthDay);
    setSunDay(selectedConfig.sunDay);
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
          <label>
            Camera:
          </label>
          <input type="text" value={camera} onChange={handleCameraChange} />
        </div>
        <div className={style.field}>
          <label>
            Earth Day:
          </label>
          <input type="date" value={earthDay} onChange={handleEarthDayChange} />
        </div>
        <div className={style.field}>
          <label>
            Sun Day:
          </label>
          <input type="number" value={sunDay} onChange={handleSunDayChange} />
        </div>
      </div>

      <div className="row">
        <button onClick={handleSaveConfig}>Save Filter</button>
      </div>
    </div>
  );
};


export default FilterBar
