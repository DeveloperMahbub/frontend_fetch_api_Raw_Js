const postList = document.querySelector(".post-list");
const addPostForm = document.querySelector(".addpost_form");
const titleValue = document.getElementById("title_value");
const bodyValue = document.getElementById("description_value");
let output = "";
const renderPosts = (posts) => {
  posts.forEach((post) => {
    output += `<div class="card col-md-6 bg-light">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
          <p class="card-text">
          ${post.body}
          </p>
          <a href="#" class="card-link">Edit</a>
          <a href="#" class="card-link">Delete</a>
        </div>
      </div>`;
  });
  postList.innerHTML = output;
};
const url = "http://localhost:5000/api/posts";

// Get Or read all Posts
//Method Get
fetch(url)
  .then((res) => res.json())
  .then((data) => renderPosts(data));

//Create or Insert Post
//Method Post

addPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(url, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      title: titleValue.value,
      body: bodyValue.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArray = [];
      dataArray.push(data);
      renderPosts(dataArray);
    });
});
