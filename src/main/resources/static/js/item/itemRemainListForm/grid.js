function createGrid() {
    return new Promise((resolve, reject) => {
        grid = new tui.Grid({
            el: document.getElementById('grid'),
            scrollX: false,
            scrollY: false,
            columns: [
                { header: '바코드', name: 'BAR_CODE', align: 'center' },
                { header: '상품명', name: 'ITEM_NM', align: 'center' },
                { header: '상품분류', name: 'ITEM_TYPE_NM', align: 'center' },
                { header: '재고조정', name: 'ITEM_REMAIN_ADD_CNT', align: 'center', editor: 'text' },
                { header: '재고량', name: 'ITEM_REMAIN_CNT', align: 'center' },

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

                    // 변경된 데이터를 updateList에 저장
                    updateItem.rowKey = rowKey;
                    updateItem.columnName = columnName;
                    updateItem.changedValue = changedValue;

                    // updateList에 해당 rowKey가 있는지 확인
                    var existingItem = updateList.find(function(item) {
                        return item.rowKey === rowKey;
                    });

                    // 이미 해당 rowKey가 있다면 배열로 유지하도록 처리
                    if (existingItem) {
                        existingItem.columnName = [existingItem.columnName, columnName];
                        existingItem.changedValue = [existingItem.changedValue, changedValue];
                    } else {
                        updateList.push(updateItem);
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

                resolve();
            })
            .catch(err => {
                console.error(err);
                reject();
            });
    });

}

function refreshGrid() {

    var params = {
        itemTypeCd: $("#itemTypeCd").val(),
        itemNm: $("input#itemNm").val(),
        barCode: $("input#barCode").val(),
        supplierCd: $("#supplierCd").val(),
    }

    fetchData('/item/getItemStockList', params)
        .then(result => {
            grid.resetData(result);
        })
        .catch(err => {
            console.error(err);
        });
}
