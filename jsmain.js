//ADD NEW TO DO
$(".addbtn").click(function () {
  var listUl = $("<ul></ul>");
  listUl.addClass("list", "unfinishedItem");
  // List Item
  var addedText = $(".inputBox").val();
  var todoItem = $("<li>" + addedText + "</li>");
  todoItem.addClass("todoItem");
  todoItem.appendTo(listUl);
  // FINISHED BUTTON
  var finBtn = $("<button></button>");
  finBtn.html('<i class="fas fa-check fa-lg"></i>');
  finBtn.addClass("fin-btn");
  finBtn.appendTo(listUl);
  //DELETE BUTTON
  var delBtn = $("<button></button>");
  delBtn.html('<i class="fas fa-times fa-lg"></i>');
  delBtn.addClass("del-btn");
  delBtn.appendTo(listUl);
  // VALIDATION
  if (addedText == "" || addedText.length < 3) {
    alert("Add a proper task!");
    $(".inputBox").addClass("is-invalid");
    $(".inputBox").val("");
    return false;
  } else {
    listUl.hide(); //hides the item so it can be faded in
    listUl.appendTo("#list");
    listUl.fadeIn();
    $(".inputBox").removeClass("is-invalid");
  }
  $(".inputBox").val("");
});

//DELETE ITEM

$(".del-btn").click(function () {});

//COMPLETED ITEM
$(".fin-btn").click(function () {});

//COUNTER FUNCTION

//CHOOSE FROM THE LIST

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
  $("#list").sortable();
});
