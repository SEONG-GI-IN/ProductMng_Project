<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>

<head>
    <link rel="stylesheet" type="text/css" href="/css/list.css" />
    <link rel="stylesheet" href="/css/tui-grid.css" type="text/css" />
    <script src="/js/tui-grid.js"></script>
</head>
<body>
<div class="page-title">
    <h4>[상품관리화면]</h4>
</div>

<div class="list-search">
    <table class="list-search-table">
        <tr>
            <td>등록일</td>
            <td id="listSearchDate">
                <input type="date" id="date1" class="list-date"/>
                <span> ~ </span>
                <input type="date" id="date2" class="list-date"/>
            </td>
            <td>상품분류</td>
            <td>
                <!-- 상품분류 셀렉트박스 forEach-->
                <select id="itemTypeCd" class="list-select" style="width: 150px">
                    <option value="">전체</option>
                    <c:forEach var="item" items="${itemTypeList}">
                        <option value="${item.CODE_CD}">${item.CODE_NM}</option>
                    </c:forEach>
                </select>
            </td>
            <td>거래처</td>
            <td>
                <!-- 상품분류 셀렉트박스 forEach-->
                <select id="supplierCd" class="list-select" style="width: 150px">
                    <option value="">전체</option>
                    <c:forEach var="item" items="${supplierList}">
                        <option value="${item.CODE_CD}">${item.CODE_NM}</option>
                    </c:forEach>
                </select>
            </td>
            <td>상품명</td>
            <td> <input type="text" id="itemNm"/> </td>
            <td> <input type="button" id="searchBtn" value="검색"/></td>
        </tr>
    </table>

    <!-- 등록 삭제 수정 -->
    <div class="right-btn">
        <input type="button" id="addBtn" value="등록" />
        <input type="button" id="delBtn" value="삭제" />
        <input type="button" id="updateBtn" value="수정" />
    </div>
</div>
<!-- toast grid -->
<div id="grid" class="grid-class"></div>


<!-- MODAL -->
<div class="modal fade" id="addDialog" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <form class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">상품 등록</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- 상품명 입력 -->
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">바코드</label>
                    <div class="col-sm-9 ml-60">
                        <input type="text" class="form-control" name="barCode" />
                    </div>
                </div>
                <!-- 상품명 입력 -->
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">상품명</label>
                    <div class="col-sm-9 ml-60">
                        <input type="text" class="form-control" name="itemNm" />
                    </div>
                </div>
                <!-- 상품가격 입력 -->
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">매입가</label>
                    <div class="col-sm-9 ml-60">
                        <input type="text" class="form-control" name="purchasePrice" />
                    </div>
                </div>
                <!-- 상품분류 입력 -->
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">상품분류</label>
                    <div class="col-sm-9 ml-60">
                        <select id="itemTypeCdDiv" class="form-select" style="width: 150px">
                            <option value="">전체</option>
                            <c:forEach var="item" items="${itemTypeList}">
                                <option value="${item.CODE_CD}">${item.CODE_NM}</option>
                            </c:forEach>
                        </select>
                    </div>
                </div>
                <!-- 거래처 입력 -->
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">거래처</label>
                    <div class="col-sm-9 ml-60">
                        <select id="supplierCdDiv" class="form-select" style="width: 150px">
                            <option value="">전체</option>
                            <c:forEach var="item" items="${supplierList}">
                                <option value="${item.CODE_CD}">${item.CODE_NM}</option>
                            </c:forEach>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                <button type="button" id="saveBtn" class="btn btn-primary">저장</button>
            </div>
        </form>
    </div>
</div>

</body>

<script type="text/javascript" src="/js/item/itemListForm/grid.js?ver=${currentTime}"></script>
<script type="text/javascript" src="/js/item/itemListForm/init.js?ver=${currentTime}"></script>