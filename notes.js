console.log('Welcome to my note app');
showNotes();

//CALCULATION OF THE DATE
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

//DISPLAY THE NOTES IN TEH NOTES SECTION
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
                            <button id="yellow" class='colorPick yellow' onclick="yellowCss(${index},${notesObj.length})"></button>
                            <button id="orange" class='colorPick orange' onclick="orangeCss(${index},${notesObj.length})"></button>
                            <button id="pink" class='colorPick pink' onclick="pinkCss(${index},${notesObj.length})"></button>
                            <button id="green" class='colorPick green' onclick="greenCss(${index},${notesObj.length})"></button>
                            <button id="blue" class='colorPick blue' onclick="blueCss(${index},${notesObj.length})"></button>
                            <button id="gray" class='colorPick gray' onclick="grayCss(${index},${notesObj.length})"></button>
                        </div>
                        <button id="${index}" onclick="deleteNote(this.id)" class="delete">delete</button>
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
//SEARCH
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

//COLOR PANEL
function yellowCss(index, length) {
    notesObj[index].titleColor='#ffff87';
    notesObj[index].notesColor='rgb(255 255 187)';
    localStorage.setItem("notes",JSON.stringify(notesObj));
    document.getElementById(index).style.backgroundColor = '#ffff87';
    document.getElementById(index + length + 1).style.backgroundColor = 'rgb(255 255 187)';
}
function orangeCss(index, length) {
    notesObj[index].titleColor='#ffc862';
    notesObj[index].notesColor='rgb(255 227 174)';
    localStorage.setItem("notes",JSON.stringify(notesObj));
    index.innerHTML=document.getElementById(index).style.backgroundColor = '#ffc862';
    document.getElementById(index + length + 1).style.backgroundColor = 'rgb(255 227 174)';
}
function pinkCss(index, length) {
    notesObj[index].titleColor='#ffc0cb';
    notesObj[index].notesColor='rgb(255 227 232)';
    localStorage.setItem("notes",JSON.stringify(notesObj));
    document.getElementById(index).style.backgroundColor = '#ffc0cb';
    document.getElementById(index + length + 1).style.backgroundColor = 'rgb(255 227 232)';
}
function greenCss(index, length) {
    notesObj[index].titleColor='#89ff89';
    notesObj[index].notesColor='rgb(191 255 191)';
    localStorage.setItem("notes",JSON.stringify(notesObj));
    document.getElementById(index).style.backgroundColor = '#89ff89';
    document.getElementById(index + length + 1).style.backgroundColor = 'rgb(191 255 191)';
}
function blueCss(index, length) {
    notesObj[index].titleColor='#94e8ff';
    notesObj[index].notesColor='rgb(207 245 255)';
    localStorage.setItem("notes",JSON.stringify(notesObj));
    document.getElementById(index).style.backgroundColor = '#94e8ff';
    document.getElementById(index + length + 1).style.backgroundColor = 'rgb(207 245 255)';
}
function grayCss(index, length) {
    notesObj[index].titleColor='#bdbdbd';
    notesObj[index].notesColor='rgb(230 230 230)';
    localStorage.setItem("notes",JSON.stringify(notesObj));
    document.getElementById(index).style.backgroundColor = '#bdbdbd';
    document.getElementById(index + length + 1).style.backgroundColor = 'rgb(230 230 230)';
}