import { connectToDB } from '../../../../lib/mongodb';
import Shop from '../../../../models/Shop';

export async function GET(req, { params }) {
    const { id } = params;
    await connectToDB();
    try {
        const shop = await Shop.findById(id).populate('owner');
        if (!shop) {
            return new Response('Shop not found', { status: 404 });
        }
        return new Response(JSON.stringify(shop), { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch shop', { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const { id } = params;
    const updatedData = await req.json();
    await connectToDB();
    try {
        const shop = await Shop.findByIdAndUpdate(id, updatedData, { new: true });
        if (!shop) {
            return new Response('Shop not found', { status: 404 });
        }
        return new Response(JSON.stringify(shop), { status: 200 });
    } catch (error) {
        return new Response('Failed to update shop', { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const { id } = params;
    await connectToDB();
    try {
        const shop = await Shop.findByIdAndDelete(id);
        if (!shop) {
            return new Response('Shop not found', { status: 404 });
        }
        return new Response('Shop deleted successfully', { status: 200 });
    } catch (error) {
        return new Response('Failed to delete shop', { status: 500 });
    }
}