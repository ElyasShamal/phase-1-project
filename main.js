
fetch("http://localhost:3000/inventory")
.then(response => response.json())
.then(data =>{
    const image = [];
    data.forEach(availabel => {
        image.push(availabel.image);
        
    });

    const sliderText = [];
    data.forEach(availabel =>{
        sliderText.push({
            name: availabel.name,
            description:availabel.description,
            addtocard: availabel.addtocard,
        
        });
    });

    let sliderIndex = 0;

 function updateSlider() {
    const slider = document.getElementById('slider');
    slider.innerHTML = '';

    const img = document.createElement('img');
    img.src = image[sliderIndex]

 }  

 updateSlider()
})

