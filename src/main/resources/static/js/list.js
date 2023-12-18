
$(document).ready(function(){
    <!-- SEARCH Calendar 날짜 설정 -->
    //$('.list-date').val(new Date().toISOString().substring(0,10));
    // moment.js 사용
    $('.list-date').val(moment().format('YYYY-MM-DD'));
    <!-- SEARCH AJAX -->
    $("#btn_search").click(function(){
        $.ajax({
            url : "/product/search",
            method : "GET",
            contentType:"application/json; charset=utf-8",
            data : {
                date1 : $("#date1").val(),
                date2 : $("#date2").val(),
                productCategories : $("#productCategories").val(),
            },
            success : function(data){
                grid.resetData(data);
            }
        });
    });

    var grid = new tui.Grid({
        el: document.getElementById('grid'),
        scrollX: false,
        scrollY: false,
        columns: [
            {
                header: 'boardNum',
                name: 'boardNum',
            },
            {
                header: 'spaceName',
                name: 'spaceName',
            },
            {
                header: 'Category',
                name: 'Category'
            },
            {
                header: 'price',
                name: 'price'
            },
            {
                header: 'regDate',
                name: 'regDate',
            }
        ]
    });
})