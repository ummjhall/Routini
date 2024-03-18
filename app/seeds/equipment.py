from app.models import db, Equipment, environment, SCHEMA
from sqlalchemy.sql import text


def seed_equipment():
    seeds = [
        Equipment(type='head', name='Helmet of Protection', description='A sturdy helmet imbued with protective enchantments.', cost=100),
        Equipment(type='main', name='Sword of Fire', description='A powerful sword that bursts into flames upon striking.', cost=100),
        Equipment(type='armor', name='Dragonhide Armor', description='Armor crafted from the scales of a mighty dragon, offering exceptional defense.', cost=100),
    ]

    for equipment in seeds:
        db.session.add(equipment)
    db.session.commit()


def undo_equipment():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.equipment RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM equipment'))

    db.session.commit()
