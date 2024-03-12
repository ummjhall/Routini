from app.models import db, Equipment, environment, SCHEMA
from sqlalchemy.sql import text


def seed_equipment():
    seeds = [
        Equipment(type='head', name='helmet name', description='helmet description', cost=100),
        Equipment(type='main', name='weapon name', description='weapon description', cost=100),
        Equipment(type='armor', name='armor name', description='armor description', cost=100),
    ]

    for equipment in seeds:
        db.session.add(equipment)
    db.session.commit()


def undo_equipment():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.equipment RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM equipment"))

    db.session.commit()
