const sendNotification = (audiance, message, time, type, channel) =>{

    switch(type){
        case "new_addmission":
            // --> db -->entery notificationLogs
            //{addiance:[{},{}<{<}{}]}
            //mesaage:["new admision done"],
            //time:["1 hour"]
            //channel :["email"]
            //new table store --> notifican Logs -->satus -->sent not sent
            console.log("New admision done notification sent..")
            console.log("Audiance : ",audiance)
            console.log("Message : ",message)
            console.log("Time : ",time)
            console.log("Type : ",type)
            console.log("Channel : ",channel)
            break;
    }
}

module.exports = {sendNotification}