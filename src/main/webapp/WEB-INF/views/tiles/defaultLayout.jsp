<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="tiles"   uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring"  uri="http://www.springframework.org/tags"  %>

<!DOCTYPE html>
<html>
<head>
<tiles:insertAttribute name="css"/>
    <%
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("pragma", "no-cache");
        response.setDateHeader("Expires", 0);

        java.text.SimpleDateFormat dateFormat = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
        request.setAttribute("currentTime", dateFormat.format(new java.util.Date()));
        request.setAttribute("host", request.getServerName());
    %>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-ui.min.js"></script>
    <!--[if IE]>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/bluebird.js"></script>
    <![endif]-->

    <!-- commonUtil js -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/commonUtil/commonUtil.js?ver=${application.version}"></script>

    <!-- excel -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/excel/jexcel-1.0.5.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/excel/jszip-3.1.5.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/excel/FileSaver-1.2.2_1.js"></script>

    <!-- jspdf -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jspdf/jspdf.min.js"></script>

    <!-- fonts -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/assets/fonts/malgun.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/assets/fonts/malgunbd.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/assets/fonts/Cafe24Ohsquare-v2.0.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/assets/fonts/Cafe24Ohsquare2-v2.0.js"></script>

    <!-- awesomeplete -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/awesomplete/awesomplete.js"></script>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/awesomplete/awesomplete.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/awesomplete/awesomplete.base.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/awesomplete/awesomplete.theme.css" />


</head>

<script>
    var _g_contextPath_ = "${pageContext.request.contextPath}";
</script>
<body>
<tiles:insertAttribute name="script"/>

<div class="tiles-all">
    <tiles:insertAttribute name="nav-top"/>
    <div class="tiles-middle">
        <div class="sb-nav-fixed sb-toggle">
        <tiles:insertAttribute name="nav-left"/>
        </div>
        <div class="tiles-main">
        <tiles:insertAttribute name="body"/>
        </div>
    </div>
</div>
</body>

</html>

