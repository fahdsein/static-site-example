import { StrictMode, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const cities = [
  ["Jakarta", "Asia", "Asia/Jakarta"],
  ["Singapore", "Asia", "Asia/Singapore"],
  ["Tokyo", "Asia", "Asia/Tokyo"],
  ["Dubai", "Middle East", "Asia/Dubai"],
  ["London", "Europe", "Europe/London"],
  ["Paris", "Europe", "Europe/Paris"],
  ["New York", "Americas", "America/New_York"],
  ["San Francisco", "Americas", "America/Los_Angeles"],
  ["Sydney", "Oceania", "Australia/Sydney"],
];

function App() {
  const [now, setNow] = useState(() => new Date());
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");
  const [light, setLight] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  const regions = useMemo(() => [...new Set(cities.map(([, area]) => area))], []);
  const visibleCities = cities.filter(
    ([name, area]) =>
      name.toLowerCase().includes(query.toLowerCase()) && (!region || area === region),
  );
  const cityRows = visibleCities.map(([name, area, zone]) => {
    const hour = Number(
      new Intl.DateTimeFormat("en-GB", {
        timeZone: zone,
        hour: "2-digit",
        hour12: false,
      }).format(now),
    );
    return { name, area, zone, isOpen: hour >= 9 && hour < 17 };
  });
  const openCount = cityRows.filter(({ isOpen }) => isOpen).length;

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  };

  return (
    <>
      <header>
        <div>
          <p>NEO STATIC WEBSITE FIXTURE</p>
          <h1>Global Chrono</h1>
          <span>Deterministic, API-free deployment test</span>
        </div>
        <div className="actions">
          <button type="button" onClick={() => setLight((value) => !value)}>Theme</button>
          <button type="button" onClick={toggleFullscreen}>Fullscreen</button>
        </div>
      </header>

      <main>
        <section className="summary">
          <article><small>Cities</small><strong>{cities.length}</strong></article>
          <article><small>Business open</small><strong>{openCount}</strong></article>
          <article><small>Updated</small><strong>{now.toLocaleTimeString()}</strong></article>
        </section>

        <section className="toolbar">
          <input
            type="search"
            placeholder="Search a city"
            aria-label="Search a city"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select aria-label="Filter by region" value={region} onChange={(event) => setRegion(event.target.value)}>
            <option value="">All regions</option>
            {regions.map((area) => <option key={area} value={area}>{area}</option>)}
          </select>
        </section>

        <section className="grid" aria-live="polite">
          {cityRows.map(({ name, area, zone, isOpen }) => (
            <article className="city" key={name}>
              <h2>{name}</h2>
              <small>{area}</small>
              <div className="clock">
                {new Intl.DateTimeFormat("en-GB", {
                  timeZone: zone,
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }).format(now)}
              </div>
              <div className={`status ${isOpen ? "open" : "closed"}`}>
                {isOpen ? "BUSINESS OPEN" : "BUSINESS CLOSED"}
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer>React + Vite static site · no secrets · no external API</footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
