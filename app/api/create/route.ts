import { createClient } from "@/utils/supabase/server"
import sharp from 'sharp'
export async function POST(req: Request) {
    const formdata = await req.formData()
    const supabase = createClient()
    const file = formdata.getAll('file')[0] as File
    const title = formdata.get('title')
    const place = formdata.get('place')
    const description = formdata.get('description')
    const buffer = await file.arrayBuffer()
    const image = await sharp(buffer).resize(800, 800).toBuffer()
    const { error, data } = await supabase.storage.from('Posts').upload(`/images/${crypto.randomUUID()}`, image, {
        contentType: 'image/png'
    })
    if(error)return Response.json({
        
    }, { status: 200 })


    const { data: tableData, error: tableError } = await supabase
        .from('posts')
        .insert([
            { title:title, description:description, url: data?.path, place:place },
        ])
    
    if(tableError) return Response.json({
        
    }, { status: 400 })

    return Response.json({
        title,place,description
    }, { status: 200 })
}