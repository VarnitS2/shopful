import hashlib
from flask import request
from flask.json import jsonify
from flask.wrappers import Response

from api import app
from api.db_worker import Worker

_db_worker = Worker()
TABLES = ['Items', 'Markets', 'Orders', 'Purchases', 'Users']

# Test endpoint
@app.route('/api/hello')
def hello() -> Response:
    return jsonify(status=200, message='Hello, world!')

@app.route('/api/get/table', methods=['POST'])
def get_table() -> Response:
    table = request.get_json()['table']

    if table not in TABLES:
        return jsonify(status=404, message='Provided table does not exist in database')

    tableElems = _db_worker.select_all_from_table(table)

    if table == 'Items':
        tableElemsDict = [{
            'item_id': elem[0],
            'item_name': elem[1],
            'category': elem[2][:-1]
        } for elem in tableElems]
    elif table == 'Markets':
        tableElemsDict = [{
            'market_id': elem[0],
            'market_name': elem[1],
            'market_location': elem[2],
            'rating': elem[3]
        } for elem in tableElems]
    elif table == 'Orders':
        tableElemsDict = [{
            'order_id': elem[0],
            'purchase_date': elem[1],
            'notes': elem[2],
            'total_spent': elem[3],
            'user_id': elem[4],
            'market_id': elem[5]
        } for elem in tableElems]
    elif table == 'Purchases':
        tableElemsDict = [{
            'purchase_id': elem[0],
            'order_id': elem[1],
            'item_id': elem[2],
            'price': elem[3],
            'quantity': elem[4]
        } for elem in tableElems]
    else:
        tableElemsDict = [{
            'user_id': elem[0],
            'username': elem[1],
            'user_password': elem[2],
            'email': elem[3],
            'age': elem[4]
        } for elem in tableElems]

    return jsonify(status=200, message=tableElemsDict)

@app.route('/api/add/order', methods=['POST'])
def add_order() -> Response:
    notes = request.get_json()['notes'] if request.get_json()['notes'] else 'NULL'
    total_spent = request.get_json()['total_spent'] if request.get_json()['total_spent'] else 0.0
    user_id = request.get_json()['user_id'] if request.get_json()['user_id'] else 'NULL'
    market_id = request.get_json()['market_id'] if request.get_json()['market_id'] else 'NULL'

    try:
        _db_worker.add_to_orders(notes, total_spent, user_id, market_id)
    except Exception as e:
        return jsonify(status=400, message=e)
    else:
        return jsonify(status=200, message=_db_worker.get_last_insert_id('Orders', 'order_id')[0][0])

@app.route('/api/get/order/id', methods=['POST'])
def get_order_id() -> Response:
    order_id = request.get_json()['order_id']

    try:
        order = _db_worker.select_condition_from_table('Orders', 'order_id', order_id)
    except Exception as e:
        return jsonify(status=400, message=e)
    else:
        if len(order) == 0:
            return jsonify(status=404, message='Invalid order_id')
        else:
            return jsonify(status=200, message={
                'order_id': order[0][0],
                'purchase_date': order[0][1],
                'notes': order[0][2],
                'total_spent': order[0][3],
                'user_id': order[0][4],
                'market_id': order[0][5],
            })

@app.route('/api/search/order', methods=['POST'])
def search_orders() -> Response:
    user_id = request.get_json()['user_id']
    start_date = request.get_json()['start_date']
    end_date = request.get_json()['end_date']

    try:
        orders = _db_worker.get_orders_from_time_period(user_id, start_date, end_date)
    except Exception as e:
        return jsonify(status=400, message=e)
    else:
        if len(orders) == 0:
            return jsonify(status=404, message='No orders found for the provided constraints')
        else:
            return jsonify(status=200, message=[{
                'order_id': order[0],
                'purchase_date': order[1],
                'notes': order[2],
                'total_spent': order[3],
                'user_id': order[4],
                'market_id': order[5],
            } for order in orders])

@app.route('/api/update/order', methods=['POST'])
def update_order() -> Response:
    order_id = request.get_json()['order_id']
    purchase_date = request.get_json()['purchase_date'] if request.get_json()['purchase_date'] else 'CURRENT_TIMESTAMP()'
    market_id = request.get_json()['market_id']
    notes = request.get_json()['notes']
    total_spent = request.get_json()['total_spent']

    if len(_db_worker.select_condition_from_table('Orders', 'order_id', order_id)) != 1:
        return jsonify(status=400, message='Invalid order_id')

    try:
        _db_worker.update_order(order_id, purchase_date, market_id, notes, total_spent)
    except Exception as e:
        return jsonify(status=400, message=e)
    else:
        return jsonify(status=200, message='Order updated successfully')

