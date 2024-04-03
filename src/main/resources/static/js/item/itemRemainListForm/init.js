let updateList = [];

$(function () {

    /* 날짜 셋팅 moment */
    // 시작일 default = 1일
    // 종료일 default 월 마지막일
    var startDate = moment().startOf('month').format('YYYY-MM-DD');
    var endDate = moment().endOf('month').format('YYYY-MM-DD');

    $('#startDt').val(startDate);
    $('#endDt').val(endDate);

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

    // 수정 버튼 눌렀을 때
    $('#updateBtn').click(function () {
        if (confirm("수정하시겠습니까?")) {
            CommonUtil.postAjax("/item/updateItemRemainCnt", {list : JSON.stringify(updateList)}).then(function (result) {
                alert("수정되었습니다.");
                // 그리드 데이터 초기화
                refreshGrid();
            }).fail(function(response) {
                alert(JSON.parse(response.responseText).message);
            }).always(function() {
                // 수정된 데이터 초기화
                updateList = [];

            });
        }
    });

    /* 엑셀 버튼 눌렀을 때 */
    $('#excelBtn').click(function () {
        excel();
    });

}