const input = document.getElementById("searchInput");
input.addEventListener("input", function (event) {
    event.preventDefault();

    input.addEventListener("keydown", function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
    });

    fetch("../json/elementList.json")
    .then(response => response.json())
    .then(data => {
        const searchValue = input.value;
        const resultsDiv = document.querySelector('#results');
        
        if (searchValue != "") { document.getElementById("elementList").style.display = "none"; }

        // Clear the table before every new search
        resultsDiv.innerHTML = "";

        // Create a table element
        const table = document.createElement('table');
        table.classList.add("table");

        // Add a table row for the header
        let headerRow = table.insertRow(-1);
        let headerCell;

        for (let key in data[0]) {
            headerCell = document.createElement("th");
            headerCell.innerHTML = humanizeKey(key);
            headerRow.appendChild(headerCell);
        }

        //Gettng Search Type & Defining Variables
        let searchType = document.getElementById("searchType").value;
        let filteredData;

        //Switch Statement for Search Type
        switch (searchType) {
            case "name":
                filteredData = data.filter(item => item.Name.toLowerCase().includes(searchValue.toLowerCase()));

                filteredData.forEach(result => {
                    let row = table.insertRow();
                    for (let key in result) {
                        let cell = row.insertCell(-1);
                        if (key == 'Name') {
                            cell.innerHTML = result[key].replace(new RegExp(searchValue, 'gi'),
                                match => `<span class="highlight">${match}</span>`);
                        }
                        else {
                            cell.innerHTML = result[key];
                        }
                    }
                });
                break;
            
            case "symbol":
                filteredData = data.filter(item => item.Symbol.toLowerCase().includes(searchValue.toLowerCase()));

                filteredData.forEach(result => {
                    const row = table.insertRow();
                    for (let key in result) {
                        let cell = row.insertCell(-1);
                        if (key == 'Symbol') {
                            cell.innerHTML = result[key].replace(new RegExp(searchValue, 'gi'),
                                match => `<span class="highlight">${match}</span>`);
                        }
                        else {
                            cell.innerHTML = result[key];
                        }
                    }
                });
                break;
            
            case "atomicNumber":
                if (searchValue === "") {
                    filteredData = data;
                } else {
                    filteredData = data.filter(item => item.atomicNumber == searchValue);
                }

                filteredData.forEach(result => {
                    const row = table.insertRow();
                    for (let key in result) {
                        let cell = row.insertCell(-1);
                        cell.innerHTML = result[key];
                    }
                });
                break;
            
            case "atomicMass":
                if (searchValue === "") {
                    filteredData = data;
                } else {
                    filteredData = data.filter(item => item.atomicMass.toString().includes(searchValue.toString()));
                }
                

                filteredData.forEach(result => {
                    let row = table.insertRow();
                    for (let key in result) {
                        let cell = row.insertCell(-1);
                        if (key == 'atomicMass') {
                            cell.innerHTML = result[key].toString().replace(new RegExp(searchValue, 'gi'),
                                match => `<span class="highlight">${match}</span>`);
                        }
                        else {
                            cell.innerHTML = result[key];
                        }
                    }
                });
                break;
        }

        // Append the table to the results div
        resultsDiv.appendChild(table);
    });
});

