from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text


def seed_images():
    seeds = [
        Image(url='https://res.cloudinary.com/drv1e8rjp/image/upload/v1710734997/avatar_1_lfbzjt.png', imageable_type='avatar', imageable_id=1),
        # Sword of Flames
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1711771570/QuestLog/ql-main-sword-of-fire5_fmizds.jpg', imageable_type='equipment', imageable_id=1),
        # Sword of Glaciers
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1711771575/QuestLog/ql-main-sword-of-ice_wvphzo.jpg', imageable_type='equipment', imageable_id=2),
        # Axe of Storms
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1711771539/QuestLog/ql-main-electric-axe2_voikw3.jpg', imageable_type='equipment', imageable_id=3),
        # Mace of Despair
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1711771523/QuestLog/ql-main-mace-of-despair_cukfcf.jpg', imageable_type='equipment', imageable_id=4),
        # Mace of Freezing
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1711771549/QuestLog/ql-main-ice-mace_fdofr6.jpg', imageable_type='equipment', imageable_id=5),
        # Staff of Water
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1711774618/QuestLog/ql-main-wizards-staff_sgrvj8.jpg', imageable_type='equipment', imageable_id=6),
        # Staff of Charging
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1711774620/QuestLog/ql-main-wizards-staff2_imavtg.jpg', imageable_type='equipment', imageable_id=7),
        # Rod of Dreams
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1711774616/QuestLog/ql-main-wizards-rod_wrdvmx.jpg', imageable_type='equipment', imageable_id=8),
        # Rod of the Night Sky
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1711774616/QuestLog/ql-main-wizards-rod2_l9db9g.jpg', imageable_type='equipment', imageable_id=9),
        # Iron Helmet
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1711771518/QuestLog/ql-head-iron-helmet_cswmtg.jpg', imageable_type='equipment', imageable_id=10),
        # Bandit's Hood
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1711773487/QuestLog/ql-head-bandits-hood2_nxhdre.jpg', imageable_type='equipment', imageable_id=11),
        # Cursed Mask
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1711773490/QuestLog/ql-head-cursed-mask3_pakrwu.jpg', imageable_type='equipment', imageable_id=12),
        # Dragonscale Breastplate
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1711771504/QuestLog/ql-armor-dragonscale_yqv4bm.jpg', imageable_type='equipment', imageable_id=13),
        # Glass Armor
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1711774623/QuestLog/ql-armor-glass-armor_jlndnt.jpg', imageable_type='equipment', imageable_id=14),
        # Robes of the Silent Order
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1711774630/QuestLog/ql-armor-mages-robe3_fjfsxz.jpg', imageable_type='equipment', imageable_id=15),
        # Robes of the Expert Mage
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1711774626/QuestLog/ql-armor-mages-robe_zccws8.jpg', imageable_type='equipment', imageable_id=16),
        # Robes of Twilight
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1711774631/QuestLog/ql-armor-mages-robe4_syp2e8.jpg', imageable_type='equipment', imageable_id=17),
        # Noble's Robes
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1711774628/QuestLog/ql-armor-nobles-robe2_vehycb.jpg', imageable_type='equipment', imageable_id=18),
        # Merchant's Robes
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1711774633/QuestLog/ql-armor-merchants-robe_caekxn.jpg', imageable_type='equipment', imageable_id=19),
        # Cloak of Invisibility
        Image(url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1711774621/QuestLog/ql-armor-cloak-of-invisibility_njzesp.jpg', imageable_type='equipment', imageable_id=20)
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
