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
</head>
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

