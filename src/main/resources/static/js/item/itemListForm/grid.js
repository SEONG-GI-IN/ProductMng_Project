let grid;

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
                    name: 'ITEM_NM'
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
        itemNm: $("#itemNm").val(),
    }

    fetchData('/item/getItemList', params)
        .then(result => {
            console.log(result);
            grid = createGrid(result);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function refreshGrid() {
    var params = {
        itemNm: $("#itemNm").val(),
    }

    fetchData('/item/getItemList', params)
        .then(result => {
            console.log(result);
            grid.resetData(result);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
