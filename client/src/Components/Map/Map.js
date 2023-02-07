import './Map.css'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

const Map = ({ data }) => {
    // const coordinates = [13.5553,80.0267]
    let center_coord = []
    // data.forEach(item => {
        // if(item.name==="New Delhi"){
    //         center_coord.push(item.latitude)
    //         center_coord.push(item.longitude)
    //     }
    // })
    // console.log(data)
    // console.log(data[0])

    return (
        // <div id="map" style={{height:"180px"}}></div>
        <MapContainer center={[data[0].latitude, data[0].longitude]} zoom={2.5} scrollWheelZoom={false} id="map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data.map(item => (
                <Marker position={[item.latitude,item.longitude]} key={Math.random()}>
                    <Popup>
                        <h2>Name : {item.name}</h2>
                        <h4>Main : {item.main}</h4>
                        <h4>Description : {item.description}</h4>
                        <h4>temperature : {item.temperature}K</h4>
                        <h4>Min temperature : {item.min_temperature}K</h4>
                        <h4>Max temperature : {item.max_temperature}K</h4>
                        <h4>Humidity : {item.humidity}</h4>
                        {/* <h4>Sea Level : {item.sea_level}</h4> */}
                        <h4>Wind Speed : {item.windSpeed}</h4>
                    </Popup>
                </Marker>
            ))
            }
        </MapContainer>
    );
}

export default Map;