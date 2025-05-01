
import { authOptions } from "./_features/utils/authOption";
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await getServerSession( authOptions)
  console.log(session)


  if(!session){
    redirect('/auth/signin')

  }
if(session){
  redirect('/Home')
}

  return <div>
    
  </div>

}


