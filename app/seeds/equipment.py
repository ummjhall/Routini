from app.models import db, Equipment, environment, SCHEMA
from sqlalchemy.sql import text


def seed_equipment():
    seeds = [
        Equipment( #1
          type='main',
          name='Sword of Flames',
          description='Bursts lesser targets into flames upon striking.',
          cost=100),
        Equipment( #2
          type='main',
          name='Sword of Glaciers',
          description="Filled with power from the earth's polar waters.",
          cost=100),
        Equipment( #3
          type='main',
          name='Axe of Storms',
          description='Strikes lightning from the heavens.',
          cost=100),
        Equipment( #4
          type='main',
          name='Mace of Despair',
          description='Brings misfortune to all who come into contact with it.',
          cost=1000),
        Equipment( #5
          type='main',
          name='Mace of Freezing',
          description='Has the power to freeze enemies.',
          cost=200),
        Equipment( #6
          type='main',
          name='Staff of Water',
          description='The wielder of this staff can control small pools of water.',
          cost=100),
        Equipment( #7
          type='main',
          name='Staff of Charging',
          description='Collects energy from the moon.',
          cost=200),
        Equipment( #8
          type='main',
          name='Rod of Dreams',
          description='Can put enemies to sleep.',
          cost=200),
        Equipment( #9
          type='main',
          name='Rod of the Night Sky',
          description='A mysterious power permeates through it.',
          cost=300),
        Equipment( #10
          type='head',
          name='Iron Helmet',
          description='A very protective helmet.',
          cost=100),
        Equipment( #11
          type='head',
          name="Bandit's Hood",
          description='Increases the stealth of the wearer.',
          cost=200),
        Equipment( #12
          type='head',
          name='Cursed Mask',
          description='Said to inflict its wearers with random effects, good or bad.',
          cost=700),
        Equipment( #13
          type='armor',
          name='Dragonscale Breastplate',
          description='A strong piece of armor made from the scales of felled dragons.',
          cost=300),
        Equipment( #14
          type='armor',
          name='Glass Armor',
          description='Sturdy armor commonly worn by elves.',
          cost=200),
        Equipment( #15
          type='armor',
          name='Robes of the Silent Order',
          description='Robes worn by a certain secretive cabal.',
          cost=300),
        Equipment( #16
          type='armor',
          name='Robes of the Expert Mage',
          description='Enhances the magic of its wearer.',
          cost=500),
        Equipment( #17
          type='armor',
          name='Robes of Twilight',
          description='A one-of-a-kind robe that harnesses the latent energy of the stars.',
          cost=700),
        Equipment( #18
          type='armor',
          name="Noble's Robes",
          description='An outfit for a high-ranking nobleman.',
          cost=300),
        Equipment( #19
          type='armor',
          name="Merchant's Robes",
          description='A fine quality robe fit for a wealthy merchant.',
          cost=300),
        Equipment( #20
          type='armor',
          name='Cloak of Invisibility',
          description='Grants the user the power to become invisible at will.',
          cost=10000)
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
