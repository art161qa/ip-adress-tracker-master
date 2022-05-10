import {validateIp} from './helpers'
const ipInput = document.querySelector('.search-bar__input')
const btn = document.querySelector('button')
const ipInfo = document.querySelector('#ip')
const locationInfo = document.querySelector('#location')
const timezoneInfo = document.querySelector('#timezone')
const ipsInfo = document.querySelector('#isp')

btn.addEventListener('click', getData)
ipInput.addEventListener('keydown', handleKey)

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