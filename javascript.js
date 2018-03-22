let buttons = document.getElementsByTagName("button");

let aside = document.getElementById("aside");

let about = document.getElementById("about");

let door = document.getElementsByClassName("door");

aside.addEventListener("click", function(e){
    
  
    var btn = e.target.id;

    switch(btn){
        case 'about_btn':
            door[0].classList.add("open");
            door[1].classList.add("open");
        break;
    }

    console.log(btn);

})


