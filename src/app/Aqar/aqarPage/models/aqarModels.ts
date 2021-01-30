export class aqarModel{
    'id': number;
    'city': string;
    'district': string;
    'suk_number': string;
    'suk_date': string;
    'address': string;
    'longitude': string;
    'latitude': string;
    'benefits_nearby': string;
    'area': string;
    'interfaces_number':number;
    'street_type': number;
    'street_name':string;
    'floor_number': number;
    'bedrooms':number;
    'bathrooms': number;
    'halls_number': number;
    'session_rooms': number;
    'kitchens': number;
    'maid_room': number;
    'driver_room': number;
    'indoor_parking': number;
    'aqar_type': number;
    'finishing_type': number;
    'construction_status': number;
    'price': number;
    'commission':number;
    'commission_value': string;
    'price_after_commission': number;
    'user_id': number;
    'main_user':number;
    'user_name': string;
    'mobile': string;
    'status': number;
    'views': number;
    'floors_number':number;
    'land_area':number;
   'building_area':number;
   'meter_price':number;
   'apartments_number':number;
   'driver_room_number':number;
    'gallery': [
        {
            'id': number;
            'photo': string;
            'aqar_id':number;
            'aqar_type': number;
        }
    ]

}