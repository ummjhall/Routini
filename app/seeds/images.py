from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text


def seed_images():
    seeds = [
        Image(url='https://res.cloudinary.com/drv1e8rjp/image/upload/v1710734904/helmet_4_pui0uy.png', imageable_type='equipment', imageable_id=1),
        Image(url='https://res.cloudinary.com/drv1e8rjp/image/upload/v1710734973/armor_7_yorxcn.png', imageable_type='equipment', imageable_id=2),
        Image(url='https://res.cloudinary.com/drv1e8rjp/image/upload/v1710734952/weapon_14_j3whrn.png', imageable_type='equipment', imageable_id=3),
        Image(url='https://res.cloudinary.com/drv1e8rjp/image/upload/v1710734997/avatar_1_lfbzjt.png', imageable_type='avatar', imageable_id=1),
        # Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078512/cld-sample-5.jpg', imageable_type='avatar', imageable_id=2),
        # Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078512/cld-sample-5.jpg', imageable_type='avatar', imageable_id=3),
        # Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078512/cld-sample-5.jpg', imageable_type='avatar', imageable_id=4)
    ]

    for image in seeds:
        db.session.add(image)
    db.session.commit()


def undo_images():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM images'))

    db.session.commit()
