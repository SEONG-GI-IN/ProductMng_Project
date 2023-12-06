<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="tiles"   uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring"  uri="http://www.springframework.org/tags"  %>

<!-- 공통변수 처리 -->
<c:set var="CONTEXT_PATH" value="${pageContext.request.contextPath}" scope="application"/>
<c:set var="RESOURCES_PATH" value="${CONTEXT_PATH}/resources/" scope="application"/>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<meta name="description" content="" />
		<meta name="author" content="" />
		<title>Dashboard - SB Admin</title>
		<link href="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/style.min.css" rel="stylesheet" />
		<link href="css/styles.css" rel="stylesheet" />
		<script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
		<script type="text/javascript">
			var CONTEXT_PATH = "${CONTEXT_PATH}";
			var RESOURCES_PATH = "${RESOURCES_PATH}";
		</script>

		<!-- common.css -->
		<link rel="stylesheet" href="${RESOURCES_PATH}/css/common.css" />

		<!-- jQuery -->
		<script src="https://code.jquery.com/jquery-latest.min.js"></script>

		<script>
			var _g_contextPath_ = "${pageContext.request.contextPath}";
		</script>

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
		<div id='wrapper'>
			<tiles:insertAttribute name="body" />
		</div>
	</body>
</html>