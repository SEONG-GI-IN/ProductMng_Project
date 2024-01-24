<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>

<head>
    <link rel="stylesheet" type="text/css" href="/css/product/list.css" />
    <link rel="stylesheet" type="text/css" href="/css/product/info-modal.css" />
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
                <td> 등록일 </td>
                <td id="listSearchDate">
                    <input type="date" id="date1" class="list-date"/>
                    <span> ~ </span>
                    <input type="date" id="date2" class="list-date"/>
                </td>
                <td> 상품구분 </td>
                <td id="listSearchProductClass">
                    <select id="productCategories">
                        <option value="구분1"> 구분1 </option>
                        <option value="구분2"> 구분2 </option>
                        <option value="구분3"> 구분3 </option>
                    </select>
                </td>
                <td> 상품명 </td>
                <td> <input type="text" id="productName"/> </td>
                <td> <input type="button" id="searchBtn" value="검색"/></td>
            </tr>
        </table>

    <!-- 등록 삭제 수정 -->
    <div class="right-btn">
        <input type="button" id="addProductBtn" value="등록" />
        <input type="button" id="deleteProductBtn" value="삭제" />
        <input type="button" id="updateProductBtn" value="수정" />
    </div>
</div>

<!-- toast grid -->
<div id="grid" class="grid-class"></div>


<!-- MODAL -->
<div class="modal fade" id="addProductDialog" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
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
                        <input type="text" class="form-control" name="productBarCode" />
                    </div>
                </div>
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
                <button type="button" id="saveProductBtn" class="btn btn-primary">저장</button>
            </div>
        </form>
    </div>
</div>

<!-- 재고 모달 -->
<div class="info-modal">

    <!-- Title -->
    <div class="info-title-text">
        <div> 상세 정보 </div>
    </div>
    <div class="close-btn"><img src="/images/close.png"></div>

    <!-- VIEW -->
    <div class="info-text">[ 상품 정보 ]</div>

    <div id="infoProduct">

        <div>바코드</div>
        <div id="ifBarCode"> </div>

        <div>상품분류</div>
        <div id="ifProductTypeNM"> </div>

        <div>상품명</div>
        <div id="ifProductName"> </div>

        <div>수량</div>
        <div id="ifProductTotQty"> </div>

        <div>가격</div>
        <div id="ifProductPrice"> </div>

        <div>매입가</div>
        <div id="ifPurchasePrice"> </div>

        <div>거래처</div>
        <div id="ifSupplier"> </div>

        <div>상품등록일</div>
        <div id="ifCreateDT"> </div>

        <!-- <div> Name </div>
        <div id="ifName"> NULL </div> -->

    </div>
    <div class="info-text">[ 재고 정보 ]</div>
    <div id="infoGrid"></div>
</div>
<div class="backon"></div>
<!-- 재고 모달 종료 -->

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
<%--            if(document.querySelector('#btnSearch').innerHTML == '초기화'){--%>
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