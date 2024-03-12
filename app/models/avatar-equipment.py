from .db import db, environment, SCHEMA, add_prefix_for_prod


class AvatarEquipment(db.Model):
    __tablename__ = "avatars_equipment"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    avatar_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("avatars.id")), nullable=False
    )
    equipment_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("equipment.id")), nullable=False
    )
    equipment_nickname = db.Column(db.String(30))

    avatar = db.relationship(
        "Avatar", secondary="avatars_equipment", back_populates="equipment"
    )
    equipment = db.relationship(
        "Equipment", secondary="avatars_equipment", back_populates="equipment"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "avatar_id": self.avatar_id,
            "equipment_id": self.equipment_id,
            "equipment_nickname": self.equipment_nickname,
        }
