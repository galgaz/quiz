/*
globalne spremenljivke
*/

let data, questionNum = -1, score = 0, chosen, questionsJSON;

const message = document.getElementById("message");
const messageBox = document.getElementById("messageBox");
const newBox = document.getElementById('newBox');
const mainButton = document.getElementById('mainButton');
const answers = [];

const totalQuestions = 10; // število vprašanj
const apiUrl = `https://opentdb.com/api.php?amount=${totalQuestions}`
// const apiUrl = 'questions-test.json'; //testiranje
