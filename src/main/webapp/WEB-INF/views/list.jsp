<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<head>
    <link rel="stylesheet" type="text/css" href="/css/list.css" />
    <script src="/js/list.js"></script>
    <script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>
    <link rel="stylesheet" href="/css/tui-grid.css" type="text/css" />
    <script src="/js/tui-grid.js"></script>
</head>
<body>
<!-- data script  -->
<script>



    window.onload = function(){

        $("#btn_search").click(function(){

            const date1 = $("#date1").val();
            const date2 = $("#date2").val();
            const productCategories = $("#productCategories").val();

            $.ajax({
                url : "/product/search",
                method : "GET",
                data : {
                    date1 : date1,
                    date2 : date2,
                    productCategories : productCategories,
                },
                success : function(data){
                    console.log(data);
                    // grid.resetData(data);
                }
            });
        });




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

<div class="list-search">
    <li> 상품검색 </li>
        <table class="list-search-table">
            <tr>
                <td> 등록일 </td>
                <td id="list-search-date">
                    <input type="date" id="date1" class="list-date"/>
                    <span> ~ </span>
                    <input type="date" id="date2" class="list-date"/>
                </td>
                <td> 상품구분 </td>
                <td id="list-search-product-class">
                    <select id="productCategories">
                        <option value="1"> 구분1 </option>
                        <option value="2"> 구분2 </option>
                        <option value="3"> 구분3 </option>
                    </select>
                </td>
                <td> <input type="button" id="btn_search" value="검색"/></td>
            </tr>
        </table>
</div>
<!-- toast grid -->
<div id="grid" class="grid-class"></div>
</body>
