let divDate = document.querySelector(".date");

setInterval(upDate, 100)

function upDate() {
    let date = new Date();
    let month = date.toLocaleString('default', { month: 'long' });
    let day = date.getUTCDate();
    let year = date.getFullYear() + "";
    let yearLastTwoDigit = year.slice(2);
    console.log(day)
    divDate.textContent = day + "Th" + " " + month + " " + "," + yearLastTwoDigit;
    console.log(yearLastTwoDigit)
}