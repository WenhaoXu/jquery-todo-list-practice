$(document)
    .ready(function () {

        function generateUUID() {
            /*jshint bitwise:false */
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }




        $("#button").click(function () {
            if ($(".input-text").text() != null) {
                let uuid = generateUUID();
                let input = $(".input-text").val();
                $("ol").append(`<li id=${uuid} class=\"\">
                      <input name=\"done-todo\" type=\"checkbox\" class=\"checked\" >${input} </li>`);
                $(".input-text").val("");
            }
            else {
                alert("should not null")
            }
        })

        $(".done-todo").change(function () {
            if ($(this).parent().attr("class") == "") {
                $(this).parent().attr("class", "checked");
            }
            else {
                $(this).parent().attr("class", "");
            }
        })


        $("span").click(function () {
              $(this).val("");
              $(this).parent().d
        })


        $("a").click(function () {

            if ($(this).attr("data-filter") === "all") {
                // $("ol").html("");
                $("ol").children().each(function () {
                    $(this).css("display",'block');
                })
            }
            if ($(this).attr("data-filter") === "active") {
                $("ol").children().each(function () {
                   if($(this).attr("class")==="checked"){
                       $(this).css("display",'none');
                   }
                   else {
                       $(this).css("display",'block');
                   }
                })
            }
            if ($(this).attr("data-filter")=== "complete") {
                $("ol").children().each(function () {
                    if($(this).attr("class")!="checked"){
                        $(this).css("display",'none');
                    }
                    else{
                        $(this).css("display",'block');
                    }
                })
            }
        })


        $("ol >li").dblclick(function () {
            $(this).attr("contenteditable","true");
            $(this).bind('keypress',function(event) {
                if (event.keyCode == "13") {
                    $(this).attr("contenteditable", "false");
                }
            });
        })

    });