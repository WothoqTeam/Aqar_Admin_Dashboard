export class contractorModel{

    'id': number;
    'name': string;
    'mobile': string;
    'address': string;
    'details': string;
    'picture': string;
    'gallery': [
        {
            'id': number;
            'photo': string;
            'contractor_id': number;
        }
    ]
}