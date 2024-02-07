let currentPageNumber = 1;

const params = {
    startDt: $("input#startDt").val(),
    endDt: $("input#endDt").val(),
    itemTypeCd: $("#itemTypeCd").val(),
    itemNm: $("input#itemNm").val(),
    barCode: $("input#barCode").val(),
    supplierCd: $("#supplierCd").val(),
};

const dataSource = {
    api: {
        readData: {
            url: '/item/getItemStockList' + '?' + $.param(params),
            method: 'get',
            params: params,
            pageOptions: {
                perPage: 10
            }
        },
        initialRequest: true, // 디폴트 값은 true
        contentType: 'application/json',
        headers: { 'x-custom-header': 'custom-header' },
        // attributes
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
        {
            header: '매입가', align: 'center',
            formatter: function (data) {
                return data.row.PURCHASE_PRICE + "원";
            }
        },
        { header: '입고량', name: 'IN_CNT', align: 'center' },
        { header: '판매가', name: 'ITEM_PRICE', align: 'center', hidden: true },
    ],
});

function updateGridData() {
    // 현재 페이지 번호 가져오기
    currentPageNumber = grid.getPagination()._currentPage;

    // Update the display of the current page number
    document.getElementById('currentPageNumber').innerText = `Current Page: ${currentPageNumber}`;

    // 검색 조건 가져오기
    var itemNm = $("input#itemNm").val();
    var itemTypeCd = $("#itemTypeCd").val();
    var supplierCd = $("#supplierCd").val();
    var startDt = $("input#startDt").val();
    var endDt = $("input#endDt").val();

    // AJAX 요청
    CommonUtil.getAjax("/item/getItemStockList", {
        itemNm: itemNm,
        itemTypeCd: itemTypeCd,
        supplierCd: supplierCd,
        startDt: startDt,
        endDt: endDt,
        perPage: 10,
        page: currentPageNumber
    }).then(function (result) {
        grid.resetData(result.data.contents, {
            pageState: {
                page: currentPageNumber,
                totalCount: result.data.pagination.totalCount,
                perPage: 10
            }
        });
    });
}

grid.on('beforePageMove' , function (ev) {
    updateGridData();
});

grid.on('afterPageMove', function (ev) {
    updateGridData();
});


const currentPage = grid.getPagination()._currentPage;

function refreshGrid() {

    var params = {
        startDt: $("input#startDt").val(),
        endDt: $("input#endDt").val(),
        itemTypeCd: $("#itemTypeCd").val(),
        itemNm: $("input#itemNm").val(),
        barCode: $("input#barCode").val(),
        supplierCd: $("#supplierCd").val(),
        perPage: 10,
        page: currentPageNumber
    }

    CommonUtil.getAjax("/item/getItemStockList", params).then(function (result) {
        grid.resetData(result.data.contents, {
            pageState: {
                page: currentPageNumber,
                totalCount: result.data.pagination.totalCount,
                perPage: 10
            }
        });
    });
};
