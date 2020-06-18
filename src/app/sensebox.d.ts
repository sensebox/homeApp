interface Box {
    _id: string,
    createdAt: Date,
    currentLocation: Object,
    description: string,
    exposure: string,
    grouptag:string,
    image:string,
    integrations:Object,
    lastMeasurementAt: Date,
    loc: Array<any>,
    model: string,
    name: string,
    sensors: Array<Sensor>,
    updatedAt?: Date,
    weblink:string
}

interface Sensor {
    _id?: string,
    icon?: string,
    lastMeasurement?: Measurement,
    sensorType: string,
    title: string,
    unit: string
}

interface Measurement {
    value: number,
    time: string
}

interface Measurements {
    Temperatur: Measurement,
    Luftdruck : Measurement,
    Luftfeuchte: Measurement
}

interface loginResponse {
    code: string,
    data: Object,
    message: string,
    refreshToken: string,
    token: string
  }
  
interface newUserResponse {
    code:string,
    message:string,
    token:string,
    refreshToken:string,
    data:Object
}

interface OSEMLocation {
    lat:number,
    lng:number,
    height?:number
}

interface newSensor{
    title:string,
    unit:string,
    sensorType:string,
    icon?:string,
    isChecked?:boolean
}

interface newBox {
    name:string,
    grouptag?:string,
    exposure:string,
    location: OSEMLocation,
    model?:string,
    sensors?:Array<Sensor>,
    sensorTemplates?:string,
    mqtt?:Object,
    ttn?:Object


}
