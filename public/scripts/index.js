let responseDom = document.getElementById("response");

let btn = document.getElementById("fetchButton");

let responeParagraph = document.getElementById("response");

console.log(responeParagraph);

console.log(btn);

async function fetchData() {
  try {
    let url = "/res";

    let response = await fetch(url);

    if (!response.ok) {
      throw error;
    }
    let data = await response;

    console.log(data);

    responeParagraph.textContent =
      "URL " +
      response.url +
      " og status iueleuehlukoden er " +
      response.status;
  } catch (error) {
    console.log(error);
  }
}

btn.addEventListener("click", function () {
  console.log("click");
  fetchData();
});
