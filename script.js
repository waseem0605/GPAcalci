const gpaForm = document.getElementById("gpaForm");
const creditsInput = document.getElementById("credits");
const gradeInput = document.getElementById("grade");
const gpaValue = document.getElementById("gpaValue");
const coursesList = document.getElementById("coursesList");
const currentYearElement = document.getElementById("currentYear");
const currentYear = new Date().getFullYear();
currentYearElement.textContent = currentYear;

let totalCredits = 0;
let totalGradePoints = 0;

gpaForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const credits = parseInt(creditsInput.value);
  const grade = parseFloat(gradeInput.value);

  if (isNaN(credits) || isNaN(grade)) {
    return;
  }

  totalCredits += credits;
  totalGradePoints += credits * grade;

  calculateAndDisplayGPA();

  const courseItem = document.createElement("li");
  courseItem.classList.add("course-item");
  courseItem.setAttribute("data-credits", credits);
  courseItem.setAttribute("data-grade", grade);
  courseItem.innerHTML = `
    <span>${credits} credits</span>
    <span>Grade: ${grade}</span>
  `;

  coursesList.appendChild(courseItem);

  creditsInput.value = "";
  gradeInput.value = "";
});

const deleteLastCourseButton = document.getElementById("deleteLastCourse");

deleteLastCourseButton.addEventListener("click", () => {
  const courses = document.querySelectorAll(".course-item");
  if (courses.length > 0) {
    const lastCourse = courses[courses.length - 1];
    const credits = parseInt(lastCourse.getAttribute("data-credits"));
    const grade = parseFloat(lastCourse.getAttribute("data-grade"));

    if (!isNaN(credits) && !isNaN(grade)) {
      totalCredits -= credits;
      totalGradePoints -= credits * grade;
      lastCourse.remove();
      calculateAndDisplayGPA();
    }
  }
});

coursesList.addEventListener("click", (e) => {
  if (e.target.classList.contains("course-item")) {
    const courseItem = e.target;
    const credits = parseInt(courseItem.getAttribute("data-credits"));
    const grade = parseFloat(courseItem.getAttribute("data-grade"));

    if (!isNaN(credits) && !isNaN(grade)) {
      totalCredits -= credits;
      totalGradePoints -= credits * grade;
      courseItem.remove();
      calculateAndDisplayGPA();
    }
  }
});

function calculateAndDisplayGPA() {
  if (totalCredits > 0) {
    const gpa = totalGradePoints / totalCredits;
    gpaValue.innerText = gpa.toFixed(2);
    updateCGPAColor(gpa);
  } else {
    gpaValue.innerText = "0.00";
    gpaValue.style.color = "#ffffff";
  }
}

function updateCGPAColor(gpa) {
  const lowColor = [255, 0, 0]; 
  const highColor = [0, 204, 0]; 
  const percentage = (gpa - 5) / (10 - 5);

  const interpolatedRgb = lowColor.map((channel, index) => {
    const channelDiff = highColor[index] - channel;
    return Math.round(channel + channelDiff * percentage);
  });

  const interpolatedColor = `rgb(${interpolatedRgb.join(', ')})`;
  gpaValue.style.color = interpolatedColor;
}

calculateAndDisplayGPA();




