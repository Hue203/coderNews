const categories = [
  "Business",
  "Entertainment",
  "General",
  "Health",
  "Science",
  "Sports",
  "Technology",
];

function renderCategoriessAnchorTags() {
  const categoriesHTML = categories.map(
    (cate) =>
      `<a href="http://127.0.0.1:5500/index.html?category=${cate}">${cate}</a>`
  );
  document.getElementById("categories").innerHTML = categoriesHTML;
}

renderCategoriessAnchorTags();
