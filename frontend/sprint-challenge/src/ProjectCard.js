import React from "react";

const ProjectCard = ({ name, des }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>{des}</p>
    </div>
  );
};

export default ProjectCard;
