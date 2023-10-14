// send data to a page based on id
const currentUrl = window.location.href;
const splittedValue = currentUrl.split('id=')

const url = `https://letterio-backend.onrender.com/cards`
console.log(splittedValue[1]);

async function fetchData() {
	const res = await fetch(`${url}/${splittedValue[1]}`) 
	const data = await res.json() 
	console.log(res);
	console.log(data);
	updateText(data)
	return data
}

async function updateText(data){
	const html =  `
    <div class="letter--head">
      <h1 class="text-xxl-light">${data.title}</h1>
      <p class="letter--date">Date: 12-11-2023</p>
    </div>
    <p class="cards--para letter--salutation">Dear Rio,</p>
    <p class="cards--para letter--container">
      ${data.writeup}
    </p>
    <p class="letter--closing">${data.closing},</p>
    <p class="letter--from">${data.writerName}</p>
`
  document
    .querySelector(".letter--section--container")
    .insertAdjacentHTML("afterbegin", html);
	
}
	  fetchData()