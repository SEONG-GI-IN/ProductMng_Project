function grid() {
    return new Promise((resolve, reject) => {
       var grid = new tui.Grid({
                el: document.getElementById('grid'),
                scrollX: true,
                scrollY: true,
                draggable: false,
                columns: [
                    {
                        header: '상품명',
                        name: 'productNm',
                        width: 100,
                        align: 'center',
                    },
                    {
                        header: '거래처',
                        name: 'companyNm',
                        width: 200,
                        align: 'center',
                    },
                    {
                        header: '금액',
                        name: 'price',
                        width: 100,
                        align: 'center',
                    },
                    {
                        header: '재고',
                        name: 'quantity',
                        width: 100,
                        align: 'center',
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