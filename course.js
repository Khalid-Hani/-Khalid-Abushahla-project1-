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
    this.category = category; // string
    this.rating = rating; // number
    this.name = name; // string
    this.image = image; // string
    this.topic = topic; // string
    this.description = description; // string
    this.subtopics = subtopics; // array of strings
    this.id = id; // number
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

// Fetch JSON data and render courses
fetch("topics.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Data fetched:", data); // Debugging: log fetched data
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

  console.log("Rendering courses:", courses); // Debugging: log courses being rendered
  courses.forEach((course) => {
    const courseDiv = document.createElement("div");
    courseDiv.className = "course";

    courseDiv.innerHTML = `
      <img src="logos/${course.image}" alt="${course.topic}">
           
      <p><strong></strong> ${course.category}</p>
      <p><strong>${course.rating}</strong> </p>
      <p>Author : ${course.name}</p>
      
    `;

    container.appendChild(courseDiv); // Append each course to the container
  });
}
