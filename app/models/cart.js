// shopping cart item
function cartItem(productId, name, unitPrice, quantity) {
    this.productId = productId;
    this.name = name;
    this.unitPrice = unitPrice * 1;
    this.quantity = quantity * 1;
    this.total = this.unitPrice * this.quantity;
}

// shopping cart
function shoppingCart(cartName) {
    this.cartName = cartName;
    this.clearCart = false;
    this.items = [];
    this.total = 0;
    this.discount = 0;
    this.tax = 15;
    this.grandTotal = 0;
    this.payableAmount = 0;
    this.userId = 0; //TO DO:

    // load Items from local storage when initializing
    this.loadItems();

    // save Items to local storage when unloading
    var self = this;
    $(window).unload(function() {
        if (self.clearCart) {
            self.clearItems();
        }
        self.saveItems();
        self.clearCart = false;
    });
}

// load Items from local storage
shoppingCart.prototype.loadItems = function() {
    var items = localStorage != null ? localStorage[this.cartName + "_items"] : null;
    if (items != null && JSON != null) {
        try {
            items = JSON.parse(items);
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.productId != null && item.name != null && item.unitPrice != null && item.quantity != null) {
                    item = new cartItem(item.productId, item.name, item.unitPrice, item.quantity);
                    this.items.push(item);
                }
            }
        } catch (err) {
            // ignore errors while loading...
        }
    }
};

// save Items to local storage
shoppingCart.prototype.saveItems = function() {
    if (localStorage != null && JSON != null) {
        localStorage[this.cartName + "_items"] = JSON.stringify(this.items);
    }
};

// adds an item to the cart
shoppingCart.prototype.addItem = function(productId, name, unitPrice, quantity) {
    quantity = this.toNumber(quantity);
    if (quantity != 0) {
        // update Quantity for existing item
        var found = false;
        for (var i = 0; i < this.items.length && !found; i++) {
            var item = this.items[i];
            if (item.productId == productId) {
                found = true;
                item.quantity = this.toNumber(item.quantity + quantity);
                if (item.quantity <= 0) {
                    this.items.splice(i, 1);
                }
            }
        }
        // new item, add now
        if (!found) {
            var item = new cartItem(productId, name, unitPrice, quantity);
            this.items.push(item);
        }
        // save changes
        this.saveItems();
    }
};

// clear the cart
shoppingCart.prototype.clearItems = function() {
    this.items = [];
    this.saveItems();
};

//convert into number
shoppingCart.prototype.toNumber = function(value) {
    value = value * 1;
    return isNaN(value) ? 0 : value;
};
// get the total UnitPrice for all Items currently in the cart
shoppingCart.prototype.getTotalPrice = function(productId) {
    var _total = 0;
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        if (productId == null || item.productId == productId) {
            _total += this.toNumber(item.quantity * item.unitPrice);
        }
    }

    var tax = this.toNumber((this.total * this.tax) / 100);

    this.total = _total;
    this.grandTotal = this.total + tax;
    this.payableAmount = this.grandTotal - this.discount;

    return _total;
};

// get the total Items currently in the cart
shoppingCart.prototype.getTotalCount = function(productId) {
    var count = 0;
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        if (productId == null || item.productId == productId) {
            count += this.toNumber(item.quantity);
        }
    }
    return count;
};

//checkout using payumoney
shoppingCart.prototype.checkoutPayUmoney = function(cartId, authInfo) {
    /*
     Test Card Name: any name
     Test Card Number: 5123456789012346
     Test CVV: 123
     Test Expiry: May 2017
     */
    console.log(authInfo);
    var params = {
        url: "https://test.payu.in/_payment",
        options: {
            key: "gtKFFx",
            salt: "eCwWELxi",
            txnid: (Math.random() * 10000000000).toFixed(0), //with 10 numbers
            amount: this.payableAmount,
            productinfo: this.cartName + "_" + this.getTotalCount(),
            firstname: authInfo.fullName,
            email: authInfo.userName,
            phone: authInfo.contactNo,
            surl: "http://localhost:3000/api/store/paymentstatus",
            furl: "http://localhost:3000/api/store/paymentstatus",
            service_provider: "",
            hash: "",
            udf1: cartId,
            udf2: authInfo.userId
        }
    };

    var str = params.options.key + "|" + params.options.txnid + "|" + params.options.amount + "|" + params.options.productinfo + "|" + params.options.firstname + "|" + params.options.email + "|" + params.options.udf1 + "|" + params.options.udf2 + "|||||||||" + params.options.salt;

    // console.log(str);
    params.options.hash = CryptoJS.SHA512(str).toString();

    // build form
    var form = $('<form/></form>');
    form.attr("action", params.url);
    form.attr("method", "POST");
    form.attr("style", "display:none;");
    this.addFormFields(form, params.options);
    $("body").append(form);

    // submit form
    this.clearCart = true;

    form.submit();
    form.remove();
};

// adding hidden fields to form
shoppingCart.prototype.addFormFields = function(form, data) {
    if (data != null) {
        $.each(data, function(Name, value) {
            if (value != null) {
                var input = $("<input></input>").attr("type", "hidden").attr("Name", Name).val(value);
                form.append(input);
            }
        });
    }
};