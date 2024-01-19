const api_rul = " https://api.jikan.moe/v4/"

// Start script for slider
// In HTML, .display-area has the width of 4 cards = 880px. Each card is 200px width and margin set to 10px.
// .display-area has a .cards-wrapper which contains all the cards. .cards-wrapper is set to display flex.
// .display-area has overflow hidden to hide the portion of cards-wrapper which extends beyond the container's width.
const wrapper = document.querySelector('.cards-wrapper');
const wrapperTwo = document.querySelector('.cards-wrapperTwo');
// console.log(wrapper.clientWidth);
// grab the dots
const dots = document.querySelectorAll('.dot');
const dotsT = document.querySelectorAll('.dotT');
// the default active dot num which is array[0]
let activeDotNum = 0;

dots.forEach((dot, idx) => {  
//   number each dot according to array index
  dot.setAttribute('data-num', idx);
  
//   add a click event listener to each dot
  dot.addEventListener('click', (e) => {
    
    let clickedDotNum = e.target.dataset.num;
//     if the dot clicked is already active, then do nothing
    if(clickedDotNum == activeDotNum) {
      return;
    }
    else {
      // shift the wrapper
      let displayArea = wrapper.parentElement.clientWidth;
      // let pixels = -wrapper.clientWidth * clickedDotNum;
      let pixels = -displayArea * clickedDotNum
      wrapper.style.transform = 'translateX('+ pixels + 'px)';
//       remove the active class from the active dot
      dots[activeDotNum].classList.remove('active');
//       add the active class to the clicked dot
      dots[clickedDotNum].classList.add('active');
//       now set the active dot number to the clicked dot;
      activeDotNum = clickedDotNum;
    }
    
  });
});
dotsT.forEach((dot, idx) => {  
//   number each dot according to array index
  dot.setAttribute('data-num', idx);
  
//   add a click event listener to each dot
  dot.addEventListener('click', (e) => {
    
    let clickedDotNum = e.target.dataset.num;
//     if the dot clicked is already active, then do nothing
    if(clickedDotNum == activeDotNum) {
      return;
    }
    else {
      // shift the wrapper
      let displayArea = wrapperTwo.parentElement.clientWidth;
      // let pixels = -wrapper.clientWidth * clickedDotNum;
      let pixels = -displayArea * clickedDotNum
      wrapperTwo.style.transform = 'translateX('+ pixels + 'px)';
//       remove the active class from the active dot
      dotsT[activeDotNum].classList.remove('active');
//       add the active class to the clicked dot
      dotsT[clickedDotNum].classList.add('active');
//       now set the active dot number to the clicked dot;
      activeDotNum = clickedDotNum;
    }
    
  });
});
// End script for slider

// start code for search
const searchText  = document.querySelector("#searchText")
const searchResults  = document.querySelector("#searchResults")
searchText.addEventListener("keyup",function(){
    if(this.value.length > 3){
        getAnimes(this.value)
    }else{
        searchResults.style.display ="none"
    }
})
// search animes function
async function getAnimes(query){
    const res = await fetch(`${api_rul}anime?q=${query}`)
    const animes = await res.json()
    searchResults.innerHTML=``

    // code for display all of results titles in a list
    if(animes.data.length>0){
        searchResults.style.display ="block"
        animes.data.map((anime,index)=>{
            searchResults.innerHTML +=`
            <li id="singleAnimeName" key=${index} data-image=${anime.images.jpg.image_url}><a href=${anime.url} target="_blank">${anime.title}</a></li>
            `
        })
    }
    // code for display the anime image when the user hover on the name of anine
    const singleAnimeImg  = document.querySelector("#singleAnimeImg")
    const singleAnimeName  = Array.from(document.querySelectorAll("#singleAnimeName"))
    singleAnimeName.map(anime =>{
        anime.addEventListener("mouseover",function(){
           singleAnimeImg.innerHTML = `
           <img src=${this.dataset.image} alt="single-enime-img"/>
           `
           singleAnimeImg.style.display ="block"
        })
        anime.addEventListener("mouseout",function(){
            singleAnimeImg.style.display ="none"
        })
    })
}
// End code for search

//==================================================================================
// get trending animes
const trendingAnimes = document.querySelector("#trendingAnimes")
async function getTrendingAnimes(){
    const res = await fetch(`${api_rul}top/anime`)
    const trendAnimes = await res.json()
    trendAnimes.data.map(trendAnime =>{
        trendingAnimes.innerHTML += `
        <div class="card">
            <div class="item">
              <div class="thumb">
                <a href="${trendAnime.url}" target="_blank"><img src=${trendAnime.images.jpg.image_url} alt="trendAnimeimg"></a>
                <span class="price">${trendAnime.score}</span>
              </div>
              <div class="down-content">
                <span class="category">${trendAnime.type}</span>
                <h4>${trendAnime.title}</h4>
                <a href="product-details.html"><i class="fa fa-shopping-bag"></i></a>
              </div>
            </div>
          </div>
        `
    })

}
getTrendingAnimes()
// End get trending animes
// Start get top reviews animes
const topReviewsAnimes = document.querySelector("#topReviewsAnimes")
async function getTopReviewsAnimes(){
    const res = await fetch(`${api_rul}watch/episodes/popular`)
    const topAnimes = await res.json()
    topAnimes.data.map(topAnime =>{
        topReviewsAnimes.innerHTML += `
        <div class="card">
          <div class="item">
            <div class="thumb">
              <a href="${topAnime.entry.url}" target="_blank"><img src=${topAnime.entry.images.jpg.image_url} alt=""></a>
            </div>
            <div class="down-content">
                <h4>${topAnime.entry.title}</h4>
                <a href="product-details.html">Explore</a>
            </div>
          </div>
        </div>
        `
    })

}
getTopReviewsAnimes()
// End get trending animes
// Start get seasons now 
const seasonsNow = document.querySelector("#seasonsNow")
async function getSeasonsNow(){
    const res = await fetch(`${api_rul}seasons/now`)
    const seasons = await res.json()
    seasons.data.slice(0,4).map(season =>{
        seasonsNow.innerHTML += `
        <div class="col-lg col-sm-6 col-xs-12">
            <div class="item">
              <h4>${season.title}</h4>
              <div class="thumb">
                <a href=href="${season.url}" target="_blank"><img src=${season.images.jpg.image_url}  alt=""></a>
              </div>
            </div>
          </div>
        `
    })

}
getSeasonsNow()
// End get seasons now