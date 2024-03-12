from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', username='Demo', email='demo@aa.io', password='password')
    ramon = User(
        first_name='Ramon', last_name='Barros', username='Ramon', email='ramon@aa.io', password='password')
    nikola = User(
        first_name='Nikola', last_name='Milinovich', username='Nikola', email='nikola@aa.io', password='password')
    justin = User(
        first_name='Justin', last_name='Hall', username='Justin', email='justin@aa.io', password='password')

    db.session.add(demo)
    db.session.add(ramon)
    db.session.add(nikola)
    db.session.add(justin)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
