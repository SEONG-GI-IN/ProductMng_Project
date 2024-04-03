function createGrid() {
    return new Promise((resolve, reject) => {
        grid = new tui.Grid({
            el: document.getElementById('grid'),
            scrollX: false,
            scrollY: false,
            rowHeaders: ['checkbox'],
            columns: [
                { header: '입고일자', name: 'STOCK_DT', align: 'center'},
                { header: '바코드', name: 'BAR_CODE', align: 'center'},
                { header: '상품명', name: 'ITEM_NM', align: 'center', editor: 'text'},
                {header: '가격표명1', name: 'ITEM_TAG_NM1', align: 'center', editor: 'text'},
                {header: '가격표명2', name: 'ITEM_TAG_NM2', align: 'center', editor: 'text'},
                { header: '거래처', name: 'SUPPLIER', align: 'center'},
                { header: '상품분류', name: 'ITEM_TYPE_NM', align: 'center'},
                {
                    header: '매입가', name: 'PURCHASE_PRICE', align: 'center', editor: { type: 'text' },
                    formatter: function (data) {
                        return data.row.PURCHASE_PRICE + "원";
                    }
                },
                { header: '입고량', name: 'IN_CNT', align: 'center', editor: { type: 'text' } },
                { header: '판매가', name: 'ITEM_PRICE', align: 'center', hidden: true },
                { header: '판매가', name: 'REMAIN_CHECK_YN', align: 'center', hidden: true },
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
            barCode: $("input#barCode").val(),
            supplierCd: $("#supplierCd").val(),
        }

        CommonUtil.fetchData('/item/getItemStockList', params)
            .then(result => {
                createGrid().then(() => {
                    grid.resetData(result);
                });

                /* 상품 분류 수정 될 때 */
                grid.on('afterChange', function (e) {
                    var columnName = e.changes[0].columnName;
                    var rowKey = e.changes[0].rowKey;

                    var updateItem = {};
                    var changedValue = e.changes[0].value;

                    switch (columnName) {
                        case "ITEM_TYPE_CD":
                            var itemTypeCd = changedValue;
                            var itemTypeNm = listItems.find(function (item) {
                                return item.value == itemTypeCd;
                            }).text;

                            grid.setValue(rowKey, "ITEM_TYPE_NM", itemTypeNm);

                            if (!updateList.some(item => item.rowKey === rowKey)) {
                                updateItem = grid.getRow(rowKey);
                                updateList.push(updateItem);
                            }

                            break;
                        case "PURCHASE_PRICE":
                        case "ITEM_PRICE":
                        case "ITEM_NM":
                        case "ITEM_TAG_NM1":
                        case "ITEM_TAG_NM2":
                        case "IN_CNT":
                        case "REMAIN_CHECK_YN":
                            grid.setValue(rowKey, columnName, changedValue);
                            updateItem = grid.getRow(rowKey);
                            updateList.push(updateItem);
                            break;
                        default:
                            break;
                    }

                });

                grid.on('check', function () {
                    updatePriceCartButtonState();
                });

                grid.on('uncheck', function () {
                    updatePriceCartButtonState();
                });

                grid.on('checkAll', function () {
                    updatePriceCartButtonState();
                });

                grid.on('uncheckAll', function () {
                    updatePriceCartButtonState();
                });

                resolve();
            })
            .catch(error => {
                console.log(error);
                reject();
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
        supplierCd: $("#supplierCd").val(),
    }

    CommonUtil.fetchData('/item/getItemStockList', params)
        .then(result => {
            grid.resetData(result, { pageState: { page: grid.getPagination().getCurrentPage(), totalCount: result.length, perPage: 10 }});
        }).catch(error => {
            console.log(error);
        });
}
