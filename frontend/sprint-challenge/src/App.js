import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";

import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/projects`)
      .then(res => setProjects(res.data));
  });

  return (
    <div className="App">
      {projects.map(pro => (
        <ProjectCard key={pro.id} name={pro.name} des={pro.description} />
      ))}
    </div>
  );
}

export default App;
