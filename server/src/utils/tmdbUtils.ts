import rp from "request-promise";
import dotenv from 'dotenv'
dotenv.config();

export const findShowID = (name:string)=>{
    rp.get({uri:"https://api.themoviedb.org/3/search/tv",qs:{
  api_key:process.env.TMDB_API_KEY,
  query:name
}}).then(res=>{
  const result = JSON.parse(res);
  const show = result.results[0]
  return show.id;
}).catch(err=> console.log(err));
}