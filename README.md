ChinaAddressSelect
==================

中国省市三级联动

For **demo**, usage, and examples, see:
http://kangarooxin.github.io/ChinaAddressSelect/

### Useage:

```javascript
$('#addressSelect').ChinaAddressSelect();
```

### Options:

```javascript
$('#addressSelect').ChinaAddressSelect({
    province_name: 'my_province',
    city_name: 'my_city',
    county_name: 'my_county',
    province_class: 'my_province',
    city_class: 'my_city',
    county_class: 'my_county',
    province_val: 5,
    city_val: 53,
    county_val: 647,
    callback:function(prov, city, county, zipcode) {
        $('#addressCode').html(prov + ':' + city + ":" + county + ":" + zipcode);
    }
});
```

### Get Address Object:

```javascript
var address = $.ChinaAddressSelect.get(id);

address.getId();
address.getName();
address.getZipCode();
address.getType();
```

ChinaAddressShow
==================

显示省市

### Useage:

```html
<div class="address" address="5:53:647"></div>
<div class="address" address="2"></div>
<div class="address" address="36"></div>
<div class="address" address="389"></div>
```

```javascript
$('.address').ChinaAddressShow();
```

### Options;
```javascript
$('.address').ChinaAddressShow({
    attr_name: 'address',//属性标签
    attr_split: ':',//分隔符
    format: function($ele, address) {//自定义显示方式
        $ele.append('<span>' + address.getName() + '</span>');
        if(address.getType() == 'county') {
            $ele.append('<span>(' + address.getZipCode() + ')</span>');
        }
    }
});
```