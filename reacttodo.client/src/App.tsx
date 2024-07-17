import React from 'react';
import './App.css';
import { api } from './app/api/api-generated';

function App() {
  const { data, isLoading } = api.useWeatherForecastGetQuery();

  const contents = isLoading
    ? (
      <p>
        <em>
          Loading... Please refresh once the ASP.NET backend has started. See
          <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a>
          {' '}
          for more details.
        </em>
      </p>
    )
    : (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((forecast) => (
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

  return (
    <div>
      <h1 id="tableLabel">Weather forecast</h1>
      <p>This component demonstrates fetching data from the server.</p>
      {contents}
    </div>
  );
}

export default App;
