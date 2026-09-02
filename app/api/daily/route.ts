import {loadServerDaily} from '@/lib/data/server-daily';
export const dynamic='force-dynamic';
export async function GET(request:Request){const date=new URL(request.url).searchParams.get('date')??new Date().toISOString().slice(0,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return Response.json({error:'Hibás dátum.'},{status:400});try{return Response.json(await loadServerDaily(date),{headers:{'Cache-Control':'public, max-age=300'}})}catch{return Response.json({error:'A napi adatbetöltés sikertelen.'},{status:502})}}
