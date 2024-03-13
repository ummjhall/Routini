from flask import Blueprint
from app.models import Avatar, AvatarEquipment
from flask_login import current_user

inventory_routes = Blueprint("inventory", __name__, url_prefix="/api/equipment")


@inventory_routes.route("/current")
def get_users_equipment():
    if current_user:
        formattedJson = {"Equipment": []}
        userAvatar = current_user.avatar

        if userAvatar:
            equipments = userAvatar.equipment
            for equipment in equipments:
                equipment_image = equipment.image.to_dict()["url"]

                all_equipment = equipment.to_dict()
                avatarEquip = AvatarEquipment.query.filter(
                    AvatarEquipment.equipment_id == equipment.id
                ).first()
                equipment_nickname = avatarEquip.equipment_nickname
                all_equipment["nickname"] = equipment_nickname
                all_equipment["image_url"] = equipment_image
                all_equipment["user_id"] = current_user.id
                formattedJson["Equipment"].append(all_equipment)

    else:
        print("Login!")

    return formattedJson


# {
#   "Equipment": [
#     {
#       "id": 1,
#       "user_id": 1,
#       "type": "main",
#       "name": "Sword of Destiny",
#       "nickname": "Slicer",
#       "description": "The best sword ever.",
#       "cost": 100,
#       "image_url": "image url",
#       "created_at": "2021-11-19 20:39:36",
#       "updated_at": "2021-11-19 20:39:36"
#     }
#   ]
# }
