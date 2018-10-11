var controller = (function () {

    var numberTable = 1;
    var GlobalOrders = {};

    function clearTables() {
        var content = document.getElementById("content");
        var tables = document.getElementsByClassName("table");
        while (tables.length > 0) {
            content.removeChild(tables[0]);
        }
        var titles = document.getElementsByClassName("table-title");
        while (titles.length > 0) {
            content.removeChild(titles[0]);
        }
        numberTable = 1;
    }

    function clearList() {
        var listOrders = document.getElementById("listOrders");
        var options = document.getElementsByClassName("product-displayed");
        while (options.length > 0) {
            listOrders.removeChild(options[0]);
        }

    }

    function addOrder(serie) {
        var tableOrder = document.createElement("table");
        var header = document.createElement("tr");
        
        var cell = document.createElement("th");
        cell.innerHTML = "Fecha";
        header.appendChild(cell);
        
        var cell = document.createElement("th");
        cell.innerHTML = "open";
        header.appendChild(cell);
        
        var cell = document.createElement("th");
        cell.innerHTML = "hight";
        header.appendChild(cell);
        
        var cell = document.createElement("th");
        cell.innerHTML = "low";
        header.appendChild(cell);
        
        var cell = document.createElement("th");
        cell.innerHTML = "close";
        header.appendChild(cell);
        
        var cell = document.createElement("th");
        cell.innerHTML = "volume";
        header.appendChild(cell);
        tableOrder.appendChild(header);
        tableOrder.setAttribute("class", "table");
        for (var i = 0; i < serie.products.length; i++) {
            var row = document.createElement("tr");

            var cell = document.createElement("td");
            cell.innerHTML = serie.products[i].product;
            row.appendChild(cell);

            var cell = document.createElement("td");
            cell.innerHTML = serie.products[i].quantity;
            row.appendChild(cell);

            var cell = document.createElement("td");
            cell.innerHTML = serie.products[i].price;
            row.appendChild(cell);

            tableOrder.appendChild(row);
        }
        var title = document.createElement("h4");
        title.setAttribute("class", "table-title");
        title.innerHTML = "Table " + numberTable++;
        var firstTable = document.getElementById("HTMLtable");
        content.insertBefore(tableOrder, firstTable);
        content.insertBefore(title, tableOrder);
    }

    function loadProducts(product) {
        var selectTable = document.getElementById("ItemName");
        var option = document.createElement("option");
        option.setAttribute("class", "product-select");
        option.innerHTML = product.name;
        selectTable.appendChild(option);
        $('#ItemName').selectpicker('refresh');
    }

    function loadTables(serie) {
        var selectTable = document.getElementById("selectTable");
        var option = document.createElement("option");
        option.innerHTML = "Table " + serie.serie_id;
        option.setAttribute("class", "option-select");
        selectTable.appendChild(option);
        $('#selectTable').selectpicker('refresh');
    }

    function getSelectedTable() {
        var selectedTable = document.getElementById("selectTable");
        var tableLabel = selectedTable.options[selectedTable.selectedIndex].value;
        var table = tableLabel.match(/(\d+)/g)[0];
        return table;
    }

    function loadList() {
        clearList();
        loadServices();
    }

    function loadItems(series, products) {
        clearSelectTable();
        GlobalOrders = {};
        for (i in series) {
            var serie = serieBuilder(series[i], products);
            loadTables(serie);
            GlobalOrders[serie.table_id] = serie.products;
        }
        for (i in products) {
            loadProducts(products[i]);
        }
    }

    function loadToUpdate() {
        loadData(loadItems);
    }

    function loadOrders() {
        clearTables();
        loadData(buildOrders);
    }

    function buildOrders(series, products) {
        for (i in series) {
            var serie = serieBuilder(series[i], products);
            addOrder(serie);
        }
    }

    function loadData(callback) {
        axios.get(url + "/series/"+name+"/"+type).then(function (response) {
            callback(response.data);
        })
    }

    function serieBuilder(serieJson, productsJson) {
        var serie = {serie_id: serieJson.tableNumber, table_id: serieJson.tableNumber, products: []};
        for (productName in serieJson.serieAmountsMap) {
            var prod = {"product": productName, "quantity": serieJson.serieAmountsMap[productName], "price": null}
            prod.price = productsJson.filter(function (x) {
                return x.name === productName;
            })[0].price;
            serie.products.push(prod);
        }
        return serie;
    }
    return {
        loadList: loadList
    };
})();