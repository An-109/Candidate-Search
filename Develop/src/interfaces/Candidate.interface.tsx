// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate{
    id:number|null;
    login:string;
    email:string|null;
    avatar_url?:string;
    location?:string;
    company?:string;
    bio?:string;
}