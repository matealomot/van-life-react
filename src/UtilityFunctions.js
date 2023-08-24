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
}


export {checkType, filterType, capitalizeString};