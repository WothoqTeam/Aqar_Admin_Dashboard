export class Rates {
    'id': number;
    'consultant_id': number;
    'user_id': number;
    'execution_speed': number;
    'execution_quality': number;
    'explanation_clarification': number;
    'permanent_presence': number;
    'effective_communication': number;
    'comment': string;
    'total_rate': number;
    'created_at': string;
    'consultant': {
        'id': number;
        'name': string;
    };
    'user': {
        'id': number;
        'name': string;
    }
}