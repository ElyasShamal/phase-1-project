document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/inventory")
    .then( response => response.json())
    .then(availabelItem => availabelItem.forEach(item => createItem(item)));
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

