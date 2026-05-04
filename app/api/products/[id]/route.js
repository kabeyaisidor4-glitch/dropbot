'use client';

import { connectToDB } from '../../../utils/database';
import Product from '../../../models/Product';

export async function GET(request, { params }) {
    const { id } = params;
    await connectToDB();
   
    try {
        const product = await Product.findById(id);
        if (!product) {
            return new Response('Product not found', { status: 404 });
        }
        return new Response(JSON.stringify(product), { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch product', { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const { id } = params;
    const updatedProduct = await request.json();
    await connectToDB();
   
    try {
        const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
        if (!product) {
            return new Response('Product not found', { status: 404 });
        }
        return new Response(JSON.stringify(product), { status: 200 });
    } catch (error) {
        return new Response('Failed to update product', { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;
    await connectToDB();
   
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return new Response('Product not found', { status: 404 });
        }
        return new Response('Product deleted successfully', { status: 200 });
    } catch (error) {
        return new Response('Failed to delete product', { status: 500 });
    }
}