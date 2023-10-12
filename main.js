const url = `http://localhost:3000/cards`;

//fetching card data and rendering it to DOM
const getData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw Error("This url is not available in the server:404");
  }
  const json = await response.json();
  return json;
};

try {
  const data = await getData(url);
  console.log(data);
  const html = data
    .map(
      (card) => `<div class="cards">
  <h1><a href=./page.html?id=${card.id}>${card.title}</a></h1>
  <p class="cards--para">${card.writeup}</p>
  <p class="cards--closing">${card.closing}</p>
  <p>${card.writerName}</p>
</div>`
    )
    .join("");
  document
    .querySelector(".display--section--cards--wrapper")
    .insertAdjacentHTML("afterbegin", html);
} catch (error) {
  console.log(error);
}

//form post request
const postData = async(url) => {
  const response = await fetch(url,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({a: 1, b: 'Textual content'})
  })
  const json = await response.json();
  return json;
}


//quill code 
var container = document.getElementById('editor');
var quill = new Quill(container, {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['blockquote'],
      ['link'],
    ]
  },
  placeholder: 'Compose an epic...',
  theme: 'snow'  // or 'bubble'
});
