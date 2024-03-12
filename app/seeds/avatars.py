from app.models import db, Avatar, environment, SCHEMA
from sqlalchemy.sql import text


def seed_avatars():
    seeds = [
        Avatar(user_id=1, name='demo_av_name', bio='char bio', level=0, health=50, exp=0, gold=0, gems=0),
        Avatar(user_id=2, name='ramon_av_name', bio='char bio', level=0, health=50, exp=0, gold=0, gems=0),
        Avatar(user_id=3, name='nikola_av_name', bio='char bio', level=0, health=50, exp=0, gold=0, gems=0),
        Avatar(user_id=4, name='justin_av_name', bio='char bio', level=0, health=50, exp=0, gold=0, gems=0)
    ]

    for avatar in seeds:
        db.session.add(avatar)
    db.session.commit()


def undo_avatars():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.avatars RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM avatars"))

    db.session.commit()
