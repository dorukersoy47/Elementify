fetch("../json/elementList.json")
    .then(response => response.json()) // Parse the JSON data
    .then(data => {
        // Get the JSON data as an array
        let jsonData = data;

        // Create a table element
        let table = document.createElement("table");
        table.classList.add("table");

        // Create table header row
        let headerRow = table.insertRow(-1);
        let headerCell;

        // Add table headers
        for (let key in jsonData[0]) {
            headerCell = document.createElement("th");
            headerCell.innerHTML = key;
            headerRow.appendChild(headerCell);
        }

        // Add data rows
        for (let i = 0; i < jsonData.length; i++) {
            let row = table.insertRow(-1);
            for (let key in jsonData[i]) {
                let cell = row.insertCell(-1);
                cell.innerHTML = jsonData[i][key];
            }
        }

        // Add the table to the HTML document
        let tableContainer = document.getElementById("elementList");
        tableContainer.innerHTML = "";
        tableContainer.appendChild(table);
});