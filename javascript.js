
const anchor = document.querySelectorAll('a[href*="#"]:not([href="#"]):not([href="#0"])');
const main = document.getElementById('main');
const nav = document.getElementById("nav");
const header = document.getElementsByTagName("header")[0];
const aside = document.getElementById('aside');
const body = document.getElementById('body');



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

let ele;

for(let item of anchor) {
    
    item.addEventListener('click', function(e){
        e.preventDefault();
        let hash = this.hash.slice(1);
        ele = document.getElementById(hash);
        let destination = main.offsetTop + ele.offsetTop;
        scrollTo(document.body, destination, 600)
    })
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

function actualResizeHandler() {0
    if(document.body.scrollTop >= header.clientHeight) {
        let removed = header.removeChild(nav);
        removed.id = "nav"
    }
    
    else {
        header.appendChild(nav);
    }

}
  
window.addEventListener("scroll", resizeThrottler, false);


/*

for(let item of anchor) {



item.addEventListener('click', function(e){
    e.preventDefault();
    var hash = this.hash.slice(1);
    var element = document.getElementById(hash);
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'

    })
})

}

 
*/