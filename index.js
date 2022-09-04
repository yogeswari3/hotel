const menuToggle=document.querySelector('.toggle');
const navigation=document.querySelector('.navigation');
function toggleMenu(){
    menuToggle.classList.toggle('active')
    navigation.classList.toggle('active')
}
var nav = document.querySelector('navbar'); // Identify target

window.addEventListener('scroll', function(event) { // To listen for event
    event.preventDefault();

    if (window.scrollY > 10) { // Just an example
        nav.classList.add('nav-scroll');
    } else {
        nav.classList.remove("nav-scroll");
     }
});

const selectedmessage=document.querySelector('.selected-message');
/*function generatealert(){
    selectedmessage.classList.add('active');
}*/
function removealert(){
    selectedmessage.classList.remove('active');
}

const searchbtn = document.querySelectorAll('.search-form');
let searchdata = [];
for(let i=0; i<searchbtn.length; i++){
    searchbtn[i].addEventListener("click",function(e){
        localStorage.setItem('rooms',null);
        if(typeof(Storage) !== 'undefined'){
            let data = {
                chechindate:e.target.parentElement.children[0].value,
                checkoutdate:e.target.parentElement.children[1].value,
                adultsno:e.target.parentElement.children[2].children[0].value,
                childreno:e.target.parentElement.children[3].children[0].value
            };
            searchdata.push(data);
            localStorage.setItem("searchdata",JSON.stringify(searchdata));
            //window.location.reload();
            searchdata=[];
        }else{
            alert('local storage is not working on your browser');
        }
    });
}

const attToCartBtn = document.querySelectorAll('.rooms .room .det-section .det-inner .button button');
let rooms = [];
for(let i=0; i<attToCartBtn.length; i++){
    attToCartBtn[i].addEventListener("click",function(e){
        selectedmessage.classList.add('active');
        
        if(typeof(Storage) !== 'undefined'){
            let room = {
                    name:e.target.parentElement.parentElement.children[1].textContent,
                    price:e.target.parentElement.parentElement.children[0].children[0].textContent,
                    priceperiod:e.target.parentElement.parentElement.children[0].children[1].textContent,
                    no:1
                };
            if(JSON.parse(localStorage.getItem('rooms')) === null){
                rooms.push(room);
                localStorage.setItem("rooms",JSON.stringify(rooms));
                //window.location.reload();
                rooms=[];
            }else{
                const localItems = JSON.parse(localStorage.getItem("rooms"));
                localItems.map(data=>{
                    room.no = data.no +1;
                    rooms.push(data);
                });
                rooms.push(room);
                localStorage.setItem('rooms',JSON.stringify(rooms));
                //window.location.reload();
                rooms=[];
            }
        }else{
            alert('local storage is not working on your browser');
        }
    });
}

//adding data to cart
var cartdates = document.querySelector('.dates');
var cartItems = document.querySelector('.cart-items');
var bookNow = document.querySelector('.book-now');
var cartRowContents='';
var cartdatescontent='';
var currentdate=new Date();
var total=0;
if(JSON.parse(localStorage.getItem('searchdata')) === null){
    cartdatescontent += `
        <p>Your dates from ${currentdate.getFullYear()}-${currentdate.getMonth()}-${currentdate.getDate()} to ${currentdate.getFullYear()}-${currentdate.getMonth()}-${currentdate.getDate()}</p>
        <p>2 Adults , 2 Children</p>`
}else{
    JSON.parse(localStorage.getItem('searchdata')).map(data=>{
        cartdatescontent += `
        <p>Your dates from ${data.chechindate} to ${data.checkoutdate}</p>
        <p>${data.adultsno} Adults , ${data.childreno} Children</p>`
    });
}

if(JSON.parse(localStorage.getItem('rooms')) === null || localStorage.rooms.length === 2){
    cartRowContents += `
        <div class="cart-item empty">
            <p>Cart is empty</p>
            <div class="cart-empty-button"><a href="rooms.html"><button>Rooms</button></a></div>
        </div>`
}else{
    JSON.parse(localStorage.getItem('rooms')).map(data=>{
        total=total+parseInt(data.price);
        cartRowContents += `
            <div class="cart-item">
                <div class="cart-item-number">${data.no}</div>
                <div class="cart-item-title">${data.name}</div>
                <div class="cart-item-price">$${data.price} ${data.priceperiod}</div>
                <div class="cart-item-button"><button type="button" onclick=Delete(${data.no})>REMOVE</button></div>
            </div>`
    });
}
cartdates.innerHTML += cartdatescontent;
cartItems.innerHTML += cartRowContents;
bookNow.children[0].children[1].innerHTML=total;

function Delete(number){
	let rooms = [];
    let num=1;
	JSON.parse(localStorage.getItem('rooms')).map(data=>{
		if(data.no != number){
            data.no = num;
			rooms.push(data);
            num+=1;
		}
	});
	localStorage.setItem('rooms',JSON.stringify(rooms));
	window.location.reload();
};