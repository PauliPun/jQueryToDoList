/* I wanted to try out different ways of making an event:
 the convenience method and with event binding,
 which is why both of these are used in this project code.
 I kind of prefer the event binding method (.on()), and by referencing the function.  */

// Often used variables
var list = $(".todolist");
var option = $(".selectList");

//Event Handlers
$(".todolist").on("click", deleteItem); // Deleting an Item & Completing an Item function used here
$(".selectList").on("click", chooseList); // Choosing an Item from the select list

// Starter values for counters
$("#countAll").html(0);
$("#countUnfinished").html(0);
$("#countFinished").html(0);

//Calling functions
getTodo();
countA();
countB();
countC();

//FUNCTIONS ---->

//ADD NEW TO DO

$(".addbtn").click(function () {
  var listUl = $("<ul></ul>");
  listUl.addClass("list");
  listUl.addClass("unfinishedItem");
  // List Item
  var addedText = $(".inputBox").val();
  var todoItem = $("<li>" + addedText + "</li>");
  todoItem.addClass("todoItem").appendTo(listUl);
  // FINISHED BUTTON
  var finBtn = $("<button></button>");
  finBtn
    .html('<i class="fas fa-check fa-lg"></i>')
    .addClass("fin-btn")
    .appendTo(listUl);
  //DELETE BUTTON
  var delBtn = $("<button></button>");
  delBtn
    .html('<i class="fas fa-times fa-lg"></i>')
    .addClass("del-btn")
    .appendTo(listUl);
  // VALIDATION
  if (addedText == "" || addedText.length < 3) {
    alert("Add a proper task!");
    $(".inputBox").addClass("is-invalid");
    $(".inputBox").val("");
    return false;
  } else {
    listUl
      .hide() //hides the item so it can be faded in
      .appendTo(".todolist") //Appends the item
      .fadeIn(); //Fades in
    $(".inputBox").removeClass("is-invalid");
  }
  $(".inputBox").val("");
  countA();
  countB();
  countC();
  storeTodo();
});

//DELETE ITEM & COMPLETED ITEM

function deleteItem(e) {
  if (e.target.classList[0] == "del-btn") {
    var eTarget = $(e.target).parent();
    eTarget.fadeOut(function () {
      eTarget.remove(); //Fades Out and then removes the item
      storeTodo();
      countA();
    });
  }
  if (e.target.classList[0] == "fin-btn") {
    var eTarget = $(e.target).parent();
    eTarget.toggleClass("unfinishedItem"); //Takes away class .unfinishedItem
    eTarget.toggleClass("completed"); //Inputs class .completed
    storeTodo();
    countB();
    countC();
  }
}

//COUNTER FUNCTIONS

// Counter Function All Items
function countA() {
  var countAll = $("#countAll");
  var count = list.children().length;
  countAll.html(count);
}

// Counter Function Unfinished Items
function countB() {
  var allItems = list.children().length;
  var count = 0;
  var completedItems = 0;
  var i;
  for (i = 0; i < list.children().length; i++) {
    if (list.children().eq(i).hasClass("completed")) {
      completedItems = completedItems + 1;
    }
  }
  count = allItems - completedItems;
  $("#countUnfinished").html(count);
}

// Counter function finished Items
function countC() {
  var completedItems = 0;
  var list = $(".todolist");
  var i;
  for (i = 0; i < list.children().length; i++) {
    if (list.children().eq(i).hasClass("completed")) {
      completedItems = completedItems + 1;
    }
  }
  $("#countFinished").html(completedItems);
}

//CHOOSE FROM THE LIST  --> This time I'm using Switch statement

function chooseList() {
  for (i = 0; i < list.children().length; i++) {
    switch (option.val()) {
      case "all":
        list.children().eq(i).css("display", "flex");
        break;
      case "finished":
        if (list.children().eq(i).hasClass("completed")) {
          list.children().eq(i).css("display", "flex");
        } else {
          list.children().eq(i).css("display", "none");
        }
        break;
      case "unfinished":
        if (list.children().eq(i).hasClass("completed")) {
          list.children().eq(i).css("display", "none");
        } else {
          list.children().eq(i).css("display", "flex");
        }
        break;
    }
  }
  storeTodo();
}

//CLEAR ALL FUNCTION

$(".clear-btn").click(function () {
  var allItems = list.children();
  allItems.fadeOut(function () {
    allItems.remove(); //Fades Out and removes all items
    storeTodo();
    countA();
    countB();
    countC();
  });
});

//LOCALSTORAGE
function storeTodo() {
  localStorage.setItem("todos", list.html()); //Stores info
}

function getTodo() {
  list.html(localStorage.getItem("todos")); //Gets stored information
}

//SORTABLE TO DO LIST
$(".todolist").sortable(); //Makes the to do list sortable
