const listItems = [];

$(function () {
    $("#itemTypeCdDiv option").each(function (index, obj) {
        listItems.push({text: $(obj).text(), value: $(obj).val()});
    });
});

function createGrid() {
    return new Promise((resolve, reject) => {
        grid = new tui.Grid({
            el: document.getElementById('grid'),
            scrollX: false,
            scrollY: false,
            rowHeaders: ['checkbox'],
            columns: [
                {header: '바코드', name: 'BAR_CODE', align: 'center',
                    formatter: function (data) {
                        return "<a href= 'javascript:;' name= barCode style='text-decoration: underline;color:#058df5;'>" + data.row.BAR_CODE + "</a>";
                    }
                },
                {header: '상품명', name: 'ITEM_NM', align: 'center', editor: 'text'},
                {header: '가격표명1', name: 'ITEM_TAG_NM1', align: 'center', editor: 'text'},
                {header: '가격표명2', name: 'ITEM_TAG_NM2', align: 'center', editor: 'text'},
                {
                    header: '상품분류', name: 'ITEM_TYPE_CD', align: 'center',
                    formatter: 'listItemText',
                    editor: {
                        type: 'select',
                        options: {
                            listItems
                        }
                    },
                    copyOptions: {
                        useListItemText: true
                    },
                    width: 150
                },
                {
                    header: '판매가', align: 'center', editor: 'text', name: 'ITEM_PRICE',
                    formatter: function (data) {
                        return data.row.ITEM_PRICE + " 원";
                    },
                    width: 140
                },
                {header: '안전재고', name: 'SAFE_REMAIN_CNT', align: 'center', editor: 'text', width: 80},
                {
                    header: '재고여부', align: 'center', name: 'REMAIN_CHECK_YN', editor: {
                        type: 'radio',
                        options: {
                            listItems: [
                                {text: 'Y', value: 'Y'},
                                {text: 'N', value: 'N'}
                            ]
                        }
                    },
                    width: 80
                },
                {header: '상품분류명', name: 'ITEM_TYPE_NM', hidden: true}
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
            itemTypeCd: $("#itemTypeCd").val(),
            barCode: $("input#barCode").val(),
            itemNm: $("input#itemNm").val()
        }

        CommonUtil.fetchData('/item/getItemList', params)
            .then(result => {
                createGrid('/item/getItemList', params).then(r => {
                    grid.resetData(result);
                });

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
                        case "ITEM_PRICE":
                        case "ITEM_NM":
                        case "ITEM_TAG_NM1":
                        case "ITEM_TAG_NM2":
                        case "SAFE_REMAIN_CNT":
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
            }).catch(error => {
            console.error(error);
        });
    });
}


function refreshGrid() {
    var params = {
        itemTypeCd: $("#itemTypeCd").val(),
        barCode: $("input#barCode").val(),
        itemNm: $("input#itemNm").val()
    }
    CommonUtil.fetchData('/item/getItemList', params)
        .then(result => {
            console.log(result);
            grid.resetData(result);
        }).catch(error => {
        console.error(error);
    });

    var cnt = grid.getRowCount();

    for (var i = 0; i < cnt; i++) {
        grid.getElement(i, "ITEM_PRICE").style.backgroundColor = 'white';
        grid.getElement(i, "ITEM_NM").style.backgroundColor = 'white';
        grid.getElement(i, "ITEM_TYPE_CD").style.backgroundColor = 'white';
    }
}