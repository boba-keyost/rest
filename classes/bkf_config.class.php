<?php

class bkf_Config {
	private $_vars	=	array();

	protected static $instance;
    private function __construct(){}
    private function __clone()    {}
    private function __wakeup()   {}
    public static function getInstance() {
        if ( is_null(self::$instance) ) {
            self::$instance = new bkf_Config;
        }
        return self::$instance;
    }

	public function __get($name) {
		return $this->get($name);
	}
	public function __set($name, $value) {
		return $this->set($name, $value);
	}

	public function get($name) {
		if(!empty($this->_vars[$name]))
			return$this->_vars[$name]->get();
		else
			return null;
	}
	public function set($name,$value) {
		if(!empty($this->_vars[$name]))
			$this->_vars[$name]->set($value);
		else
			$this->_vars[$name] = new bkf_confElement($value);
		return $this->_vars[$name]->get();
	}
}
class bkf_confElement {
	private $_value;

	public function __construct($value) {
		$this->set($value);
	}
	public function set($value)
	{
		$this->_value = $value;
		return $this->get();
	}
	public function get()
	{
		return $this->_value;
	}
}
?>
