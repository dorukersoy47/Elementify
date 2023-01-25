function formatValid(p, elementArray, result) {
    p.innerHTML += "Name(s):" + elementArray.map(item => item.Name).join(" ");
    p.innerHTML += " (" + elementArray.map(item => item.Symbol).join("") + ")";
    result.appendChild(p);
}

function formatInvalid(p, elementArray, result) {
    p.innerHTML += "Invalid Input";
    p.innerHTML += "Name(s):" + elementArray.map(item => item.Name).join(" ");
    p.innerHTML += " (" + elementArray.map(item => item.Symbol).join("") + ")";
    result.appendChild(p);
}

function elementify() {
    //Assign Input
    let input = document.getElementById('elementifyInput').value;
    let inputValue = input.value;
    let elementArray = [];

    //Getting json file
    fetch("../json/elementList.json")
        .then(response => response.json())
        .then(data => {
            //Assigning Result to Variables
            let result = document.querySelector('#resultElementify');

            //Clear the Text
            result.innerHTML = "";
            
            //Diving Input into Array
            const inputArray = [...input];

            //Defining Variables
            let index = 0;
            let p = document.createElement('p');
            p.classList.add("p");
            p.classList.add("highlight");


            while (index < inputArray.length) {
                if (inputArray.length - index > 2) {
                    let twostr = inputArray[index] + inputArray[index + 1];
                    let filtered = data.filter(item => item.Symbol.toLowerCase() == twostr.toLowerCase());

                    if (filtered.length > 0) {
                        elementArray.push(filtered[0]);
                        index += 2;
                    } else {
                        let str = inputArray[index];
                        let filtered = data.filter(item => item.Symbol.toLowerCase() == str.toLowerCase());
                        if (filtered.length > 0) {
                            elementArray.push(filtered[0]);
                            index += 1;
                        }
                        else {
                            formatInvalid(p, elementArray, result);
                            break;
                        }
                    }
                } else {
                    if (index == inputArray.length - 1) {
                        let str = inputArray[index];
                        let filtered = data.filter(item => item.Symbol.toLowerCase() == str.toLowerCase());
                        if (filtered.length > 0) {
                            elementArray.push(filtered[0]);
                            index += 1;
                            formatValid(p, elementArray, result);
                        }
                        else {
                            formatInvalid(p, elementArray, result);
                            break;
                        }
                    }
                    else if (index == inputArray.length - 2) {
                        let twostr = inputArray[index] + inputArray[index + 1];
                        let filtered = data.filter(item => item.Symbol.toLowerCase() == twostr.toLowerCase());

                    if (filtered.length > 0) {
                        elementArray.push(filtered[0]);
                        index += 2;
                        formatValid(p, elementArray, result);
                    } else {
                        let str = inputArray[index];
                        let filtered = data.filter(item => item.Symbol.toLowerCase() == str.toLowerCase());
                        if (filtered.length > 0) {
                            elementArray.push(filtered[0]);
                            index += 1;
                            formatValid(p, elementArray, result);
                        }
                        else {
                            formatInvalid(p, elementArray, result);
                            break;
                        }
                    }
                    }
                }
            }
        });
}