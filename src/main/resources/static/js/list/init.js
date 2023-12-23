import CommonUtil from "../commonUtil/commonUtil";

$(function () {

    grid();

    $('.list-date').val(moment().format('YYYY-MM-DD'));

    eventbing();
});

function eventbing(){

    //addBtn 눌렀을 때 dialog 띄우기
    $('#addBtn').click(function(){
        $('#addDialog').modal('show');
    });

    //addDialog에서 저장 눌렀을 때
    $('#addSaveBtn').click(function(){
        if(confirm("상품을 등록하시겠습니까?")){
            var array = new Array();
            var objArr = $("#addDialog").find("input[type='text'], select, input[type='radio']:checked");
            $.each(objArr, function(i, obj){
                var name = $(obj).attr("name");
                var value = $(obj).val();
            });
            array.push(objArr);
        }

        CommonUtil.postAjax("/list/insertProudct", {list : JSON.stringify(array)}).done(function(result){
            alert("정상적으로 저장되었습니다.");
        }).fail(function(){
            alert("저장에 실패하였습니다.");
        });
    });

}
