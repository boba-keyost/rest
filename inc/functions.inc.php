<?php
function trim_by_reference(&$string) {
        $string = trim($string);
    }

function fullStripTags($str,$whitelist=null)
{
	$str	= strip_tags($str,$whitelist);
	if($str!=  strip_tags($str,$whitelist))
		$str	= fullStripTags ($str, $whitelist);
	else
		return $str;
}

function var_die($params)
{
	call_user_func_array('vardie', func_get_args());
}
function vardie($params)
{
	call_user_func_array('vardump', func_get_args());
	die();
}

function vardump($params)
{
	//foreach(func_get_args() as $ar)
	//{
	$params	=	func_get_args();
//	if(count($params)<2)
//	$params	=	reset($params);
	$fnc	=	"var_dump";
	if(function_exists("xdebug_var_dump"))
		$fnc	=	"xdebug_".$fnc;
	foreach($params as $var)
		call_user_func($fnc, $var);
	//}
}

function camelCase()
{
	$params = func_get_args();
	$string	=	"";
	foreach($params as $p)
	{
		$p		= strtolower($p);
		$p[0]	= strtoupper($p[0]);
		$string.=$p;
	}
	$string[0]	= strtolower($string[0]);
	return $string;
}

function recursiveBuildXML($elem,$content)
{
	if(is_array($content))
	{
		foreach($content as $k=>$val)
		{
			$el =	$elem->addChild('item');
			if($k)
				$el->addAttribute('name',$k);
			recursiveBuildXML($el,$val);
		}
	}
	else
	{
		$elem->addAttribute('value',$content);
	}
	return $elem;
}

?>