@app.route('/api/delete/order', methods=['POST'])
def delete_order() -> Response:
    order_id = request.get_json()['order_id']

    if len(_db_worker.select_condition_from_table('Orders', 'order_id', order_id)) != 1:
        return jsonify(status=400, message='Invalid order_id')

    try:
        _db_worker.delete_order(order_id)
    except Exception as e:
        return jsonify(status=400, message=e)
    else:
        return jsonify(status=200, message='Order deleted successfully')

@app.route('/api/add/purchase', methods=['POST'])
def add_purchase() -> Response:
    order_id = request.get_json()['order_id']
    item_id = request.get_json()['item_id']
    price = request.get_json()['price']
    quantity = request.get_json()['quantity']

    try:
        _db_worker.add_to_purchases(order_id, item_id, price, quantity)
    except Exception as e:
        return jsonify(status=400, message=e)
    else:
        return jsonify(status=200, message=_db_worker.get_last_insert_id('Purchases', 'purchase_id')[0][0])

@app.route('/api/get/purchases', methods=['POST'])
def get_purchases() -> Response:
    order_id = request.get_json()['order_id']

    try:
        purchases = _db_worker.select_condition_from_table('Purchases', 'order_id', order_id)
    except Exception as e:
        return jsonify(status=400, message=e)
    else:
        return jsonify(status=200, message=[{
            'purchase_id': purchase[0],
            'order_id': purchase[1],
            'item_id': purchase[2],
            'item_name': _db_worker.select_condition_from_table('Items', 'item_id', purchase[2])[0][1],
            'price': purchase[3],
            'quantity': purchase[4],
        } for purchase in purchases])

@app.route('/api/delete/purchase', methods=['POST'])
def delete_purchase() -> Response:
    purchase_id = request.get_json()['purchase_id']

    try:
        _db_worker.delete_from_purchases(purchase_id)
    except Exception as e:
        return jsonify(status=400, message=e)
    else:
        return jsonify(status=200, message='Purchase deleted successfully')

@app.route('/api/add/user', methods=['POST'])
def add_user() -> Response:
    username = request.get_json()['username']
    email = request.get_json()['email']
    user_password = request.get_json()['user_password']
    age = request.get_json()['age']

    user_password_hashed = hashlib.sha224(user_password.encode('ascii')).hexdigest()

    if len(_db_worker.get_user(email)) > 0:
        return jsonify(status=400, message='Email already exists in database')

    try:
        _db_worker.add_to_users(username, email, user_password_hashed, age)
    except Exception as e:
        return jsonify(status=400, message=e)
    else:
        return jsonify(status=200, message=_db_worker.get_last_insert_id('Users', 'user_id'))

@app.route('/api/get/user', methods=['POST'])
def get_user() -> Response:
    email = request.get_json()['email']

    try:
        user = _db_worker.select_condition_from_table('Users', 'email', email)
    except Exception as e:
        return jsonify(status=400, message=e)
    else:
        if len(user) == 0:
            return jsonify(status=404, message='Invalid email')
        else:
            return jsonify(status=200, message={
                'user_id': user[0][0],
                'username': user[0][1],
                'email': user[0][3],
                'age': user[0][4],
            })

@app.route('/api/login/user', methods=['POST'])
def login_user() -> Response:
    email = request.get_json()['email']
    user_password = request.get_json()['user_password']
    user_password_hashed = hashlib.sha224(user_password.encode('ascii')).hexdigest()

    try:
        user = _db_worker.get_user(email)
    except Exception as e:
        return jsonify(status=400, message=e)
    else:
        if user[0][2] != user_password_hashed:
            return jsonify(status=400, message='Invalid password')
        else:
            return jsonify(status=200, message='Login successful')

@app.route('/api/get/max-price-per-user', methods=['POST'])
def get_analytics_max_price_per_user() -> Response:
    try:
        max_purchases = _db_worker.get_max_price_per_user()
    except Exception as e:
        return jsonify(status=400, message=e)
    else:
        return jsonify(status=200, message=[{
            'price': purchase[0],
            'item_id': purchase[1],
            'item_name': _db_worker.select_condition_from_table('Items', 'item_id', purchase[1])[0][1],
            'user_id': purchase[2],
            } for purchase in max_purchases])


