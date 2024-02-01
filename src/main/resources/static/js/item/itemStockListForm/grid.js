let currentPageNumber = 1;
let tuiGrid;

function grid() {
    return new Promise(async function (resolve, reject) {
        try {
            const param = {
                startDt: $("input#startDt").val(),
                endDt: $("input#endDt").val(),
                itemTypeCd: $("#itemTypeCd").val(),
                itemNm: $("input#itemNm").val(),
                barCode: $("input#barCode").val(),
            };

            const queryString = $.param(param);

            tuiGrid = new tui.Grid({
                el: document.getElementById('grid'),
                scrollX: false,
                scrollY: false,
                rowHeaders: ['checkbox'],
                pageOptions: {
                    perPage: 10
                },
                data: {
                    api: {
                        readData: {
                            url: '/item/getItemStockList?' + queryString,
                            method: 'get',
                            contentType: 'application/json',
                            headers: { 'x-custom-header': 'custom-header' },
                        },
                        initialRequest: false,
                    }
                },
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
                    { header: '재고량', name: 'REMAIN_CNT', align: 'center' }
                ],
            });

            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

function refreshGrid() {

    var params = {
        startDt: $("input#startDt").val(),
        endDt: $("input#endDt").val(),
        itemTypeCd: $("#itemTypeCd").val(),
        itemNm: $("input#itemNm").val(),
        barCode: $("input#barCode").val(),
        perPage: 10,
        page: currentPageNumber
    }

    CommonUtil.getAjax("/item/getItemStockList", params).then(function (result) {
        tuiGrid.resetData(result.data.contents, {
            pageState: {
                page: currentPageNumber,
                totalCount: result.data.pagination.totalCount,
                perPage: 10
            }
        });
    });
};