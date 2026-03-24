import React from "react";

function CityList({ state, countryId, deleteCity }) {
  return (
    <section className="nested-section nested-section-compact">
      <div className="section-header section-header-compact">
        <h5>Cities</h5>
      </div>

      {state.cities.length === 0 ? (
        <p className="empty-state">No cities added for this state.</p>
      ) : (
        <ul className="city-list">
          {state.cities.map((city, index) => (
            <li key={`${state.id}-${city}-${index}`} className="city-item">
              <span>{city}</span>

              <button
                className="danger-btn button-small"
                onClick={() => deleteCity(countryId, state.id, index)}
                type="button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default CityList;
