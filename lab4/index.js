window.addEventListener('DOMContentLoaded', ()=> {
    let place = document.getElementById('place');
    place.addEventListener('change', ()=>{
        let placeData = place.value;
        let url = `https://weatherdbi.herokuapp.com/data/weather/${placeData}`
        tables(url);
    })

    const success = async (position) =>{
        console.log(position.coords);
        let latitude =  position.coords.latitude;
        let longitude = position.coords.longitude;
        console.log( latitude, longitude)
        let url = `https://weatherdbi.herokuapp.com/data/weather/${latitude + ',' + longitude}`;
        tables(url);
    }

    const error = (err) => {
        console.error(err)
    }

    function tables(url){
        fetch(url)
        .then(data => {
            return data.json();
        }).then(jsonData =>{ 
            if (jsonData['status'] == 'fail'){
                alert("Please enter a place that exists on earth!");
            }else{
                document.getElementById('table1').style.visibility = 'visible';
                console.log(jsonData)
                let Region = document.getElementById('region');
                Region.value = jsonData['region'];
                let dayhour = document.getElementById('dayHour');
                dayhour.value = jsonData.currentConditions['dayhour'];
                let percip = document.getElementById('percip');
                percip.value = jsonData.currentConditions['precip'];
                let humidity = document.getElementById('humidity');
                humidity.value = jsonData.currentConditions['humidity'];
                let wind = document.getElementById('wind');
                wind.value = 'km: ' + jsonData.currentConditions['wind'].km + ' mile: ' + jsonData.currentConditions['wind'].mile;
                let comment = document.getElementById('comment');
                comment.value = jsonData.currentConditions['comment'];
                icon = document.getElementById('icon');
                icon.src = jsonData.currentConditions['iconURL'];
                icon.alt = comment.value
                for(let i = 1; i < 8; i++){
                    let day = document.getElementById('day' + i);
                    day.innerText = jsonData.next_days[i].day;
                    let icon = document.getElementById('icon' + i);
                    icon.src = jsonData.next_days[i].iconURL;
                    let comment = document.getElementById('comment' + i);
                    comment.value = jsonData.next_days[i].comment;
                    let max_temp = document.getElementById('max_temp' +i);
                    max_temp.value = jsonData.next_days[i].max_temp.f + '\u00B0F';
                    let min_temp = document.getElementById('min_temp' + i);
                    min_temp.value = jsonData.next_days[i].min_temp.f + '\u00B0F';
                }
            }
        })
    }


    let currentLocation = document.getElementById('currentLocation');
    currentLocation.addEventListener('click', (e)=>{
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(success, error);
    })
})