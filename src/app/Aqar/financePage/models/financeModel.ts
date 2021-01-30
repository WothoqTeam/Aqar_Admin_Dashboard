export class Finance {
    "id": number;
    "full_name": string;
    "bank_salary": string ;
    "salary": string ;
    "total_salary": string ;
    "deduction": string ;
    "employer": string ;
    "occupation": string ;
    "service_length": string ;
    "remain_service_life": string ;
    "aqar_id": number;
    "aqar_type": string ;
    "file_num": number;
    "file": string ;
    "user_id": number;
    "status": number;
    'hand_commitment': [];
    "user": {
        "id": number;
        "username": string ;
        "email": string ;
        "mobile":string ;
        "is_owner": number;
    };
    "commitment": [
        {
            "id": number;
            "hand_commitment": string ;
            "monthly_amount": string ;
            "remaining_months": string ;
            "finance_application_id": number;
        }
    ]
}
