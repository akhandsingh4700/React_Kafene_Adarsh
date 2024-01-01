let initialstate = {
    isLoggedin: false
}


export let logreducer = (previousState = initialstate, action) => {
    console.log(action)
    switch (action.type) {
        case "LoggedIn":
            return {
                ...previousState,
                isLoggedin: action.data
            };
        default:

            return {
                ...previousState,

            };

    }


}