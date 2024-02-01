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
                            url: '/item/getItemSellList?' + queryString,
                            method: 'get',
                            contentType: 'application/json',
                            headers: { 'x-custom-header': 'custom-header' },
                        },
                        initialRequest: false,
                    }
                },
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

    CommonUtil.getAjax("/item/getItemSellList", params).then(function (result) {
        tuiGrid.resetData(result.data.contents, {
            pageState: {
                page: currentPageNumber,
                totalCount: result.data.pagination.totalCount,
                perPage: 10
            }
        });
    });
};