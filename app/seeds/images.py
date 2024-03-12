from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text


def seed_images():
    seeds = [
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078512/cld-sample-5.jpg', imageable_type='avatar', imageable_id=1),
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078512/cld-sample-5.jpg', imageable_type='equipment', imageable_id=1),
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078512/cld-sample-5.jpg', imageable_type='equipment', imageable_id=2),
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078512/cld-sample-5.jpg', imageable_type='equipment', imageable_id=3)
        # Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078512/cld-sample-5.jpg', imageable_id=2, imageable_type='avatar'),
        # Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078512/cld-sample-5.jpg', imageable_id=3, imageable_type='avatar'),
        # Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078512/cld-sample-5.jpg', imageable_id=4, imageable_type='avatar')
    ]

    for image in seeds:
        db.session.add(image)
    db.session.commit()


def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
