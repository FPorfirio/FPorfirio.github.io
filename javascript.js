
//Dom elements;
const anchor = document.querySelectorAll('a[href*="#"]:not([href="#"]):not([href="#0"])');
const body = document.getElementById('body');
const main = document.getElementById('main');
const nav = document.getElementById("nav");
const header = document.getElementsByTagName("header")[0];
const aside = document.getElementById('aside');
const grid = document.getElementById('grid');
const sections = document.getElementsByTagName("section");


//Nav scroll function 
function scrollTo(element, to, duration) {
    if (duration <= 0){
        location.hash = hash;
        return
    }
    let difference = to - element.scrollTop;
    let perTick = difference / duration * 10;
    setTimeout(function() {
        ele.focus({preventScroll: true});
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) {
            location.hash = hash;
            return;
        };
        scrollTo(element, to, duration - 10);
    }, 1);
}

//Nav links scroll handler
let ele;
let destination;
let hash;

for(let item of anchor) {
    item.addEventListener('click', function(e){
        e.preventDefault();
        item.focus({preventScroll: true})
        hash = this.hash.slice(1);
        h2Height = 0;
        ele = document.getElementById(hash);
        destination = main.offsetTop + ele.offsetTop;
        scrollTo(document.body, destination, 600)
    })
}

//Anchor focus relative to scrollbar
function relativeFocus(){
    const headerMargin = parseInt(window.getComputedStyle(header).getPropertyValue("margin-top")) + parseInt(window.getComputedStyle(header).getPropertyValue("margin-bottom"));
    const headerHeight = Math.round(headerMargin + header.offsetHeight);

    if (body.scrollTop < sections[0].offsetTop + sections[0].offsetHeight + headerHeight) {
        anchor[0].focus({preventScroll: true});
    }
    else if (body.scrollTop < sections[1].offsetTop + sections[1].offsetHeight + headerHeight) {
        anchor[1].focus({preventScroll: true});
    }
    else if (body.scrollTop < sections[2].offsetTop + sections[2].offsetHeight / 2  + headerHeight) {
        anchor[2].focus({preventScroll: true});
    }
    else if (body.scrollHeight - body.scrollTop === body.clientHeight) {
        anchor[3].focus({preventScroll: true});
    }
}

//Dynamic added nav function
let navOffset = nav.offsetTop;

function actualResizeHandler() {
    relativeFocus();
    let windowsWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if(document.body.scrollTop >= navOffset && windowsWidth > 609 && nav.parentElement != aside) {
        nav.id = ""
        nav.className = "navM";
        aside.appendChild(nav);
        setTimeout(function() {
            nav.className += " navMTrigger";
        }, 0 );      
    }   
    else if(document.body.scrollTop >= navOffset && windowsWidth < 609 && nav.parentElement != main) {   
        nav.id = "";
        nav.className = "navS";
        main.style.paddingTop = "0";
        main.insertBefore(nav, main.firstChild);
        setTimeout(function() {
            nav.className += " navsTrigger";
        }, 0 );
    }
    else if (document.body.scrollTop <= navOffset && nav.parentElement != header) {
        nav.id = "nav";
        nav.className = "navtry";
        header.appendChild(nav);
        setTimeout(function() {
            nav.className = "navtrans";
            nav.className += "navTrigger1";
        }, 0 );
    }
}




//Event limiter function(throttle)
let resizeTimeout;
function resizeThrottler() {
    if (!resizeTimeout) {
        resizeTimeout = setTimeout(function() {
            resizeTimeout = null;
            actualResizeHandler();
        }, 1000);
    }
}

//Window events
window.addEventListener("scroll", resizeThrottler, false);
window.addEventListener('resize', resizeThrottler);