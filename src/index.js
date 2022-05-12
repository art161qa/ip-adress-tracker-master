import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import {validateIp, addTileLayer, getAdress, addOffset} from './helpers'
import icon from '../images/icon-location.svg'
const ipInput = document.querySelector('.search-bar__input')
const btn = document.querySelector('button')
const ipInfo = document.querySelector('#ip')
const locationInfo = document.querySelector('#location')
const timezoneInfo = document.querySelector('#timezone')
const ipsInfo = document.querySelector('#isp')

btn.addEventListener('click', getData)
ipInput.addEventListener('keydown', handleKey)

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30,40],
})

const mapArea = document.querySelector('.map')
const map = L.map(mapArea,{
    center: [51.505, -0.09],
    zoom:13
});
addTileLayer(map)
L.marker([51.505, -0.09], {icon:markerIcon}).addTo(map)

function getData(){
    if (validateIp(ipInput.value)){
        getAdress(ipInput.value)
        .then(setInfo)
    }  
}

function handleKey(e){
    if(e.key === 'Enter'){
        getData()
    }
}

function setInfo(mapData){
    console.log(mapData)
    const {lat, lng, country, region, timezone} = mapData.location
    ipInfo.innerText = mapData.ip
    locationInfo.innerText = country + ' ' + region
    timezoneInfo.innerText = timezone
    ipsInfo.innerText = mapData.isp

    map.setView([lat, lng])
    L.marker([lat, lng], {icon: markerIcon}).addTo(map)

    if (window.matchMedia("(max-width: 1023px)").matches){
        addOffset(map)
    }
   
}

document.addEventListener('DOMContentLoaded', () => {
    getAdress('32.34.53.25')
    .then(setInfo)
})