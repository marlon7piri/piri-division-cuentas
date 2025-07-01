import { PrismaClient } from '../../../generated/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest): Promise<any> {
    const {nombre,foto,direccion} = await request.json()

    console.log(nombre,foto,direccion)
  try {
  const res = await prisma.restaurant.create({data:{nombre,foto,direccion}})

console.log(res)
  return NextResponse.json({message:"Restaurante creado",status:201})
  } catch (error:any) {
    // En caso de error, retorna un mensaje de error
    return NextResponse.json(
      { message: "Error fetching restaurants", error: error.message },
      { status: 500 }
    );
  }
}
