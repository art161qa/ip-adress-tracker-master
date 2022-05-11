import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import {validateIp} from './helpers'
const ipInput = document.querySelector('.search-bar__input')
const btn = document.querySelector('button')
const ipInfo = document.querySelector('#ip')
const locationInfo = document.querySelector('#location')
const timezoneInfo = document.querySelector('#timezone')
const ipsInfo = document.querySelector('#isp')

btn.addEventListener('click', getData)
ipInput.addEventListener('keydown', handleKey)

const mapArea = document.querySelector('.map')
const map = L.map(mapArea,{
    center: [51.505, -0.09],
    zoom:13
});
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYXJ0MTYxcm5kIiwiYSI6ImNsMzI0c2cxcTFnaHAzaXNiNjJuamg2dzYifQ.hEFCJXTPNzWN4d5BGj-D5g'
}).addTo(map);

function getData(){
    if (validateIp(ipInput.value)){
        fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_mf9VLsNguJl1YwuCclZUtSiUarSRn&ipAddress=${ipInput.value}`)
        .then(resp => resp.json())
        .then(data => setInfo(data))
    }
    
        
}

function handleKey(e){
    if(e.key === 'Enter'){
        getData()
    }
}

function setInfo(mapData){
    console.log(mapData)
    ipInfo.innerText = mapData.ip
    locationInfo.innerText = mapData.location.country + ' ' + mapData.location.region
    timezoneInfo.innerText = mapData.location.timezone
    ipsInfo.innerText = mapData.isp
}