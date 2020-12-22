function createEmployeeRecord(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(rows) {
    return rows.map(row => createEmployeeRecord(row))
}

function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    employee.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    employee.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    })
    return employee
}

function hoursWorkedOnDate(employee, dateStamps) {
    let [date, hour] = dateStamps.split(" ")
    
    let timeIn = employee.timeInEvents.find(event => event.date === date)
    let timeOut = employee.timeOutEvents.find(event => event.date === date)
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(employee, dateStamps) {
    let hoursWorked = hoursWorkedOnDate(employee, dateStamps)
    return employee.payPerHour * hoursWorked
}

function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(event => event.date.concat(` ${event.hour}`))
    let payable = dates.reduce(function(accumulator, date) {
        return accumulator + wagesEarnedOnDate(employee, date)
    }, 0)
    return payable
}

function calculatePayroll(employees) {
    let total = employees.reduce(function(memo, employee) {
        return memo + allWagesFor(employee)
    }, 0)
    return total
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(element => element.firstName === firstName)
}

// let src = [
//     ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
//     ["Natalia", "Romanov", "CEO", 150]
// ]

// let emps = createEmployeeRecords(src)

// findEmployeeByFirstName(emps, "Loki")

// let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
// let sRecord = createEmployeeRecord(["Simba", "", "King", 100])

// let sTimeData = [
//   ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
//   ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
// ]

// let rTimeData = [
//   ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
//   ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 40 ===> 70 total ||=> 770
// ]

// sTimeData.forEach(function (d) {
//   let [dIn, dOut] = d
//   sRecord = createTimeInEvent(sRecord, dIn)
//   sRecord = createTimeOutEvent(sRecord, dOut)
// })

// rTimeData.forEach(function (d, i) {
//   let [dIn, dOut] = d
//   rRecord = createTimeInEvent(rRecord, dIn)
//   rRecord = createTimeOutEvent(rRecord, dOut)
// })

// let employees = [sRecord, rRecord]

// calculatePayroll(employees)