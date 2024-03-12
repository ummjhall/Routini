from .db import db, environment, SCHEMA, add_prefix_for_prod


class Avatar(db.Model):
    __tablename__ = 'avatars'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False, unique=True)
    name = db.Column(db.String(40), nullable=False)
    bio = db.Column(db.String(255))
    level = db.Column(db.Integer, nullable=False)
    health = db.Column(db.Integer, nullable=False)
    exp = db.Column(db.Integer, nullable=False)
    gold = db.Column(db.Integer, nullable=False)
    gems = db.Column(db.Integer, nullable=False)
    equip_head_id = db.Column(db.Integer)
    equip_main_id = db.Column(db.Integer)
    equip_armor_id = db.Column(db.Integer)

    user = db.relationship('User', back_populates='avatar')
    equipment = db.relationship('Equipment', secondary='avatars_equipment', back_populates='avatars')
    image = db.relationship(
        'Image',
        primaryjoin='and_(Image.imageable_type=="avatar", foreign(Image.imageable_id)==Avatar.id)',
        lazy='dynamic',
        cascade='all, delete-orphan',
        uselist=False
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'bio': self.bio,
            'level': self.level,
            'health': self.health,
            'exp': self.exp,
            'gold': self.gold,
            'gems': self.gems,
            'equip_head_id': self.equip_head_id,
            'equip_main_id': self.equip_main_id,
            'equip_armor_id': self.equip_armor_id
        }
