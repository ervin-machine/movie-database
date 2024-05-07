import React from "react";
import styles from "./App.module.css"
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import DetailView from "./containers/TMDBList/components/detailView/detailView";

function App() {
  return (
      <>
          <div className={styles.App}>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/movie/:id" element={<DetailView />} />
                  <Route path="/tv/:id" element={<DetailView />} />
              </Routes>
          </div>
      </>
  );
}

export default App;
