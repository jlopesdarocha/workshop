function onOff(){
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document
        .querySelector("body")
        .classList
        .toggle("hideScroll")

    document
    .querySelector("#modal")    
    .classList
    .toggle("addSroll")
}

    function checkFields(event) {

        const valuesTocheck = [
            "title",
            "image",
            "category",
            "description",
            "link",
        ]

        const isEmppy = valuesTocheck.find(function(value){

            const checkIfsString = typeof event.target[value].value === "string"
            const checkIfIsEmpty = !event.target[value].value.trim()

            if(checkIfsString && checkIfIsEmpty) {
                return true
            }
        })


        if(isEmppy) {
            event.preventDefault()
            alert("por favor, preencha todos os campos")
        }
    }






