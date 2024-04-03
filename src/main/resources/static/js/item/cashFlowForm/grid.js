function createGrid() {
    return new Promise((resolve, reject) => {
        grid = new tui.Grid({
            el: document.getElementById('grid'),
            scrollX: false,
            scrollY: false,
            columns: [
                { header: '판매월', name: 'MONTH', align: 'center' },
                { header: '매입금액', align: 'center', name: 'PURCHASE_PRICE',
                    formatter: function (data) {
                        return CommonUtil.priceFormat(data.row.PURCHASE_PRICE, "만") + "원";
                    }
                },
                { header: '매출금액', align: 'center', name: 'SALES_PRICE',
                    formatter: function (data) {
                        return CommonUtil.priceFormat(data.row.SELL_PRICE, "만") + "원";
                    }
                }
            ],
            pageOptions: {
                useClient: true,
                perPage: 15
            }
        });
        resolve();
    });
}

function initializeGrid() {
    return new Promise((resolve, reject) => {
        var params = {
            year: $("#year").val(),
        }

        CommonUtil.fetchData("/item/getCashFlowList", params)
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
        year: $("#year").val()
    }

    CommonUtil.fetchData("/item/getCashFlowList", params)
        .then(result => {
            grid.resetData(result);
        });
}