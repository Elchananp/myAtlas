let map;  // שמירת המפה באופן גלובלי

const renderMap = (Coordinate, elementId) => {
    // אם המפה כבר קיימת, הסר אותה
    // if (map) {
    //     map.remove();  // הסרת המפה הקודמת
    //     console.log("Removing existing map.");
    // }

    console.log("from map " + Coordinate);

    // אתחול המפה חדשה
    map = L.map(elementId).setView(Coordinate, 7); // מיקום התצוגה הראשוני 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

const removeMap =() => {
    console.log("removeMap");
    
    if (map){
    map.remove()
    }
}

// const renderMap = (Coordinate, elementId) => {
//     console.log("from map" + Coordinate);
//     if (elementId._leaflet_id) {
//         elementId._leaflet_id.remove();  // הסר את המפה הנוכחית
//         console.log("Removing existing map.");
//     }
//     // type of Coordinate is array
//     let map = L.map(elementId).setView(Coordinate, 10); // מיקום התצוגה הראשוני 

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(map);
// }

// const renderMap = ( elementId) => {
//     // console.log("from map" + Coordinate);
    
//     // type of Coordinate is array
//     let map = L.map(elementId).setView([-54.5, -37], 10); // מיקום התצוגה הראשוני 

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(map);
// }

export {renderMap, removeMap}