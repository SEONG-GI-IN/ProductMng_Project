<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>

<head>
    <link rel="stylesheet" href="/css/tui-grid.css" type="text/css" />
    <script src="/js/tui-grid.js"></script>
</head>
<body>
<div class="page-title">
    <h4>[매입매출관리화면]</h4>
</div>

<div class="search-container">
    <dl class="form-group">
        <dt>조회년도</dt>
        <dd>
            <select id="year" class="form-select" style="width: 250px">
                <c:forEach var="item" items="${yearList}">
                    <option value="${item}">${item}</option>
                </c:forEach>
            </select>
        </dd>

        <dt>상품분류</dt>
        <dd>
            <select id="itemTypeCd" class="form-select" style="width: 250px">
                <option value="">전체</option>
                <c:forEach var="item" items="${itemTypeList}">
                    <option value="${item.CODE_CD}">${item.CODE_NM}</option>
                </c:forEach>
            </select>
        </dd>

        <button type="button" id="searchBtn">검색</button>
    </dl>

    <dl class="form-group">
        <dt>바코드</dt>
        <dd>
            <input type="text" id="barCode" class="form-control" placeholder="바코드를 입력하세요" />
        </dd>
    </dl>
</div>

<!-- 등록 삭제 수정 -->
<div class="right-btn">
<%--    <input type="button" id="addBtn" value="아크매출" />--%>
</div>

<!-- toast grid -->
<div id="grid" class="grid-class"></div>

<script type="text/javascript" src="/js/item/cashFlowForm/grid.js?ver=${currentTime}"></script>
<script type="text/javascript" src="/js/item/cashFlowForm/excel.js?ver=${currentTime}"></script>
<script type="text/javascript" src="/js/item/cashFlowForm/init.js?ver=${currentTime}"></script>
</body>

