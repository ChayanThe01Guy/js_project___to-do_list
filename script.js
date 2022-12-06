const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const listEl = document.querySelector(".list");
let arr = JSON.parse(localStorage.getItem("List"));

arr.forEach(task => {
    addListItem(task);
});

formEl.addEventListener("submit", (event)=> {
    event.preventDefault();
    addListItem();
});


function addListItem(task) {
    let inputValue = inputEl.value;
    if(task) {
        inputValue = task.name;
    }
    const litag = document.createElement("li");
    if(task && task.checked) {
        litag.classList.add("checked");
    }

    litag.innerText = inputValue;
    listEl.appendChild(litag);
    inputEl.value = "";

    const checkBtnTag = document.createElement("div");
    checkBtnTag.innerHTML = `<i class="fa-solid fa-square-check checkBox"></i>`;
    litag.appendChild(checkBtnTag);

    const deleteBtnTag = document.createElement("div");
    deleteBtnTag.innerHTML = `<i class="fa-solid fa-trash delete"></i>`;
    litag.appendChild(deleteBtnTag);

    checkBtnTag.addEventListener("click", () => {
        litag.classList.toggle("checked");
        updateLocalStorage();
    });

    deleteBtnTag.addEventListener("click", () => {
        litag.remove();
        updateLocalStorage();
    });

    updateLocalStorage();
}


function updateLocalStorage() {
    const li_lists = document.querySelectorAll("li");

    arr = [];
    li_lists.forEach(li_list => {
        arr.push({
            name: li_list.innerText,
            checked: li_list.classList.contains("checked")
        });
    });
    localStorage.setItem("List", JSON.stringify(arr));
}