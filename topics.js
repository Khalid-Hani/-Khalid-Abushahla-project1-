// Function to generate star ratings with half stars (Unicode approach)
function generateStars(rating) {
  const fullStar = "⭐";
  const halfStar = "🌗";
  const emptyStar = "☆";
  let stars = "";

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += fullStar;
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars += halfStar;
    } else {
      stars += emptyStar;
    }
  }
  return stars;
}

class Course {
  constructor(
    id,
    category,
    topic,
    rating,
    description,
    image,
    name,
    subtopics
  ) {
    this.id = id;
    this.category = category;
    this.topic = topic;
    this.rating = rating;
    this.description = description;
    this.image = image;
    this.name = name;
    this.subtopics = subtopics;
  }

  static fromJSON(data) {
    return new Course(
      data.id,
      data.category,
      data.topic,
      data.rating,
      data.description,
      data.image,
      data.name,
      data.subtopics
    );
  }

  static fromJSONList(dataList) {
    return dataList.map((data) => this.fromJSON(data));
  }
}

// Function to get URL parameters
function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Get the course ID from the URL
const courseId = getQueryParameter("id");

// Check if courseId is available
if (courseId) {
  // Fetch and display course data based on courseId
  fetchCourseData(courseId);
} else {
  console.error("No course ID found in the URL.");
}

function fetchCourseData(courseId) {
  fetch("topics.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const courses = Course.fromJSONList(data);

      console.log(courses);

      // Find the course in the data
      const course = courses.find((c) => c.id == courseId);

      if (course) {
        console.log("Course found:", course); // Check the course object
        console.log("------------------"); // Check the course object
        renderCourseById(course);
      } else {
        console.error("Course not found.");
      }
    });
  //.catch((error) => console.error("Error fetching courses:", error));
}

// Function to render a course by ID to the DOM
function renderCourseById(course) {
  console.log("Rendering course:", course); // Check if this logs the course data

  const detailsDiv = document.createElement("div");
  detailsDiv.className = "details";

  const stars = course.rating ? generateStars(course.rating) : ""; // Check if rating is valid

  const subtopicsList = course.subtopics
    .map((subtopic) => ` <ul><hr><li class="li-li"  >✅ ${subtopic}</li></ul>`)
    .join("");

  detailsDiv.innerHTML = `
   
    <div class="main-content-side-box">
      <section class="main-content">
        <div>
          <h2 style="color: var(--brand-secondary)">
            ${course.category}
          </h2>
        </div>
        <div><h2 style="color: white">${course.topic}</h2></div>
        <div class="star-rating">${stars}</div>
        <p style="color: white">
          ${course.description}
        </p>
      </section>
      <div class="side-box">
        <div>
          <a class="course-image" href="/topics.html?id=${course.id}">
            <img src="/Logos/${course.image}" alt="${course.topic}">
          </a>
        </div>
        <div class="sub-side-box">
          <p style="font-weight: bold;">
            HTML by <a href="https://www.linkedin.com/in/khalid-hani-abushahla/">${course.name}</a>
          </p>
          <div class="sub-sub-side-box">
            <p>Interested in this topic?</p>
            <button class="add-to-favourites"> Add to Favourites 🤍 </button>
            <p style="text-align: center; color: rgb(233, 229, 229);">Unlimited credits</p>
          </div>
        </div>
      </div>
      </div>
      <div class="end-side">
       <div class="end-side-main-list">
      
          <h2 style =" padding-left : 5vh ">${course.topic} Sub Topics</h2>
           
          <ul class="sub-main-list" >
          
            ${subtopicsList}
            
          </ul>
         </div>
      </div>
    </section>
    
  `;

  const container = document.getElementById("main-frame");
  container.innerHTML = ""; // Clear previous content
  container.appendChild(detailsDiv);
  console.log("-----------end-----------");
}
