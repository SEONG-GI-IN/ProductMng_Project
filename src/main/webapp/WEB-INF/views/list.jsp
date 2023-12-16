<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<head>
    <link rel="stylesheet" type="text/css" href="/css/list.css" />
    <script src="/js/list.js"></script>
    <link rel="stylesheet" href="/css/tui-grid.css" type="text/css" />
    <script src="/js/tui-grid.js"></script>
</head>
<body>
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
                        <option value="구분1"> 구분1 </option>
                        <option value="구분2"> 구분2 </option>
                        <option value="구분3"> 구분3 </option>
                    </select>
                </td>
                <td> <input type="button" id="btn_search" value="검색"/></td>
            </tr>
        </table>
</div>
<!-- toast grid -->
<div id="grid" class="grid-class"></div>
</body>
