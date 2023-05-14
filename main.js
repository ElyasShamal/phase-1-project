
document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/inventory")
    .then( response => response.json())
    .then(availabelItem => availabelItem.forEach(item => createItem(item)));
      // add addEventlistener for btn to open the form
    let lisButton = document.getElementById('btn');
      lisButton.addEventListener('click', () => {
    let form = document.getElementById('form')
      form.style.visibility = 'visible';
      // create another event for form data
    form.addEventListener('submit', (e) => {
       e.preventDefault();
    let formData = Object.fromEntries(new FormData(e.target));
       form.style.display = 'none';
     
       sentItout(formData);

    })
    })
})

function createItem(item){
      //create a div with class name
    let inventory = document.createElement('div');
        inventory.classList.add('inventory');
      //  create image with class name
    let img = document.createElement('img');
        img.classList.add('img-inventory');
        img.src = item.image;
      //create h3 for heading 
    let h3 = document.createElement('h3');
        h3.textContent = item.name;
      // create a paragragh for item description
    let p = document.createElement('p')
        p.textContent = item.description;
      // create buyButton 
    let buyButton = document.createElement('button');
        buyButton.textContent = item.addtocard;
        buyButton.classList.add("buy-btn");

    buyButton.addEventListener('click', () => {
    let shoppingDiv = document.createElement('div');
        shoppingDiv.classList.add('shoppingDiv')
      // create newimage for cart
    let newimage = document.createElement('img');
        newimage.classList.add('cartImage')
        newimage.src = item.image

      // create new H3 for item name
    let newH3 = document.createElement('h3');
        newH3.classList.add('newH3')
        newH3.textContent = item.name;

      // create a new button to remove the item from cart

    let remove = document.createElement('button')
        remove.classList.add('remove');
        remove.textContent = "Remove";

        
    })
    



    inventory.append(img, h3, p, buyButton)
    document.getElementById('availabel-items').appendChild(inventory)

}

function sentItout(newItem){
    fetch('http://localhost:3000/inventory',{

    method: 'POST',
    headers:{
        'content-type': 'appication/json',
        Accept: 'application/json',
    },
    body: JSON.stringify({
        ...newItem,
        'addtocard':'Add to card',
    })
    }).then(
        (response) => response.json(),
    )
    .then(responseItem => createItem(responseItem))
}










fetch("http://localhost:3000/inventory")
.then(response => response.json())
.then(data =>{
    const images = [];
    data.forEach(inventory => {
        images.push(inventory.image);
        
    });

    const sliderText = [];
    data.forEach(inventory =>{
        sliderText.push({
            name: inventory.name,
            description:inventory.description,
            addtocard: inventory.addtocard,
        
        });
    });

    let sliderIndex = 0;

 function updateSlider() {
    const slider = document.getElementById('slider');
          slider.innerHTML = '';
         // create img and added to slider
    const img = document.createElement('img');
          img.src = images[sliderIndex];
          slider.appendChild(img);
         //create sliderTexElem
    const sliderTexElem = document.createElement('div');
          sliderTexElem. classList.add('slider-text');
        // create h3 
    const h3 = document.createElement('h3');
          h3.textContent = sliderText[sliderIndex].name;
          sliderTexElem.appendChild(h3);
        // create a paragragh
    const p = document.createElement('p');
          p.textContent = sliderText[sliderIndex].description;
          sliderTexElem.appendChild(p);
        // create a button 
    const button = document.createElement('button');
          button.textContent = sliderText[sliderIndex].addtocard;
          button.id = "button-card"
          button.classList.add('buy-btn');
  
    sliderTexElem.appendChild(button);
    slider.appendChild(sliderTexElem);

 }  

 updateSlider()

 // create an interval to update the slider every 10 seconds
  setInterval(() => {
    sliderIndex++;
    if(sliderIndex === images.length) {
        sliderIndex = 0;
    }
    updateSlider()
  }, 5000);
})
.catch(error => console.error(error));

