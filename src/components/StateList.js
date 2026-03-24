import React from "react";
import CityList from "./CityList";

function StateList({
  country,
  addState,
  editState,
  deleteState,
  addCity,
  deleteCity
}) {
  return (
    <section className="nested-section">
      <div className="section-header">
        <h3>States</h3>
        <button
          className="primary-btn primary-btn-light"
          onClick={() => addState(country.id)}
          type="button"
        >
          Add State
        </button>
      </div>

      {country.states.length === 0 ? (
        <p className="empty-state">No states added for this country.</p>
      ) : (
        country.states.map(state => (
          <article key={state.id} className="state-card">
            <div className="entity-header entity-header-compact">
              <div>
                <p className="entity-label">State</p>
                <h4 className="entity-title entity-title-small">{state.name}</h4>
              </div>

              <div className="action-group">
                <button
                  className="secondary-btn"
                  onClick={() => editState(country.id, state.id)}
                  type="button"
                >
                  Edit
                </button>

                <button
                  className="danger-btn"
                  onClick={() => deleteState(country.id, state.id)}
                  type="button"
                >
                  Delete
                </button>

                <button
                  className="primary-btn primary-btn-light"
                  onClick={() => addCity(country.id, state.id)}
                  type="button"
                >
                  Add City
                </button>
              </div>
            </div>

            <CityList
              state={state}
              countryId={country.id}
              deleteCity={deleteCity}
            />
          </article>
        ))
      )}
    </section>
  );
}

export default StateList;
