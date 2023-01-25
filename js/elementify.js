function formatValid(p, elementArray, result) {
    let numberSum = 0
    let massSum = 0;
    for (let item of elementArray) {
        numberSum += item.atomicNumber;
        massSum += item.atomicMass;
    }
    
    p.classList.add("valid"); 
    p.classList.add("message")

    p.innerHTML += "What an ELEMENTIFYABLE name. <br></br> Here's what I got: <br></br> ";
    p.innerHTML += "<b>Name(s):</b> " + elementArray.map(item => item.Name).join(" ");
    p.innerHTML += "<br></br> <b>Symbols: </b>" + elementArray.map(item => item.Symbol).join("");
    p.innerHTML += "<br></br> <b>Total Atomic Number: </b>" + elementArray.map(item => item.atomicNumber).join(" + ") + " = " + numberSum;
    p.innerHTML += "<br></br> <b>Total Atomic Mass: </b>" + elementArray.map(item => item.atomicMass).join(" + ") + " = " + massSum;
    result.appendChild(p);
}

function formatInvalid(p, elementArray, result) {
    if (elementArray.length > 0) {
        
        let numberSum = 0
        let massSum = 0;
        for (let item of elementArray) {
            numberSum += item.atomicNumber;
            massSum += item.atomicMass;
        }

        p.classList.add("zort");
        p.classList.add("message")

        p.innerHTML += "The name is incomplete but don't worry everybody has flaws. <br></br> Here's what I got: <br></br> ";
        p.innerHTML += "<b>Name(s):</b> " + elementArray.map(item => item.Name).join(" ");
        p.innerHTML += "<br></br> <b>Symbols: </b>" + elementArray.map(item => item.Symbol).join("");
        p.innerHTML += "<br></br> <b>Total Atomic Number: </b>" + elementArray.map(item => item.atomicNumber).join(" + ") + " = " + numberSum;
        p.innerHTML += "<br></br> <b>Total Atomic Mass: </b>" + elementArray.map(item => item.atomicMass).join(" + ") + " = " + massSum;
        result.appendChild(p);
    } else {
        p.classList.add("invalid");
        p.classList.add("message")

        p.innerHTML = "Write a better name my man! Can't find anything :/";
        result.appendChild(p);
    }
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
            result.innerHTML = " ";

            //Diving Input into Array
            const inputArray = [...input];

            //Defining Variables
            let index = 0;
            let p = document.createElement('p');

            while (index < inputArray.length) {
                if (inputArray.length - index > 2) {
                    let twostr = inputArray[index] + inputArray[index + 1];
                    let filtered = data.filter(item => item.Symbol.toLowerCase() == twostr.toLowerCase());

                    if (filtered.length > 0) {
                        elementArray.push(filtered[0]);
                        index += 2;
                    }
                    else {
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
                }
                else {
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
                        }
                        else {
                            let str = inputArray[index];
                            let filtered = data.filter(item => item.Symbol.toLowerCase() == str.toLowerCase());
                            if (filtered.length > 0) {
                                elementArray.push(filtered[0]);
                                index += 1;
                                if (index == result.length - 1) {
                                    formatValid(p, elementArray, result);
                                }
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

