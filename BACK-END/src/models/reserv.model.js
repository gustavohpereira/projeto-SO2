export default class Reservation {
    constructor(id, roomName, roomPhoto, roomLocation, dateOfUse, startTime, endTime, responsible, reason, additionalInfo, guests) {
        this.id = id;
        this.roomName = roomName;
        this.roomPhoto = roomPhoto;
        this.roomLocation = roomLocation;
        this.dateOfUse = dateOfUse;
        this.startTime = startTime;
        this.endTime = endTime;
        this.responsible = responsible;
        this.reason = reason;
        this.additionalInfo = additionalInfo;
        this.guests = guests;
    }
}
