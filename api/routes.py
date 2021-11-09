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

@app.route('/api/get/user')
def get_user() -> Response:
    return jsonify(status=200, message=_db_worker.select_condition_from_table('Users', 'user_id', 500)[0])

@app.route('/api/get/table', methods=['POST'])
def get_table():
    table = request.get_json()['table']

    if table not in TABLES:
        return jsonify(status=404, message='Provided table does not exist in database')

    tableElems = _db_worker.select_all_from_table(table)[1:]

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
def add_order():
    order_id = len(_db_worker.select_all_from_table('Orders'))
    notes = request.get_json()['notes'] if request.get_json()['notes'] else 'NULL'
    total_spent = request.get_json()['total_spent'] if request.get_json()['total_spent'] else 0.0
    user_id = request.get_json()['user_id'] if request.get_json()['user_id'] else 'NULL'
    market_id = request.get_json()['market_id'] if request.get_json()['market_id'] else 'NULL'

    try:
        _db_worker.add_to_orders(order_id, notes, total_spent, user_id, market_id)
    except Exception as e:
        return jsonify(status=400, message=e)
    else:
        return jsonify(status=200, message='Order with ID {} added successfully'.format(order_id))

@app.route('/api/get/order/id', methods=['POST'])
def get_order_id():
    order_id = request.get_json()['order_id']

    try:
        order = _db_worker.select_condition_from_table('Orders', 'order_id', order_id)
    except Exception as e:
        return jsonify(status=400, message=e)
    else:
        return jsonify(status=200, data=order[0])

# TODO: Implement me
@app.route('/api/add/purchase', methods=['POST'])
def add_purchase():
    pass

# TODO: Implement me
@app.route('/api/get/purchases', methods=['POST'])
def get_purchases():
    pass