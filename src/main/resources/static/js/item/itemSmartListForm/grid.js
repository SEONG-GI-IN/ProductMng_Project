let currentPageNumber = 1;

const params = {
    itemNm: $("input#itemNm").val(),
    itemTypeCd: $("#itemTypeCd").val(),
    supplierCd: $("#supplierCd").val()
}

const dataSource = {
    api: {
        readData: {
            url: '/item/getItemSmartList',
            method: 'get',
            params: params,
            pageOptions: {
                perPage: 10
            }
        },
        initialRequest: false, // 디폴트 값은 true
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
    header: {
        complexColumns: [
            {
                header: '마진율',
                name: 'MARGIN_RATE',
                childNames: ['MARGIN_50', 'MARGIN_45', 'MARGIN_40', 'MARGIN_35', 'MARGIN_30']
            }
        ],
        height: 80
    },
    columns: [
        { header: '거래처', name: 'SUPPLIER', align: 'center' },
        { header: '바코드', name: 'BAR_CODE', align: 'center' },
        { header: '상품명', name: 'ITEM_NM', align: 'center' },
        { header: '상품분류', name: 'ITEM_TYPE_NM', align: 'center' },
        { header: '매입가', align: 'center', name: 'PURCHASE_PRICE',
            formatter: function (data) {
                return data.row.PURCHASE_PRICE + "원";
            }
        },
        { header: '30%', align: 'center', name: 'MARGIN_30',
            formatter: function (data) {
                return CommonUtil.calculateMargin(data.row.PURCHASE_PRICE, 30) + "원";
            }
        },
        { header: '35%', align: 'center', name: 'MARGIN_35',
            formatter: function (data) {
                return CommonUtil.calculateMargin(data.row.PURCHASE_PRICE, 35) + "원";
            }
        },
        { header: '40%', align: 'center', name: 'MARGIN_40',
            formatter: function (data) {
                return CommonUtil.calculateMargin(data.row.PURCHASE_PRICE, 40) + "원";
            }
        },
        { header: '45%', align: 'center', name: 'MARGIN_45',
            formatter: function (data) {
                return CommonUtil.calculateMargin(data.row.PURCHASE_PRICE, 45) + "원";
            }
        },
        { header: '50%', align: 'center', name: 'MARGIN_50',
            formatter: function (data) {
                return CommonUtil.calculateMargin(data.row.PURCHASE_PRICE, 50) + "원";
            }
        },
        { header: '판매가', align: 'center',
            className: 'ITEM_PRICE',
            formatter: function (data) {
                return data.row.ITEM_PRICE + "원";
            },
            renderer: {
                styles: {
                    color: '#ff0000',
                    fontWeight: 'bold'
                }
            }
        }
    ]
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

    // AJAX 요청
    CommonUtil.getAjax("/item/getItemSmartList", {
        itemNm: itemNm,
        itemTypeCd: itemTypeCd,
        supplierCd: supplierCd,
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
    // 검색 조건을 가져오기
    const itemNm = $("input#itemNm").val();
    const itemTypeCd = $("#itemTypeCd").val();
    const supplierCd = $("#supplierCd").val();

    // AJAX 요청
    CommonUtil.getAjax("/item/getItemSmartList", {
        itemNm: itemNm,
        itemTypeCd: itemTypeCd,
        supplierCd: supplierCd,
        perPage: 10,
        page: currentPage
    }).then(function (result) {
        grid.resetData(result.data.contents, {
            pageState: {
                page: currentPage,
                totalCount: result.data.pagination.totalCount,
                perPage: 10
            }
        });
    });
};