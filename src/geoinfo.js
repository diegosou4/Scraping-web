


export class Geoinfo {
  constructor(name, latitude, longitude,url) {
    this._name = name;
    this._latitude = latitude;
    this._longitude = longitude;
    this._url = url;
  }

  getLatitude() {
    return this._latitude;
  }

  getLongitude() {
    return this._longitude;
  }
  getUrl()
  {
    return this._url;
  }
  seturl(url)  {
    this._url = url;
  }
  setlatitude(latitude)  {
    this._latitude = latitude;
  }
  setlongitude(longitude)  {
    this._longitude = longitude;
  }
  setName(name){
    this._name = name;
  }
  getName(name)
  {
    return this._name;
  }
}




