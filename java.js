// $(document).ready(function(){
// $("#add").click(function(){
//     let item = $("#text_item").val();
//     $("#todolist").append(`<li class = "item">${item}</li>`);
//     $("#text_item").val('');
// })
// $("html").on('click', '.item', function() {
//     $(this).fadeOut(3000);
//     setTimeout(() =>$(this).remove(), 3000);
// })

// let th = 0;
// $(".theme").on('click',function(){
// th= 1- th;
// if(th)
// {

//     $(this).addClass("light");
//     $(this).text("Light there")
//     $("body").css("background", "linear-gradient(270deg, rgb(183, 7, 242), rgb(8, 214, 255))")
// }
// else{
//     $(this).removeClass("light");
//     $(this).text("Dark there")
//     $("body").css("background-image", "linear-gradient(270deg, rgb(87, 3, 115), rgb(1, 88, 106))")
// }
// })
// });


$(document).ready(function(){
    // Додавання нотатки
    // $("#add").click(function(){
    //     let item = $("#text_item").val();
    //     $("#all_notes").append(`<li class="item">${item}</li>`);
    //     $("#text_item").val('');
    // });

    // Видалення нотатки по кліку
    $("html").on('click', '.item', function() {
        $(this).fadeOut(3000);
        setTimeout(() => $(this).remove(), 3000);
    });

    // Темна/світла тема
    let th = 0;
    $(".theme").on('click', function(){
        th = 1 - th;
        if(th) {
            $(this).addClass("light");
            $(this).text("Light theme");
            $("body").css("background", "linear-gradient(270deg, rgb(183, 7, 242), rgb(8, 214, 255))");
        } else {
            $(this).removeClass("light");
            $(this).text("Dark theme");
            $("body").css("background", "linear-gradient(270deg, rgb(87, 3, 115), rgb(1, 88, 106))");
        }
    });

    // Показ/приховування вікна нотаток
    $(".circle").click(function(){
        $(".wrapper").fadeToggle(500);
    });

     $(".dots").click(function(e){
    e.stopPropagation(); // щоб не закривалось одразу
    $(this).siblings(".menu-content").fadeToggle(200);
  });

  // Закриває меню якщо натиснув поза ним
  $(document).click(function(){
    $(".menu-content").fadeOut(200);
  });

  // Обробники кнопок
  $(document).on("click", ".edit", function(){
    alert("Edit clicked");
  });

  $(document).on("click", ".delete", function(){
    alert("Delete clicked");
  });

  $(document).on("click", ".archive", function(){
    alert("Archive clicked");
  });
  

  $("#add").click(function(){
    let item = $("#text_item").val();
    if(item.trim() === "") return; // якщо поле порожнє — нічого не додаємо

    // додаємо нотатку в список
    $(".all_notes").append(`
        <div class="note">
            <h1>${item}</h1>
            <p>Description</p>
            
            <div class="menu">
                <div class="dots">⋮</div>
                <div class="menu-content">
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                    <button class="archive">Archive</button>
                </div>
            </div>
        </div>
    `);

    // очищаємо поле вводу
    $("#text_item").val('');
});
});
