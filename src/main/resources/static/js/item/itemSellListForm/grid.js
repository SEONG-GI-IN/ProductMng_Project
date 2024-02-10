function createGrid() {
return new Promise((resolve, reject) => {
        grid = new tui.Grid({
            el: document.getElementById('grid'),
            data: [],
            scrollX: false,
            scrollY: false,
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
            pageOptions: {
                useClient: true,
                perPage: 10
            }
        });

        resolve();
    });
}

function initializeGrid() {
    return new Promise((resolve, reject) => {
        var params = {
            startDt: $("input#startDt").val(),
            endDt: $("input#endDt").val(),
            itemTypeCd: $("#itemTypeCd").val(),
            itemNm: $("input#itemNm").val(),
            barCode: $("input#barCode").val()
        }

        CommonUtil.fetchData('/item/getItemSellList', params)
            .then(result => {
                createGrid().then(() => {
                    grid.resetData(result);
                });
                resolve();
            }).catch(error => {
                reject(error);
            });
    });
}

function refreshGrid() {

    var params = {
        startDt: $("input#startDt").val(),
        endDt: $("input#endDt").val(),
        itemTypeCd: $("#itemTypeCd").val(),
        itemNm: $("input#itemNm").val(),
        barCode: $("input#barCode").val(),
    }

    CommonUtil.fetchData('/item/getItemSellList', params)
        .then(result => {
            grid.resetData(result);
        });
};