let buttons = document.getElementsByTagName("button");

let aside = document.getElementById("aside");

let about = document.getElementById("about");

let door = document.getElementsByClassName("door");



aside.addEventListener("click", function(e){
    var btn = e.target.id;
        for(var element of door){
            if(element.classList.contains("closed")){
                element.classList.remove("closed")
            }
            else{
                element.classList.add("closed")
            }
        }   
})


