const API_KEY = "8a6a6ab3d4eb4d97824484158cc5b89a";
let countryChoice = "us";
const url = `https://newsapi.org/v2/top-headlines?country=${countryChoice}&apiKey=${API_KEY}`;

console.log(url);

function produceUrl() {
  let url =
    "https://newsapi.org/v2/top-headlines?apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe";

  // Look at all url query parameters and add them to the url above to respect language/country/category/page/etc.
  const urlParams = window.location.search.split("?")[1];

  // Guard against no url params and default to english.
  if (!urlParams) return url + "&language=en";

  urlParams.split("&").map((p) => {
    // "Massage data" into workable form.
    const [key, value] = p.split("=");
    url += `&${key}=${value}`;
  });

  console.log({ finalUrl: url });

  return url;
}

async function getNews() {
  try {
    let url = produceUrl();
    let data = await fetch(url);
    let result = await data.json();
    console.log(result);
    let articles = result.articles;
    console.log(articles);
    const toDraw = articles.map((item) => renderSingleArticle(item));
    document.getElementById("top-headlines").innerHTML = toDraw.join("");
    console.log(toDraw);
  } catch (error) {
    console.log("error", error);
  }
  console.log("keep runing");
}
//

function renderSingleArticle(article) {
  return `
  <div class="singleArticle">
    <h3>${article.title}</h3>
    <div>
    <img src="${article.urlToImage}" alt="Snow-Img" width="300"/>
   </div>
 
  ${article.author}
 

 <a href="${article.url}">${article.source.name}</a>
>

${article.content}

 

  </div>
   
  `;
}

getNews();

// console.log(data)
