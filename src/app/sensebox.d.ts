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
    updatedAt: string,
    weblink:string
}

interface Sensor {
    _id: string,
    icon: string,
    lastMeasurement: Measurement,
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