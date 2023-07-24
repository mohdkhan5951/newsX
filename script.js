const API_KEY = "3750c867295f416ebca8809b9984023f";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>fetchNews("Business"));

function reload() {
    window.location.reload();
}



// let modebtn = document.getElementById("customSwitches");
// function enableDarkMode() {
//    if(modebtn.checked===true)
//    {
//        document.body.classList.remove("light");
//        document.body.classList.add("dark");
//        window.localStorage.setItem('customSwitches','dark');
//    }
//    else 
//    {
//        document.body.classList.remove("dark");
//        document.body.classList.add("light");
//        window.localStorage.setItem('customSwitches', 'light');
//    }
// }
// const customSwitches = window.localStorage.getItem('customSwitches');
// if (customSwitches == 'dark') 
// {
//  modebtn.checked = true;
//  document.body.classList.remove("light")
//  document.body.classList.add("dark")
// }

// if (customSwitches == 'light') 
// {
//  modebtn.checked = false;
//  document.body.classList.remove("dark");
//  document.body.classList.add("light");
// }




async function fetchNews(category) 
{
    const res = await fetch(`${url}${category}&apiKey=${API_KEY}`); 
    const data = await res.json();
    console.log(data);
    parseData(data.articles);
}

function parseData(articles)
{
    const cardsContainer = document.getElementById("cards-container");
    const newCardTemplate = document.getElementById("card-template");
    cardsContainer.innerHTML = "";
    articles.forEach(article => {
        if(!article.urlToImage)
           return;
        const cardClone = newCardTemplate.content.cloneNode(true);   
        addDataToCard(cardClone,article);   
        cardsContainer.appendChild(cardClone);
    });
    
}

function addDataToCard(cardClone,article)
{
    const newsImg = cardClone.querySelector("#news-img");
    const newsSource = cardClone.querySelector("#news-source");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsContent = cardClone.querySelector("#news-content");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsContent.innerHTML = article.description;
    const date =  new Date(article.publishedAt).toLocaleString("en-US", {timeZone: 'Asia/Kolkata'});
    newsSource.innerHTML = `${article.source.name} - ${date}`;
    // cardClone.style.backgroundColor="blue";
    cardClone.firstElementChild.addEventListener("click",()=> {
        window.open(article.url,"_blank");
    });
}

let currentSelectedNav = null;
const onNavItemClick = (id) => {
    fetchNews(id);
    const navItem = document.getElementById(id);
    let inpText = document.getElementById("search-text")
    currentSelectedNav?.classList.remove("active");
    inpText.value = "";
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click",() => {
    const searchCategory = searchText.value;
    if(!searchCategory)
      return;
    fetchNews(searchCategory);
    currentSelectedNav?.classList.remove("active");
    currentSelectedNav = null;  
});


