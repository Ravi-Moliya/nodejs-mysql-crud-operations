
$(document).ready(function () {
    $(document).on('click', '#managepager li', function (e) {
        if (parseInt($(this).attr("data-indexid")) != -1 && parseInt($(this).attr("data-indexid")) != 0) {
           
            $("#managepager li").removeClass("active");
            $(this).addClass("active");
            $("#tablebody tr").css("display", "none");
            $("[data-row-id='" + parseInt($(this).attr("data-indexid")) + "']").css("display", "table-row");
        }
        else if (parseInt($(this).attr("data-indexid")) == 0) {
            var IndexCurrentLI = parseInt($("#managepager li.active").index()) + 1;
            if ($("#managepager li:eq(" + IndexCurrentLI + ")").attr("data-indexid") != 0) {
                $("#managepager li").removeClass("active");
                $("#managepager li:eq(" + IndexCurrentLI + ")").addClass("active");
                $("#tablebody tr").css("display", "none");
                $("[data-row-id='" + parseInt($("#managepager li:eq(" + IndexCurrentLI + ")").attr("data-indexid")) + "']").css("display", "table-row");
            }
            else {
                alert("-- No More Records Available --");
            }
        }
        else {
            var IndexCurrentLI = parseInt($("#managepager li.active").index()) - 1;
            if ($("#managepager li:eq(" + IndexCurrentLI + ")").attr("data-indexid") != -1) {
                $("#managepager li").removeClass("active");
                $("#managepager li:eq(" + IndexCurrentLI + ")").addClass("active");
                $("#tablebody tr").css("display", "none");
                $("[data-row-id='" + parseInt($("#managepager li:eq(" + IndexCurrentLI + ")").attr("data-indexid")) + "']").css("display", "table-row");
            }
            else {
                alert("-- No More Records Available --");
            }
        }
    });
});