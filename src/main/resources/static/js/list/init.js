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

}
