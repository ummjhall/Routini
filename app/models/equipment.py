from .db import db, environment, SCHEMA, add_prefix_for_prod
from .avatar_equipment import AvatarEquipment


class Equipment(db.Model):
    __tablename__ = 'equipment'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Enum('head', 'main', 'armor', name='types'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    cost = db.Column(db.Integer, nullable=False)

    avatars = db.relationship('Avatar', secondary=AvatarEquipment, back_populates='equipment')
    image = db.relationship(
        'Image',
        primaryjoin='and_(Image.imageable_type=="equipment", foreign(Image.imageable_id)==Equipment.id)',
        cascade='all, delete-orphan',
        uselist=False
    )

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'name': self.name,
            'description': self.description,
            'cost': self.cost
        }
