const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const htmlRender = require("./lib/htmlRender");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {});

const selectRole = [
  {
    type: "list",
    name: "role",
    message: "Select Your Job Type",
    choices: [
      "Engineer",
      "Intern",
      "I don't want to add any more team members",
    ],
  },
];

const addEmployees = () => {
  inquirer.prompt(selectRole).then((response) => {
    const addNonManager = () => {
      if (response.role == "Engineer") {
        inquirer.prompt(engineerQuestions).then((answers2) => {
          if (
            answers2.name === "" ||
            answers2.email === "" ||
            answers2.gitHub === ""
          ) {
            console.log("Plese Provide an Answer For Each Question");
            addNonManager();
          } else if (isNaN(answers2.id) == true) {
            console.log("ID Must Be A Number");
            addNonManager();
          } else {
            const newEmployee = new Engineer(
              answers2.name,
              answers2.id,
              answers2.email,
              response.role,
              answers2.gitHub
            );
            answersArray.push(newEmployee);
            console.log(answersArray);
            addEmployees();
          }
        });
      } else if (response.role == "Intern") {
        inquirer.prompt(internQuestions).then((answers2) => {
          if (
            answers2.name === "" ||
            answers2.email === "" ||
            answers2.school === ""
          ) {
            console.log("Plese Provide an Answer For Each Question");
            addNonManager();
          } else if (isNaN(answers2.id) == true) {
            console.log("ID Must Be A Number");
            addNonManager();
          } else {
            const newEmployee = new Intern(
              answers2.name,
              answers2.id,
              answers2.email,
              response.role,
              answers2.school
            );
            answersArray.push(newEmployee);
            console.log(answersArray);
            addEmployees();
          }
        });
      } else {
        const newFile = htmlRender.render(answersArray);
        fs.writeFileSync(outputPath, newFile);
      }
    };
    addNonManager();
  });
};

//object Engineer questions
const engineerQuestions = [
  { type: "input", name: "name", message: "Name" },
  { type: "number", name: "id", message: "ID:" },
  { type: "input", name: "email", message: "Email" },
  { type: "input", name: "gitHub", message: "GitHub Account" },
];
//object Manager questions
const managerQuestions = [
  { type: "input", name: "name", message: "Name" },
  { type: "number", name: "id", message: "ID:" },
  { type: "input", name: "email", message: "Email" },
  { type: "number", name: "officeNumber", message: "Office Number" },
];

//object intern questions
const internQuestions = [
  { type: "input", name: "name", message: "Name" },
  { type: "number", name: "id", message: "ID:" },
  { type: "input", name: "email", message: "Email" },
  { type: "input", name: "school", message: "School" },
];
const answersArray = [];
//inquirer select role
const askManager = () => {
  inquirer.prompt(managerQuestions).then((answers) => {
    if (answers.name === "" || answers.email === "") {
      console.log("Plese Provide an Answer For Each Question");
      askManager();
    } else if (
      isNaN(answers.id) == true ||
      isNaN(answers.officeNumber) == true
    ) {
      console.log("Please Provide a Number Value for ID and Office Number");
      askManager();
    } else {
      const newEmployee = new Manager(
        answers.name,
        answers.id,
        answers.email,
        "Manager",
        answers.officeNumber
      );
      answersArray.push(newEmployee);
      addEmployees();
    }
  });
};
askManager();

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./output/team.html"));
});

//if x role is selected
//inquirer that object of questions
