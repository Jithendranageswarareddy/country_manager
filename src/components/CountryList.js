import React from "react";
import StateList from "./StateList";

function CountryList({
  countries,
  editCountry,
  deleteCountry,
  addState,
  editState,
  deleteState,
  addCity,
  deleteCity
}) {
  return (
    <section className="country-list">
      {countries.length === 0 ? (
        <p className="empty-state">No countries added yet.</p>
      ) : (
        countries.map(country => (
          <article key={country.id} className="country-card">
            <div className="entity-header">
              <div>
                <p className="entity-label">Country</p>
                <h2 className="entity-title">{country.name}</h2>
              </div>

              <div className="action-group">
                <button
                  className="secondary-btn"
                  onClick={() => editCountry(country.id)}
                  type="button"
                >
                  Edit
                </button>

                <button
                  className="danger-btn"
                  onClick={() => deleteCountry(country.id)}
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>

            <StateList
              country={country}
              addState={addState}
              editState={editState}
              deleteState={deleteState}
              addCity={addCity}
              deleteCity={deleteCity}
            />
          </article>
        ))
      )}
    </section>
  );
}

export default CountryList;
