<?php
include_once bkf_Config::getInstance()->root .'/classes/bkf_request.class.php';
include_once bkf_Config::getInstance()->root .'/classes/bkf_response.class.php';

class bkf_Core {

	protected static $instance;
    private function __construct(){}
    private function __clone()    {}
    private function __wakeup()   {}
    public static function getInstance() {
        if ( is_null(self::$instance) ) {
            self::$instance = new bkf_Core;
        }
        return self::$instance;
    }

	private $_request = null;

	private $_response = null;

	public function route()
	{
		$this->_request	=	new bkf_Request();
		//vardie($this->_request);
		if(!in_array($this->_request->getMethod(),  bkf_Config::getInstance()->requestMethods))
			throw new bkf_Exception('Unexpected request method');
	}

	public function run()
	{
		if(!$this->_request)
			throw new bkf_Exception('Route request before running');
		$methodName	=	camelCase(
			$this->_request->getMethod(),
			$this->_request->getAction(),
			'action'
				);
		if(empty($methodName))
			throw new bkf_Exception('Wrong method name');

		$this->_response	=	new bkf_Response();

		if($this->_request->format)
		{
			$this->_response->setType ($this->_request->format);
		}
		call_user_func(array($this,$methodName));
	}

	public function render($view = null)
	{
		if(!$view)
			$view = strtolower ($this->_request->getAction());

		if(!$this->_response)
			throw new bkf_Exception('No response - no render');

		$filename	=	preg_replace('/[^a-z-_.]/i','',camelCase($view,'view')).'.'.strtolower($this->_response->getType()).'.phtml';
		$filepath	= bkf_Config::getInstance()->viewPath.'/'. $filename;
		if(!file_exists($filepath))
			throw new bkf_Exception('No such view file "'.$view.'". Please create file "'.$filename.'" in view folder');

		header('HTTP/1.0 '.$this->_response->getCode().' '.$this->_response->getStatus());
		header('Content-type: '.$this->_response->getContentType().';charset='.$this->_response->getCharset());
		include $filepath;
		die();
	}

	public function getRequest() {
		return $this->_request;
	}
	public function getResponse() {
		return $this->_response;
	}

	public function __call($name, $arguments) {
		if(!method_exists($this, $name))
			throw new BadMethodCallException('Unsupported method "'.$name.'".');
	}

	public function getIndexAction()
	{
		if(!$this->getRequest()->getElement())
		{
			$cont	=	array(
				'a'=>array('a','d','f'),
				'b'=>'s',
				'ss',
				'aa',
				1
			);
		}
		else
		{
			$cont	=	"Element by code: ".$this->getRequest()->getElement();
		}
		$this->getResponse()->setContents($cont);
	}
	public function postIndexAction()
	{

	}
	public function putIndexAction()
	{

	}
	public function deleteIndexAction()
	{

	}
}
?>
