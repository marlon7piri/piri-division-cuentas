import { NextRequest ,NextResponse} from "next/server";

export  async function POST (request:NextRequest):Promise<any>{
    
return NextResponse.json({message:"Pago realizado"})
}