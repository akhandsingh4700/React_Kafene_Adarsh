
export const setLogin=(value)=>{
    console.log(value)
    return{
        type:"LoggedIn",
        data:value
    }
}