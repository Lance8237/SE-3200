const heading = document.querySelector("h1");
const profileImg = document.querySelector("img");
const listItems = document.querySelectorAll("li");


// heading 
heading.onclick = function () {
    heading.style.color = "blue";
};

// click the image to make it bigger
profileImg.onclick = function () {
    profileImg.style.width = "300px";
    profileImg.style.height = "350px";
};

// mark it as "done" 
listItems.forEach(function (item) {
    item.onclick = function () {
        item.style.textDecoration = "line-through";
        item.style.color = "gray";
    };
});

const fireballBtn = document.getElementById("fireball-btn");
const fireball = document.getElementById("fireball");

// fireball
fireballBtn.onclick = function () {
    fireball.classList.remove("flying");

    void fireball.offsetWidth;

    fireball.classList.add("flying");
};