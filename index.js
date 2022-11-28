const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 100000),
  };
  console.log(newUser);
  addData(newUser);
}

function addData(obj){
	data.push(obj)
	console.log(data);
	updateDOM();
	

}
//double money
function doubleMoney(){
	data=data.map((user)=>{
		return {...user,money:user.money*2}
	})
	updateDOM();
}
//filter only millionaires
function showMillionaires() {
	data = data.filter((user) => user.money > 1000000);
	updateDOM();
  }

//sort by the richest
function sorttherichest(){
	data=data.sort((a,b)=> b.money-a.money);
	updateDOM();
}
//calculate total wealth
function totalwealth(){
    const wealth=data.reduce((a,b)=>(a+b.money),0);
	console.log(wealth)
	const wealthelement=document.createElement('div');
	wealthelement.innerHTML=`<h3>Total Wealth:<strong>${formatMoney(wealth)}</strong></h3>`;
	main.appendChild(wealthelement)
   // updateDOM();
}
function updateDOM(providedData=data){
	main.innerHTML='<h2><strong>Person</strong> Wealth</h2>';
    providedData.forEach(item=>{
		const element=document.createElement('div');
		element.classList.add('person');
		element.innerHTML=`<strong>${item.name}</strong> ${formatMoney(item.money)}`
		main.appendChild(element);
	})
}
function formatMoney(number){
	return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
showMillionairesBtn.addEventListener('click',showMillionaires);
sortBtn.addEventListener('click',sorttherichest);
calculateWealthBtn.addEventListener('click',totalwealth)