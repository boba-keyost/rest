<?php
error_reporting(E_ALL);
ini_set('display_errors',1);

include_once '../inc/functions.inc.php';
include_once '../inc/config.inc.php';
include_once '../classes/bkf_core.class.php';

try
{
	$core	= bkf_Core::getInstance();

	$core->route();

	$core->run();

	if(!false && $core->getResponse()->getType()=='XML')
		$core->getResponse()->setContentType('text/xml');

	$core->render();
}
catch(Exception $e)
{
	try {
		$core->getResponse()->setCode(($e->getCode())?$e->getCode():500);
		$core->getResponse()->setStatus($e->getMessage());
		$core->getResponse()->setContents(array(
			'state'	=>false,
			'type'	=>"Error",
			'file'	=>$e->getFile(),
			'line'	=>$e->getLine(),
			'message'	=>$e->getMessage(),
		));
		$core->render('error');

	} catch (Exception $inExc) {
		die($inExc->getMessage());
	}
}
?>
