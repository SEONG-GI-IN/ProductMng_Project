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
<!-- 등록 삭제 수정 -->
<div class="right-btn">
    <input type="button" id="addBtn" value="등록" />
    <input type="button" id="deleteBtn" value="삭제" />
    <input type="button" id="updateBtn" value="수정" />
</div>
<!-- 검색 -->
<li> 상품등록 및 검색 </li>
<div class="list-search">
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
                <td> 상품명 </td>
                <td> <input type="text" id="productName"/> </td>
                <td> <input type="button" id="btn_search" value="검색"/></td>
            </tr>
        </table>
</div>
<li> 상품조회 </li>
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
                    <label class="col-sm-4 col-form-label">상품명</label>
                    <div class="col-sm-9 ml-60">
                        <input type="text" class="form-control" name="productName" />
                    </div>
                </div>
                <!-- 상품가격 입력 -->
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">판매가격</label>
                    <div class="col-sm-9 ml-60">
                        <input type="text" class="form-control" name="productPrice" />
                    </div>
                </div>
                <!-- 상품분류 입력 -->
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">상품분류</label>
                    <div class="col-sm-9 ml-60">
                        <input type="text" class="form-control" name="productCategory" />
                    </div>
                </div>
                <!-- 거래처 입력 -->
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">거래처</label>
                    <div class="col-sm-9 ml-60">
                        <input type="text" class="form-control" name="supplier" />
                    </div>
                </div>
                <!-- 매입가 입력 -->
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">매입가</label>
                    <div class="col-sm-9 ml-60">
                        <input type="text" class="form-control" name="purchasePrice" />
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

<%--<script type="text/javascript">--%>
<%--    window.onload = function (){--%>
<%--        const grid = new tui.Grid({--%>
<%--            el: document.getElementById('grid'),--%>
<%--            //data: gridData,--%>
<%--            scrollX: false,--%>
<%--            scrollY: false,--%>

<%--            rowHeaders:['rowNum'],--%>
<%--            columns: [--%>
<%--                {--%>
<%--                    header: '바코드번호',--%>
<%--                    name: 'BAR_CODE'--%>
<%--                }--%>
<%--            ]--%>
<%--        });--%>


<%--        $('#btn_search').click(function(){--%>
<%--            if(document.querySelector('#btn_search').innerHTML == '초기화'){--%>
<%--                $('#btn_search').html('검색');--%>
<%--                grid.clear();--%>
<%--                return;--%>
<%--            }--%>

<%--            $.ajax({--%>
<%--                url : '/product/getProductList',--%>
<%--                method: 'post',--%>
<%--                dataType : 'json',--%>
<%--                success: function(result){--%>

<%--                    console.log(result);--%>
<%--                    grid.resetData(result);--%>

<%--                },--%>
<%--                error : function(result){--%>
<%--                    console.log('ajax error!');--%>
<%--                }--%>
<%--            })--%>
<%--        })--%>
<%--    }--%>
<%--</script>--%>

<script type="text/javascript" src="/js/product/productListForm/grid.js?ver=${currentTime}"></script>
<script type="text/javascript" src="/js/product/productListForm/init.js?ver=${currentTime}"></script>