const postList = document.querySelector(".post-list");
const addPostForm = document.querySelector(".addpost_form");
const titleValue = document.getElementById("title_value");
const bodyValue = document.getElementById("description_value");
const btnSubmit = document.querySelector(".btn");

let output = "";
const renderPosts = (posts) => {
  posts.forEach((post) => {
    output += `<div class="card my-2 col-md-6 bg-light">
        <div class="card-body" data-id=${post._id}>
          <h5 class="card-title">${post.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
          <p class="card-text">
          ${post.body}
          </p>
          <a href="#" class="card-link" id="edit_post">Edit</a>
          <a href="#" class="card-link" id="delete_post">Delete</a>
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
  // reset input field empty
  titleValue.value = "";
  bodyValue.value = "";
});

postList.addEventListener("click", (e) => {
  //   console.log(e.target.id);
  let editbtnpresed = e.target.id == "edit_post";
  let delbtnpresed = e.target.id == "delete_post";
  let id = e.target.parentElement.dataset.id;

  //Delete Post
  //Method Delete
  if (delbtnpresed) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => location.reload());
  }

  //Edit Post
  if (editbtnpresed) {
    const parent = e.target.parentElement;
    let titleContent = parent.querySelector(".card-title").textContent;
    let bodyContent = parent.querySelector(".card-text").textContent;
    let Content = bodyContent.trim(); //remove white space from both side
    // console.log(Content);

    titleValue.value = titleContent;
    bodyValue.value = Content;
    btnSubmit.innerHTML = "Update";
  }

  //Updte Post
  //Method Patch

  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleValue.value,
        body: bodyValue.value,
      }),
    })
      .then((res) => res.json())
      .then(() => location.reload());
  });
});
