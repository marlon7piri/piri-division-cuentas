import { PrismaClient } from '../../generated/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest): Promise<any> {
  try {
    // Realiza una consulta para obtener todos los restaurantes
    const restaurants = await prisma.restaurant.findMany();  // Esto obtiene todos los registros de la tabla 'restaurant'

    // Retorna los restaurantes en formato JSON
    return NextResponse.json(restaurants);
  } catch (error:any) {
    // En caso de error, retorna un mensaje de error
    return NextResponse.json(
      { message: "Error fetching restaurants", error: error.message },
      { status: 500 }
    );
  }
}
