// this will not change
const url = "http://localhost:3000";
const headerGet = { headers: { "Content-Type": "application/json" } };

async function getList() {
  const listData = await fetch(url, headerGet)
    .then((data) => data.json())
    .catch((err) => console.log(err));
  // console.log(listData);
  return listData;
}

async function addToList(data) {
  const headerPost = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  const answer = await fetch(url, headerPost)
    .then((x) => x.json())
    .catch((err) => console.log(err));
  return answer._id;
}

function removeFromList(id) {
  const thisUrl = url + "/" + id;
  fetch(thisUrl, { method: "DELETE" }).catch((err) => console.log(err));
}

function doneOnList(id, status) {
  const data = { done: status };
  putToList(id, data);
}

function changeToList(id, newText) {
  const data = { description: newText };
  putToList(id, data);
}

function putToList(id, data) {
  const thisUrl = url + "/" + id;
  const headerPut = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  fetch(thisUrl, headerPut).catch((err) => console.log(err));
}
