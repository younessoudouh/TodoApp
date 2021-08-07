let divDate = document.querySelector(".date");
let cardContent = document.querySelector(".card-content");
let btnSubmit = document.querySelector(".submit");
let inputNote = document.querySelector(".note");
let searchNote = document.querySelector(".search");

SetUpDate();
btnSubmit.addEventListener("click", addNote);
searchNote.addEventListener("keyup", filterNotes);
cardContent.addEventListener("click", checkNote)
cardContent.addEventListener("click", deleteNote);
inputNote.addEventListener("keyup", disabledBtn);
document.addEventListener('DOMContentLoaded', getNotes); // get data from localStorage

function disabledBtn() {
    if (inputNote.value.length >= 1) {
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
    day = day < 10 ? "0" + day : day;
    divDate.textContent = day + "Th" + " " + month + "," + " " + yearLastTwoDigit;

}

function createElements(noteText) {
    var newDiv = document.createElement("div");
    let circleDiv = document.createElement("div");
    let newNote = document.createElement("h3");

    newDiv.classList.add("new-note");
    circleDiv.classList.add("circle");
    newNote.classList.add("new-note-content");

    newNote.textContent = noteText;

    newDiv.appendChild(circleDiv);
    newDiv.appendChild(newNote);
    cardContent.insertBefore(newDiv, cardContent.firstElementChild);
}

function addNote() {
    let inputValue = inputNote.value;
    // add note to localstorage
    saveLocalNotes(inputValue);
    createElements(inputValue);
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

function deleteNote(e) {
    if (e.target.classList.contains("delet")) {
        if (confirm("are you sure!!")) {
            let textValue = e.target.previousElementSibling.textContent;
            //remove from localStorage
            removeLocalNotes(textValue);
            e.target.parentElement.classList.add("fall");
            document.querySelector(".fas").style.opacity = "1";
            e.target.parentNode.addEventListener("transitionend", () => {
                e.target.parentNode.remove();
                document.querySelector(".fas").style.opacity = "0";
            })
        }
    }
}

function checkNote(e) {
    if (e.target.classList.contains("delet")) {
        if (confirm("are you sure!!")) {
            let textValue = e.target.previousElementSibling.textContent;
            //remove from localStorage
            removeLocalNotes(textValue);
            e.target.parentElement.classList.add("fall");
            document.querySelector(".fas").style.opacity = "1";
            e.target.parentNode.addEventListener("transitionend", () => {
                e.target.parentNode.remove();
                document.querySelector(".fas").style.opacity = "0";
            })
        }
    }
}

function checkNote(e) {
    if (e.target.classList.contains("circle")) {
        if (e.target.firstElementChild != null) {
            e.target.firstElementChild.remove();
            e.target.parentElement.lastElementChild.remove();
        } else {
            let tick = document.createElement("div");
            let btn = document.createElement("button");
            btn.textContent = "X";
            btn.classList.add("delet")

            tick.classList.add("tick");
            e.target.appendChild(tick);
            e.target.parentElement.appendChild(btn)
        }
    }
}

function saveLocalNotes(note) {
    let notesSaved = checkLocalStr();

    notesSaved.push(note);
    localStorage.setItem("notesSaved", JSON.stringify(notesSaved));
}

function getNotes() {
    let notesSaved = checkLocalStr();

    notesSaved.forEach((note) => {
        createElements(note);

    });
}

function removeLocalNotes(note) {
    let notesSaved = checkLocalStr();
    //delet note from localstorage
    let noteIndex = notesSaved.indexOf(note);

    notesSaved.splice(noteIndex, 1);
    localStorage.setItem("notesSaved", JSON.stringify(notesSaved));
}

function checkLocalStr() {
    let notesSaved;

    if (localStorage.getItem("notesSaved") === null) {
        notesSaved = [];
    } else {
        notesSaved = JSON.parse(localStorage.getItem("notesSaved"));
    }

    return notesSaved;
}