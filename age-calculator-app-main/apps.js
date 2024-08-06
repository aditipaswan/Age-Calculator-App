"use strict";

const submitForm = document.getElementById("dateForm");

let yearsOutput = document.getElementById("yearsOutput");
let monthsOutput = document.getElementById("monthsOutput");
let daysOutput = document.getElementById("daysOutput");

let isValid = false;
let dayElement = document.getElementById("day");
let monthElement = document.getElementById("month");
let yearElement = document.getElementById("year");

const inputDay = dayElement;
const inputMonth = monthElement;
const inputYear = yearElement;

const labelDay = document.querySelector(`label[for="${dayElement.id}"]`);
const labelMonth = document.querySelector(`label[for="${monthElement.id}"]`);
const labelYear = document.querySelector(`label[for="${yearElement.id}"]`);

const errorDay = document.querySelector(".error-message-day");
const errorMonth = document.querySelector(".error-message-month");
const errorYear = document.querySelector(".error-message-year");

submitForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let isFormValid = true;

  // Check day input
  if (!dayElement.value) {
    errorDay.textContent = "This field is required";
    inputDay.style.borderColor = "hsl(0, 100%, 67%)";
    labelDay.style.color = "hsl(0, 100%, 67%)";
    isFormValid = false;
  } else if (+dayElement.value > 31 || +dayElement.value < 1) {
    errorDay.textContent = "Must be a valid day";
    inputDay.style.borderColor = "hsl(0, 100%, 67%)";
    labelDay.style.color = "hsl(0, 100%, 67%)";
    isFormValid = false;
  } else {
    errorDay.textContent = "";
    inputDay.style.borderColor = "hsl(0, 0%, 86%)";
    labelDay.style.color = "hsl(0, 1%, 44%)";
    isValid = true;
  }

  // Check month input
  if (!monthElement.value) {
    errorMonth.textContent = "This field is required";
    inputMonth.style.borderColor = "hsl(0, 100%, 67%)";
    labelMonth.style.color = "hsl(0, 100%, 67%)";
    isFormValid = false;
  } else if (+monthElement.value > 12 || +monthElement.value < 1) {
    errorMonth.textContent = "Must be a valid month";
    inputMonth.style.borderColor = "hsl(0, 100%, 67%)";
    labelMonth.style.color = "hsl(0, 100%, 67%)";
    isFormValid = false;
  } else {
    errorMonth.textContent = "";
    inputMonth.style.borderColor = "hsl(0, 0%, 86%)";
    labelMonth.style.color = "hsl(0, 1%, 44%)";
    isValid = true;
  }

  // Check year input
  if (!yearElement.value) {
    errorYear.textContent = "This field is required";
    inputYear.style.borderColor = "hsl(0, 100%, 67%)";
    labelYear.style.color = "hsl(0, 100%, 67%)";
    isFormValid = false;
  } else {
    const currentYear = new Date().getFullYear();
    if (+yearElement.value > currentYear) {
      errorYear.textContent = "Must be in the past";
      inputYear.style.borderColor = "hsl(0, 100%, 67%)";
      labelYear.style.color = "hsl(0, 100%, 67%)";
      isFormValid = false;
    } else {
      errorYear.textContent = "";
      inputYear.style.borderColor = "hsl(0, 0%, 86%)";
      labelYear.style.color = "hsl(0, 1%, 44%)";
      isValid = true;
    }
  }

  if (!isFormValid) {
    return;
  }

  // Calculating age
  const day = parseInt(dayElement.value);
  const month = parseInt(monthElement.value);
  const year = parseInt(yearElement.value);

  const birthDate = new Date(year, month - 1, day);
  const currentDate = new Date();

  let ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
  let ageInMonths = currentDate.getMonth() - birthDate.getMonth();
  let ageInDays = currentDate.getDate() - birthDate.getDate();

  if (ageInDays < 0) {
    ageInMonths--;
    ageInDays += new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
  }

  if (ageInMonths < 0) {
    ageInYears--;
    ageInMonths += 12;
  }

  yearsOutput.textContent = gsap.to("#yearsOutput", {
    duration: 2,
    innerHTML: ageInYears,
    ease: "power2.out",
    snap: { innerHTML: 1 },
  });

  monthsOutput.textContent = gsap.to("#monthsOutput", {
    duration: 2,
    innerHTML: ageInMonths,
    ease: "power2.out",
    snap: { innerHTML: 1 },
  });

  daysOutput.textContent = gsap.to("#daysOutput", {
    duration: 2,
    innerHTML: ageInDays,
    ease: "power2.out",
    snap: { innerHTML: 1 },
  });
});

// Removing error messages and styles on focus
const inputFields = submitForm.querySelectorAll("input");
inputFields.forEach((field) => {
  field.addEventListener("focus", function () {
    this.style.borderColor = "hsl(259, 100%, 65%)";
    field.parentElement.querySelector("label").style.color = "hsl(0, 1%, 44%)";
    field.parentElement.querySelector(".error-message-empty").textContent = "";
  });
});