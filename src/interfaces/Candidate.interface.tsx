// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    name: string | null;
    login: string | null;
    location: string | null;
    avatar: string | null;
    email: string | null;
    html_url: string | null;
    company: string | null;
}

export default Candidate;