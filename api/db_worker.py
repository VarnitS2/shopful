import os
from dotenv import load_dotenv

import mysql.connector
from mysql.connector.constants import ClientFlag

class Worker:
    def __init__(self) -> None:
        load_dotenv()

        self._config = {
            'user': os.getenv('DB_USER'),
            'password': os.getenv('DB_PASS'),
            'host': os.getenv('DB_HOST'),
            'database': 'Shopful',
            'client_flags': [ClientFlag.SSL],
            'ssl_ca': 'ssl/server-ca.pem',
            'ssl_cert': 'ssl/client-cert.pem',
            'ssl_key': 'ssl/client-key.pem'
        }

        self._con = mysql.connector.connect(**self._config)
        self._cur = self._con.cursor(buffered=True)

    # General SELECTs
    def select_all_from_table(self, table) -> list:
        self._cur.execute('''SELECT * FROM {};'''.format(table))
        return self._cur.fetchall()

    def select_condition_from_table(self, table, condition, value) -> list:
        self._cur.execute('''SELECT * FROM {}
                            WHERE {} = {};'''.format(table, condition, value))
        return self._cur.fetchall()

    # Insert new records (rows) to the database
    def add_to_orders(self, notes, total_spent, user_id, market_id) -> None:
        self._cur.execute('''INSERT INTO Orders (notes, total_spent, user_id, market_id) VALUES
                            (\'{}\', {}, {}, {})'''.format(notes, total_spent, user_id, market_id))
        self._con.commit()

    # Search the database using a keyword search. Your application should allow the user to input their search keyword and return the result to the interfac
    def get_orders_from_time_period(self, user_id, start_date, end_date) -> list:
        self._cur.execute('''SELECT * FROM Orders
                            WHERE user_id = {} AND purchase_date >= \'{}\' AND purchase_date <= \'{}\';'''
                            .format(user_id, start_date, end_date))
        return self._cur.fetchall()

    # Update records on the database 
    def update_order(self, order_id, purchase_date, market_id, notes, total_spent) -> None:
        self._cur.execute('''UPDATE Orders
                            SET purchase_date = \'{}\', market_id = {}, notes = \'{}\', total_spent = {}
                            WHERE order_id = {};'''
                            .format(purchase_date, market_id, notes, total_spent, order_id))
        self._con.commit()

    def delete_all_orders_for_user(self, user_id) -> None:
        self._cur.execute('''DELETE FROM Orders
                            WHERE user_id = {};'''.format(user_id))
        self._con.commit()

    def delete_order_for_user_and_date(self, user_id, purchase_date) -> None:
        self._cur.execute('''DELETE FROM Orders
                            WHERE user_id = {} 
                            AND purchase_date = \'{}\';'''.format(user_id, purchase_date))
        self._con.commit()

    def delete_order_for_user_order_id(self, user_id, order_id) -> None:
        self._cur.execute('''DELETE FROM Orders
                            WHERE user_id = {}
                            AND order_id = {};'''.format(user_id, order_id))
        self._con.commit()

    def delete_order(self, order_id) -> None:
        self._cur.execute('''DELETE FROM Orders
                            WHERE order_id = {};'''.format(order_id))
        self._con.commit()  

    def add_to_purchases(self, order_id, item_id, price, quantity) -> None:
        self._cur.execute('''INSERT INTO Purchases (order_id, item_id, price, quantity) VALUES
                            ({}, {}, {}, {})'''.format(order_id, item_id, price, quantity))
        self._con.commit()

    def get_last_insert_id(self, table, id) -> int:
        self._cur.execute('''SELECT MAX({}) FROM {};'''.format(id, table))
        return self._cur.fetchall()

    def delete_from_purchases(self, purchase_id) -> None:
        self._cur.execute('''DELETE FROM Purchases
                            WHERE purchase_id = {};'''.format(purchase_id))
        self._con.commit()

    # Delete rows from the database 
    def delete_from_users(self, user_id) -> None:
        self._cur.execute('''DELETE FROM Users
                            WHERE user_id = {};'''.format(user_id))
        self._con.commit()

    # Integrate into your application both of the advanced SQL queries you developed in stage 3
    def get_freq_of_item_bought(self) -> list:
        self._cur.execute('''SELECT P.item_id, COUNT(P.item_id) as quantity, O.user_id
                            FROM Purchases AS P JOIN Orders AS O ON P.order_id = O.order_id
                            GROUP BY O.user_id, P.item_id
                            ORDER BY quantity DESC
                            LIMIT 15;''')
        return self._cur.fetchall()

    def get_max_price_per_user(self) -> list:
        self._cur.execute('''SELECT P.price, P.item_id, U.user_id
                            FROM Purchases AS P JOIN Orders AS O ON P.order_id = O.order_id JOIN Users AS U ON O.user_id = U.user_id
                            GROUP BY P.price, P.item_id, U.user_id
                            HAVING P.price = ANY ( SELECT MAX(price)
                            FROM Purchases
                            GROUP BY item_id)
                            ORDER BY P.price DESC
                            LIMIT 15;''')
        return self._cur.fetchall()

    def close_connection(self) -> None:
        self._con.close()