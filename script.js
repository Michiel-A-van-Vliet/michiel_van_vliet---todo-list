// constanten voor de DOM
const listLocation = document.getElementById("todo__list");
const btnAdd = document.getElementById("todo__btn-add");

// get todo list from api-client and show it on dom
async function showListOnDom() {
  try {
    const listData = await getList();
    listLocation.innerHTML = "";
    listData.forEach((item) => {
      writeLineToDom(item);
    });
  } catch (err) {
    listLocation.innerHTML = "Oeps! Er ging iets fout. Zie Console voor info.";
    console.log("showListOnDom: Error!");
    console.log(err);
  }
}

// creates a bunch of html stuff for each line
async function writeLineToDom(item) {
  // define content
  const id = item._id;
  const newLi = document.createElement("li");
  newLi.setAttribute("class", "todo__item");
  const newlabel = document.createElement("div");
  newlabel.setAttribute("class", "todo__label");
  newlabel.setAttribute("contentEditable", "true");
  const newCheckbox = document.createElement("input");
  newCheckbox.setAttribute("type", "checkbox");
  newCheckbox.setAttribute("id", id);
  newCheckbox.setAttribute("class", "todo__checkbox");
  const newButton = document.createElement("button");
  newButton.setAttribute("class", "todo__btn-delete");
  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fa fa-trash");
  if (item.done == true) {
    newlabel.classList.add("todo__label--done");
    newCheckbox.setAttribute("checked", "true");
  }

  // place content
  listLocation.append(newLi);
  newLi.append(newCheckbox);
  newLi.append(newlabel);
  newLi.append(newButton);
  newButton.append(deleteIcon);
  newlabel.append(item.description);

  // listen to labels
  newlabel.addEventListener("input", function () {
    newText = newlabel.innerHTML;
    const changeId = this.previousSibling.getAttribute("id");
    changeToList(changeId, newText);
  });

  // listen to checkboxes
  newCheckbox.addEventListener("change", function () {
    const nextTag = newCheckbox.nextSibling;
    nextTag.classList.toggle("todo__label--done");
    const changeId = newCheckbox.getAttribute("id");
    newStatus = event.target.checked;
    doneOnList(changeId, newStatus);
  });

  // update new id from API
  if (id == "0") {
    const udpdatedId = await addToList(item);
    newCheckbox.setAttribute("id", udpdatedId);
  }

  // listen to delete buttons
  newButton.addEventListener("click", function () {
    const removeId = newCheckbox.getAttribute("id");
    newButton.parentElement.remove();
    removeFromList(removeId);
  });
  newButton.addEventListener("mouseover", function () {
    newButton.previousSibling.classList.add("todo__label--delete");
  });
  newButton.addEventListener("mouseout", function () {
    newButton.previousSibling.classList.remove("todo__label--delete");
  });
}

// first line that actually runs
showListOnDom();

// listener for adding new content
btnAdd.addEventListener("click", async function () {
  const newTodo = document.getElementById("todo__new");
  newName = newTodo.value;
  var data = { description: "", done: false, _id: "0" };
  data["description"] = newName;
  writeLineToDom(data);
});
