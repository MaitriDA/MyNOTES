console.log('Welcome to my note app');
showNotes();

//CALCULATE THE DATE
function formatDate(pd) {
    var date = pd.getDate();
    var month = pd.getMonth();
    month++;
    var monTxt;
    if (month == 1) {
        monTxt = "Jan";
    }
    else if (month == 2) {
        monTxt = "Feb";
    }
    else if (month == 3) {
        monTxt = "Mar";
    }
    else if (month == 4) {
        monTxt = "Apr";
    }
    else if (month == 5) {
        monTxt = "May";
    }
    else if (month == 6) {
        monTxt = "Jun";
    }
    else if (month == 7) {
        monTxt = "Jul";
    }
    else if (month == 8) {
        monTxt = "Aug";
    }
    else if (month == 9) {
        monTxt = "Sep";
    }
    else if (month == 10) {
        monTxt = "Oct";
    }
    else if (month == 11) {
        monTxt = "Nov";
    }
    else {
        monTxt = "Dec";
    }
    return date + " " + monTxt;
}

//ADD THE CONTENT THAT THE USER TYPES IN THE TEXT AREA TO LOCAL STORAGE
let addBtn = document.getElementById('add');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    var fullDate = new Date();
    var date = formatDate(fullDate);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    var tcolor = "#ffff87";
    var ncolor = "rgb(255 255 187)"
    var myObj = {
        title: addTitle.value,
        text: addTxt.value,
        fixed: date,
        titleColor: tcolor,
        notesColor: ncolor
    };
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
})

//DISPLAY THE NOTES 
function showNotes() {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        //COLOR PANEL
        var getTitleFronLS=notesObj[index].titleColor;
        let newTitleColor;
        let newNotesColor;
        if(getTitleFronLS=='#ffff87'){
            newTitleColor='#ffff87';
            newNotesColor='rgb(255 255 187)';
        }
        else if(getTitleFronLS=='#ffc862'){
            newTitleColor='#ffc862';
            newNotesColor='rgb(255 227 174)';
        }
        else if(getTitleFronLS=='#ffc0cb'){
            newTitleColor='#ffc0cb';
            newNotesColor='rgb(255 227 232)';
        }
        else if(getTitleFronLS=='#89ff89'){
            newTitleColor='#89ff89';
            newNotesColor='rgb(191 255 191)';
        }
        else if(getTitleFronLS=='#94e8ff'){
            newTitleColor='#94e8ff';
            newNotesColor='rgb(207 245 255)';
        }
        else if(getTitleFronLS=='#bdbdbd'){
            newTitleColor='#bdbdbd';
            newNotesColor='rgb(230 230 230)';
        }
        
        html += `<div id="singleNote">
                <div class="notesCard" id="${index + notesObj.length + 1}" style="background-color: ${newNotesColor}">
                <div class="titleBar" id="${index}" style="background-color: ${newTitleColor}">
                    <h2 class="cardTitle">${element.title}</h2>
                    <input type="checkbox" id="check">
                    <div class="downPanel">
                        <div class="colorContainer">
                            <button id="yellow" class='colorPick yellow' onclick="setLocalStorage(${index},${notesObj.length},'#ffff87','rgb(255 255 187)')"></button>
                            <button id="orange" class='colorPick orange' onclick="setLocalStorage(${index},${notesObj.length},'#ffc862','rgb(255 227 174)')"></button>
                            <button id="pink" class='colorPick pink' onclick="setLocalStorage(${index},${notesObj.length},'#ffc0cb','rgb(255 227 232)')"></button>
                            <button id="green" class='colorPick green' onclick="setLocalStorage(${index},${notesObj.length},'#89ff89','rgb(191 255 191)')"></button>
                            <button id="blue" class='colorPick blue' onclick="setLocalStorage(${index},${notesObj.length},'#94e8ff','rgb(207 245 255)')"></button>
                            <button id="gray" class='colorPick gray' onclick="setLocalStorage(${index},${notesObj.length},'#bdbdbd','rgb(230 230 230)')"></button>
                        </div>
                        <button id="${index}" onclick="deleteNote(this.id)" class="delete"><i class="fa fa-trash-o"> DELETE</i></button>
                    </div>
                    <div class="hamburgerLines">
                        <span class="line line1"></span>
                        <span class="line line2"></span>
                        <span class="line line3"></span>
                    </div>
                    <div class="cross">X</div>
                </div>
                <p class="cardTxt">${element.text}</p>
                <div id="bottom">${element.fixed}</div>
            </div>
        </div>`;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to Show`
    }
}
var getNotes = localStorage.getItem("notes[0]");
console.log("getnotes", getNotes);

//DELETE NOTE
function deleteNote(index) {
    console.log('I am deleting', index);
    var notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    console.log("now", notesObj[1]);
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
//SEARCH NOTE
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    console.log('Input Event Fired', inputVal);
    let noteCards = document.getElementsByClassName('notesCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})

//SET THE LOCAL STORAGE
var colorTitle;
var colorNotes;
function setLocalStorage(index, length,colorTitle,colorNotes) {
    notesObj[index].titleColor=colorTitle;
    notesObj[index].notesColor=colorNotes;
    localStorage.setItem("notes",JSON.stringify(notesObj));
    index.innerHTML=document.getElementById(index).style.backgroundColor =colorTitle;
    document.getElementById(index + length + 1).style.backgroundColor = colorNotes;
}
