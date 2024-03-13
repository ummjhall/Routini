from app.models import db, AvatarEquipment, environment, SCHEMA
from sqlalchemy.sql import text


def seed_avatars_equipment():
    seeds = [
        AvatarEquipment(avatar_id=1, equipment_id=1),
        AvatarEquipment(avatar_id=1, equipment_id=2, equipment_nickname='The Throngler'),
        AvatarEquipment(avatar_id=1, equipment_id=3)
    ]

    for avatar_equipment in seeds:
        db.session.add(avatar_equipment)
    db.session.commit()


def undo_avatars_equipment():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.avatars_equipment RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM avatars_equipment'))

    db.session.commit()
