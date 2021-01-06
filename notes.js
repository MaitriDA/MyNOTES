 console.log('Welcome to my note app');
 showNotes();

//CALCULATION OF THE DATE
 function formatDate(pd) {
     var date = pd.getDate();
     var month = pd.getMonth();
     month++;
     var monTxt;
     if(month==1){
         monTxt="Jan";
     }
     else if(month==2){
         monTxt="Feb";
     }
     else if(month==3){
         monTxt="Mar";
     }
     else if(month==4){
         monTxt="Apr";
     }
     else if(month==5){
         monTxt="May";
     }
     else if(month==6){
         monTxt="Jun";
     }
     else if(month==7){
         monTxt="Jul";
     }
     else if(month==8){
         monTxt="Aug";
     }
     else if(month==9){
         monTxt="Sep";
     }
     else if(month==10){
         monTxt="Oct";
     }
     else if(month==11){
         monTxt="Nov";
     }
     else{
         monTxt="Dec";
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
     let myObj = {
         fixed: date,
         title: addTitle.value,
         text: addTxt.value
     }
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
         html += `<div id="singleNote">
         <div id="notesCard">
             <div id="titleBar">
                 <h2 class="cardTitle">${element.title}</h2>
                 <input type="checkbox" id="check">
                 <div class="downPanel">
                     <div class="colorContainer">
                         <div class='colorPick' id='yellow'></div>
                         <div class='colorPick' id='orange'></div>
                         <div class='colorPick' id='pink'></div>
                         <div class='colorPick' id='green'></div>
                         <div class='colorPick' id='blue'></div>
                         <div class='colorPick' id='gray'></div>
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

//DELETE NOTE
  function deleteNote(index) {
      console.log('I am deleting', index);
      let notes = localStorage.getItem("notes");
      if (notes == null) {
          notesObj = [];
      }
      else {
          notesObj = JSON.parse(notes);
      }
      notesObj.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      showNotes();
  }

//SEARCH
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    console.log('Input Event Fired', inputVal);
    let noteCards = document.getElementById('notesCard');
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

var yellow=document.getElementById("yellow");
var yellowCss=window.getComputedStyle(yellow, null).getPropertyValue("background-color");
var orange=document.getElementById("orange");
var orangeCss=window.getComputedStyle(orange, null).getPropertyValue("background-color");
var pink=document.getElementById("pink");
var pinkCss=window.getComputedStyle(pink, null).getPropertyValue("background-color");
var green=document.getElementById("green");
var greenCss=window.getComputedStyle(green, null).getPropertyValue("background-color");
var blue=document.getElementById("blue");
var blueCss=window.getComputedStyle(blue, null).getPropertyValue("background-color");
var gray=document.getElementById("gray");
var grayCss=window.getComputedStyle(gray, null).getPropertyValue("background-color");



let colorList=[yellowCss,orangeCss,pinkCss,greenCss,blueCss,grayCss];

let colorPicker=document.getElementsByClassName('colorPick');
let output=document.getElementById('titleBar');
console.log(colorPicker,output);

for(let i=0;i<colorPicker.length;i++){
    colorPicker[i].style.backgroundColor=colorList[i];
    colorPicker[i].addEventListener('click',function(){
        changeColor(colorList[i],i);
    })
}
colorListOther=['rgb(255 255 187)','rgb(255 227 174)','rgb(255 227 232)','rgb(191 255 191)','rgb(207 245 255)','rgb(230 230 230)'];
changeColor=(color,active)=>{
    for(let i=0;i<colorPicker.length;i++){
        colorPicker[i].classList.remove('active');
    }
    colorPicker[active].classList.add('active');
    output.style.backgroundColor=color;
    let notescolor=document.getElementById('notesCard')
    notescolor.style.backgroundColor=colorListOther[active];
}