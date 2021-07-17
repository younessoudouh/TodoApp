let divDate = document.querySelector(".date");
let cardContent = document.querySelector(".card-content");
let btnSubmit = document.querySelector(".submit");
let inputNote = document.querySelector(".note");
let searchNote = document.querySelector(".search");
let notesToDelet = Array.from(document.querySelectorAll(".new-note"))



setInterval(SetUpDate, 1000);
btnSubmit.addEventListener("click", addNote);
searchNote.addEventListener("keyup", filterNotes);
cardContent.addEventListener("click", deletNote);
inputNote.addEventListener("keyup", disabledBtn)
document.addEventListener('DOMContentLoaded', getNotes) // get data from localStorage


function disabledBtn() {
    if (inputNote.value.length > 1) {
        btnSubmit.disabled = false;
    } else {
        btnSubmit.disabled = true;
    }
}


function SetUpDate() {
    let date = new Date();
    let month = date.toLocaleString('default', { month: 'long' });
    let day = date.getDate();
    console.log({ today: day })
    let year = date.getFullYear() + "";
    let yearLastTwoDigit = year.slice(2);
    divDate.textContent = day + "Th" + " " + month + "," + " " + yearLastTwoDigit;

}

function addNote() {

    var newDiv = document.createElement("div");
    let circleDiv = document.createElement("div");
    let newNote = document.createElement("h3");

    newDiv.classList.add("new-note");
    circleDiv.classList.add("circle");
    newNote.classList.add("new-note-content");

    newNote.textContent = inputNote.value;

    // add note to localstorage

    saveLocalNotes(newNote.textContent);

    newDiv.appendChild(circleDiv);
    newDiv.appendChild(newNote);
    cardContent.insertBefore(newDiv, cardContent.firstElementChild);
    inputNote.value = "";
    btnSubmit.disabled = true;
}

function filterNotes(e) {
    let notes = Array.from(document.getElementsByTagName("h3"));
    let text = e.target.value.toLowerCase();

    notes.forEach((note) => {

        if (note.textContent.toLowerCase().indexOf(text) != -1) {
            note.parentElement.classList.add("show")
            note.parentElement.classList.remove("hide")

        } else {
            note.parentElement.classList.remove("show")
            note.parentElement.classList.add("hide")
        }
    })

}

function deletNote(e) {

    if (e.target.classList.contains("circle")) {

        if (e.target.firstElementChild != null) {
            if (confirm("are you sure!!")) {
                let textValue = e.target.parentElement.lastElementChild.textContent;
                //remove from localStorage
                removeLocalNotes(textValue)
                e.target.parentNode.remove()
            }
        } else {
            let tick = document.createElement("div");
            tick.classList.add("tick");
            e.target.appendChild(tick);
        }

    }

}

function saveLocalNotes(note) {
    let notesSaved;

    if (localStorage.getItem("notesSaved") === null) {
        notesSaved = [];
    } else {
        notesSaved = JSON.parse(localStorage.getItem("notesSaved"));
    }
    notesSaved.push(note);
    localStorage.setItem("notesSaved", JSON.stringify(notesSaved))

}

function getNotes() {
    let notesSaved;
    if (localStorage.getItem("notesSaved") === null) {
        notesSaved = [];
    } else {
        notesSaved = JSON.parse(localStorage.getItem("notesSaved"))
    }

    notesSaved.forEach((note) => {
        var newDiv = document.createElement("div");
        let circleDiv = document.createElement("div");
        let newNote = document.createElement("h3");

        newDiv.classList.add("new-note");
        circleDiv.classList.add("circle");
        newNote.classList.add("new-note-content");

        newNote.textContent = note;
        newDiv.appendChild(circleDiv);
        newDiv.appendChild(newNote);
        cardContent.insertBefore(newDiv, cardContent.firstElementChild);
    })
}

function removeLocalNotes(note) {
    let notesSaved;

    if (localStorage.getItem("notesSaved") === null) {
        notesSaved = [];
    } else {
        notesSaved = JSON.parse(localStorage.getItem("notesSaved"));
    }
    let noteIndex = notesSaved.indexOf(note);
    console.log(`index = ${noteIndex}`)
    notesSaved.splice(noteIndex, 1);
    localStorage.setItem("notesSaved", JSON.stringify(notesSaved))
}