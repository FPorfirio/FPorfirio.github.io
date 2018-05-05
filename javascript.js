
//Dom elements;
const anchor = document.querySelectorAll('a[href*="#"]:not([href="#"]):not([href="#0"])');
const body = document.getElementById('body');
const main = document.getElementById('main');
const nav = document.getElementById("nav");
const header = document.getElementsByTagName("header")[0];
const aside = document.getElementById('aside');
const grid = document.getElementById('grid');

//Nav scroll function 
function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    let difference = to - element.scrollTop;
    let perTick = difference / duration * 10;

    setTimeout(function() {
        ele.focus({preventScroll: true});
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 1);

}


//Nav links scroll handler
let ele;
let destination;

let h2Height;

for(let item of anchor) {
    item.addEventListener('click', function(e){
        e.preventDefault();
        let hash = this.hash.slice(1);
        h2Height = 0;
        ele = document.getElementById(hash);
        destination = main.offsetTop + ele.offsetTop - h2Height;
        scrollTo(document.body, destination, 600)
    })
}

//Dynamic added nav function
let windowsWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
function actualResizeHandler() {0
    if(document.body.scrollTop >= nav.offsetTop && windowsWidth > 609 && nav.parentElement != aside) {
        nav.id = ""
        nav.className = "navM";
        aside.appendChild(nav);
    }   
    else if(document.body.scrollTop >= nav.offsetTop && windowsWidth < 609 && nav.parentElement != main) {   
        nav.id = "";
        nav.className = "navS";
        h2Height =  document.getElementsByTagName("h2")[1].clientHeight;
        main.style.paddingTop = "0";
        main.insertBefore(nav, main.firstChild)
    }
    else if (document.body.scrollTop <= 460) {
        nav.id = "nav";
        nav.className = "";
        header.appendChild(nav);
    }
}
  
//Event limiter function(throttle)
let resizeTimeout;
function resizeThrottler() {
    if ( !resizeTimeout ) {
        resizeTimeout = setTimeout(function() {
            resizeTimeout = null;
            actualResizeHandler();
        }, 1000);
    }
}

window.addEventListener("scroll", resizeThrottler, false);

