function grid() {
    var grid = new tui.Grid({
        el: document.getElementById('grid'),
        data:{
            api: {
                readData: {
                    url: '/product/getProductList',
                    method: 'GET',
                }
            }
        },
        scrollX: false,
        scrollY: false,
        rowHeaders: ['rowNum'],
        columns: [
            {
                header: '바코드번호',
                name: 'barCode',
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