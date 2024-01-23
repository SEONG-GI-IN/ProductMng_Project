const params = {
    itemNm: $("input#itemNm").val(),
    itemTypeCd: $("#itemTypeCd").val(),
    supplierCd: $("#supplierCd").val(),
    perPage: 20,
    page: 1,
}

const dataSource = {
    api: {
        readData: {
            url: '/item/getItemList',
            method: 'get',
            params: params,
        },
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
        perPage: 20,
        useClient: false,
    },
    data: dataSource,
    columns: [
        { header: '거래처', name: 'SUPPLIER', align: 'center' },
        { header: '품목명', name: 'ITEM_NM', align: 'center' },
        { header: '상품분류', name: 'ITEM_TYPE_NM', align: 'center' },
        { header: '매입가', align: 'center',
            formatter: function (data) {
                return data.row.PURCHASE_PRICE + "원";
            }
        },
    ]
});

const currentPage = grid.getPagination()._currentPage;

// 검색 버튼 클릭 이벤트
$("#searchBtn").click(function () {
    // 검색 조건을 가져오기
    const itemNm = $("input#itemNm").val();
    const itemTypeCd = $("#itemTypeCd").val();
    const supplierCd = $("#supplierCd").val();

    // AJAX 요청
    $.ajax({
        url: '/item/getItemList',
        method: 'GET',
        contentType: 'application/json',
        data: {
            itemNm: itemNm,
            itemTypeCd: itemTypeCd,
            supplierCd: supplierCd,
            perPage: 20,
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
});

