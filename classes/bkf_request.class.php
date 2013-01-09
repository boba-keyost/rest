<?php
class bkf_Request {

	private $_method;
	private $_uri;
	private $_query;
	private $_action;
	private $_element;
	private $_routeName;
	private $_params;

	public function __construct() {
		$this->_method	=	$_SERVER['REQUEST_METHOD'];
		$this->_uri		=	substr($_SERVER['REQUEST_URI'],0,  strpos($_SERVER['REQUEST_URI'], '?'));
		$this->_query	=	$_SERVER['QUERY_STRING'];
		$this->_params	=	array();
		list(
			$this->_action,
			$this->_element,
			$this->_routeName) = $this->parseUri();
		$this->_params	=	$this->parseParams();
	}

	public function __get($name) {
		return $this->getParam($name);
	}


	public function parseUri($uri=null,$part=null)
	{
		if(!$uri)
			$uri	=	$this->_uri;

		$uriParams	=	array(
			'action'	=> "index",
			'element'	=> 0,
			'routeName'	=> 'default'
		);

		$routes	= bkf_Config::getInstance()->routes;
		$routes['default']	=	"\/(?P<action>[^\/]*)\/?(?P<element>[^\/]*)\/?";
		foreach ($routes as $rName=>$rPattern)
		{
			if(preg_match("/^".$rPattern."$/uix",$uri,$matches))
			{
				if(!empty($matches))
				{
					foreach($matches as $k=>$vl)
					{
						if(!(int) $k)
						{
							if($k=='action' || $k=='element')
								if($vl)
									$uriParams[$k]	=	$vl;
							else
								$this->setParam($k,$vl);
						}
					}
				}
			}
		}

		preg_match("/^(?P<action>send|create|render)(?P<tpl>\w[\w\d]*)Message/",$uri,$matches);

		if($part)
			return $uriParams[$part];
		else
			return array_values ($uriParams);
	}

	public function getParam($name) {
		if(array_key_exists($name,$this->_params))
			return $this->_params[$name];
		else
			return null;
	}

	public function setParam($name, $value) {
		$this->_params[$name] =	$value;
	}

	public function parseParams($query=null) {
		if(!$query)
			$query	= $this->_query;

		parse_str($query,$this->_params);

		return $this->_params;
	}

	public function getAction() {
		return $this->_action;
	}
	public function getElement() {
		return $this->_element;
	}

	public function getMethod() {
		return $this->_method;
	}

}
?>
