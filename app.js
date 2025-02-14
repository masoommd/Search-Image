const accessKey = "xfYcwbb7FYw8gMHwkdTX-XkSwpd7wYtYAd_pWoLjbGA";

// const accessKey = "a4zXXMd2LTRQFiJDXSdl7vlGNAy_RzMVmXbannbooK4";

const form1 = document.querySelector(".form1");
const input = document.querySelector(".search-input");
const searchResults = document.querySelector(".search-results");

const showMore = document.querySelector(".show-more-button");

let inputData = " ";
let page = 1;

async function searchImage() {
  inputData = input.value;
  console.log(inputData);
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  try {
    let res = await fetch(url);
  let imageData = await res.json();
  let results = imageData.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }
  results.forEach((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
  } catch (error) {
    console.log("Error fetching images",error); 
    searchResults.innerHTML = "<b>Something went wrong</b>";
  }
}

form1.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImage();
});

showMore.addEventListener("click", () => {
  searchImage();
});
