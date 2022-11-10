window.addEventListener('DOMContentLoaded', ()=> {
    let place = document.getElementById('place');
    place.addEventListener('change', ()=>{
        let placeData = place.value;
        let url = `https://weatherdbi.herokuapp.com/data/weather/${placeData}`
        fetch(url)
        .then(data => {
            return data.json();
        }).then(jsonData =>{ 
            if (jsonData['status'] == 'fail'){
                alert("Please enter a place that exists on earth!");
            }else{
                console.log(jsonData)
                console.log(jsonData.currentConditions['wind'])
            }
        })
    })
})