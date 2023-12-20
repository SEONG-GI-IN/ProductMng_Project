<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>

<head>
    <link rel="stylesheet" type="text/css" href="/css/list.css" />
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

    <div class="right-btn">
        <input type="button" id="addBtn" value="등록" />
        <input type="button" id="deleteBtn" value="삭제" />
        <input type="button" id="updateBtn" value="수정" />
    </div>
</div>
<!-- toast grid -->
<div id="grid" class="grid-class"></div>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Vertically Centered Scrollable Modal</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- Scrollable content goes here -->
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...</p>
                <!-- Add more content as needed -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <!-- Additional buttons if needed -->
            </div>
        </div>
    </div>
</div>

</body>
<%--<script src="/js/list.js"></script>--%>
<script src="/js/list/grid.js?ver=${currentTime}"></script>
<script src="/js/list/init.js?ver=${currentTime}"></script>