import { redirect } from "react-router-dom"

function mutateResponse(path){
 //redirect returns the patch response 
 let response = redirect(path)
 //body can be anything but undefined
 response.body = true 
 return response
}
export { mutateResponse as redirect };