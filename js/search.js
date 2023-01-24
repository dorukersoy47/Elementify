fetch("../json/elementList.json")
    .then(response => response.json())
    .then(data => {
    // Listen for the form's submit event
    const form = document.querySelector('form');
    form.addEventListener('submit', event => {
        event.preventDefault();
        const searchValue = form.querySelector('input').value;
        const resultsDiv = document.querySelector('#results');
        
        if (searchValue != "") {document.getElementById("elementList").style.display = "none";}

        // Clear the table before every new search
        resultsDiv.innerHTML = "";

        // Filter the data based on the search value
        const filteredData = data.filter(item => item.Name.toLowerCase().includes(searchValue.toLowerCase()));

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

        // Add rows to the table for each search result
        filteredData.forEach(result => {
        const row = table.insertRow();
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

        // Append the table to the results div
        resultsDiv.appendChild(table);
    });
  });