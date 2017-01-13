/*!
 * jQuery Address Plugin v0.2.0
 *
 * Copyright 2014
 *
 * @author Pangxin
 * @mail   pangxin001@163.com
 *
 *
 * $('#addressSelect').AddressSelect();
 *
 *
 */
;
(function($, _) {
    //定义构造函数
    var AddressSelect = function(ele, options) {
        this.$element = ele;
        this.$opts = options;
    };

    //定义方法
    AddressSelect.prototype = {
        build: function() {
            var $opts = this.$opts;
            return this.$element.each(function() {
                var $this = $(this);
                var o = $.meta ? $.extend({}, $opts, $this.data()) : $opts;
                var $countrySelect = $this.find(o.country);
                var $provinceSelect = $this.find(o.province);
                var $citySelect = $this.find(o.city);
                var $districtSelect = $this.find(o.district);
                AddressSelect.buildSelect(o, $countrySelect, 1, 0);

                if (o.country_val != undefined) {
                    $countrySelect.val(o.country_val);
                }
                AddressSelect.buildSelect(o, $provinceSelect, 2, o.country_val);

                if (o.province_val != undefined) {
                    $provinceSelect.val(o.province_val);
                }
                AddressSelect.buildSelect(o, $citySelect, 3, o.province_val);

                if (o.city_val != undefined) {
                    $citySelect.val(o.city_val);
                }
                AddressSelect.buildSelect(o, $districtSelect, 4, o.city_val);

                if (o.district_val != undefined) {
                    $districtSelect.val(o.district_val);
                }

                AddressSelect.bindChange(o, $countrySelect, o.callback, $provinceSelect, 2);
                AddressSelect.bindChange(o, $provinceSelect, o.callback, $citySelect, 3);
                AddressSelect.bindChange(o, $citySelect, o.callback, $districtSelect, 4);
                AddressSelect.bindChange(o, $districtSelect, o.callback);
            });
        }
    };

    AddressSelect.bindChange = function(opts, $select, callback, $subSelect, type) {
        $select.change(function() {
            var val = parseInt($(this).val());
            if($subSelect) {
                AddressSelect.buildSelect(opts, $subSelect, type, val);
            }
            if (typeof callback == 'function') {
                callback(AddressSelect.getData(val));
            }
        });
    }

    var emptyAddress = ['国家', '省份/自治区', '城市/地区/自治州', '区/县'];
    AddressSelect.emptySelect = function($select, type) {
        $select.empty().append('<option value="0">' + emptyAddress[type - 1] + '</option>').hide();
    };

    AddressSelect.buildSelect = function(opts, $select, type, pid, defVal) {
        if($select.length == 0) return;
        var oldVal = $select.val();
        AddressSelect.emptySelect($select, type);
        var subAreas = _.where(address_data, { parent_id: parseInt(pid), type: type });
        if(opts.always_show || subAreas.length > 0) {
            $select.show();
        }
        subAreas = _.sortBy(subAreas, 'id');
        _.each(subAreas, function(area) {
            $select.append('<option value="' + area.id + '">' + area.name + '</option>');
        });
        if (defVal > 0) {
            $select.val(defVal);
        }
        $select.trigger('change');
    };

    AddressSelect.getData = function(id) {
        var data = {};
        var addrs = AddressSelect.getAllAddress(id);
        _.each(addrs, function(addr){
            if(addr.type == 1) {
                data['country'] = addr.id;
                data['country_name'] = addr.name;
            } else if(addr.type == 2) {
                data['province'] = addr.id;
                data['province_name'] = addr.name;
            } else if(addr.type == 3) {
                data['city'] = addr.id;
                data['city_name'] = addr.name;
            } else if(addr.type == 4) {
                data['district'] = addr.id;
                data['district_name'] = addr.name;
            }
            data['zip'] = addr.zip;
        });
        data['address'] = nvl(data['country_name']) + nvl(data['province_name']) + nvl(data['city_name']) + nvl(data['district_name']);
        return data;
    }

    function nvl(val) {
        if(val === undefined || val === null) {
            return '';
        }
        return val;
    }

    AddressSelect.getAddress = function(id){
        return _.findWhere(address_data, { id: parseInt(id) });
    }

    AddressSelect.getAllAddress = function(id) {
        if(id > 0) {
            var addr = [];
            var currAddr = AddressSelect.getAddress(id);
            addr.unshift(currAddr);
            while(currAddr.parent_id > 0) {
                currAddr = AddressSelect.getAddress(currAddr.parent_id);
                addr.unshift(currAddr);
            }
            return addr;
        }
    }

    $.fn.AddressSelect = function(options) {
        var opts = $.extend({}, $.fn.AddressSelect.defaults, options);
        return new AddressSelect(this, opts).build();
    };

    $.fn.AddressSelect.defaults = {
        country: '[name="country"]',
        province: '[name="province"]',
        city: '[name="city"]',
        district: '[name="district"]',
        country_val: undefined,
        province_val: undefined,
        city_val: undefined,
        district_val: undefined,
        always_show: false,
        callback: function(data) {}
    };
})(jQuery, _);
