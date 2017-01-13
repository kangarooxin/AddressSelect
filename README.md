AddressSelect
==================

省市三级联动

For **demo**, usage, and examples, see:
http://kangarooxin.github.io/ChinaAddressSelect/

### Useage:

```html
<div class="addressSelect">
    <select name="country"></select>
    <select name="province"></select>
    <select name="city"></select>
    <select name="district"></select>
</div>
```
```javascript
$('.addressSelect').AddressSelect();
```

### Options:

```javascript
$('.addressSelect').AddressSelect({
    country: '[name="country"]',
    province: '[name="province"]',
    city: '[name="city"]',
    district: '[name="district"]',
    country_val: undefined,
    province_val: undefined,
    city_val: undefined,
    district_val: undefined,
    always_show: false,
    callback: function(data) {
        Console.log(data.address);
    }
});
```
