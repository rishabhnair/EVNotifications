const pole = {
    user : 'Niranjan',
    number : 1,
    charger : 2,
    busy : 0
}
const minInterval = (pole, callback) => {
    setTimeout(() => {
        if (pole.busy === 0){
            notifyC()
            console.log('1')
        }
        else {
                
                if (pole.busy === 1){                                                                                                                                               
                    notifyC()        //Saying that his car should be charging and ask A about his shizz
                    console.log('2')

                }else{
                    notifyC()         //Saying that a charger is free!!
                    notifyA()
                }
            },120000)     
        }
    },   )
    
}

const notifyC = () => {
    console.log('Notifying C!!')
}
const notifyA = () => {
    console.log('Notifying A!!')
}
console.log('hi')

// CALL

minInterval(pole)

