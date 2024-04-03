$(function () {

    // 조회년도 셋팅 현재년도 -2년부터 현재년도까지 moment 사용 ${yearList}에 셋팅
    // 처음 셋팅은 현재년도
    var yearList = '';
    var currentYear = moment().format('YYYY');
    for (var i = currentYear - 2; i <= currentYear; i++) {
        yearList += '<option value="' + i + '">' + i + '</option>';
    }
    $('#year').append(yearList);
    $('#year').val(currentYear);

    initializeGrid();

    eventbing();
});

function eventbing() {

    /* 검색 버튼 눌렀을 때 */
    $('#searchBtn').click(function () {
        refreshGrid();
    });

    /* 엔터 키 눌렀을 때 */
    $('#barCode, #itemNm').keypress(function (e) {
        if (e.keyCode == 13) {
            refreshGrid();
        }
    });


}