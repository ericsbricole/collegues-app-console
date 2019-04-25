let cl = console.log;
let favoriteCityId = "rome";
cl(favoriteCityId);
favoriteCityId = "paris";
cl(favoriteCityId);

const citiesId = ["paris", "nyc", "rome", "rio-de-janeiro"];
//citiesId = []; //TypeError
cl(citiesId);
citiesId.push("Tokyo");
cl(citiesId);

let getWeaTher = (cityId) => {
    let city = cityId.toUpperCase();
    let temperature = 20;

    return { city, temperature };
}

const weather = getWeaTher(favoriteCityId);
cl(weather);

const { city, temperature } = weather;

cl(city);
cl(temperature);

const [parisId, nycId, ...othersCitiesId] = citiesId;
cl(parisId);
cl(nycId);
cl(othersCitiesId.length);

class Trip {
    constructor(id, name, imageUrl) {
        this._id = id;
        this._name = name;
        this._imageUrl = imageUrl;
    }

    get id(){return this._id;}

    get name() {
        return this._name;
    }

    get price() {
        return this._price;
    }

    set price(price) {
        this._price = price;
    }

    toString() {
        return `Trip [id:${this._id}, name:${this._name}, imageUrl:${this._imageUrl}, price:${this._price}]`;
    }

    getDefaultTrip() {
        return new Trip("rio-de-janeiro", "Rio-de-Janeiro", "img/rio-de-janeiro.jpg");
    }
}

let parisTrip = new Trip("paris", "Paris", "img/paris.jpg");
cl(parisTrip);
cl(parisTrip.name);
cl(parisTrip.toString());
parisTrip.price = 100;
cl(parisTrip.toString());

const defaultTrip = Trip.prototype.getDefaultTrip();
cl(defaultTrip.toString());

class FreeTrip extends Trip {

    constructor(id, name, imageUrl) {
        super(id, name, imageUrl);
        this._price = 0;
    }

    toString() {
        return `Free${super.toString()}`;
    }
}

const freeTrip = new FreeTrip("nantes", "Nantes", "img/nantes.jpg");
cl(freeTrip.toString());

class TripService {

    constructor() {
        this.trips = new Set();
        this.trips.add(new Trip('paris', 'Paris', 'img/paris.jpg'));
        this.trips.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'));
        this.trips.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'));
    }
    findByName(tripName) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                this.trips.forEach(t => {
                    if (tripName === t.name)
                        resolve(t);
                });
                reject(`No trip with name ${tripName}`);
            }, 2000);
        });
    }
}

class PriceService {

    constructor() {
        this._mapPrices = new Map();
        this._mapPrices.set("paris", 2000000);
        this._mapPrices.set("rio-de-janeiro", 10);
        this._mapPrices.set("nantes", undefined);
    }

    findPriceByTripId(tripId) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                if (this._mapPrices.has(tripId))
                    return resolve(this._mapPrices.get(tripId))
                else{
                    return reject(`No price found for id ${tripId}`);
                }
            }, 2000);
        });
    }
}
//////////////////////////////////////////////
let ts = new TripService();
let ps = new PriceService();
let paris$ = ts.findByName("Paris");
paris$.then( paris => cl(`Trip found: ${paris.toString()}`), err => console.error(err));
ts.findByName("Toulouse").then(toulouse => cl(`Trip found: ${toulouse.toString()}`), err => console.error(err));

ts.findByName("Rio de Janeiro").then(
    (rio) => 
        ps.findPriceByTripId(rio._id).then(
        price => console.log(`Price found: ${price}`),
        err => console.error(err))
    , err => console.error(err));

    ts.findByName("Nantes").then(trip => ps.findPriceByTripId(trip._id)
    .then(price => cl(`Price found for Nantes: ${price}`),
        err => console.error(err)),
    err => console.error(err));