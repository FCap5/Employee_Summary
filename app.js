const inquirer = require("inquirer");
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const basicQuestions = [
  { type: "input", name: "name", message: "Name" },
  {
    type: "list",
    name: "role",
    message: "Select Your Job Type",
    choices: ["Manager", "Engineer", "Intern"],
  },
];

//object Engineer questions
const engineerQuestions = [
  { type: "input", name: "q1", message: "ID:" },
  { type: "input", name: "q2", message: "Email" },
  { type: "input", name: "q3", message: "GitHub Account" },
];
//object Manager questions
const managerQuestions = [
  { type: "input", name: "q1", message: "ID:" },
  { type: "input", name: "q2", message: "Email" },
  { type: "number", name: "q3", message: "Office Number" },
];

//object intern questions
const internQuestions = [
  { type: "input", name: "q1", message: "ID:" },
  { type: "input", name: "q2", message: "Email" },
  { type: "input", name: "q3", message: "School" },
];

//inquirer select role
inquirer.prompt(basicQuestions).then((answers) => {
  if (answers.role == "Manager") {
    inquirer.prompt(managerQuestions).then((answers2) => {
      const answerObj = { ...answers, ...answers2 };
      console.log(answerObj);
    });
  } else if (answers.role == "Engineer") {
    inquirer.prompt(engineerQuestions).then((answers2) => {
      const answerObj = { ...answers, ...answers2 };
      console.log(answerObj);
    });
  } else if (answers.role == "Intern") {
    inquirer.prompt(internQuestions).then((answers2) => {
      const answerObj = { ...answers, ...answers2 };
      console.log(answerObj);
    });
  }
});

//if x role is selected
//inquirer that object of questions
