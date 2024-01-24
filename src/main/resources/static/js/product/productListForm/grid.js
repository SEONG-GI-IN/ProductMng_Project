let grid;
let stockGrid;

function createGrid(data) {
    return new tui.Grid({
        el: document.getElementById('grid'),
        scrollX: false,
        scrollY: false,
        rowHeaders: ['rowNum', 'checkbox'],
        columns: [
            {
                header: '바코드번호',
                name: 'BAR_CODE'
            },
            {
                header: '상품명',
                name: 'PRODUCT_NAME'
            }

        ],
        data: data
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

    var params = {
        productName: $("#productName").val(),
    }

    fetchData('/product/getProductList', params)
        .then(result => {
            console.log(result);
            grid = createGrid(result);
            //Stock Grid~ //
            stockGrid = createStockGrid()
            grid.on('dblclick', (e) => {
                let { rowKey } = e;
                if (rowKey < 0) {
                    e.stop();
                    return;
                }
                const barCode = grid.getValue(rowKey, "BAR_CODE");
                refreshStockGrid('/stock/getFindBarCodeList', barCode)
                    .then(stockResult => {
                    displayInfoDetails(
                        result.find(function(obj) { return obj.BAR_CODE == barCode;}),
                        stockResult ? stockResult.reduce(function (accumulator, currentValue) {
                            return accumulator + (currentValue.PRODUCT_QTY || 0);
                        }, 0) : 0
                    );
                });
                showHideInfoModal(true);
                stockGrid.refreshLayout();
            });
            //~Stock Grid

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function refreshGrid() {
    var params = {
        productName: $("#productName").val(),
    }

    fetchData('/product/getProductList', params)
        .then(result => {
            grid.resetData(result);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


/* Stock Grid Refresh */
function refreshStockGrid(url, param) {
    return fetchStringData(url, param)
        .then(result => {
            stockGrid.resetData(result);
            return Promise.resolve(result);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

/* Stock Grid Create */
function createStockGrid(){
    return new tui.Grid({
        el: document.getElementById('infoGrid'),
        scrollX: false,
        scrollY: false,
        columns: [
            {
                header: '등록일자',
                name: 'REGISTRATION_DT'
            },
            {
                header: '개수',
                name: 'PRODUCT_QTY'
            }
        ],
        rowHeaders: ['rowNum'],
        pageOptions: {
            useClient: true,
            perPage: 10
        }
    });
}
/* Stock Grid  fetch - ParamType : String */
function fetchStringData(url, param) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
        },
        body: param,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}