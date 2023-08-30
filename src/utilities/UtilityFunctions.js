// checks the type so that the correct color is assigned to the type badge
function checkType(type) {
    let buttonColor = {
        backgroundColor: ""
    }

    if(type === 'simple') {
        buttonColor.backgroundColor = '#E17654';
    }
    else if(type === 'rugged') {
        buttonColor.backgroundColor = '#115E59';
    }
    else {
        buttonColor.backgroundColor = '#161616';
    };

    return buttonColor;
}; 

// sets the correct type 'simple', 'luxury' or 'rugged' to Type state so it can be used for further filtering, etc.
function filterType(callback, type) {
    callback(type)
}; 

// capitalizes the first string character
function capitalizeString(string) {
    return (string[0].toUpperCase() + string.slice(1));
};

// checks if there's existing data in localStorage, if not it does a fetch request for it, otherwise it returns data from localStorage;
async function getVans() {
    if(!JSON.parse(localStorage.getItem('vans')) || JSON.parse(localStorage.getItem('vans')).length == 0) {
        const res = await fetch("/api/vans");
        if (!res.ok) {
            throw {
                message: "Failed to fetch vans", 
                statusText: res.statusText,
                status: res.status
            };
        };
        const data = await res.json();
        localStorage.setItem('vans', JSON.stringify(data.vans));
        return data.vans;
    }
    else {
        return JSON.parse(localStorage.getItem('vans'));
    };
};


export {checkType, filterType, capitalizeString, getVans};