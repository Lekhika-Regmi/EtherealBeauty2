import React, { useState, useEffect } from "react";
import "./AqiPage.css";
import pollution from "../../assets/pollution.jpg";
const AqiPage = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
  const [aqiData, setAqiData] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = "c9480d5f-d68a-4b55-b116-fec97480b7cd"; // Replace with your API Key

  useEffect(() => {
    const fetchAqi = async () => {
      try {
        const response = await fetch(`https://api.airvisual.com/v2/nearest_city?key=${apiKey}`);
        const data = await response.json();

        if (data.status === "success") {
          setAqiData(data.data);
        } else {
          setError("Failed to fetch AQI data.");
        }
      } catch (err) {
        setError("Error fetching AQI data.");
      }
    };

    fetchAqi();
  }, []);

  return (
    <div className="section__container">
      <h1 className="section__header">Air Quality Index (AQI) & Skin Health</h1>

      {error ? (
        <p className="error-text">{error}</p>
      ) : aqiData ? (
        <div className="aqi-card-aqi">
          <h2>{aqiData.city}, {aqiData.country}</h2>
          <p><strong>AQI:</strong> {aqiData.current.pollution.aqius}</p>
          <p><strong>Temperature:</strong> {aqiData.current.weather.tp}°C</p>
          <p><strong>Humidity:</strong> {aqiData.current.weather.hu}%</p>
          <p><strong>Wind Speed:</strong> {aqiData.current.weather.ws} m/s</p>
        </div>
      ) : (
        <p className="loading-text-aqi">Loading AQI data...</p>
      )}
<div className="img-aqi">
  <img src= {pollution} alt="skinpollution" className="small-image" />
</div>
      <div className="skin-health-section-aqi">
    
        <h3>Protecting Your Skin from Air Pollution</h3>
        <ul className="styled-list-aqi">
          <li>Check AQI levels before heading outside.</li>
          <li>Use protective clothing to cover skin.</li>
          <li>Maintain a proper skincare routine with antioxidants and sunscreen.</li>
          <li>Install HEPA filter air purifiers indoors.</li>
        </ul>

        <h3>Air Quality Index (AQI) Table</h3>
        <table className="styled-table-aqi">
          <thead>
            <tr>
              <th>AQI Level</th>
              <th>Air Quality</th>
              <th>Health Impact</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0-50</td>
              <td>Good</td>
              <td>Minimal or no health risk.</td>
            </tr>
            <tr>
              <td>51-100</td>
              <td>Moderate</td>
              <td>Acceptable air quality, but sensitive individuals may experience minor issues.</td>
            </tr>
            <tr>
              <td>101-150</td>
              <td>Unhealthy for Sensitive Groups</td>
              <td>Older adults, children, and individuals with respiratory issues may experience discomfort.</td>
            </tr>
            <tr>
              <td>151-200</td>
              <td>Unhealthy</td>
              <td>Increased risk of adverse health effects for the general population.</td>
            </tr>
            <tr>
              <td>201-300</td>
              <td>Very Unhealthy</td>
              <td>Health warnings issued; everyone may experience serious effects.</td>
            </tr>
            <tr>
              <td>301+</td>
              <td>Hazardous</td>
              <td>Emergency conditions; entire population at risk.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AqiPage;
