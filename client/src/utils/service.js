export const baseUrl = "http://localhost:5000/api"
 
//using fetch performing post request
export const postRequest = async (url, body) => {   
   const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body   //body of request , it is a json Object
    })

    const data = await response.json();  //response the data to json
    
    //check the error of response:-
    if (!response.ok) {

        let message;

        if (data?.message) {     //if data.message is from server site error(500) then we use data.message
            message = data.message
        } else {
            message = data    // if client site error (400) then message= data
        }
        return {error:true,message}
    }
    //if not error of response
    return data // we return data 
}



export const getRequest = async(url) =>{
    const response = await fetch(url)
    
    const data = await response.json();

    if(!response.ok)
    {
        let message = "An error occured ..."

        if(data?.message)
        {
            message = data.message
        }

        return {error:true, message}
    }
    return data
} 