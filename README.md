ChinaAddressSelect
==================

中国省市三级联动

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