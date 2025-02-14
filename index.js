let container = document.getElementById("container")
let btnContainer = document.getElementById("btn-contain")
async function getData(){
    let response = await fetch("https://fakestoreapi.com/products")
    let result = await response.json()
    localStorage.setItem("products", JSON.stringify(result));
    displayButton()
    displayData();
}
function displayButton(){
    btnContainer.innerHTML = '';
    let products = JSON.parse(localStorage.getItem("products")) || []
    let results = Array.from(new Set(products.map(obj =>obj.category)));
    results.forEach(ele =>{
        let button = document.createElement("button")
        button.textContent = ele ;
        button.addEventListener("click", () => {
            filterData(ele);
        })
        btnContainer.appendChild(button);
    })
}

function filterData(category){
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let result = products.filter(obj => obj.category===category);
    displayData(result);
}

function displayData(filterProducts){ 
    container.innerHTML = ``;
    let products = JSON.parse(localStorage.getItem("products")) || [];
    if (filterProducts !== undefined) {
        products = filterProducts;
    }
    if (products.length === 0) {
        container.innerHTML = "No data Available";
    } else {
        products.forEach((arr)=>{
            let contain = document.createElement("div");
            contain.innerHTML = `
            <p>${arr.id}</p>
            <p>${arr.category}</p>
            <img src="${arr.image}"></img>
            <p class="title">${arr.title}<br></p>
            <p>Price:$${arr.price}</p>
            <p class="rate">Rating:${arr.rating.rate}(${arr.rating.count})</p>
            `;
            container.appendChild(contain)
        })
    }
} 
    
        











getData()