;(function($, window, document,undefined) {
	//定义构造函数
	var ChinaAddressSelect = function(ele, options) {
		this.$element = ele,
		this.$opts = options
	};

	//定义方法
    ChinaAddressSelect.prototype = {
        build: function() {
        	var $opts = this.$opts;
            return this.$element.each(function() {    
		      	$this = $(this);        
		      	var o = $.meta ? $.extend({}, $opts, $this.data()) : $opts;   
		      	var $provSelect = $('<select name="' + o.province_name + '" class="' + o.province_class + '"><option value="0">省份/自治区</option></select>');   
		      	var $citySelect = $('<select name="' + o.city_name + '" class="' + o.city_class + '"><option value="0">城市/地区/自治州</option></select>');   
		      	var $countySelect = $('<select name="' + o.county_name + '" class="' + o.county_class + '"><option value="0">区/县</option></select>');   
		      	$this.html($provSelect).append($citySelect).append($countySelect);  
				$(address_data).each(function(){
					$provSelect.append('<option value="' + this.id + '">' + this.name + '</option>');
				});
				$provSelect.change(function(){
			    	var selValue = $(this).val();
			    	$citySelect.val(0);
			    	$countySelect.val(0);
			    	$('option:gt(0)', $citySelect).remove();
			    	$('option:gt(0)', $countySelect).remove();
					$(address_data).each(function(){
						if(this.id == selValue) {
							$(this.child).each(function(){
								$citySelect.append('<option value="' + this.id + '">' + this.name + '</option>');	
							});
							return;
						}
					});
			    });	
			    $citySelect.change(function(){
			    	var selValue = $(this).val();
			    	var proValue = $provSelect.val();
			    	$countySelect.val(0);
			    	$('option:gt(0)', $countySelect).remove();
			    	$(address_data).each(function(){
						if(this.id == proValue) {
							$(this.child).each(function(){
								if(this.id == selValue) {
									$(this.child).each(function(){
										$countySelect.append('<option value="' + this.id + '" zipcode="' + this.zipcode + '">' + this.name + '</option>');	
									});
									return;
								}
							});
						}
					});
			    });
			    $countySelect.change(function(){
					if(typeof o.callback == 'function'){
						var prov = $provSelect.val();
						var city = $citySelect.val();
						var county = $(this).val();
						if(county > 0) {
							var zipcode = $(this).find("option:selected").attr('zipcode');
							o.callback(prov, city, county, zipcode);
						}
					}
			    });
			    if(typeof o.province_val != 'undefined'){
			        $provSelect.val(o.province_val).change();
			    }
			    if(typeof o.city_val != 'undefined'){
			        $citySelect.val(o.city_val).change();
			    }
			    if(typeof o.county_val != 'undefined'){
			        $countySelect.val(o.county_val).change();
			    }
		    });
        }
    }

	$.fn.ChinaAddressSelect = function(options) {         
    	var opts = $.extend({}, $.fn.ChinaAddressSelect.defaults, options);     
	    return new ChinaAddressSelect(this, opts).build();   
  	};

  	$.fn.ChinaAddressShow = function(options){
  		var opts = $.extend({}, $.fn.ChinaAddressShow.defaults, options);
  		return this.each(function() { 
  			var $this = $(this);
  			var address = $this.attr(opts.attr_name);
  			if(address) {
  				$this.html('');
  				var pcc = address.split(opts.attr_split);
  				for(var i = 0; i < pcc.length; i++) {
  					var a = $.ChinaAddressSelect.get(pcc[i]);
  					if(a) {
  						opts.format($this, a);
  					}
  				}
  			}
  		});
  	};

  	var Address = function(id, name, zipcode, type) {
  		this.id = id;
  		this.name = name;
  		this.zipcode = zipcode;
  		this.type = type;
  	};
  	Address.prototype = {
  		getId : function() {
  			return this.id;
  		},
  		getName : function() {
  			return this.name;
  		},
  		getZipCode: function() {
  			return this.zipcode;
  		},
  		getType: function() {
  			return this.type;
  		}
  	};
  	var AddressArr = new Object();
  	function flatten(address_data, i) {
  		$(address_data).each(function(){
  			var type;
  			if(i == 0) {
  				type = 'province';
  			} else if(i == 1) {
  				type = 'city';
  			} else if(i == 2) {
  				type = 'county';
  			}
  			AddressArr[this.id] = new Address(this.id, this.name, this.zipcode, type);
  			if(this.child) {
  				flatten(this.child, i + 1);
  			}
  		});
  	};
  	flatten(address_data, 0);

  	$.ChinaAddressSelect = {
  		get: function(id) {
  			return AddressArr[id];
  		}
  	};

  	$.fn.ChinaAddressSelect.defaults = {    
    	province_name: 'province',    
    	city_name: 'city',
    	county_name: 'county',
    	province_class: 'province',    
	    city_class: 'city',
	    county_class: 'county',
    	province_val: 0,
    	city_val: 0,
    	county_val: 0,
    	callback: function(provice, city, county, zipcode){}  
  	};  
  	$.fn.ChinaAddressShow.defaults = {    
    	attr_name: 'address',
    	attr_split: ':',
    	format: function($ele, address) {
    		$ele.append('<span>' + address.getName() + '</span>');
			if(address.getType() == 'county') {
				$ele.append('<span>(' + address.getZipCode() + ')</span>');
			}
    	}
  	}; 
})(jQuery, window, document);