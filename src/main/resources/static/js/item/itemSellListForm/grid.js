let currentPageNumber = 1;

const params = {
    itemNm: $("input#itemNm").val(),
}

const dataSource = {
    api: {
        readData: {
            url: '/item/getItemSellList',
            method: 'get',
            params: params,
            pageOptions: {
                perPage: 10
            }
        },
        initialRequest: false, // 디폴트 값은 true
        contentType: 'application/json',
        headers: { 'x-custom-header': 'custom-header' },
    }
}


const grid = new tui.Grid({
    el: document.getElementById('grid'),
    scrollX: false,
    scrollY: false,
    rowHeaders: ['checkbox'],
    pageOptions: {
        perPage: 10
    },
    data: dataSource,
    columns: [
        { header: '판매일자', align: 'center',
            formatter: function (data) {
                return data.row.START_DT + " ~ " + data.row.END_DT;
            }
        },
        { header: '바코드', name: 'BAR_CODE', align: 'center' },
        { header: '상품명', name: 'ITEM_NM', align: 'center' },
        { header: '판매량', name: 'SELL_CNT', align: 'center' }
    ],
});

//페이지 버튼 클릭 이벤트
grid.on('afterPageMove', function (ev) {
    currentPageNumber = grid.getPagination()._currentPage;
    // Update the display of the current page number
    document.getElementById('currentPageNumber').innerText = `Current Page: ${currentPageNumber}`;
});
const currentPage = grid.getPagination()._currentPage;

function refreshGrid() {
    // 검색 조건을 가져오기
    const itemNm = $("input#itemNm").val();
    const itemTypeCd = $("#itemTypeCd").val();
    const supplierCd = $("#supplierCd").val();

    // AJAX 요청
    $.ajax({
        url: '/item/getItemSellList',
        method: 'GET',
        contentType: 'application/json',
        data: {
            itemNm: itemNm,
            perPage: 10,
            page: 1,
        },
        success: function(result) {
            grid.resetData(result.data.contents, { pageState: { page: currentPage, totalCount: result.data.pagination.totalCount, perPage: 3} });
        },
        error: function(error) {
            // 오류 시 처리
            console.error(error);
        }
    });
};