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
            columns: [
                {header: '바코드', name: 'BAR_CODE', align: 'center'},
                {header: '상품명', name: 'ITEM_NM', align: 'center', editor: 'text'},
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
                    }
                },
                {
                    header: '판매가', align: 'center', editor: 'text', name: 'ITEM_PRICE',
                    formatter: function (data) {
                        return data.row.ITEM_PRICE + " 원";
                    }
                },
                {header: '상품분류명', name: 'ITEM_TYPE_NM', hidden: true},
            ],
            pageOptions: {
                useClient: true,
                perPage: 10
            }
        });
        resolve();
    });
}

function fetchData(url, params) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // 설정에 따라 다를 수 있음
        },
        body: JSON.stringify(params),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}

function initializeGrid() {
    return new Promise((resolve, reject) => {
        var params = {
            itemTypeCd: $("#itemTypeCd").val(),
            barCode: $("input#barCode").val(),
            itemNm: $("input#itemNm").val()
        }

        fetchData('/item/getItemList', params)
            .then(result => {
                console.log(result);
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
                            grid.setValue(rowKey, columnName, changedValue);
                            updateItem = grid.getRow(rowKey);
                            updateList.push(updateItem);
                            break;
                        default:
                            break;
                    }

                    /* 변경 된 데이터 cell 색상 변경 */
                    if (updateList.some(item => item.rowKey === rowKey)) {
                        // 변경된 셀의 배경색을 변경
                        const cellElement = grid.getElement(rowKey, columnName);
                        if (cellElement) {
                            cellElement.style.backgroundColor = 'yellow';
                        }
                    }
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
    fetchData('/item/getItemList', params)
        .then(result => {
            console.log(result);
            grid.resetData(result);
        }).catch(error => {
        console.error(error);
    });
}