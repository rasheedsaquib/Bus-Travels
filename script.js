const container=document.querySelector(".container");
const seats=document.querySelectorAll(".row .seat:not(.booked)");
const count =document.getElementById("count");
const total =document.getElementById("total");
const busSelect=document.getElementById("bus");

populateUI();

let ticketPrice= +busSelect.value;

function setBusDate(busIndex, busPrice){
    localStorage.setItem("selectedBusIndex", busIndex);
    localStorage.setItem("selectedBusPrice", busPrice);

}

function updateSelectedCount(){
    const selectedSeats=document.querySelectorAll("row .seat.selected");

    const seatsIndex ={...selectedSeats}.map((seat)=>[...seats].indexOf(seat));

    localStorage.setItem('selectedSeats' , JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    setBusDate(busSelect.selectedIndex, busSelect.value);

}

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if(selectedSeats !==null && selectedSeats.length>1){
        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index)> +1){
            console.log(seat.classList.add("selected"));
        }
       });
    }

const selectedBusIndex=localStorage.getItem("selectedBusIndex");

if (selectedBusIndex !==null){
    busSelect.selectedIndex=selectedBusIndex;
    console.log(selectedBusIndex)
}
}
console.log(populateUI())

busSelect.addEventListener("change",(e)=>{
ticketPrice = +e.target.value;
setBusDate(e.target.selectedIndex, e.target.value);
updateSelectedCount();
}
);

container.addEventListener("click", (e)=>{
    if(
        e.target.classList.contains("seat")&&
        !e.target.classList.contains("booked")
    ){
        e.target.classList.toggle("selected");
        updateSelectedCount();
    }
});



updateSelectedCount();