<?php
class bkf_Response{
	private $_code;
	private $_status;
	private $_contentType;
	private $_type;
	private $_content;

	public function __construct()
	{
		$this->_code = bkf_Config::getInstance()->responseCode;
		$this->_status = bkf_Config::getInstance()->responseStatus;
		$this->_contentType = bkf_Config::getInstance()->responseContentType;
		$this->_charset = bkf_Config::getInstance()->responseCharset;
		$this->_type = bkf_Config::getInstance()->responseType;
		$this->_content = null;
	}
	public function getCode()
	{
		return $this->_code;
	}
	public function getStatus()
	{
		return $this->_status;
	}
	public function getContentType()
	{
		return $this->_contentType;
	}
	public function getCharset()
	{
		return $this->_charset;
	}
	public function getType()
	{
		return $this->_type;
	}
	public function getContents()
	{
		return $this->_content;
	}
	public function setCode($code)
	{
		if(!(int) $code)
			throw new bkf_Exception('Unexpected response code "'.$value.'". Must be an integer.');
		return $this->_code = (int) $code;
	}
	public function setStatus($status)
	{
		return $this->_status = $status;
	}
	public function setContentType($value)
	{
		if(!in_array($value,bkf_Config::getInstance()->allowedContentTypes))
			throw new bkf_Exception('Unexpected response content type "'.$value.'"');
		return $this->_contentType = $value;
	}
	public function setCharset($value)
	{
		if(!in_array(strtolower($value),bkf_Config::getInstance()->allowedCharsets))
			throw new bkf_Exception('Unexpected charset "'.$value.'"');
		return $this->_contentType = $value;
	}
	public function setType($value)
	{
		if(!in_array(strtoupper($value),bkf_Config::getInstance()->allowedResponseTypes))
			throw new bkf_Exception('Unexpected response content type "'.$value.'". Must be one of ("'.implode('","',bkf_Config::getInstance()->allowedResponseTypes).'")');
		return $this->_type = strtoupper($value);
	}
	public function setContents($value)
	{
		return $this->_content = $value;
	}

}
?>
