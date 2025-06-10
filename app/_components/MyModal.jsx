import { CardHeader, CardTitle } from "../../components/components/ui/card"
import React from 'react'
import { Button } from "../../components/components/ui/button"





export default function MyModal({setType,type}) {


    


    const option = [

        {
            name: "For Exams",
            description: "suitable for teachers"
        },
        {
            name: "For Survey or collecting Data",
            description: "suitable for Company or small buisness"
        }
    ]



    return (
        <div>
     
             <CardHeader>
                
               <CardTitle className="text-center capitalize">Choose your motive</CardTitle>
             </CardHeader>
       
            {
                option.map((el, i) => (
                    <div key={i}  style={type==el.name ?{backgroundColor:'blue'}:undefined} className="mt-2 mb-2 py-2 px-2  rounded-md " onClick={()=>setType(el.name)}>
                        <p className="text-black py-2 px-2 bg-gray-300 rounded-md hover:bg-blue-900 hover:text-white ease-in-out cursor-pointer">{el.name}</p>
                        <p className="text-gray-400 text-sm  bg-white font-sans  mt-3 px-3">{el.description}</p>
                    </div>
                ))
            }
            <div className="flex items-center justify-center">
              
<Button className="bg-blue-800 hover:text-white hover:bg-blue-900">submit</Button>

            </div>





        </div>
    )
}
