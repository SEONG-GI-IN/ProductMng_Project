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
                { header: '안전재고', name: 'SAFE_REMAIN_CNT', align: 'center', editor: 'text' },
                {
                    header: '재고량', align: 'center', name: 'REMAIN_CNT',
                    formatter: function (data) {
                        return (Number(data.row.REMAIN_CNT) + Number(data.row.ITEM_REMAIN_ADD_CNT)) + " 개";
                    }
                }

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
            barCode: $("input#barCode").val()
        }

        CommonUtil.fetchData('/item/getItemRemainList', params)
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

                    if(columnName === "ITEM_REMAIN_ADD_CNT") {
                        grid.setValue(rowKey, columnName, changedValue);
                        updateItem = grid.getRow(rowKey);
                        updateList.push(updateItem);
                    } else if (columnName === "SAFE_REMAIN_CNT") {
                        grid.setValue(rowKey, columnName, changedValue);
                        updateItem = grid.getRow(rowKey);
                        updateList.push(updateItem);
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
    }

    CommonUtil.fetchData('/item/getItemRemainList', params)
        .then(result => {
            //grid.resetData(result);
            // 현재 페이지로 리로드
            grid.resetData(result, { pageState: { page: grid.getPagination().getCurrentPage(), totalCount: result.length, perPage: 10 }});
        })
        .catch(err => {
            console.error(err);
        });
}
