import { redirect } from './addOnUtilities';

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

async function getListedVans() {
    const response = await fetch("/api/vans");
    if(!response.ok) {
        throw new Error("Something went wrong")
    };
    const data = await response.json();
    const listings = data.vans.filter(van => van.rented === true);
    return listings;
};

async function getListings(id) {
    if(!JSON.parse(localStorage.getItem(`listedVans${id}`))) {
        const url = id ? `/api/vans/${id}` : "/api/vans";
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error("Something went wrong")
        };
        const data = await response.json();
        localStorage.setItem(`listedVans${id}`, JSON.stringify(data.vans));
        return data.vans;
    }
    else {
        return JSON.parse(localStorage.getItem(`listedVans${id}`));
    }
};

async function requireAuth(request) { 
    const pathname = new URL(request.url).pathname
    const isLoggedIn = localStorage.getItem('loggedin'); 
    if (!isLoggedIn) { 
        throw redirect(`/login?message=You must log in first.&redirectTo=${pathname}`);     
    }

    return null
};

// mock function that lets simulate logging into the app and checking the authentication
async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
};

export {checkType, filterType, capitalizeString, getVans, getListedVans, getListings, requireAuth, loginUser};