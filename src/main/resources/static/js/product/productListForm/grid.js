function grid() {
    var grid = new tui.Grid({
        el: document.getElementById('grid'),
        scrollX: false,
        scrollY: false,
        columns: [
            {
                header: 'boardNum',
                name: 'boardNum',
            },
            {
                header: 'spaceName',
                name: 'spaceName',
            },
            {
                header: 'Category',
                name: 'Category'
            },
            {
                header: 'price',
                name: 'price'
            },
            {
                header: 'regDate',
                name: 'regDate',
            }
        ]
    });
}