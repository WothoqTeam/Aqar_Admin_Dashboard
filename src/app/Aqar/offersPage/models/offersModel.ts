export class Offers {

    "id": number;
    "salary_transferred_to_bank": string;
    "funding_amount": string;
    "profits": string;
    "total_amount_support": string;
    "loan_repayment_period": string;
    "years_number_loan_repayment_period":string;
    "month_number_loan_repayment_period": string;
    "first_installment": string;
    "second_installment": string;
    "month_number_first_installment": string;
    "month_number_second_installment": string;
    "status": number ;
    "consultant_id": number;
    "finance_id": number;
    "consultant": {
        "id": number;
        "username": string;
        "name": string;
        "email": string;
        "mobile": string;
        "picture":string;
        "company_id": number;
        "execution_speed": number;
        "execution_quality": number;
        "explanation_clarification": number;
        "permanent_presence": number;
        "effective_communication": number;
        "total_rate": number;
        "company": {
            "id":number;
            "username": string;
            "name": string;
            "email": string;
            "mobile":string;
            "profile_pic": string;
        }
    }
}