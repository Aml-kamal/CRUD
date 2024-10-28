var nameInput = document.getElementById("Name");
var priceInput = document.getElementById("price");
var categoryInput = document.getElementById("category");
var descInput = document.getElementById("desc");
var imgInput = document.getElementById("img");
var searchInput = document.getElementById("searchInput");
var updateBtn =document.getElementById('updateBtn');
var addBtn=document.getElementById('addBtn');
var indexEle = 0;
var productList=[];
if (localStorage.getItem("product") !== null) {
  productList = JSON.parse(localStorage.getItem("product"));
  displayProduct();
}else{
    productList=[];
}

function addProduct() {
    if(
        validation(nameInput,'msgName')&&
        validation(priceInput,'msgPrice')&&
        validation(categoryInput,'msgCategory')&&
        validation(descInput,'msgDescription')&&
        validation(imgInput,'msgImg')

    ){
        var product = {
            name: nameInput.value,
            price: priceInput.value,
            category: categoryInput.value,
            description: descInput.value,
            image: imgInput.files[0]?.name
              ? `img/${imgInput.files[0].name}`
              : "img/work-1.jpg",
          };
          productList.push(product);
          displayProduct();
          localStorage.setItem("product", JSON.stringify(productList));
          clearForm();
    }

}
function clearForm() {
  nameInput.value = null;
  priceInput.value = null;
  categoryInput.value = null;
  descInput.value = null;
  imgInput.value = null;

  nameInput.classList.remove('is-valid');
  priceInput.classList.remove('is-valid');
  categoryInput.classList.remove('is-valid');
  descInput.classList.remove('is-valid');
  imgInput.classList.remove('is-valid');

}

function displayProduct() {
  var box = ``;

  var term = searchInput.value;

  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())==true) {
      box += `
              <tr>
                <td>
                ${i}
                </td>
                <td>
                ${productList[i].name}
                </td>
                <td>
                ${productList[i].price}
    
                </td>
                <td>
                ${productList[i].category}
    
                </td>
                <td>
                ${productList[i].description}
    
                </td>
                <td>
                <img width="100px" src="${productList[i].image}" alt="">
                </td>
                <td>
                <button class="btn text-bg-danger " onclick="deleteProduct(${i})">Delete</button>
                <button class="btn text-bg-success" onclick="updateForm(${i})">Update</button>
    
                </td>
    
                
            </tr>
            
            
            `;
    }
  }
  document.getElementById("demo").innerHTML = box;
}
function deleteProduct(index) {
  productList.splice(index, 1);
  displayProduct();
  localStorage.setItem("product", JSON.stringify(productList));
}
function validation(element,msgId) {
    var text =element.value;
    var  msg=document.getElementById(msgId)
    var regex={
        Name:/^[A-Z][a-z]{3,10}$/,
        price:/^[1-9][0-9]*$/,
        category:/^(tv|mobile|screen)$/i,
        desc:/^.{3,}$/m,
        img:/^.{1,}\.(jpg|png|svg|jpeg|avif)$/,
    };
    if(regex[element.id].test(text)){
        console.log("match");
        
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        msg.classList.add('d-none')
return true
    }else{
        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
        msg.classList.remove('d-none')
return false
    }
}
//.......update........
function updateForm(index){
  nameInput.value = productList[index].name;
  priceInput.value =productList[index].price;
  categoryInput.value = productList[index].category;
  descInput.value = productList[index].description;

addBtn.classList.add('d-none');
updateBtn.classList.remove('d-none');
  console.log("helooo");
  indexEle=index

}
function update(){
  if(
    validation(nameInput,'msgName')&&
    validation(priceInput,'msgPrice')&&
    validation(categoryInput,'msgCategory')&&
    validation(descInput,'msgDescription')
){
    var product = {
        name: nameInput.value,
        price: priceInput.value,
        category: categoryInput.value,
        description: descInput.value,
        image: imgInput.files[0]?.name
          ? `img/${imgInput.files[0].name}`
          : "img/work-1.jpg",
      };
      productList.splice(  indexEle , 1  ,product);
      displayProduct();
      localStorage.setItem("product", JSON.stringify(productList));
      clearForm();
      
updateBtn.classList.add('d-none');
addBtn.classList.remove('d-none');
}

}