$(document).ready(function () {
  let currentUser = null;
  let th = 0;

  // Темна/світла тема
  $(".theme").on("click", function () {
    th = 1 - th;
    if (th) {
      $(this).addClass("light").text("Light theme");
      $("body").css(
        "background",
        "linear-gradient(270deg, rgb(183, 7, 242), rgb(8, 214, 255))"
      );
    } else {
      $(this).removeClass("light").text("Dark theme");
      $("body").css(
        "background",
        "linear-gradient(270deg, rgb(87, 3, 115), rgb(1, 88, 106))"
      );
    }
  });

  // Вхід
  $("#login").click(function () {
    let username = $("#username").val().trim();
    if (username === "") {
      alert("Введіть логін!");
      return;
    }
    currentUser = username;
    localStorage.setItem("currentUser", currentUser);
    $(".login-wrapper").hide();
    $("#logout").show();
    $(".add_note").show();
    loadNotes();
  });

  // Вихід
  $("#logout").click(function () {
    currentUser = null;
    localStorage.removeItem("currentUser");
    $(".login-wrapper").show();
    $("#logout").hide();
    $(".add_note").hide();
    $(".notes_list").empty();
  });

  // Показ/приховування вікна нотаток
  $(document).on("click", ".circle", function () {
    $(".wrapper").fadeToggle(500);
  });

  // Додавання нотатки
  $("#add").click(function () {
    let item = $("#text_item").val();
    if (item.trim() === "") return;

    const currentDate = new Date().toLocaleString();

    const noteHTML = `
            <div class="note">
                <h1>${item}</h1>
                <p>Description</p>
                <p class="created-date">Created: ${currentDate}</p>
                <p class="modified-date">Modified: ${currentDate}</p>
                <div class="menu">
                    <div class="dots">⋮</div>
                    <div class="menu-content" style="display:none;">
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                        <button class="archive">Archive</button>
                    </div>
                </div>
            </div>
        `;

    $(".notes_list").append(noteHTML);
    saveNotes();
    $("#text_item").val("");
    $(".wrapper").fadeOut(300);
  });

  // Меню три крапки
  $(document).on("click", ".dots", function (e) {
    e.stopPropagation();
    $(".menu-content").fadeOut(200);
    $(this).siblings(".menu-content").fadeToggle(200);
  });

  // Закриття меню при кліку поза ним
  $(document).click(function () {
    $(".menu-content").fadeOut(200);
  });

  // Edit
  $(document).on("click", ".edit", function (e) {
    e.stopPropagation();
    let note = $(this).closest(".note");
    let title = note.find("h1");
    let currentText = title.text();

    if (note.find("input.edit-input").length) {
      let newText = note.find("input.edit-input").val();
      if (newText.trim() !== "") {
        title.text(newText);
        let now = new Date().toLocaleString();
        note.find(".modified-date").text("Modified: " + now);
        saveNotes();
      }
      note.find("input.edit-input").remove();
      $(this).text("Edit");
      title.show();
    } else {
      title.hide();
      title.after(`<input type="text" class="edit-input" value="${currentText}">`);
      $(this).text("Save");
    }
  });

  // Delete
  $(document).on("click", ".delete", function (e) {
    e.stopPropagation();
    $(this).closest(".note").fadeOut(500, function () {
      $(this).remove();
      saveNotes();
    });
  });

  // Archive
  $(document).on("click", ".archive", function (e) {
    e.stopPropagation();
    let note = $(this).closest(".note");
    note.toggleClass("archived");
    note.appendTo(".notes_list");
    saveNotes();
  });

  // Збереження нотаток у localStorage
  function saveNotes() {
    if (!currentUser) return;
    let notesHTML = $(".notes_list").html();
    localStorage.setItem("notes_" + currentUser, notesHTML);
  }

  // Завантаження нотаток користувача
  function loadNotes() {
    if (!currentUser) return;
    let notesHTML = localStorage.getItem("notes_" + currentUser);
    if (notesHTML) {
      $(".notes_list").html(notesHTML);
    }
  }

  // Початковий стан
  $(".add_note").hide();
  $("#logout").hide();

  // Якщо є збережений користувач
  let savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    currentUser = savedUser;
    $(".login-wrapper").hide();
    $("#logout").show();
    $(".add_note").show();
    loadNotes();
  }

  if ($(".add_note").length > 1) {
  $(".add_note").slice(1).remove();
}
});