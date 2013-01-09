function logAlert(message)
{
	try{
		if( console && console.log )
			console.log(message);
		}
	catch(ie)
	{
		return null;
	}
}
function  strip_tags(str, allowed_tags) {
            var key = '', allowed = false;
            var matches = [];
            var allowed_array = [];
            var allowed_tag = '';
            var i = 0;
            var k = '';
            var html = '';

            var replacer = function(search, replace, str) {
                return str.split(search).join(replace);
            };

            // Build allowes tags associative array
            if (allowed_tags) {
                allowed_array = allowed_tags.match(/([a-zA-Z]+)/gi);
            }

            str += '';

            // Match tags
            matches = str.match(/(<\/?[\S][^>]*>)/gi);

            // Go through all HTML tags
            for (key in matches) {
                if (isNaN(key)) {
                    // IE7 Hack
                    continue;
                }

                // Save HTML tag
                html = matches[key].toString();

                // Is tag not in allowed list? Remove from str!
                allowed = false;

                // Go through all allowed tags
                for (k in allowed_array) {
                    // Init
                    allowed_tag = allowed_array[k];
                    i = -1;

                    if (i != 0) {i = html.toLowerCase().indexOf('<'+allowed_tag+'>');}
                    if (i != 0) {i = html.toLowerCase().indexOf('<'+allowed_tag+' ');}
                    if (i != 0) {i = html.toLowerCase().indexOf('</'+allowed_tag)   ;}

                    // Determine
                    if (i == 0) {
                        allowed = true;
                        break;
                    }
                }

                if (!allowed) {
                    str = replacer(html, "", str); // Custom replace. No regexing
                }
            }

            return str;
        }
function ajahIt(url,params,callBack,fallBack,options)
{
	try
	{
		if(!options)
			options={};
		if(!options.timeout)
			options.timeout=30*1000;
		if(!options.reqType)
			options.reqType='GET';
		if(!options.dataType)
			options.dataType='json';
		var req	=	new Object();
		//meth	=	meth.replace(new RegExp("[^\\w\\d]", "ig"),"");
		var uri = window.location.pathname;
		if($('body').data('dynUri') && $('body').data('dynUri').length)
		{
			uri	=	$('body').data('dynUri');
			//var
		}
		req.url		=	url
		//req.async	=	false;
		req.type	=	options.reqType;
		req.data	=	{'data':params,'uri':uri};
		req.dataType=	options.dataType;
		req.timeout	=	parseInt(options.timeout);
		if(!callBack)
			callBack	=	workupAnsw;
		if(!fallBack)
			fallBack	=	workupAnsw;
		req.success	=	function(data){ callBack(data)};
		req.error 	=	function(data){ fallBack(data)};

		$.ajax(req);
	}
	catch(e)
	{
		logAlert(e);
		if(fallBack && $.isFunction(fallback))
			fallBack(e);
	}
}

function workupAnsw(params)
{
	/*Nothing to do*/
}

function requestFailed(params)
{
	//logAlert(data.status);
}

function getFlickrUrl(apiMeth,vars)
{
	var apiKey	=	"5942a042a1a7aa112ca8f60ed05be280";
	var apiScrt	=	"a1a5d2f353b12fc7";
	var params	=	{};
	var root	=	"";
	switch(apiMeth)
	{
		case 'user':
			root	=	"http://api.flickr.com/services/rest/";
			params	=	{
				method:'flickr.people.findByUsername',
				api_key:apiKey,
				format:'json',
				nojsoncallback:1,
				username:vars
			};
			break;
		case 'photos':
			root	=	"http://api.flickr.com/services/rest/";
			params	=	{
				method:'flickr.people.getPublicPhotos',
				api_key:apiKey,
				format:'json',
				nojsoncallback:1,
				user_id :vars,
				per_page :20
			};
			break;
		case 'photoDetails':
			root	=	"http://api.flickr.com/services/rest/";
			params	=	{
				method:'flickr.photos.getInfo',
				api_key:apiKey,
				format:'json',
				nojsoncallback:1,
				photo_id :vars
			};
			break;
	}
	return root+'?'+$.param(params);
}

function getFlickrSrc(data,size)
{
	//logAlert(data);
	return "http://farm"+data.farm+".staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_"+size+".jpg";
}