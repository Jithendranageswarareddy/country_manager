import React, { useState } from "react";
import CountryList from "./components/CountryList";

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const getPromptValue = (message, defaultValue = "") => {
  const value = window.prompt(message, defaultValue);

  if (value === null) {
    return null;
  }

  const trimmedValue = value.trim();
  return trimmedValue === "" ? null : trimmedValue;
};

function App() {
  const [countries, setCountries] = useState([]);

  const addCountry = () => {
    const name = getPromptValue("Enter country name");
    if (!name) return;

    setCountries(prevCountries => [
      ...prevCountries,
      { id: createId(), name, states: [] }
    ]);
  };

  const editCountry = id => {
    const country = countries.find(currentCountry => currentCountry.id === id);
    if (!country) return;

    const name = getPromptValue("Enter new country name", country.name);
    if (!name) return;

    if (window.confirm(`Update country "${country.name}" to "${name}"?`)) {
      setCountries(prevCountries =>
        prevCountries.map(countryItem =>
          countryItem.id === id ? { ...countryItem, name } : countryItem
        )
      );
    }
  };

  const deleteCountry = id => {
    const country = countries.find(currentCountry => currentCountry.id === id);
    if (!country) return;

    if (
      window.confirm(
        `Delete country "${country.name}" and all nested states and cities?`
      )
    ) {
      setCountries(prevCountries =>
        prevCountries.filter(countryItem => countryItem.id !== id)
      );
    }
  };

  const addState = countryId => {
    const country = countries.find(currentCountry => currentCountry.id === countryId);
    if (!country) return;

    const name = getPromptValue(`Enter state name for ${country.name}`);
    if (!name) return;

    setCountries(prevCountries =>
      prevCountries.map(countryItem =>
        countryItem.id === countryId
          ? {
              ...countryItem,
              states: [
                ...countryItem.states,
                { id: createId(), name, cities: [] }
              ]
            }
          : countryItem
      )
    );
  };

  const editState = (countryId, stateId) => {
    const country = countries.find(currentCountry => currentCountry.id === countryId);
    const state = country?.states.find(currentState => currentState.id === stateId);
    if (!state) return;

    const name = getPromptValue("Enter new state name", state.name);
    if (!name) return;

    if (window.confirm(`Update state "${state.name}" to "${name}"?`)) {
      setCountries(prevCountries =>
        prevCountries.map(countryItem =>
          countryItem.id === countryId
            ? {
                ...countryItem,
                states: countryItem.states.map(stateItem =>
                  stateItem.id === stateId ? { ...stateItem, name } : stateItem
                )
              }
            : countryItem
        )
      );
    }
  };

  const deleteState = (countryId, stateId) => {
    const country = countries.find(currentCountry => currentCountry.id === countryId);
    const state = country?.states.find(currentState => currentState.id === stateId);
    if (!state) return;

    if (window.confirm(`Delete state "${state.name}" and all its cities?`)) {
      setCountries(prevCountries =>
        prevCountries.map(countryItem =>
          countryItem.id === countryId
            ? {
                ...countryItem,
                states: countryItem.states.filter(
                  stateItem => stateItem.id !== stateId
                )
              }
            : countryItem
        )
      );
    }
  };

  const addCity = (countryId, stateId) => {
    const country = countries.find(currentCountry => currentCountry.id === countryId);
    const state = country?.states.find(currentState => currentState.id === stateId);
    if (!state) return;

    const name = getPromptValue(`Enter city name for ${state.name}`);
    if (!name) return;

    setCountries(prevCountries =>
      prevCountries.map(countryItem =>
        countryItem.id === countryId
          ? {
              ...countryItem,
              states: countryItem.states.map(stateItem =>
                stateItem.id === stateId
                  ? { ...stateItem, cities: [...stateItem.cities, name] }
                  : stateItem
              )
            }
          : countryItem
      )
    );
  };

  const deleteCity = (countryId, stateId, index) => {
    const country = countries.find(currentCountry => currentCountry.id === countryId);
    const state = country?.states.find(currentState => currentState.id === stateId);
    const city = state?.cities[index];
    if (!city) return;

    if (window.confirm(`Delete city "${city}"?`)) {
      setCountries(prevCountries =>
        prevCountries.map(countryItem =>
          countryItem.id === countryId
            ? {
                ...countryItem,
                states: countryItem.states.map(stateItem =>
                  stateItem.id === stateId
                    ? {
                        ...stateItem,
                        cities: stateItem.cities.filter(
                          (_, cityIndex) => cityIndex !== index
                        )
                      }
                    : stateItem
                )
              }
            : countryItem
        )
      );
    }
  };

  return (
    <main className="app-shell">
      <section className="app-card">
        <div className="page-header">
          <div>
            <p className="eyebrow">React JS Assignment</p>
            <h1>Country, State and City Management</h1>
            <p className="page-copy">
              Manage nested location data with prompt-based CRUD actions and
              confirmation dialogs.
            </p>
          </div>

          <button className="primary-btn" onClick={addCountry} type="button">
            Add Country
          </button>
        </div>

        <CountryList
          countries={countries}
          editCountry={editCountry}
          deleteCountry={deleteCountry}
          addState={addState}
          editState={editState}
          deleteState={deleteState}
          addCity={addCity}
          deleteCity={deleteCity}
        />
      </section>
    </main>
  );
}

export default App;
