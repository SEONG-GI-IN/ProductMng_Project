let grid, subGrid;

function createGrid(data) {
    return new tui.Grid({
        el: document.getElementById('grid'),
        scrollX: false,
        scrollY: false,
        bodyHeight: 500,
        columns: [
            {
                header: '그룹코드',
                name: 'CODE_CD'
            },
            {
                header: '그룹명',
                name: 'UP_CODE_NM'
            },
            {
                header: '비고',
                name: 'REMARK'
            },
            {
                header: '정렬',
                name: 'ORDER_BY'
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


    fetchData('/common/getUpCodeList', '')
        .then(result => {
            console.log(result);
            grid = createGrid(result);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function refreshGrid() {

    fetchData('/common/getUpCodeList', '')
        .then(result => {
            console.log(result);
            grid.resetData(result);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function createSubGrid(data) {
    return new tui.Grid({
        el: document.getElementById('subGrid'),
        scrollX: false,
        scrollY: false,
        rowHeaders: ['checkbox'],
        bodyHeight: 500,
        columns: [
            {
                header: '코드',
                name: 'CODE_CD'
            },
            {
                header: '코드명',
                name: 'CODE_NM'
            },
            {
                header: '비고',
                name: 'CODE_REMARK'
            },
            {
                header: '정렬',
                name: 'CODE_ORDER_BY'
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


function initializeSubGrid() {

    var params = {
        upCodeCd: CodeMngForm.codeCd
    }

    fetchData('/common/getCodeList', params)
        .then(result => {
            console.log(result);
            subGrid = createSubGrid(result);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function refreshSubGrid(_codeCd) {
    var params = {
        UP_CODE_CD: _codeCd
    }

    fetchData('/common/getCodeList', params)
        .then(result => {
            console.log(result);
            subGrid.resetData(result);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}