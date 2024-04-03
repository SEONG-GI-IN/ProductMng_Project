function createGrid() {
    return new Promise((resolve, reject) => {
        grid = new tui.Grid({
            el: document.getElementById('grid'),
            scrollX: false,
            scrollY: false,
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
            ],
            columnOptions: {
              resizable: true,
            },
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
            itemNm: $("input#itemNm").val(),
            itemTypeCd: $("#itemTypeCd").val(),
            supplierCd: $("#supplierCd").val()
        }

        CommonUtil.fetchData("/item/getItemSmartList", params)
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
        itemNm: $("input#itemNm").val(),
        itemTypeCd: $("#itemTypeCd").val(),
        supplierCd: $("#supplierCd").val(),
        barCode: $("input#barCode").val()
    }

    CommonUtil.fetchData("/item/getItemSmartList", params)
        .then(result => {
            grid.resetData(result);
        });
}