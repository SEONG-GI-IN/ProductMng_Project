<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<html>
<head>
    <title>Title</title>
    <script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>
    <link rel="stylesheet" href="/css/tui-grid.css" type="text/css" />
    <script src="/js/tui-grid.js"></script>
</head>
<script>

    window.onload = function(){

        const grid = new tui.Grid({
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
            ],
            data: [
                {
                    boardNum: '1',
                    spaceName: 'spaceName',
                    Category: 'Category',
                    price: 'price',
                    regDate: 'regDate'
                },
                {
                    boardNum: '2',
                    spaceName: 'spaceName',
                    Category: 'Category',
                    price: 'price',
                    regDate: 'regDate'
                },
                {
                    boardNum: '3',
                    spaceName: 'spaceName',
                    Category: 'Category',
                    price: 'price',
                    regDate: 'regDate'
                },
                {
                    boardNum: '4',
                    spaceName: 'spaceName',
                    Category: 'Category',
                    price: 'price',
                    regDate: 'regDate'
                },
                {
                    boardNum: '5',
                    spaceName: 'spaceName',
                    Category: 'Category',
                    price: 'price',
                    regDate: 'regDate'
                },
                {
                    boardNum: '6',
                    spaceName: 'spaceName',
                    Category: 'Category',
                    price: 'price',
                    regDate: 'regDate'
                },
                {
                    boardNum: '7',
                    spaceName: 'spaceName',
                    Category: 'Category',
                    price: 'price',
                    regDate: 'regDate'
                },
                {
                    boardNum: '8',
                    spaceName: 'spaceName',
                    Category: 'Category',
                    price: 'price',
                    regDate: 'regDate'
                },
                {
                    boardNum: '9',
                    spaceName: 'spaceName',
                    Category: 'Category',
                    price: 'price',
                    regDate: 'regDate'
                }
            ]
        });
    };
</script>
<body>
<!-- toast grid -->
<div id="grid"></div>
</body>
</html>
