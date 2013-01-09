<?php
include_once '../classes/bkf_exception.class.php';
include_once '../classes/bkf_config.class.php';

$conf = bkf_Config::getInstance();

$conf->requestMethods	=	array(
	'POST',
	'GET',
	'PUT',
	'DELETE'
);
$conf->allowedResponseTypes	=	array(
	'XML',
	'JSON'
);
$conf->responseCode			=	200;
$conf->responseStatus			=	"All ok";
$conf->responseContentType	=	"text/plain";
$conf->responseCharset	=	"utf-8";
$conf->responseType			=	"JSON";

$conf->allowedContentTypes	=	array(
	'text/plain',
	'text/javascript',
	'text/xml',
);
$conf->allowedCharsets	=	array(
	'utf-8',
	'cp1251',
	'windows-1251',
);
//vardie());
$conf->root		= realpath($_SERVER['DOCUMENT_ROOT']."/../");
$conf->viewPath	=	$conf->root.'/views';

$conf->routes			=	array(
);

unset($conf);
?>
