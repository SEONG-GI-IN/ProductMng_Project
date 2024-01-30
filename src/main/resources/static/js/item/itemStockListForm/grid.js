let currentPageNumber = 1;

const params = {
    itemNm: $("input#itemNm").val(),
    itemTypeCd: $("#itemTypeCd").val(),
    supplierCd: $("#supplierCd").val()
}

const dataSource = {
    api: {
        readData: {
            url: '/item/getItemStockList',
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
        { header: '입고일자', name: 'STOCK_DT', align: 'center' },
        { header: '바코드', name: 'BAR_CODE', align: 'center' },
        { header: '상품명', name: 'ITEM_NM', align: 'center' },
        { header: '거래처', name: 'SUPPLIER', align: 'center' },
        { header: '상품분류', name: 'ITEM_TYPE_NM', align: 'center' },
        { header: '매입가', align: 'center',
            formatter: function (data) {
                return data.row.PURCHASE_PRICE + "원";
            }
        },
        { header: '입고량', name: 'IN_CNT', align: 'center' },
        { header: '재고량', name: 'REMAIN_CNT', align: 'center' }
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
        url: '/item/getItemStockList',
        method: 'GET',
        contentType: 'application/json',
        data: {
            itemNm: itemNm,
            itemTypeCd: itemTypeCd,
            supplierCd: supplierCd,
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