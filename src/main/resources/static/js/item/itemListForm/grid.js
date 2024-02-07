let currentPageNumber = 1;
const listItems = [];
$("#itemTypeCdDiv option").each(function (index, obj) {
    listItems.push({text: $(obj).text(), value: $(obj).val()});
});

const params = {
    itemNm: $("input#itemNm").val(),
    itemTypeCd: $("#itemTypeCd").val(),
    barCode: $("input#barCode").val(),
}

const dataSource = {
    api: {
        readData: {
            url: '/item/getItemList',
            method: 'get',
            params: params,
            pageOptions: {
                perPage: 10
            }
        },
        initialRequest: false, // 디폴트 값은 true
        contentType: 'application/json',
        headers: {'x-custom-header': 'custom-header'},
    }
}

const grid = new tui.Grid({
    el: document.getElementById('grid'),
    theme: 'clean',
    scrollX: false,
    scrollY: false,
    rowHeaders: ['checkbox'],
    pageOptions: {
        perPage: 10
    },
    data: dataSource,
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
});

function refreshGrid() {

    var params = {
        itemTypeCd: $("#itemTypeCd").val(),
        barCode: $("input#barCode").val(),
        itemNm: $("input#itemNm").val(),
        perPage: 10,
        page: currentPageNumber
    }

    CommonUtil.getAjax("/item/getItemList", params).then(function (result) {
        grid.resetData(result.data.contents, {
            pageState: {
                page: currentPageNumber,
                totalCount: result.data.pagination.totalCount,
                perPage: 10
            }
        });
    }).fail(function (error) {
        console.error(error);
    }).always(function () {

    });
}

//페이지 버튼 클릭 이벤트
grid.on('afterPageMove', function (ev) {
    currentPageNumber = grid.getPagination()._currentPage;
    // Update the display of the current page number
    document.getElementById('currentPageNumber').innerText = `Current Page: ${currentPageNumber}`;

    refreshGrid();
});
