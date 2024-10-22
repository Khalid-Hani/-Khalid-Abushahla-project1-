function generateStars(rating) {
  const fullStar = '<ion-icon name="star" style="color:#e3c505"></ion-icon>';
  const halfStar =
    '<ion-icon name="star-half" style="color:#e3c505"></ion-icon>';
  const emptyStar =
    '<ion-icon name="star-outline" style="color:#e3c505"></ion-icon>';

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
//////////////////////////////////////////////////////////////////////////////////////////////////

// Class definition for Course
class Course {
  constructor(
    category,
    rating,
    name,
    image,
    topic,
    description,
    subtopics,
    id
  ) {
    this.category = category;
    this.rating = rating;
    this.name = name;
    this.image = image;
    this.topic = topic;
    this.description = description;
    this.subtopics = subtopics;
    this.id = id;
  }

  // Convert a JSON object into a Course instance
  static fromJSON(json) {
    return new Course(
      json.category,
      json.rating,
      json.name,
      json.image,
      json.topic,
      json.description,
      json.subtopics,
      json.id
    );
  }

  // Convert a list of JSON objects into a list of Course instances
  static fromJSONList(jsonList) {
    return jsonList.map(Course.fromJSON);
  }
}

fetch("topics.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Data fetched:", data);
    const courses = Course.fromJSONList(data);
    renderCourses(courses);
  })
  .catch((error) => console.error("Error fetching courses:", error));

// Function to render courses to the DOM
function renderCourses(courses) {
  const container = document.getElementById("card");
  if (!container) {
    console.error("Container element not found!");
    return;
  }

  console.log("Rendering courses:", courses);

  courses.forEach((course) => {
    const courseDiv = document.createElement("div");
    courseDiv.className = "course";
    const stars = generateStars(course.rating);

    courseDiv.innerHTML = `
     <a class= "course-image" href="topics.html?id=${course.id}">
      <img src="/Logos/${course.image}" alt="${course.topic}">
     
      <div class = "course-text" > 
      <p class="category"><strong></strong> ${course.category}</p>
      <p class="topic"><strong></strong> ${course.topic}</p>
      <p class="rating"><strong>${stars}</strong> </p>
      <p class="name">Author : ${course.name}</p>
      </a>  
    `;

    container.appendChild(courseDiv);
  });
}
