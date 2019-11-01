const express = require("express");
const cors = require("cors");
const actionDb = require("./data/helpers/actionModel");
const projectDb = require("./data/helpers/projectModel");

const server = express();
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "happy sprint challenge" })
    .catch(err => res.status(500).json({ error: "bad request, try later" }));
});

server.get("/api/actions", (req, res) => {
  actionDb
    .get()
    .then(actions => res.status(200).json(actions))
    .catch(err => res.status(500).json({ message: "bad request, try later" }));
});

server.get("/api/actions/:id", (req, res) => {
  const actionId = req.params.id;
  if (!actionId) {
    res.status(400).json({ error: "please provide action Id" });
  } else {
    actionDb
      .get(actionId)
      .then(actions => res.status(200).json(actions))
      .catch(err => res.status(500).json({ error: "bad request, try later" }));
  }
});

server.post("/api/actions", (req, res) => {
  const newAction = req.body;
  actionDb
    .insert(newAction)
    .then(action => res.status(200).json(action))
    .catch(err => res.status(500).json({ message: "bad request" }));
});

server.put("/api/actions/:id", (req, res) => {
  const actionId = req.params.id;
  const updatedAction = req.body;

  if (!req.params.id) {
    res.status(400).json({ error: "please provide action Id" });
  } else if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "please provide the changes" });
  } else {
    actionDb
      .update(actionId, updatedAction)
      .then(actions => res.status(200).json(actions))
      .catch(err => res.status(500).json({ error: "bad request, try later" }));
  }
});

server.delete("/api/actions/:id", (req, res) => {
  const actionId = req.params.id;
  if (!actionId) {
    res.status(400).json({ error: "please provide action Id" });
  } else {
    actionDb
      .remove(actionId)
      .then(action => res.status(200).json(action))
      .catch(err => res.status(500).json({ error: "bad request, try later" }));
  }
});

// ################# projects api #####################

server.get("/api/projects", (req, res) => {
  projectDb
    .get()
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ message: "bad request" }));
});

server.get("/api/projects/:id", (req, res) => {
  const projectId = req.params.id;
  if (!projectId) {
    res.status(400).json({ error: "please provide project Id" });
  } else {
    projectDb
      .get(projectId)
      .then(project => res.status(200).json(project))
      .catch(err => res.status(500).json({ error: "bad request, try later" }));
  }
});

server.get("/api/projects/:id/actions", (req, res) => {
  const projectId = req.params.id;
  if (!projectId) {
    res.status(400).json({ error: "please provide project Id" });
  } else {
    projectDb
      .getProjectActions(projectId)
      .then(actions => res.status(200).json(actions))
      .catch(err => res.status(500).json({ error: "bad request, try later" }));
  }
});

server.post("/api/projects", (req, res) => {
  const newProject = req.body;
  projectDb
    .insert(newProject)
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json({ message: "bad request" }));
});

server.put("/api/projects/:id", (req, res) => {
  const projectId = req.params.id;
  const updatedProject = req.body;

  if (!req.params.id) {
    res.status(400).json({ error: "please provide project Id" });
  } else if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "please provide the changes" });
  } else {
    projectDb
      .update(projectId, updatedProject)
      .then(project => res.status(200).json(project))
      .catch(err => res.status(500).json({ error: "bad request, try later" }));
  }
});

server.delete("/api/projects/:id", (req, res) => {
  const projectId = req.params.id;
  if (!projectId) {
    res.status(400).json({ error: "please provide project Id" });
  } else {
    projectDb
      .remove(projectId)
      .then(project => res.status(200).json(project))
      .catch(err => res.status(500).json({ error: "bad request, try later" }));
  }
});

module.exports = server;
