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
      .appendTo(".todolist")
      .fadeIn();
    $(".inputBox").removeClass("is-invalid");
  }
  $(".inputBox").val("");
});

//DELETE ITEM & COMPLETED ITEM
$(".todolist").on("click", deleteItem); // Event handler

function deleteItem(e) {
  if (e.target.classList[0] == "del-btn") {
    var eTarget = $(e.target).parent();
    eTarget.fadeOut(function () {
      $(this).remove();
    });
  }
  if (e.target.classList[0] == "fin-btn") {
    var eTarget = $(e.target).parent();
    eTarget.toggleClass("unfinishedItem"); //Takes away class .unfinishedItem
    eTarget.toggleClass("completed"); //Inputs class .completed
  }
}

//COUNTER FUNCTION

//CHOOSE FROM THE LIST

$(".selectList").on("click", chooseList); // Event handler
/*
function chooseList() {
  var i;
  var list = $(".todolist");
  var option = $(".selectList");

  if (option.val() == "finished") {
    for (i = 0; i < list.children().length; i++) {
      if (list.children(i).hasClass("completed")) {
        list.children(i).css("display", "flex"); //Shows those items that have class .completed
      } else {
        list.children(i).css("display", "none"); //Hides those items that do not have the class
      }
    }
  } else if (option.val() == "unfinished") {
    for (i = 0; i < list.children().length; i++) {
      if (list.children(i).hasClass("unfinishedItem")) {
        list.children(i).css("display", "flex"); //Shows those items that have class .unfinishedItem
      } else {
        list.children(i).css("display", "flex"); //Hides those items that do not have the class
      }
    }
  } else if (option.val() == "all") {
    for (i = 0; i < list.children().length; i++) {
      list.children(i).css("display", "flex"); //Shows all items
    }
  }
}
*/

function chooseList() {
  var list = $(".todolist");
  var option = $(".selectList");

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
}

//CLEAR ALL FUNCTION

//LOCALSTORAGE
function storeTodo() {
  localStorage.setItem("todos", list.innerHTML); //Stores info
}

function getTodo() {
  list.innerHTML = localStorage.getItem("todos"); //Gets stored information
}

//SORTABLE TO DO LIST
$(function () {
  $(".todolist").sortable();
});
