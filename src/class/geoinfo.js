


export class Geoinfo {
  constructor(name, latitude, longitude,url) {
    this._name = name;
    this._latitude = latitude;
    this._longitude = longitude;
    this._url = url;
  }


  
  getLatitude() {
    return this._latitude;}

  getLongitude() {
    return this._longitude;}
  getUrl(){
    return this._url;}
  getID()
  {
    return this._id;
  }
  getAdress()
  {
    return this._address;
  }
  
  setAdress(address)
  {
    this._address = address;
  }
  setID(id){
    this._id = id;
  }
  seturl(url)  {
    this._url = url;}
  setlatitude(latitude)  {
    this._latitude = latitude;}
  setlongitude(longitude)  {
    this._longitude = longitude;}
  setName(name){
    this._name = name;}
  getName(name){
    return this._name;}
}




