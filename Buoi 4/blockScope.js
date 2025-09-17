// Block
// Trong JavaScript, var không có block scope, chỉ có function scope.
// Nếu muốn có block scope (biến chỉ tồn tại trong khối { ... }), bạn phải dùng let hoặc const.
function blockScope() {
    let x = 1;
    const y = 2;

    function innerFunction() {
        let x = 10;   
        const y = 20; 
        var z = 30;   

        console.log("Trong block:", x, y, z); // 10 20 30
    }
    innerFunction();

    console.log("Ngoài block:", x, y, z); // 1 2 30
}

blockScope();




