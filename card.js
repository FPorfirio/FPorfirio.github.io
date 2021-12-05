const template = document.getElementById("projectCard");

export function projectCard(cardJson) {
  const cardContent = template.content.cloneNode(true);
  const cardTitle = cardContent.querySelector(".card_title");
  const cardLinks = cardContent.querySelector(".card_links").children;
  const cardImg = cardContent.querySelector(".card_portraitImg");
  const cardPortraitUrl = cardContent.querySelector(".card_portraitLink");
  const tabBtnsContainer = cardContent.querySelector(".cardTab_btns");
  const tabBtns = tabBtnsContainer.children;
  const tabContent = cardContent.querySelector(".cardTab_content");
  let isSelected = tabBtns[0];

  cardLinks[0].href = cardJson.siteUrl;
  cardLinks[1].href = cardJson.githubUrl;
  cardPortraitUrl.href = cardJson.siteUrl;
  cardImg.src = cardJson.imgUrl;
  cardTitle.textContent = cardJson.title;
  tabContent.textContent = cardJson.description;
  isSelected.classList.add("cardTab_btn-selected");

  tabBtnsContainer.addEventListener("click", function (e) {
    if (e.target == isSelected) {
      return;
    }
    isSelected.classList.remove("cardTab_btn-selected");
    isSelected = e.target;
    isSelected.classList.add("cardTab_btn-selected");
    tabContent.textContent = cardJson[isSelected.textContent.toLowerCase()];
  });
  return cardContent;
}

const button = document.getElementsByClassName("templateButton");
/*if (isSelected.textContent == "Description") {
      tabContent.textContent = cardJson.description;
    } else if (isSelected.textContent == "Stack") {
      tabContent.textContent == "Stack";
    }*/
