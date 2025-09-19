function fetchData(callback) {
    setTimeout(() => {
        const data = { name: "John", age: 30 };
        callback(data);
    }, 1000);
}

function handleData(result) {
    console.log("Received data:", result);
}

fetchData(handleData);

