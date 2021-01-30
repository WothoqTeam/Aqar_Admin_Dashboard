export class Maintenance{
    'id': number;
    'date': string;
    'time': string;
    'type': string;
    'main_user': number;
    'user_id': number;
    'user_name': string;
    'mobile': string;
    'user': {
        'id': number;
        'username': string;
        'email': string;
        'mobile': string;
        'is_owner': number;
    };
    'pictures': [];
}
