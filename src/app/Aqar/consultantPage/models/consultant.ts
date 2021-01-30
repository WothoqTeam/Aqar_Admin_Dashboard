export class Consultant{
    "id": number;
    "username":string;
    "name": string;
    "email": string;
    "mobile":string;
    "picture": string;
    "company_id": number;
    "execution_speed": number ;
    "execution_quality": number;
    "explanation_clarification": number;
    "permanent_presence": number ;
    "effective_communication": number ;
    "total_rate": number;
    "company": {
        "id": number;
        "name": string;
    }
}